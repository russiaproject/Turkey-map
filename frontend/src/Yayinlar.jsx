import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BarKurum from "./BarKurum";

const Yayinlar = () => {
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCopyright, setSelectedCopyright] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Kullanıcı başvuru formu state'leri
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    submitterName: '',
    submitterEmail: '',
    submitterPhone: '',
    title: '',
    authors: '',
    type: '',
    shortAbstract: '',
    description: '',
    webLink: '',
    publisher: '',
    fullAbstract: '',
    keywords: '',
    pageNumbers: '',
    volume: '',
    issue: '',
    isCopyrighted: false
  });

  // Sayfa yüklendiğinde yayınları çek
  useEffect(() => {
    fetchPublications();
  }, []);

  // Arama ve filtreleme
  useEffect(() => {
    let filtered = publications;

    // Arama terimi filtresi
    if (searchTerm) {
      filtered = filtered.filter(pub => 
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.keywords.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tür filtresi
    if (selectedType && selectedType !== 'Tümü') {
      filtered = filtered.filter(pub => pub.type === selectedType);
    }

    // Telif filtresi
    if (selectedCopyright === 'copyrighted') {
      filtered = filtered.filter(pub => pub.isCopyrighted === true);
    } else if (selectedCopyright === 'non-copyrighted') {
      filtered = filtered.filter(pub => pub.isCopyrighted === false);
    }

    setFilteredPublications(filtered);
  }, [searchTerm, selectedType, selectedCopyright, publications]);

  const fetchPublications = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/publications';
      
      // Telif filtresi varsa ekle
      if (selectedCopyright) {
        url += `?copyright=${selectedCopyright}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      
      setPublications(data || []);
      setFilteredPublications(data || []);
      
    } catch (error) {
      console.error('❌ Yayınlar yüklenirken hata:', error);
      setError('Yayınlar yüklenirken hata oluştu: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    // Zorunlu alanları kontrol et
    if (!applicationData.submitterName || !applicationData.submitterEmail || 
        !applicationData.title || !applicationData.authors || !applicationData.type || 
        !applicationData.shortAbstract || !applicationData.description) {
      setError('❌ Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.submitterEmail)) {
      setError('❌ Lütfen geçerli bir email adresi girin (örn: ornek@email.com)');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user-publication-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Başvuru gönderilirken hata: ${response.status}`);
      }

      const result = await response.json();
      
      setSuccess('✅ Yayın başvurunuz başarıyla gönderildi! İnceleme sürecinden sonra onaylanırsa yayınlar sayfasında görünecektir.');
      setShowApplicationModal(false);
      
      // Formu temizle
      setApplicationData({
        submitterName: '',
        submitterEmail: '',
        submitterPhone: '',
        title: '',
        authors: '',
        type: '',
        shortAbstract: '',
        description: '',
        webLink: '',
        publisher: '',
        fullAbstract: '',
        keywords: '',
        pageNumbers: '',
        volume: '',
        issue: '',
        isCopyrighted: false
      });
      
    } catch (error) {
      console.error('❌ Başvuru gönderme hatası:', error);
      setError('❌ Başvuru gönderilirken hata oluştu: ' + error.message);
    }
  };

  const handleSearch = () => {
    // Arama useEffect ile otomatik yapılıyor
  };

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError('');
      setTimeout(() => setSuccess(''), 5000);
    } else {
      setError(message);
      setSuccess('');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="container my-5 py-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Yayınlar
          </li>
        </ol>
      </nav>

      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-book-open text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Yayınlar</h2>
      </div>

      {/* Hata ve Başarı Mesajları */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}
      
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
        </div>
      )}

      {/* Arama ve Filtreleme */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-lg-5 col-md-12">
              <label htmlFor="searchInput" className="form-label fw-bold">
                Yayın Ara
              </label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Makale adı, yazar, anahtar kelime..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-lg-2 col-md-4">
              <label htmlFor="typeSelect" className="form-label fw-bold">
                Yayın Türü
              </label>
              <select 
                className="form-select" 
                id="typeSelect"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">Tümü</option>
                <option value="Makale">Makale</option>
                <option value="Bildiri">Bildiri</option>
                <option value="Kitap">Kitap</option>
                <option value="Tez">Tez</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-4">
              <label htmlFor="copyrightSelect" className="form-label fw-bold">
                Telif Durumu
              </label>
              <select 
                className="form-select" 
                id="copyrightSelect"
                value={selectedCopyright}
                onChange={(e) => setSelectedCopyright(e.target.value)}
              >
                <option value="">Tümü</option>
                <option value="copyrighted">Telifli</option>
                <option value="non-copyrighted">Telifsiz</option>
              </select>
            </div>
            <div className="col-lg-3 col-md-4">
              <button 
                className="btn btn-primary w-100 me-2"
                onClick={handleSearch}
              >
                <i className="fa-solid fa-filter me-2"></i>Filtrele
              </button>
            </div>
          </div>
          
          {/* Yayın Öner Butonu */}
          <div className="row mt-3">
            <div className="col-12 text-center">
              <button 
                className="btn btn-success btn-lg"
                onClick={() => setShowApplicationModal(true)}
              >
                <i className="fa-solid fa-plus me-2"></i>Yayın Öner
              </button>
              <p className="text-muted small mt-2">
                Kendi araştırmanızı veya bildiğiniz bir yayını önerebilirsiniz
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Yükleniyor */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-2">Yayınlar yükleniyor...</p>
        </div>
      )}

      {/* Yayınlar Grid */}
      {!loading && (
        <div className="row g-4">
          {filteredPublications.length === 0 ? (
            <div className="col-12">
              <div className="text-center py-5">
                <i className="fa-solid fa-book-open fs-1 text-muted mb-3"></i>
                <h4 className="text-muted">
                  {searchTerm || selectedType ? 
                    'Arama kriterlerinize uygun yayın bulunamadı' : 
                    'Henüz yayın bulunmuyor'
                  }
                </h4>
                <p className="text-muted">
                  {!searchTerm && !selectedType && (
                    'İlk yayını siz önerebilirsiniz!'
                  )}
                </p>
              </div>
            </div>
          ) : (
            filteredPublications.map((publication) => (
              <div className="col-lg-6" key={publication.id}>
                <div className="yayinlarDiv d-flex flex-column h-100 p-4 position-relative">
                  <div className="yayinlarTuru position-absolute top-0 start-0 m-3">
                    <p className="p-2 m-0">{publication.type}</p>
                  </div>
                  
                  {/* Telifli Badge */}
                  {publication.isCopyrighted && (
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-warning text-dark">
                        📄 Telifli
                      </span>
                    </div>
                  )}
                  
                  <h4 className="fw-bold text-primary mt-5">
                    {publication.title}
                  </h4>
                  <p className="text-muted small">
                    <i className="fa-solid fa-user me-2"></i>
                    {publication.authors}
                  </p>
                  <p className="fst-italic small">
                    {publication.shortAbstract}
                  </p>
                  <p className="text-secondary">
                    {publication.description.length > 150 ? 
                      `${publication.description.substring(0, 150)}...` : 
                      publication.description
                    }
                  </p>
                  
                  {/* Ek Bilgiler */}
                  <div className="mt-auto">
                    {publication.publisher && (
                      <p className="small text-muted mb-2">
                        <i className="fa-solid fa-building me-1"></i>
                        {publication.publisher}
                      </p>
                    )}
                    <p className="small text-muted mb-2">
                      <i className="fa-solid fa-calendar me-1"></i>
                      {new Date(publication.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                    
                    <div className="d-flex gap-2 flex-wrap">
                      {/* Detayları Gör butonu - detay sayfasına yönlendir */}
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/yayin/${publication.id}`)}
                      >
                        Detayları Gör
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <BarKurum />

      {/* Konum Haritası */}
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

      {/* Yayın Başvuru Modalı */}
      {showApplicationModal && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="fa-solid fa-plus me-2"></i>
                  Yayın Önerisi
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => {setShowApplicationModal(false); setError(''); setSuccess('');}}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <i className="fa-solid fa-info-circle me-2"></i>
                  <strong>Bilgilendirme:</strong> Önerdiğiniz yayın, admin tarafından incelendikten sonra onaylanırsa yayınlar sayfasında görünecektir.
                </div>
                
                <form onSubmit={handleApplicationSubmit}>
                  {/* Başvuran Bilgileri */}
                  <h6 className="text-primary mb-3">
                    <i className="fa-solid fa-user me-2"></i>
                    Başvuran Bilgileri
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Ad Soyad *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="submitterName"
                        value={applicationData.submitterName}
                        onChange={handleApplicationChange}
                        placeholder="Adınız ve soyadınız"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">E-posta *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="submitterEmail"
                        value={applicationData.submitterEmail}
                        onChange={handleApplicationChange}
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Telefon</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="submitterPhone"
                        value={applicationData.submitterPhone}
                        onChange={handleApplicationChange}
                        placeholder="+90 555 123 45 67"
                      />
                    </div>
                  </div>

                  <hr />

                  {/* Yayın Bilgileri */}
                  <h6 className="text-primary mb-3">
                    <i className="fa-solid fa-book me-2"></i>
                    Yayın Bilgileri
                  </h6>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Yayın Başlığı *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={applicationData.title}
                        onChange={handleApplicationChange}
                        placeholder="Örn: Türkiye-Rusya İlişkilerinde Enerji Faktörü"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Yazarlar *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="authors"
                        value={applicationData.authors}
                        onChange={handleApplicationChange}
                        placeholder="Örn: Ahmet Yılmaz, Mehmet Demir"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Yayın Türü *</label>
                      <select
                        className="form-select"
                        name="type"
                        value={applicationData.type}
                        onChange={handleApplicationChange}
                        required
                      >
                        <option value="">Tür Seçiniz</option>
                        <option value="Makale">Makale</option>
                        <option value="Bildiri">Bildiri</option>
                        <option value="Kitap">Kitap</option>
                        <option value="Tez">Tez</option>
                      </select>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Kısa Özet *</label>
                      <textarea
                        className="form-control"
                        name="shortAbstract"
                        value={applicationData.shortAbstract}
                        onChange={handleApplicationChange}
                        rows="2"
                        placeholder="Yayın kartında gösterilecek kısa özet..."
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Ana Açıklama *</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={applicationData.description}
                        onChange={handleApplicationChange}
                        rows="3"
                        placeholder="Yayın hakkında detaylı açıklama..."
                        required
                      />
                    </div>
                  </div>

                  {/* Detay Bilgileri */}
                  <h6 className="text-muted mb-3">
                    <i className="fa-solid fa-list-alt me-2"></i>
                    Detay Bilgileri (Opsiyonel)
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Yayıncı/Dergi</label>
                      <input
                        type="text"
                        className="form-control"
                        name="publisher"
                        value={applicationData.publisher}
                        onChange={handleApplicationChange}
                        placeholder="Örn: Uluslararası İlişkiler Dergisi"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Web Linki</label>
                      <input
                        type="url"
                        className="form-control"
                        name="webLink"
                        value={applicationData.webLink}
                        onChange={handleApplicationChange}
                        placeholder="https://example.com/yayin"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Sayfa Numaraları</label>
                      <input
                        type="text"
                        className="form-control"
                        name="pageNumbers"
                        value={applicationData.pageNumbers}
                        onChange={handleApplicationChange}
                        placeholder="Örn: 15-32"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Cilt</label>
                      <input
                        type="text"
                        className="form-control"
                        name="volume"
                        value={applicationData.volume}
                        onChange={handleApplicationChange}
                        placeholder="Örn: 5"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">Sayı</label>
                      <input
                        type="text"
                        className="form-control"
                        name="issue"
                        value={applicationData.issue}
                        onChange={handleApplicationChange}
                        placeholder="Örn: 2"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Anahtar Kelimeler</label>
                      <input
                        type="text"
                        className="form-control"
                        name="keywords"
                        value={applicationData.keywords}
                        onChange={handleApplicationChange}
                        placeholder="Örn: Türkiye, Rusya, enerji, diplomasi"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Tam Abstract</label>
                      <textarea
                        className="form-control"
                        name="fullAbstract"
                        value={applicationData.fullAbstract}
                        onChange={handleApplicationChange}
                        rows="4"
                        placeholder="Detay sayfasında gösterilecek tam abstract..."
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isCopyrighted"
                          id="isCopyright"
                          checked={applicationData.isCopyrighted}
                          onChange={(e) => setApplicationData(prev => ({
                            ...prev,
                            isCopyrighted: e.target.checked
                          }))}
                        />
                        <label className="form-check-label" htmlFor="isCopyright">
                          📄 Bu yayın teliflidir
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {setShowApplicationModal(false); setError(''); setSuccess('');}}
                >
                  <i className="fa-solid fa-times me-2"></i>
                  İptal
                </button>
                <button 
                  type="button" 
                  className="btn btn-success"
                  onClick={handleApplicationSubmit}
                >
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  Başvuruyu Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Yayinlar;
