import React, { useState } from "react";
import { Link } from "react-router-dom";

const RusIziEkle = () => {
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    telefon: "",
    plaka: "",
    name: "",
    description: "",
    type: "",
    website: "",
    address: "",
    dosyalar: []
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  // Validasyon state'leri
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Rus İzi kategorileri
  const rusIziKategorileri = [
    "Mimari ve Tarihi Yapılar",
    "Kültürel ve Ticari İzler", 
    "Dini ve Mezhepsel İzler",
    "Eğitim ve Akademik İzler",
    "Tarihi Olaylar ve Diplomatik İzler",
    "Göç ve Yerleşim",
    "Kullanıcı Katkısı",
    "Diğer"
  ];

  // Validasyon kuralları
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'isim':
        if (!value.trim()) {
          error = 'İsim zorunludur';
        } else if (value.trim().length < 2) {
          error = 'İsim en az 2 karakter olmalıdır';
        } else if (value.trim().length > 50) {
          error = 'İsim en fazla 50 karakter olmalıdır';
        }
        break;
        
      case 'soyisim':
        if (!value.trim()) {
          error = 'Soyisim zorunludur';
        } else if (value.trim().length < 2) {
          error = 'Soyisim en az 2 karakter olmalıdır';
        } else if (value.trim().length > 50) {
          error = 'Soyisim en fazla 50 karakter olmalıdır';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'E-mail zorunludur';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value.trim())) {
            error = 'Geçerli bir e-mail adresi giriniz';
          }
        }
        break;
        
      case 'telefon':
        if (!value.trim()) {
          error = 'Telefon numarası zorunludur';
        } else {
          const phoneRegex = /^[0-9\s\-\+\(\)]{10,15}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            error = 'Geçerli bir telefon numarası giriniz (10-15 rakam)';
          }
        }
        break;
        
      case 'plaka':
        if (!value.trim()) {
          error = 'Plaka kodu zorunludur';
        } else {
          // TR06, 06, 34 gibi formatları kabul et
          const plakaRegex = /^(TR)?[0-9]{1,2}$/i;
          if (!plakaRegex.test(value.trim())) {
            error = 'Geçerli bir plaka kodu giriniz (TR06, 06, 34 formatlarında)';
          }
        }
        break;
        
      case 'name':
        if (!value.trim()) {
          error = 'Rus İzi adı zorunludur';
        } else if (value.trim().length < 3) {
          error = 'Rus İzi adı en az 3 karakter olmalıdır';
        } else if (value.trim().length > 200) {
          error = 'Rus İzi adı en fazla 200 karakter olmalıdır';
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          error = 'Açıklama zorunludur';
        } else if (value.trim().length < 10) {
          error = 'Açıklama en az 10 karakter olmalıdır';
        } else if (value.trim().length > 2000) {
          error = 'Açıklama en fazla 2000 karakter olmalıdır';
        }
        break;
        
      case 'type':
        if (!value.trim()) {
          error = 'Kategori seçimi zorunludur';
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          error = 'Adres zorunludur';
        } else if (value.trim().length < 5) {
          error = 'Adres en az 5 karakter olmalıdır';
        } else if (value.trim().length > 200) {
          error = 'Adres en fazla 200 karakter olmalıdır';
        }
        break;
        
      case 'website':
        if (value.trim() && value.trim().length > 0) {
          const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          if (!urlRegex.test(value.trim())) {
            error = 'Geçerli bir web sitesi adresi giriniz';
          }
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  // Tüm form geçerli mi kontrol et
  const isFormValid = () => {
    const requiredFields = ['isim', 'soyisim', 'email', 'telefon', 'plaka', 'name', 'description', 'type', 'address'];
    
    // Tüm zorunlu alanlar dolu mu?
    const allFieldsFilled = requiredFields.every(field => formData[field].trim());
    
    // Hiç validasyon hatası var mı?
    const noErrors = Object.keys(fieldErrors).length === 0 || 
                     Object.values(fieldErrors).every(error => !error);
    
    return allFieldsFilled && noErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Plaka kodunu normalize et
    let normalizedValue = value;
    if (name === 'plaka') {
      normalizedValue = value.toUpperCase();
      // Sadece TR ve rakam kabul et
      normalizedValue = normalizedValue.replace(/[^TR0-9]/g, '');
    }
    
    // Form data'yı güncelle
    setFormData(prev => ({
      ...prev,
      [name]: normalizedValue
    }));
    
    // Alan dokunuldu olarak işaretle
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validasyon yap
    const error = validateField(name, normalizedValue);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Alan dokunuldu olarak işaretle
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validasyon yap
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Dosya boyutu kontrolü
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = files.filter(file => file.size > maxSize);
    
    if (oversizedFiles.length > 0) {
      showMessage('Bazı dosyalar 5MB\'dan büyük. Lütfen daha küçük dosyalar seçin.', 'error');
      return;
    }

    const filePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            name: file.name,
            data: event.target.result,
            type: file.type,
            size: file.size
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(fileDataArray => {
      setFormData(prev => ({
        ...prev,
        dosyalar: [...prev.dosyalar, ...fileDataArray]
      }));
    });
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      dosyalar: prev.dosyalar.filter((_, i) => i !== index)
    }));
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Tüm alanları dokunuldu olarak işaretle
    const requiredFields = ['isim', 'soyisim', 'email', 'telefon', 'plaka', 'name', 'description', 'type', 'address'];
    const newTouched = {};
    const newErrors = {};
    
    requiredFields.forEach(field => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, formData[field]);
    });
    
    // Website opsiyonel ama dolu ise kontrol et
    if (formData.website.trim()) {
      newTouched.website = true;
      newErrors.website = validateField('website', formData.website);
    }
    
    setTouched(newTouched);
    setFieldErrors(newErrors);
    
    // Form geçerli değilse submit etme
    if (!isFormValid() || Object.values(newErrors).some(error => error)) {
      showMessage('Lütfen tüm alanları doğru şekilde doldurun', 'error');
      return;
    }

    setLoading(true);

    try {
      // Plaka kodunu normalize et (TR ön eki ekle)
      let normalizedPlaka = formData.plaka.toUpperCase();
      if (!normalizedPlaka.startsWith('TR')) {
        normalizedPlaka = `TR${normalizedPlaka.padStart(2, '0')}`;
      }
      
      const submitData = {
        // Kullanıcı bilgileri
        isim: formData.isim.trim(),
        soyisim: formData.soyisim.trim(),
        email: formData.email.trim().toLowerCase(),
        telefon: formData.telefon.trim(),
        
        // Rus İzi bilgileri
        plaka: normalizedPlaka,
        name: formData.name.trim(),
        description: formData.description.trim(),
        type: formData.type.trim(),
        website: formData.website.trim() || '',
        address: formData.address.trim(),
        dosyalar: formData.dosyalar || []
      };
      
      const url = 'http://localhost:8080/api/user-rusizi-application';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Başvuru gönderilemedi');
      }

      const data = await response.json();
      
      showMessage('✅ Rus izi bilginiz başarıyla gönderildi! İncelendikten sonra haritada yayınlanacaktır.', 'success');
      
      // Formu temizle - setTimeout ile state güncellemelerini sırala
      setTimeout(() => {
        setFormData({
          isim: "",
          soyisim: "",
          email: "",
          telefon: "",
          plaka: "",
          name: "",
          description: "",
          type: "",
          website: "",
          address: "",
          dosyalar: []
        });
        
        // Validasyon state'lerini temizle
        setFieldErrors({});
        setTouched({});

        // Dosya input'unu da temizle
        const fileInput = document.getElementById('dosyaForm');
        if (fileInput) {
          fileInput.value = '';
        }
      }, 100);

    } catch (error) {
      showMessage(`❌ Başvuru gönderilirken hata oluştu: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Hata durumunda input sınıfı
  const getInputClass = (fieldName) => {
    const baseClass = "form-control";
    if (touched[fieldName] && fieldErrors[fieldName]) {
      return `${baseClass} is-invalid`;
    } else if (touched[fieldName] && !fieldErrors[fieldName] && formData[fieldName].trim()) {
      return `${baseClass} is-valid`;
    }
    return baseClass;
  };

  return (
    <div className="container my-5 py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/rus-izleri" className="text-decoration-none">
              Rus İzleri
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Rus İzi Ekle
          </li>
        </ol>
      </nav>

      {/* Page Title */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-plus-circle text-primary me-3 fs-2"></i>
          <h2 className="fw-bold text-primary m-0">Rus İzi Ekle</h2>
        </div>
      </div>

      {/* Form */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h4 className="card-title fw-bold text-primary">
              <i className="fa-solid fa-map-marker-alt me-2"></i>
              Yeni Rus İzi Bilgisi Ekle
            </h4>
            <p className="text-muted">
              Türkiye'de keşfettiğiniz Rus izlerini bizimle paylaşın! Başvurunuz incelendikten sonra haritada yayınlanacaktır.
            </p>
          </div>

          {/* Mesaj Bildirimi */}
          {message && (
            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
              {message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Kişisel Bilgiler Başlığı */}
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="text-primary border-bottom pb-2">
                  <i className="fa-solid fa-user me-2"></i>
                  Kişisel Bilgileriniz
                </h5>
              </div>
            </div>
            
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label htmlFor="isimForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-user me-1"></i> İsminiz *
                </label>
                <input
                  type="text"
                  className={getInputClass('isim')}
                  id="isimForm"
                  name="isim"
                  value={formData.isim}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="İsminizi giriniz"
                  required
                />
                {touched.isim && fieldErrors.isim && (
                  <div className="invalid-feedback">
                    {fieldErrors.isim}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="soyisimForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-user me-1"></i> Soyisminiz *
                </label>
                <input
                  type="text"
                  className={getInputClass('soyisim')}
                  id="soyisimForm"
                  name="soyisim"
                  value={formData.soyisim}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Soyisminizi giriniz"
                  required
                />
                {touched.soyisim && fieldErrors.soyisim && (
                  <div className="invalid-feedback">
                    {fieldErrors.soyisim}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="emailForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-envelope me-1"></i> E-mail Adresiniz *
                </label>
                <input
                  type="email"
                  className={getInputClass('email')}
                  id="emailForm"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="ornek@mail.com"
                  required
                />
                {touched.email && fieldErrors.email && (
                  <div className="invalid-feedback">
                    {fieldErrors.email}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="telefonForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-phone me-1"></i> Telefon Numaranız *
                </label>
                <input
                  type="tel"
                  className={getInputClass('telefon')}
                  id="telefonForm"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="5XX XXX XX XX"
                  required
                />
                {touched.telefon && fieldErrors.telefon && (
                  <div className="invalid-feedback">
                    {fieldErrors.telefon}
                  </div>
                )}
              </div>
            </div>

            {/* Rus İzi Bilgileri Başlığı */}
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="text-primary border-bottom pb-2">
                  <i className="fa-solid fa-landmark me-2"></i>
                  Rus İzi Bilgileri
                </h5>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="plakaForm" className="form-label fw-semibold">
                  🗺️ Plaka Kodu *
                </label>
                <input
                  type="text"
                  className={getInputClass('plaka')}
                  id="plakaForm"
                  name="plaka"
                  value={formData.plaka}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Örn: TR06, 06, 34"
                  maxLength="4"
                  required
                />
                <div className="form-text">
                  TR06, 06, 34 formatlarında yazabilirsiniz
                </div>
                {touched.plaka && fieldErrors.plaka && (
                  <div className="invalid-feedback">
                    {fieldErrors.plaka}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="nameForm" className="form-label fw-semibold">
                  🏛️ Rus İzi Adı *
                </label>
                <input
                  type="text"
                  className={getInputClass('name')}
                  id="nameForm"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Örn: Kars Fethiye Camii"
                  required
                />
                {touched.name && fieldErrors.name && (
                  <div className="invalid-feedback">
                    {fieldErrors.name}
                  </div>
                )}
              </div>
              
              <div className="col-12">
                <label htmlFor="descriptionForm" className="form-label fw-semibold">
                  📝 Açıklama *
                </label>
                <textarea
                  className={getInputClass('description')}
                  id="descriptionForm"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Rus izi hakkında detaylı açıklama yazın... Tarihi, mimarisi, hikayesi vb."
                  rows="4"
                  style={{ resize: 'vertical' }}
                  required
                />
                <div className="form-text">
                  <small>
                    En az 10 karakter yazmanız gerekmektedir. 
                    {formData.description.length > 0 && (
                      <span className={formData.description.length >= 10 ? 'text-success' : 'text-warning'}>
                        {' '}({formData.description.length}/2000 karakter)
                      </span>
                    )}
                  </small>
                </div>
                {touched.description && fieldErrors.description && (
                  <div className="invalid-feedback">
                    {fieldErrors.description}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="typeForm" className="form-label fw-semibold">
                  🏷️ Tür *
                </label>
                <select
                  className={getInputClass('type')}
                  id="typeForm"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                >
                  <option value="">Kategori Seçiniz</option>
                  {rusIziKategorileri.map(kategori => (
                    <option key={kategori} value={kategori}>{kategori}</option>
                  ))}
                </select>
                {touched.type && fieldErrors.type && (
                  <div className="invalid-feedback">
                    {fieldErrors.type}
                  </div>
                )}
              </div>
              
              <div className="col-md-6">
                <label htmlFor="websiteForm" className="form-label fw-semibold">
                  🌐 Web Sitesi
                </label>
                <input
                  type="url"
                  className={getInputClass('website')}
                  id="websiteForm"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="https://example.com (opsiyonel)"
                />
                {touched.website && fieldErrors.website && (
                  <div className="invalid-feedback">
                    {fieldErrors.website}
                  </div>
                )}
              </div>
              
              <div className="col-12">
                <label htmlFor="addressForm" className="form-label fw-semibold">
                  📍 Adres *
                </label>
                <input
                  type="text"
                  className={getInputClass('address')}
                  id="addressForm"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Örn: Fethiye, Kars"
                  required
                />
                {touched.address && fieldErrors.address && (
                  <div className="invalid-feedback">
                    {fieldErrors.address}
                  </div>
                )}
              </div>

              <div className="col-12">
                <label htmlFor="dosyaForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-camera me-1"></i> Fotoğraflar (Opsiyonel)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="dosyaForm"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="form-text">
                  Birden fazla fotoğraf seçebilirsiniz (JPG, PNG, WEBP - Maksimum 5MB/dosya)
                </div>
              </div>

              {/* Seçilen Dosyalar */}
              {formData.dosyalar.length > 0 && (
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    <i className="fa-solid fa-images me-1"></i> Seçilen Fotoğraflar:
                  </label>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {formData.dosyalar.map((dosya, index) => (
                      <div key={index} className="position-relative">
                        <img 
                          src={dosya.data} 
                          alt={dosya.name}
                          className="rounded border"
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            objectFit: 'cover'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{
                            transform: 'translate(50%, -50%)',
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            padding: '0',
                            fontSize: '12px'
                          }}
                        >
                          ×
                        </button>
                        <div className="text-center mt-1">
                          <small className="text-muted">{formatFileSize(dosya.size)}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="col-12 text-center mt-4">
                <button 
                  type="submit" 
                  className={`btn btn-lg px-5 ${isFormValid() ? 'btn-primary' : 'btn-secondary'}`}
                  disabled={loading || !isFormValid()}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane me-2"></i>
                      {isFormValid() ? 'Rus İzi Bilgisini Paylaş!' : 'Lütfen Tüm Alanları Doldurun'}
                    </>
                  )}
                </button>
                {!isFormValid() && (
                  <div className="text-muted mt-2">
                    <small>
                      <i className="fa-solid fa-info-circle me-1"></i>
                      Formu göndermek için tüm zorunlu alanları doğru şekilde doldurmanız gerekmektedir.
                    </small>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RusIziEkle;
