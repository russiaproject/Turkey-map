import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BarKurum from "./BarKurum";

const YayinDetay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publication, setPublication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPublicationDetail();
  }, [id]);

  const fetchPublicationDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/publication/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Yayın bulunamadı');
          return;
        }
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      setPublication(data);
    } catch (error) {
      console.error('❌ Yayın detay yüklenirken hata:', error);
      setError('Yayın yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container my-5 py-3">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-2">Yayın detayları yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="container my-5 py-3">
        <div className="text-center py-5">
          <i className="fa-solid fa-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h4 className="text-muted">{error || 'Yayın bulunamadı'}</h4>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/yayinlar')}
          >
            Yayınlar Sayfasına Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 py-3">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item">
            <a href="/yayinlar" className="text-decoration-none">
              Yayınlar
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {publication.title.length > 50 ? 
              `${publication.title.substring(0, 50)}...` : 
              publication.title
            }
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-book-open text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          {publication.title}
        </h2>
        {publication.isCopyrighted && (
          <span className="badge bg-warning text-dark ms-3">
            📄 Telifli
          </span>
        )}
      </div>

      {/* Main Content Card */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Yayın Hakkında
          </h4>

          {/* Yazarlar */}
          <p className="card-text">
            <span className="fw-bold">👥 Yazarlar:</span> {publication.authors}
          </p>

          {/* Kısa Özet */}
          <p className="card-text">
            {publication.shortAbstract}
          </p>

          {/* Ana Açıklama */}
          <p className="card-text">
            {publication.description}
          </p>

          {/* Tam Abstract */}
          {publication.fullAbstract && (
            <p className="card-text">
              {publication.fullAbstract}
            </p>
          )}

          {/* Yayın Özellikleri */}
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Yayın Özellikleri:</h3>
          
          <p className="card-text">
            <span className="fw-bold">Tür:</span> {publication.type}
          </p>
          
          {publication.publisher && (
            <p className="card-text">
              <span className="fw-bold">Yayıncı/Dergi:</span> {publication.publisher}
            </p>
          )}
          
          {publication.volume && (
            <p className="card-text">
              <span className="fw-bold">Cilt:</span> {publication.volume}
            </p>
          )}
          
          {publication.issue && (
            <p className="card-text">
              <span className="fw-bold">Sayı:</span> {publication.issue}
            </p>
          )}
          
          {publication.pageNumbers && (
            <p className="card-text">
              <span className="fw-bold">Sayfa Numaraları:</span> {publication.pageNumbers}
            </p>
          )}
          
          <p className="card-text">
            <span className="fw-bold">Paylaşım Tarihi:</span> {new Date(publication.createdAt).toLocaleDateString('tr-TR')}
          </p>
          
          <p className="card-text">
            <span className="fw-bold">Telif Durumu:</span> {publication.isCopyrighted ? 'Telifli' : 'Telifsiz'}
          </p>

          {/* Anahtar Kelimeler */}
          {publication.keywords && (
            <>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Anahtar Kelimeler:</h3>
              <div className="d-flex flex-wrap gap-2">
                {publication.keywords.split(',').map((keyword, index) => (
                  <span key={index} className="badge bg-light text-dark border">
                    {keyword.trim()}
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Web Link varsa */}
          {publication.webLink && (
            <>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Kaynak:</h3>
              <a 
                href={publication.webLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
              >
                <i className="fa-solid fa-external-link-alt me-2"></i>
                Kaynağa Git
              </a>
            </>
          )}

          {/* Geri Dön Butonu */}
          <div className="mt-4">
            <button 
              className="btn btn-outline-secondary"
              onClick={() => navigate('/yayinlar')}
            >
              <i className="fa-solid fa-arrow-left me-2"></i>
              Yayınlara Dön
            </button>
          </div>
        </div>
      </div>

      <BarKurum />

      {/* Map Section */}
      <div className="card shadow-sm border-0 mt-4">
        <div className="card-body p-4">
          <h4 className="card-title mb-3 fw-bold">
            <i className="fa-solid fa-map-location-dot me-2 text-primary"></i>
            Konum
          </h4>

          <div className="d-flex justify-content-center align-items-center">
            <iframe
              src="https://yandex.com/map-widget/v1/-/CHfKe2YW"
              className="w-100 mt-4 rounded-4"
              style={{ height: "75vh" }}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YayinDetay;