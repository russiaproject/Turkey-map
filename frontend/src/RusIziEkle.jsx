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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    setLoading(true);

    try {
      console.log('📝 Form submit başlıyor...');
      console.log('📋 Form Data:', formData);
      
      const url = 'http://localhost:8080/api/user-rusizi-application';
      console.log('📡 API URL:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      console.log('📊 Response Status:', response.status);
      console.log('📋 Response OK:', response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(errorData.error || 'Başvuru gönderilemedi');
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      
      showMessage('✅ Rus izi bilginiz başarıyla gönderildi! İncelendikten sonra yayınlanacaktır.', 'success');
      
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

      // Dosya input'unu da temizle
      const fileInput = document.getElementById('dosyaForm');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error('❌ Form submit hatası:', error);
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
              Türkiye'de keşfettiğiniz Rus izlerini bizimle paylaşın! Başvurunuz incelendikten sonra yayınlanacaktır.
            </p>
          </div>

          {/* Mesaj Bildirimi */}
          {message && (
            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}>
              {message}
            </div>
          )}
          
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
                  style={{ resize: 'vertical' }}
                  required
                />
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
                  className="btn btn-primary btn-lg px-5"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RusIziEkle;
