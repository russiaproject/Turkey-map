import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApplication } from "./ApplicationService";

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthDate: "",
    school: "",
    department: "",
    graduationYear: "",
    category: "",
    programmingLanguages: [],
    newProgrammingLanguage: "",
    languages: [],
    newLanguage: "",
    githubProfile: "",
    isScholar: "Hayır",
    scholarYear: "",
    designTools: "",
    translationExperience: "",
    customerServiceExperience: "",
    kvkkConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        languages: [...formData.languages, value],
      });
    } else {
      setFormData({
        ...formData,
        languages: formData.languages.filter((lang) => lang !== value),
      });
    }
  };
  
  const addProgrammingLanguage = () => {
    if (formData.newProgrammingLanguage.trim() !== "") {
      setFormData({
        ...formData,
        programmingLanguages: [...formData.programmingLanguages, formData.newProgrammingLanguage.trim()],
        newProgrammingLanguage: ""
      });
    }
  };
  
  const removeProgrammingLanguage = (language) => {
    setFormData({
      ...formData,
      programmingLanguages: formData.programmingLanguages.filter(lang => lang !== language)
    });
  };
  
  const addLanguage = () => {
    if (formData.newLanguage.trim() !== "" && !formData.languages.includes(formData.newLanguage.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, formData.newLanguage.trim()],
        newLanguage: ""
      });
    }
  };
  
  const removeLanguage = (language) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(lang => lang !== language)
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Ad Soyad gerekli";
    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresi gerekli";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }
    if (!formData.phone.trim()) newErrors.phone = "Telefon numarası gerekli";
    if (!formData.birthDate.trim()) newErrors.birthDate = "Doğum tarihi gerekli";
    if (!formData.school.trim()) newErrors.school = "Okul bilgisi gerekli";
    if (!formData.department.trim()) newErrors.department = "Bölüm bilgisi gerekli";
    if (!formData.graduationYear.trim()) newErrors.graduationYear = "Mezuniyet yılı gerekli";
    if (!formData.category) newErrors.category = "Kategori seçimi gerekli";
    
    if (formData.category === "Yazılım") {
      if (!formData.githubProfile.trim()) {
        newErrors.githubProfile = "GitHub profil bağlantısı gerekli";
      }
      if (formData.programmingLanguages.length === 0) {
        newErrors.programmingLanguages = "En az bir programlama dili ekleyin";
      }
    }
    
    if (formData.category === "Çevirmen" && formData.languages.length === 0) {
      newErrors.languages = "En az bir dil seçimi gerekli";
    }
    
    if (formData.category === "Tasarımcı" && !formData.designTools.trim()) {
      newErrors.designTools = "Tasarım araçları bilgisi gerekli";
    }
    
    if (formData.category === "Canlı Destek" && !formData.customerServiceExperience.trim()) {
      newErrors.customerServiceExperience = "Müşteri hizmetleri deneyimi gerekli";
    }
    
    if (!formData.kvkkConsent) {
      newErrors.kvkkConsent = "KVKK onayı gerekli";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      createApplication(formData);
      
      console.log("Form submitted:", formData);
      
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCategoryFields = () => {
    switch (formData.category) {
      case "Yazılım":
        return (
          <div className="mt-4">
            <h4 className="mb-3">Teknik Yetenekler</h4>
            
            <div className="mb-3">
              <label className="form-label">Bildiğiniz Programlama Dilleri</label>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Örn: JavaScript, Python, C#"
                  value={formData.newProgrammingLanguage}
                  onChange={(e) => setFormData({...formData, newProgrammingLanguage: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addProgrammingLanguage())}
                />
                <button 
                  className="btn btn-primary" 
                  type="button"
                  onClick={addProgrammingLanguage}
                >
                  Ekle
                </button>
              </div>
              
              {formData.programmingLanguages.length > 0 && (
                <div className="d-flex flex-wrap mt-2 mb-3">
                  {formData.programmingLanguages.map((lang, index) => (
                    <div key={index} className="badge bg-primary me-2 mb-2 p-2">
                      {lang}
                      <button 
                        type="button" 
                        className="btn-close btn-close-white ms-2" 
                        style={{ fontSize: '0.65rem' }}
                        onClick={() => removeProgrammingLanguage(lang)}
                        aria-label="Kaldır"
                      ></button>
                    </div>
                  ))}
                </div>
              )}
              
              {errors.programmingLanguages && (
                <div className="text-danger small mt-1">{errors.programmingLanguages}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">GitHub Profil Linki</label>
              <input
                type="text"
                className={`form-control ${errors.githubProfile ? "is-invalid" : ""}`}
                name="githubProfile"
                value={formData.githubProfile}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
              {errors.githubProfile && (
                <div className="invalid-feedback">{errors.githubProfile}</div>
              )}
            </div>
          </div>
        );
        
      case "Çevirmen":
        return (
          <div className="mt-4">
            <h4 className="mb-3">Dil Becerileri</h4>
            
            <div className="mb-3">
              <label className="form-label">Bildiğiniz Diller</label>
              <div className="mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="langRussian"
                    value="Rusça"
                    checked={formData.languages.includes("Rusça")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="langRussian">
                    Rusça
                  </label>
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="langTurkish"
                    value="Türkçe"
                    checked={formData.languages.includes("Türkçe")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="langTurkish">
                    Türkçe
                  </label>
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="langEnglish"
                    value="İngilizce"
                    checked={formData.languages.includes("İngilizce")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="langEnglish">
                    İngilizce
                  </label>
                </div>
              </div>
              
              <div className="mt-3">
                <label className="form-label">Diğer Diller</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Diğer bildiğiniz dilleri ekleyin"
                    value={formData.newLanguage}
                    onChange={(e) => setFormData({...formData, newLanguage: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <button 
                    className="btn btn-primary" 
                    type="button"
                    onClick={addLanguage}
                  >
                    Ekle
                  </button>
                </div>
                
                {formData.languages.length > 0 && (
                  <div className="d-flex flex-wrap mt-2 mb-3">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="badge bg-primary me-2 mb-2 p-2">
                        {lang}
                        <button 
                          type="button" 
                          className="btn-close btn-close-white ms-2" 
                          style={{ fontSize: '0.65rem' }}
                          onClick={() => removeLanguage(lang)}
                          aria-label="Kaldır"
                        ></button>
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.languages && (
                  <div className="text-danger small mt-1">{errors.languages}</div>
                )}
              </div>
            </div>
            
            <div className="mb-3">
              <label className="form-label">Çeviri Deneyiminiz</label>
              <textarea
                className="form-control"
                name="translationExperience"
                value={formData.translationExperience}
                onChange={handleInputChange}
                rows="3"
                placeholder="Daha önce yaptığınız çeviri çalışmaları ve deneyimleriniz hakkında bilgi veriniz"
              ></textarea>
            </div>
          </div>
        );
        
      case "Tasarımcı":
        return (
          <div className="mt-4">
            <h4 className="mb-3">Tasarım Becerileri</h4>
            
            <div className="mb-3">
              <label className="form-label">Kullandığınız Tasarım Araçları</label>
              <input
                type="text"
                className={`form-control ${errors.designTools ? "is-invalid" : ""}`}
                name="designTools"
                value={formData.designTools}
                onChange={handleInputChange}
                placeholder="Örn: Adobe Photoshop, Illustrator, Figma, Sketch"
              />
              {errors.designTools && (
                <div className="invalid-feedback">{errors.designTools}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Portfolyo Linki (varsa)</label>
              <input
                type="text"
                className="form-control"
                name="portfolioLink"
                value={formData.portfolioLink}
                onChange={handleInputChange}
                placeholder="https://myportfolio.com"
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Tasarım Deneyiminiz</label>
              <textarea
                className="form-control"
                name="designExperience"
                value={formData.designExperience}
                onChange={handleInputChange}
                rows="3"
                placeholder="Daha önce yaptığınız tasarım çalışmaları ve deneyimleriniz hakkında bilgi veriniz"
              ></textarea>
            </div>
          </div>
        );
        
      case "Canlı Destek":
        return (
          <div className="mt-4">
            <h4 className="mb-3">Müşteri Hizmetleri Deneyimi</h4>
            
            <div className="mb-3">
              <label className="form-label">Müşteri Hizmetleri Deneyiminiz</label>
              <textarea
                className={`form-control ${errors.customerServiceExperience ? "is-invalid" : ""}`}
                name="customerServiceExperience"
                value={formData.customerServiceExperience}
                onChange={handleInputChange}
                rows="3"
                placeholder="Daha önce müşteri hizmetleri alanında çalıştıysanız deneyimlerinizi paylaşınız"
              ></textarea>
              {errors.customerServiceExperience && (
                <div className="invalid-feedback">{errors.customerServiceExperience}</div>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Bildiğiniz Diller</label>
              <div className="mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="csLangRussian"
                    value="Rusça"
                    checked={formData.languages.includes("Rusça")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="csLangRussian">
                    Rusça
                  </label>
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="csLangTurkish"
                    value="Türkçe"
                    checked={formData.languages.includes("Türkçe")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="csLangTurkish">
                    Türkçe
                  </label>
                </div>
                
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="csLangEnglish"
                    value="İngilizce"
                    checked={formData.languages.includes("İngilizce")}
                    onChange={handleLanguageChange}
                  />
                  <label className="form-check-label" htmlFor="csLangEnglish">
                    İngilizce
                  </label>
                </div>
              </div>
              
              <div className="mt-3">
                <label className="form-label">Diğer Diller</label>
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Diğer bildiğiniz dilleri ekleyin"
                    value={formData.newLanguage}
                    onChange={(e) => setFormData({...formData, newLanguage: e.target.value})}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  />
                  <button 
                    className="btn btn-primary" 
                    type="button"
                    onClick={addLanguage}
                  >
                    Ekle
                  </button>
                </div>
                
                {formData.languages.length > 0 && (
                  <div className="d-flex flex-wrap mt-2 mb-3">
                    {formData.languages.map((lang, index) => (
                      <div key={index} className="badge bg-primary me-2 mb-2 p-2">
                        {lang}
                        <button 
                          type="button" 
                          className="btn-close btn-close-white ms-2" 
                          style={{ fontSize: '0.65rem' }}
                          onClick={() => removeLanguage(lang)}
                          aria-label="Kaldır"
                        ></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-5 text-center">
                <i className="fa-solid fa-circle-check text-success mb-4" style={{ fontSize: "4rem" }}></i>
                <h2 className="mb-4">Başvurunuz Alındı!</h2>
                <p className="lead mb-4">
                  Başvurunuz başarıyla kaydedildi. Değerlendirme sürecimiz tamamlandığında sizinle iletişime geçeceğiz.
                </p>
                <button 
                  className="btn btn-primary px-4 py-2" 
                  onClick={() => navigate("/credit")}
                >
                  Ekip Sayfasına Dön
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
              <h2 className="mb-0 text-center">Geliştirme Ekibi Başvuru Formu</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <h4 className="mb-3">Kategori Seçimi</h4>
                  <div className="mb-3">
                    <label className="form-label">Başvurmak İstediğiniz Pozisyon</label>
                    <select
                      className={`form-select ${errors.category ? "is-invalid" : ""}`}
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Yazılım">Yazılım</option>
                      <option value="Çevirmen">Çevirmen</option>
                      <option value="Tasarımcı">Tasarımcı</option>
                      <option value="Canlı Destek">Canlı Destek</option>
                    </select>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-3">Kişisel Bilgiler</h4>
                  <div className="mb-3">
                    <label className="form-label">Ad Soyad</label>
                    <input
                      type="text"
                      className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    {errors.fullName && (
                      <div className="invalid-feedback">{errors.fullName}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">E-posta Adresi</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefon Numarası</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Doğum Tarihi</label>
                    <input
                      type="date"
                      className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                    />
                    {errors.birthDate && (
                      <div className="invalid-feedback">{errors.birthDate}</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="mb-3">Eğitim Bilgileri</h4>
                  <div className="mb-3">
                    <label className="form-label">Mezun Olduğunuz Okul</label>
                    <input
                      type="text"
                      className={`form-control ${errors.school ? "is-invalid" : ""}`}
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                    />
                    {errors.school && (
                      <div className="invalid-feedback">{errors.school}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Bölüm</label>
                    <input
                      type="text"
                      className={`form-control ${errors.department ? "is-invalid" : ""}`}
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                    />
                    {errors.department && (
                      <div className="invalid-feedback">{errors.department}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mezuniyet Yılı</label>
                    <input
                      type="text"
                      className={`form-control ${errors.graduationYear ? "is-invalid" : ""}`}
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                    />
                    {errors.graduationYear && (
                      <div className="invalid-feedback">{errors.graduationYear}</div>
                    )}
                  </div>
                </div>

                {renderCategoryFields()}

                <div className="mb-4">
                  <h4 className="mb-3">Bursiyer Durumu</h4>
                  <div className="mb-3">
                    <label className="form-label">Rus Evi Bursiyeri misiniz?</label>
                    <select
                      className="form-select"
                      name="isScholar"
                      value={formData.isScholar}
                      onChange={handleInputChange}
                    >
                      <option value="Hayır">Hayır</option>
                      <option value="Evet">Evet</option>
                    </select>
                  </div>
                  
                  {formData.isScholar === "Evet" && (
                    <div className="mb-3">
                      <label className="form-label">Hangi Yıl</label>
                      <input
                        type="text"
                        className="form-control"
                        name="scholarYear"
                        value={formData.scholarYear}
                        onChange={handleInputChange}
                        placeholder="Örn: 2023-2024"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className={`form-check-input ${errors.kvkkConsent ? "is-invalid" : ""}`}
                      type="checkbox"
                      id="kvkkCheck"
                      name="kvkkConsent"
                      checked={formData.kvkkConsent}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="kvkkCheck">
                      Kişisel verilerimin KVKK kapsamında işlenmesine onay veriyorum.
                    </label>
                    {errors.kvkkConsent && (
                      <div className="invalid-feedback">{errors.kvkkConsent}</div>
                    )}
                  </div>
                </div>

                {errors.submit && (
                  <div className="alert alert-danger mb-4">{errors.submit}</div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary py-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Gönderiliyor...
                      </>
                    ) : (
                      "Başvuruyu Gönder"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;