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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const yeniGonderi = {
      id: Date.now(),
      ...formData,
      tarih: new Date().toLocaleDateString('tr-TR'),
      saat: new Date().toLocaleTimeString('tr-TR')
    };

    // Mevcut gönderileri al
    const mevcutGonderiler = JSON.parse(localStorage.getItem('rusIziGonderiler') || '[]');
    const guncelGonderiler = [yeniGonderi, ...mevcutGonderiler];
    localStorage.setItem('rusIziGonderiler', JSON.stringify(guncelGonderiler));

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

    alert('Rus izi bilginiz başarıyla eklendi! Şehir detay sayfalarından görüntüleyebilirsiniz.');
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
              Türkiye'de keşfettiğiniz Rus izlerini bizimle paylaşın!
            </p>
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
                  Birden fazla fotoğraf seçebilirsiniz (JPG, PNG, WEBP)
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
                <button type="submit" className="btn btn-primary btn-lg px-5">
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  Rus İzi Bilgisini Paylaş!
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
