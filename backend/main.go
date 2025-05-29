package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
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
	Plaka       string `json:"plaka"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Type        string `json:"type"`
	Address     string `json:"address"`
	Website     string `json:"website"`
	Image       string `json:"image"`
}

type InstitutionsMap map[string][]Institution

type FlatInstitution struct {
	ID          uint      `json:"ID"`
	Plaka       string    `json:"plaka"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Type        string    `json:"type"`
	Address     string    `json:"address"`
	Website     string    `json:"website"`
	Image       string    `json:"image"`
	CreatedAt   time.Time `json:"CreatedAt"`
}

type Claims struct {
	Username string `json:"username"`
	Admin    bool   `json:"admin"`
	jwt.RegisteredClaims
}

// Global
var db *gorm.DB
var jwtKey []byte

const jsonFilePath = "../frontend/src/data/russian_institutions.json"

func init() {
	godotenv.Load()
	jwtKey = []byte(getEnv("JWT_SECRET", "rusevi_super_secret_key_change_in_production"))

	var err error
	db, err = gorm.Open(sqlite.Open("rusevi.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Database connection failed:", err)
	}

	db.AutoMigrate(&User{}, &TeamApplication{}, &PartnershipApplication{})
	createAdminIfNotExists()
	ensureJSONFileExists()
}

func main() {
	r := gin.Default()
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

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
		public.GET("/institutions", getInstitutionsFromJSON)
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

		admin.GET("/institutions", getInstitutionsFromJSON)
		admin.POST("/institution", addInstitutionToJSON)
		admin.PUT("/institution/:id", updateInstitutionInJSON)
		admin.DELETE("/institution/:id", deleteInstitutionFromJSON)
		admin.GET("/institutions/search", searchInstitutionsInJSON)
		admin.POST("/institutions/reset", resetInstitutionsJSON)
	}

	port := getEnv("PORT", "8080")
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📁 JSON file path: %s", jsonFilePath)
	r.Run(":" + port)
}

func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func createAdminIfNotExists() {
	var count int64
	db.Model(&User{}).Where("is_admin = ?", true).Count(&count)
	if count == 0 {
		adminUsername := getEnv("ADMIN_USERNAME", "admin")
		adminPassword := getEnv("ADMIN_PASSWORD", "ruseviAdmin2025")

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
		log.Printf("Admin kullanıcı oluşturuldu: %s", adminUsername)
	}
}

func ensureJSONFileExists() {
	log.Printf("🔍 JSON dosyası kontrol ediliyor: %s", jsonFilePath)

	dir := filepath.Dir(jsonFilePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		log.Printf("JSON dosyası dizini oluşturulamadı: %v", err)
		return
	}

	if _, err := os.Stat(jsonFilePath); err == nil {
		log.Printf("📁 JSON dosyası mevcut, içeriği kontrol ediliyor...")
		_, readErr := readInstitutionsMap()
		if readErr == nil {
			log.Printf("✅ Mevcut JSON dosyası geçerli")
			return
		}
		log.Printf("⚠️ JSON dosyası bozuk: %v", readErr)
		log.Printf("🔧 JSON dosyası düzeltiliyor...")
	} else {
		log.Printf("📁 JSON dosyası bulunamadı, yeni oluşturuluyor...")
	}

	log.Printf("📝 Boş JSON map'i oluşturuluyor...")
	emptyMap := make(InstitutionsMap)

	if err := writeInstitutionsMap(emptyMap); err != nil {
		log.Printf("❌ JSON dosyası oluşturulamadı: %v", err)
	} else {
		log.Printf("✅ Boş JSON dosyası oluşturuldu: %s", jsonFilePath)
	}
}

