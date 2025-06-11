import React, { useState } from "react";
import { Link } from "react-router-dom";

const RusIziEkle = () => {
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    telefon: "",
    aciklama: "",
    konum: "",
    dosyalar: []
  });

  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Dosya boyutu kontrolü (max 5MB per file)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} dosyası çok büyük. Maksimum 5MB olmalıdır.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const filePromises = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            name: file.name,
            data: event.target.result,
            type: file.type,
            size: file.size,
            id: Date.now() + Math.random() // Unique ID
          });
        };
        reader.onerror = () => {
          console.error(`Dosya okuma hatası: ${file.name}`);
          resolve(null);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then(fileDataArray => {
      const validFileData = fileDataArray.filter(file => file !== null);
      setFormData(prev => ({
        ...prev,
        dosyalar: [...prev.dosyalar, ...validFileData]
      }));
    });
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      dosyalar: prev.dosyalar.filter(file => file.id !== fileId)
    }));
  };

  const validateForm = () => {
    const { isim, soyisim, email, telefon, aciklama, konum } = formData;
    
    if (!isim.trim() || !soyisim.trim() || !email.trim() || !telefon.trim() || !aciklama.trim() || !konum.trim()) {
      setSubmitMessage('Lütfen tüm zorunlu alanları doldurun.');
      return false;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitMessage('Lütfen geçerli bir email adresi girin.');
      return false;
    }

    // Telefon formatı kontrolü (basit)
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(telefon)) {
      setSubmitMessage('Lütfen geçerli bir telefon numarası girin.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setTimeout(() => setSubmitMessage(''), 5000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const yeniGonderi = {
        id: Date.now(),
        ...formData,
        tarih: new Date().toLocaleDateString('tr-TR'),
        saat: new Date().toLocaleTimeString('tr-TR'),
        status: 'pending' // Demo için status eklendi
      };

      // Demo modu için session storage kullan (localStorage yerine)
      try {
        if (typeof sessionStorage !== 'undefined') {
          const mevcutGonderiler = JSON.parse(sessionStorage.getItem('rusIziGonderiler') || '[]');
          const guncelGonderiler = [yeniGonderi, ...mevcutGonderiler];
          sessionStorage.setItem('rusIziGonderiler', JSON.stringify(guncelGonderiler));
        }
      } catch (storageError) {
        console.log('Session storage not available, data will not persist');
      }

      // Formu temizle
      setFormData({
        isim: "",
        soyisim: "",
        email: "",
        telefon: "",
        aciklama: "",
        konum: "",
        dosyalar: []
      });

      // File input'u da temizle
      const fileInput = document.getElementById('dosyaForm');
      if (fileInput) {
        fileInput.value = '';
      }

      setSubmitMessage('✅ Rus izi bilginiz başarıyla eklendi! Moderasyon sonrası haritada görüntülenecektir.');
      
      // Başarı mesajını 7 saniye sonra temizle
      setTimeout(() => setSubmitMessage(''), 7000);
      
    } catch (error) {
      console.error('Gönderim hatası:', error);
      setSubmitMessage('❌ Bir hata oluştu. Lütfen tekrar deneyin.');
      setTimeout(() => setSubmitMessage(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

      {/* Success/Error Message */}
      {submitMessage && (
        <div className={`alert ${submitMessage.includes('✅') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
          {submitMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSubmitMessage('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Form */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <h4 className="card-title fw-bold text-primary">
              <i className="fa-solid fa-map-marker-alt me-2"></i>
              Yeni Rus İzi Bilgisi Ekle
            </h4>
            <p className="text-muted">
              Türkiye'de keşfettiğiniz Rus izlerini bizimle paylaşın!
            </p>
            <div className="alert alert-info d-inline-block">
              <small>
                <i className="fa-solid fa-info-circle me-1"></i>
                <strong>Demo Modu:</strong> Gönderilen veriler geçici olarak saklanır ve sayfa yenilendiğinde silinir.
              </small>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="isimForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-user me-1"></i> İsminiz *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="isimForm"
                  name="isim"
                  value={formData.isim}
                  onChange={handleInputChange}
                  placeholder="İsminizi giriniz"
                  maxLength="50"
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="soyisimForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-user me-1"></i> Soyisminiz *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="soyisimForm"
                  name="soyisim"
                  value={formData.soyisim}
                  onChange={handleInputChange}
                  placeholder="Soyisminizi giriniz"
                  maxLength="50"
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="emailForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-envelope me-1"></i> E-mail Adresiniz *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailForm"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@mail.com"
                  maxLength="100"
                  required
                />
              </div>
              
              <div className="col-md-6">
                <label htmlFor="telefonForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-phone me-1"></i> Telefon Numaranız *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telefonForm"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  placeholder="5XX XXX XX XX"
                  maxLength="20"
                  required
                />
              </div>

              <div className="col-12">
                <label htmlFor="konumForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-map-marker-alt me-1"></i> Konum/Şehir *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="konumForm"
                  name="konum"
                  value={formData.konum}
                  onChange={handleInputChange}
                  placeholder="Örn: İstanbul, Galata Kulesi"
                  maxLength="100"
                  required
                />
              </div>
              
              <div className="col-12">
                <label htmlFor="aciklamaForm" className="form-label fw-semibold">
                  <i className="fa-solid fa-info-circle me-1"></i> Rus İzi Hakkında Bilgi *
                </label>
                <textarea
                  className="form-control"
                  id="aciklamaForm"
                  name="aciklama"
                  value={formData.aciklama}
                  onChange={handleInputChange}
                  placeholder="Bulduğunuz Rus izi hakkında detaylı bilgi verin... Tarihi, mimarisi, hikayesi vb."
                  rows="4"
                  maxLength="2000"
                  style={{ resize: 'vertical' }}
                  required
                />
                <div className="form-text">
                  {formData.aciklama.length}/2000 karakter
                </div>
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
                  disabled={isSubmitting}
                />
                <div className="form-text">
                  Birden fazla fotoğraf seçebilirsiniz (JPG, PNG, WEBP - Maksimum 5MB per dosya)
                </div>
              </div>

              {/* Seçilen Dosyalar */}
              {formData.dosyalar.length > 0 && (
                <div className="col-12">
                  <label className="form-label fw-semibold">
                    <i className="fa-solid fa-images me-1"></i> Seçilen Fotoğraflar:
                  </label>
                  <div className="d-flex flex-wrap gap-3 mt-2">
                    {formData.dosyalar.map((dosya) => (
                      <div key={dosya.id} className="position-relative">
                        <img 
                          src={dosya.data} 
                          alt={dosya.name}
                          className="rounded border"
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            objectFit: 'cover'
                          }}
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(dosya.id)}
                          className="btn btn-danger btn-sm position-absolute top-0 end-0"
                          style={{
                            transform: 'translate(50%, -50%)',
                            width: '25px',
                            height: '25px',
                            borderRadius: '50%',
                            padding: '0',
                            fontSize: '12px'
                          }}
                          disabled={isSubmitting}
                          title="Fotoğrafı kaldır"
                        >
                          ×
                        </button>
                        <div className="text-center mt-1">
                          <small className="text-muted" title={dosya.name}>
                            {formatFileSize(dosya.size)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="col-12 text-center mt-4">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg px-5"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane me-2"></i>
                      Rus İzi Bilgisini Paylaş!
                    </>
                  )}
                </button>
              </div>

              {/* Demo bilgilendirme */}
              <div className="col-12 mt-3">
                <div className="alert alert-warning">
                  <small>
                    <i className="fa-solid fa-exclamation-triangle me-1"></i>
                    <strong>Not:</strong> Bu demo sürümünde gönderilen veriler gerçek bir veritabanına kaydedilmez. 
                    Üretim versiyonunda tüm veriler güvenli bir şekilde saklanacak ve moderasyon sonrası haritada görüntülenecektir.
                  </small>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .alert {
          border: none;
          border-radius: 10px;
        }
        
        .alert-success {
          background-color: #d1f2eb;
          color: #0c5460;
          border-left: 4px solid #28a745;
        }
        
        .alert-danger {
          background-color: #f8d7da;
          color: #721c24;
          border-left: 4px solid #dc3545;
        }
        
        .alert-info {
          background-color: #d1ecf1;
          color: #0c5460;
          border-left: 4px solid #17a2b8;
        }
        
        .alert-warning {
          background-color: #fff3cd;
          color: #856404;
          border-left: 4px solid #ffc107;
        }
        
        .form-control {
          border-radius: 8px;
          border: 1px solid #ced4da;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .form-control:focus {
          border-color: #0032A0;
          box-shadow: 0 0 0 0.2rem rgba(0, 50, 160, 0.25);
        }
        
        .btn-primary {
          background-color: #0032A0;
          border-color: #0032A0;
        }
        
        .btn-primary:hover {
          background-color: #002780;
          border-color: #002780;
        }
        
        .btn-primary:disabled {
          background-color: #6c757d;
          border-color: #6c757d;
        }
        
        .card {
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .form-label {
          color: #495057;
          margin-bottom: 0.5rem;
        }
        
        .text-primary {
          color: #0032A0 !important;
        }
        
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }
        
        .btn-close {
          background-size: 1em;
        }
        
        @media (max-width: 768px) {
          .container {
            padding-left: 10px;
            padding-right: 10px;
          }
          
          .card-body {
            padding: 1.5rem !important;
          }
          
          .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RusIziEkle;
