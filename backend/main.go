package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username string `gorm:"unique"`
	Password string
	IsAdmin  bool
}

type TeamApplication struct {
	gorm.Model
	AdSoyad             string `json:"adSoyad"`
	Email               string `json:"email"`
	EgitimDurumu        string `json:"egitimDurumu"`
	Alan                string `json:"alan"`
	CeviriDili          string `json:"ceviriDili"`
	YazilimUzmanlik     string `json:"yazilimUzmanlik"`
	TasarimUzmanlik     string `json:"tasarimUzmanlik"`
	AkademisyenUzmanlik string `json:"akademisyenUzmanlik"`
	DigerAlanDetay      string `json:"digerAlanDetay"`
	RuseviBursiyeri     string `json:"ruseviBursiyeri"`
	Telefon             string `json:"telefon"`
	Mesaj               string `json:"mesaj"`
	Status              string `json:"status" gorm:"default:'pending'"`
}

type PartnershipApplication struct {
	gorm.Model
	Isim         string `json:"isim"`
	Soyisim      string `json:"soyisim"`
	Email        string `json:"email"`
	Isletme      string `json:"isletme"`
	Sifre        string `json:"sifre"`
	Telefon      string `json:"telefon"`
	Status       string `json:"status" gorm:"default:'pending'"`
	HashPassword string `json:"-"`
}