func readInstitutionsMap() (InstitutionsMap, error) {
	log.Printf("📖 JSON dosyası okunuyor: %s", jsonFilePath)

	data, err := ioutil.ReadFile(jsonFilePath)
	if err != nil {
		log.Printf("❌ Dosya okuma hatası: %v", err)
		return nil, fmt.Errorf("JSON dosyası okunamadı: %v", err)
	}

	log.Printf("📄 JSON dosya boyutu: %d bytes", len(data))

	preview := string(data)
	if len(preview) > 500 {
		preview = preview[:500] + "..."
	}
	log.Printf("📄 JSON içeriği önizleme: %s", preview)

	var institutionsMap InstitutionsMap
	if err := json.Unmarshal(data, &institutionsMap); err != nil {
		log.Printf("❌ JSON parse hatası: %v", err)
		return nil, fmt.Errorf("JSON parse hatası: %v", err)
	}

	log.Printf("✅ Mevcut format başarıyla okundu, %d plaka grubu var", len(institutionsMap))

	totalInstitutions := 0
	for plaka, kurumList := range institutionsMap {
		log.Printf("📋 %s: %d kurum", plaka, len(kurumList))
		totalInstitutions += len(kurumList)
	}
	log.Printf("📊 Toplam kurum sayısı: %d", totalInstitutions)

	return institutionsMap, nil
}

func writeInstitutionsMap(institutionsMap InstitutionsMap) error {
	log.Printf("💾 JSON dosyasına yazılıyor: %s", jsonFilePath)

	data, err := json.MarshalIndent(institutionsMap, "", "  ")
	if err != nil {
		log.Printf("❌ JSON oluşturma hatası: %v", err)
		return fmt.Errorf("JSON oluşturma hatası: %v", err)
	}

	if err := ioutil.WriteFile(jsonFilePath, data, 0644); err != nil {
		log.Printf("❌ Dosya yazma hatası: %v", err)
		return fmt.Errorf("JSON dosyası yazılamadı: %v", err)
	}

	log.Printf("✅ JSON dosyası başarıyla yazıldı (mevcut format korundu)")
	return nil
}

func mapToFlatList(institutionsMap InstitutionsMap) []FlatInstitution {
	var institutions []FlatInstitution
	currentID := uint(1)

	var plakaKeys []string
	for plaka := range institutionsMap {
		plakaKeys = append(plakaKeys, plaka)
	}

	for i := 0; i < len(plakaKeys); i++ {
		for j := i + 1; j < len(plakaKeys); j++ {
			if plakaKeys[i] > plakaKeys[j] {
				plakaKeys[i], plakaKeys[j] = plakaKeys[j], plakaKeys[i]
			}
		}
	}

	for _, plaka := range plakaKeys {
		kurumList := institutionsMap[plaka]
		for _, kurum := range kurumList {
			flatInst := FlatInstitution{
				ID:          currentID,
				Plaka:       plaka,
				Name:        kurum.Name,
				Description: kurum.Description,
				Type:        kurum.Type,
				Address:     kurum.Address,
				Website:     kurum.Website,
				Image:       kurum.Image,
				CreatedAt:   time.Now(),
			}
			institutions = append(institutions, flatInst)
			log.Printf("📋 ID %d -> %s: %s", currentID, plaka, kurum.Name)
			currentID++
		}
	}

	return institutions
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenString := c.GetHeader("Authorization")
		log.Printf("🔑 Auth middleware - Token var mı: %t", tokenString != "")

		if tokenString == "" {
			log.Printf("❌ Token yok")
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
			log.Printf("❌ Token geçersiz - Hata: %v, Valid: %t, Admin: %t", err, token != nil && token.Valid, claims.Admin)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "geçersiz token"})
			c.Abort()
			return
		}

		log.Printf("✅ Token geçerli - Kullanıcı: %s", claims.Username)
		c.Set("username", claims.Username)
		c.Set("admin", claims.Admin)
		c.Next()
	}
}

func getInstitutionsFromJSON(c *gin.Context) {
	log.Printf("📋 Kurumlar isteniyor...")

	institutionsMap, err := readInstitutionsMap()
	if err != nil {
		log.Printf("❌ JSON okuma hatası: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	institutions := mapToFlatList(institutionsMap)
	log.Printf("✅ %d kurum döndürülüyor", len(institutions))
	c.JSON(http.StatusOK, institutions)
}

func addInstitutionToJSON(c *gin.Context) {
	log.Printf("➕ Yeni kurum ekleme isteği geldi")

	var newInstitution Institution
	if err := c.ShouldBindJSON(&newInstitution); err != nil {
		log.Printf("❌ JSON parse hatası: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz veri"})
		return
	}

	log.Printf("📝 Kurum bilgileri: %+v", newInstitution)

	institutionsMap, err := readInstitutionsMap()
	if err != nil {
		log.Printf("❌ Mevcut kurumlar okunamadı: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	plaka := newInstitution.Plaka
	if plaka == "" {
		log.Printf("❌ Plaka boş!")
		c.JSON(http.StatusBadRequest, gin.H{"error": "Plaka gerekli"})
		return
	}

	institutionsMap[plaka] = append(institutionsMap[plaka], newInstitution)

	log.Printf("🆔 Kurum %s plaka grubuna eklendi", plaka)

	if err := writeInstitutionsMap(institutionsMap); err != nil {
		log.Printf("❌ JSON yazma hatası: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Printf("✅ Kurum başarıyla eklendi ve mevcut format korundu")
	c.JSON(http.StatusCreated, gin.H{
		"message": "Kurum JSON dosyasına eklendi (mevcut format korundu)",
		"plaka":   plaka,
		"data":    newInstitution,
	})
}

func updateInstitutionInJSON(c *gin.Context) {
	idStr := c.Param("id")
	log.Printf("✏️ Kurum güncelleme isteği: ID %s", idStr)

	var updatedInstitution FlatInstitution
	if err := c.ShouldBindJSON(&updatedInstitution); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz veri"})
		return
	}

	institutionsMap, err := readInstitutionsMap()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	targetID, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz ID"})
		return
	}

	found := false
	currentID := uint(1)

	var plakaKeys []string
	for plaka := range institutionsMap {
		plakaKeys = append(plakaKeys, plaka)
	}
	for i := 0; i < len(plakaKeys); i++ {
		for j := i + 1; j < len(plakaKeys); j++ {
			if plakaKeys[i] > plakaKeys[j] {
				plakaKeys[i], plakaKeys[j] = plakaKeys[j], plakaKeys[i]
			}
		}
	}

	for _, plaka := range plakaKeys {
		kurumList := institutionsMap[plaka]
		for i, kurum := range kurumList {
			if currentID == uint(targetID) {
				log.Printf("📍 Kurum bulundu: %s - %s (ID: %d)", plaka, kurum.Name, currentID)

				cleanInstitution := Institution{
					Plaka:       updatedInstitution.Plaka,
					Name:        updatedInstitution.Name,
					Description: updatedInstitution.Description,
					Type:        updatedInstitution.Type,
					Address:     updatedInstitution.Address,
					Website:     updatedInstitution.Website,
					Image:       updatedInstitution.Image,
				}

				if updatedInstitution.Plaka != plaka {
					log.Printf("📍 Plaka değişti: %s -> %s", plaka, updatedInstitution.Plaka)
					institutionsMap[plaka] = append(kurumList[:i], kurumList[i+1:]...)
					if len(institutionsMap[plaka]) == 0 {
						delete(institutionsMap, plaka)
					}
					institutionsMap[updatedInstitution.Plaka] = append(institutionsMap[updatedInstitution.Plaka], cleanInstitution)
				} else {
					log.Printf("📍 Aynı plakada güncelleniyor: %s", plaka)
					institutionsMap[plaka][i] = cleanInstitution
				}

				found = true
				break
			}
			currentID++
		}
		if found {
			break
		}
	}

	if !found {
		log.Printf("❌ Kurum bulunamadı: ID %d", targetID)
		c.JSON(http.StatusNotFound, gin.H{"error": "kurum bulunamadı"})
		return
	}

	if err := writeInstitutionsMap(institutionsMap); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Printf("✅ Kurum güncellendi")
	c.JSON(http.StatusOK, gin.H{
		"message": "Kurum başarıyla güncellendi",
		"data":    updatedInstitution,
	})
}

func deleteInstitutionFromJSON(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "geçersiz ID"})
		return
	}

	log.Printf("🗑️ Kurum silme isteği: ID %d", id)

	institutionsMap, err := readInstitutionsMap()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	found := false
	currentID := uint(1)
	var deletedInstitution Institution

	var plakaKeys []string
	for plaka := range institutionsMap {
		plakaKeys = append(plakaKeys, plaka)
	}
	for i := 0; i < len(plakaKeys); i++ {
		for j := i + 1; j < len(plakaKeys); j++ {
			if plakaKeys[i] > plakaKeys[j] {
				plakaKeys[i], plakaKeys[j] = plakaKeys[j], plakaKeys[i]
			}
		}
	}

	for _, plaka := range plakaKeys {
		kurumList := institutionsMap[plaka]
		for i, kurum := range kurumList {
			if currentID == uint(id) {
				log.Printf("📍 Silinecek kurum bulundu: %s - %s (ID: %d)", plaka, kurum.Name, currentID)
				deletedInstitution = kurum

				institutionsMap[plaka] = append(kurumList[:i], kurumList[i+1:]...)

				if len(institutionsMap[plaka]) == 0 {
					log.Printf("📍 Plaka grubu boş kaldı, siliniyor: %s", plaka)
					delete(institutionsMap, plaka)
				}

				found = true
				break
			}
			currentID++
		}
		if found {
			break
		}
	}

	if !found {
		log.Printf("❌ Silinecek kurum bulunamadı: ID %d", id)
		c.JSON(http.StatusNotFound, gin.H{"error": "kurum bulunamadı"})
		return
	}

	if err := writeInstitutionsMap(institutionsMap); err != nil {
		log.Printf("❌ JSON yazma hatası: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	log.Printf("✅ Kurum silindi: %s", deletedInstitution.Name)
	c.JSON(http.StatusOK, gin.H{
		"message": "Kurum başarıyla silindi",
		"id":      id,
		"deleted": deletedInstitution.Name,
	})
}

func searchInstitutionsInJSON(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "arama terimi gerekli"})
		return
	}

	institutionsMap, err := readInstitutionsMap()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var results []FlatInstitution
	searchTerm := strings.ToLower(query)
	currentID := uint(1)

	var plakaKeys []string
	for plaka := range institutionsMap {
		plakaKeys = append(plakaKeys, plaka)
	}
	for i := 0; i < len(plakaKeys); i++ {
		for j := i + 1; j < len(plakaKeys); j++ {
			if plakaKeys[i] > plakaKeys[j] {
				plakaKeys[i], plakaKeys[j] = plakaKeys[j], plakaKeys[i]
			}
		}
	}

	// Sıralı şekilde ara
	for _, plaka := range plakaKeys {
		kurumList := institutionsMap[plaka]
		for _, kurum := range kurumList {
			if strings.Contains(strings.ToLower(kurum.Name), searchTerm) ||
				strings.Contains(strings.ToLower(plaka), searchTerm) ||
				strings.Contains(strings.ToLower(kurum.Type), searchTerm) ||
				strings.Contains(strings.ToLower(kurum.Address), searchTerm) ||
				strings.Contains(strings.ToLower(kurum.Description), searchTerm) {

				result := FlatInstitution{
					ID:          currentID,
					Plaka:       plaka,
					Name:        kurum.Name,
					Description: kurum.Description,
					Type:        kurum.Type,
					Address:     kurum.Address,
					Website:     kurum.Website,
					Image:       kurum.Image,
					CreatedAt:   time.Now(),
				}
				results = append(results, result)
			}
			currentID++
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("'%s' için %d sonuç bulundu", query, len(results)),
		"query":   query,
		"results": results,
		"count":   len(results),
	})
}

func resetInstitutionsJSON(c *gin.Context) {
	log.Printf("🔄 JSON dosyası sıfırlanıyor...")

	emptyMap := make(InstitutionsMap)

	if err := writeInstitutionsMap(emptyMap); err != nil {
		log.Printf("❌ JSON sıfırlama hatası: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "JSON sıfırlama başarısız"})
		return
	}

	log.Printf("✅ JSON dosyası başarıyla sıfırlandı (mevcut format korundu)")
	c.JSON(http.StatusOK, gin.H{
		"message": "JSON dosyası sıfırlandı (mevcut format korundu)",
		"count":   0,
		"format":  "plakaya göre gruplandırılmış",
	})
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

	expirationTime := time.Now().Add(7 * 24 * time.Hour) // 7 gün
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