type Institution struct {
	ID          uint   `json:"id"`
	Plaka       string `json:"plaka"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Address     string `json:"address"`
	Website     string `json:"website"`
	Image       string `json:"image"`
}

type Claims struct {
	Username string `json:"username"`
	Admin    bool   `json:"admin"`
	jwt.RegisteredClaims
}

var db *gorm.DB
var jwtKey []byte

const institutionsFile = "frontend/src/data/russian_institutions.json"

func init() {
	godotenv.Load()
	jwtKey = []byte(getEnv("JWT_SECRET", "jwt_secret_rusevi"))

	var err error
	db, err = gorm.Open(sqlite.Open("rusevi.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection failed:", err)
	}

	db.AutoMigrate(&User{}, &TeamApplication{}, &PartnershipApplication{})
	createAdminIfNotExists()
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	public := r.Group("/api")
	{
		public.POST("/login", loginHandler)
		public.POST("/team-application", submitTeamApplication)
		public.POST("/partnership-application", submitPartnershipApplication)
	}

	admin := r.Group("/api/admin")
	admin.Use(authMiddleware())
	{
		admin.GET("/team-applications", getTeamApplications)
		admin.GET("/partnership-applications", getPartnershipApplications)
		admin.PUT("/team-application/:id", updateTeamApplication)
		admin.PUT("/partnership-application/:id", updatePartnershipApplication)
		admin.DELETE("/team-application/:id", deleteTeamApplication)
		admin.DELETE("/partnership-application/:id", deletePartnershipApplication)
		admin.GET("/institutions", getInstitutions)
		admin.POST("/institution", createInstitution)
		admin.PUT("/institution/:id", updateInstitution)
		admin.DELETE("/institution/:id", deleteInstitution)
	}

	port := getEnv("PORT", "8080")
	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func readInstitutions() ([]Institution, error) {
	data, err := os.ReadFile(institutionsFile)
	if err != nil {
		return nil, err
	}

	var institutions []Institution
	err = json.Unmarshal(data, &institutions)
	return institutions, err
}

func writeInstitutions(institutions []Institution) error {
	data, err := json.MarshalIndent(institutions, "", "  ")
	if err != nil {
		return err
	}

	return os.WriteFile(institutionsFile, data, 0644)
}

// Auth Functions
func createAdminIfNotExists() {
	var count int64
	db.Model(&User{}).Where("is_admin = ?", true).Count(&count)
	if count == 0 {
		adminUsername := getEnv("ADMIN_USERNAME", "ruseviadmin")
		adminPassword := getEnv("ADMIN_PASSWORD", "admin")

		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal("Admin password hashing failed:", err)
		}

		admin := User{
			Username: adminUsername,
			Password: string(hashedPassword),
			IsAdmin:  true,
		}
		db.Create(&admin)
	}
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		if tokenString == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "yetkilendirme gerekli"})
			c.Abort()
			return
		}

		if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
			tokenString = tokenString[7:]
		}

		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid || !claims.Admin {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "geçersiz token"})
			c.Abort()
			return
		}

		c.Set("username", claims.Username)
		c.Set("admin", claims.Admin)
		c.Next()
	}
}

func getInstitutions(c *gin.Context) {
	institutions, err := readInstitutions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurumlar okunamadı"})
		return
	}
	c.JSON(http.StatusOK, institutions)
}

func createInstitution(c *gin.Context) {
	var newInstitution Institution
	if err := c.ShouldBindJSON(&newInstitution); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Geçersiz veri"})
		return
	}

	institutions, err := readInstitutions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurumlar okunamadı"})
		return
	}

	newInstitution.ID = uint(len(institutions) + 1)
	institutions = append(institutions, newInstitution)

	if err := writeInstitutions(institutions); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurum kaydedilemedi"})
		return
	}

	c.JSON(http.StatusCreated, newInstitution)
}

func updateInstitution(c *gin.Context) {
	id := c.Param("id")
	targetID, _ := strconv.Atoi(id)

	var updatedInstitution Institution
	if err := c.ShouldBindJSON(&updatedInstitution); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Geçersiz veri"})
		return
	}

	institutions, err := readInstitutions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurumlar okunamadı"})
		return
	}

	for i := range institutions {
		if institutions[i].ID == uint(targetID) {
			institutions[i] = updatedInstitution
			break
		}
	}

	if err := writeInstitutions(institutions); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurum güncellenemedi"})
		return
	}

	c.JSON(http.StatusOK, updatedInstitution)
}

func deleteInstitution(c *gin.Context) {
	id := c.Param("id")
	targetID, _ := strconv.Atoi(id)

	institutions, err := readInstitutions()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurumlar okunamadı"})
		return
	}

	newInstitutions := make([]Institution, 0)
	for _, inst := range institutions {
		if inst.ID != uint(targetID) {
			newInstitutions = append(newInstitutions, inst)
		}
	}

	if err := writeInstitutions(newInstitutions); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Kurum silinemedi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Kurum silindi"})
}

func loginHandler(c *gin.Context) {
	var credentials struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&credentials); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz giriş bilgileri"})
		return
	}

	var user User
	if err := db.Where("username = ?", credentials.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "geçersiz kullanıcı adı veya şifre"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(credentials.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "geçersiz kullanıcı adı veya şifre"})
		return
	}

	if !user.IsAdmin {
		c.JSON(http.StatusForbidden, gin.H{"error": "yeterli yetki yok"})
		return
	}

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		Username: user.Username,
		Admin:    user.IsAdmin,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "token oluşturma hatası"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token":    tokenString,
		"username": user.Username,
		"admin":    user.IsAdmin,
	})
}

// BAŞVURU HANDLER
func submitTeamApplication(c *gin.Context) {
	var application TeamApplication
	if err := c.ShouldBindJSON(&application); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz form verileri"})
		return
	}

	application.Status = "pending"
	if err := db.Create(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru kaydedilemedi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Ekibe katılım başvurunuz alındı",
		"id":      application.ID,
	})
}

func submitPartnershipApplication(c *gin.Context) {
	var application PartnershipApplication
	if err := c.ShouldBindJSON(&application); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz form verileri"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(application.Sifre), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "şifre işleme hatası"})
		return
	}

	application.HashPassword = string(hashedPassword)
	application.Sifre = ""
	application.Status = "pending"

	if err := db.Create(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru kaydedilemedi"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "İşbirliği başvurunuz alındı",
		"id":      application.ID,
	})
}

func getTeamApplications(c *gin.Context) {
	var applications []TeamApplication
	status := c.DefaultQuery("status", "pending")
	query := db.Order("created_at desc")

	if status != "all" {
		query = query.Where("status = ?", status)
	}

	if err := query.Find(&applications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvurular alınamadı"})
		return
	}

	c.JSON(http.StatusOK, applications)
}

func getPartnershipApplications(c *gin.Context) {
	var applications []PartnershipApplication
	status := c.DefaultQuery("status", "pending")
	query := db.Order("created_at desc")

	if status != "all" {
		query = query.Where("status = ?", status)
	}

	if err := query.Find(&applications).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvurular alınamadı"})
		return
	}

	for i := range applications {
		applications[i].HashPassword = ""
	}

	c.JSON(http.StatusOK, applications)
}

func updateTeamApplication(c *gin.Context) {
	id := c.Param("id")
	var application TeamApplication

	if err := db.First(&application, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "başvuru bulunamadı"})
		return
	}

	var updateData struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz durum değeri"})
		return
	}

	application.Status = updateData.Status
	if err := db.Save(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru güncellenemedi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Başvuru durumu güncellendi",
		"status":  application.Status,
	})
}

func updatePartnershipApplication(c *gin.Context) {
	id := c.Param("id")
	var application PartnershipApplication

	if err := db.First(&application, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "başvuru bulunamadı"})
		return
	}

	var updateData struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&updateData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz durum değeri"})
		return
	}

	application.Status = updateData.Status
	if err := db.Save(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru güncellenemedi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Başvuru durumu güncellendi",
		"status":  application.Status,
	})
}

func deleteTeamApplication(c *gin.Context) {
	id := c.Param("id")
	var application TeamApplication

	if err := db.First(&application, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "başvuru bulunamadı"})
		return
	}

	if err := db.Delete(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru silinemedi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Başvuru silindi"})
}

func deletePartnershipApplication(c *gin.Context) {
	id := c.Param("id")
	var application PartnershipApplication

	if err := db.First(&application, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "başvuru bulunamadı"})
		return
	}

	if err := db.Delete(&application).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "başvuru silinemedi"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Başvuru silindi"})
}
