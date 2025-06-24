import React, { useState, useEffect } from 'react';

const IsStaj = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // API'den iş ilanlarını getir
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/jobs?isActive=true');
      
      if (!response.ok) {
        throw new Error('İş ilanları yüklenemedi');
      }
      
      const data = await response.json();
      setJobs(data || []);
      setFilteredJobs(data || []);
      setError('');
    } catch (error) {
      console.error('❌ İş ilanları yükleme hatası:', error);
      setError('İş ilanları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      setJobs([]);
      setFilteredJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Filtreleme useEffect'i
  useEffect(() => {
    let filtered = jobs;

    // Kategori filtresi
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(job => job.category === categoryFilter);
    }

    // Arama filtresi
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.location.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.category.toLowerCase().includes(searchLower)
      );
    }

    setFilteredJobs(filtered);
    setVisibleJobs(3); // Filtreleme sonrası görünür iş sayısını sıfırla
  }, [jobs, categoryFilter, searchTerm]);

  const handleShowMore = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    document.body.classList.add('modal-open');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
    document.body.classList.remove('modal-open');
  };

  const loadMoreJobs = () => {
    setVisibleJobs(prevVisibleJobs => prevVisibleJobs + 3);
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(jobs.map(job => job.category))];
    return categories.sort();
  };

  // Placeholder resim
  const getJobImage = (job) => {
    if (job.photoSrc && job.photoSrc.trim()) {
      return job.photoSrc;
    }
    return "https://placehold.co/600x400/CCCCCC/FFF?text=İş+İlanı";
  };

  if (loading) {
    return (
      <div className="container my-5 is-staj-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-3">İş ve staj ilanları yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 is-staj-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            İş ve Staj İlanları
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-briefcase text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">İş Ve Staj İlanları</h2>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="card-title fw-bold mb-0">
              <i className="fa-solid fa-info-circle me-2 text-primary"></i>
              İş ve Staj İlanları ({filteredJobs.length} ilan)
            </h4>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={fetchJobs}
              title="İlanları Yenile"
            >
              <i className="fa-solid fa-refresh me-1"></i>
              Yenile
            </button>
          </div>

          {/* Filtreleme ve Arama */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label className="form-label">🔍 İlan Ara</label>
              <input
                type="text"
                className="form-control"
                placeholder="Başlık, konum, açıklama veya kategori ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">🏷️ Kategori Filtresi</label>
              <select
                className="form-select"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tüm Kategoriler</option>
                {getUniqueCategories().map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-5">
              <i className="fa-solid fa-briefcase text-muted mb-3" style={{fontSize: '3rem'}}></i>
              <h5 className="text-muted">
                {searchTerm || categoryFilter !== 'all' 
                  ? 'Arama kriterlerinize uygun ilan bulunamadı' 
                  : 'Henüz aktif iş ilanı bulunmuyor'
                }
              </h5>
              {(searchTerm || categoryFilter !== 'all') && (
                <button 
                  className="btn btn-outline-primary mt-3"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('all');
                  }}
                >
                  Filtreleri Temizle
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="row pt-3">
                {filteredJobs.slice(0, visibleJobs).map(job => (
                  <div key={job.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card job-card h-100">
                      <img
                        src={getJobImage(job)}
                        className="card-img-top job-card-img"
                        alt={job.title}
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/600x400/CCCCCC/FFF?text=İş+İlanı"; 
                        }}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title job-card-title flex-grow-1">{job.title}</h5>
                          <span className="badge bg-primary ms-2">{job.category}</span>
                        </div>
                        <p className="card-text job-card-location text-muted">{job.location}</p>
                        <p className="card-text job-card-description flex-grow-1">
                          {job.description.length > 100 
                            ? `${job.description.substring(0, 100)}...` 
                            : job.description
                          }
                        </p>
                        {job.deadline && (
                          <p className="card-text">
                            <small className="text-danger fw-bold">{job.deadline}</small>
                          </p>
                        )}
                        <button
                          onClick={() => handleShowMore(job)}
                          className="btn btn-primary job-card-button mt-auto"
                        >
                          Daha Fazla Gör
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleJobs < filteredJobs.length && (
                <div className="text-center mt-4">
                  <button 
                    onClick={loadMoreJobs} 
                    className="btn mb-3 btn-outline-primary load-more-button"
                  >
                    Daha Fazla Yükle ({filteredJobs.length - visibleJobs} ilan kaldı)
                  </button>
                </div>
              )}
            </>
          )}

          {/* Modal */}
          {showModal && selectedJob && (
            <>
              <div className="modal fade show job-modal" style={{ display: 'block' }} tabIndex="-1" onClick={handleCloseModal}>
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title job-modal-title">{selectedJob.title}</h5>
                      <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                      <img
                        src={getJobImage(selectedJob)}
                        className="img-fluid mb-3 job-modal-img rounded"
                        alt={selectedJob.title}
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/800x300/CCCCCC/FFF?text=İş+İlanı"; 
                        }}
                      />
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="job-modal-location-title mb-0">{selectedJob.location}</h6>
                        <span className="badge bg-primary">{selectedJob.category}</span>
                      </div>
                      
                      <p className="job-modal-description">{selectedJob.description}</p>
                      
                      {selectedJob.details && selectedJob.details.length > 0 && (
                        <>
                          <h6 className="mt-4 job-modal-section-title">📌 Detaylar:</h6>
                          <ul className="job-modal-list">
                            {selectedJob.details.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {selectedJob.quota && selectedJob.quota.length > 0 && (
                        <>
                          <h6 className="mt-4 job-modal-section-title">👥 Kontenjan Bilgisi:</h6>
                          <ul className="job-modal-list">
                            {selectedJob.quota.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      {selectedJob.deadline && (
                        <p className="mt-4 job-modal-deadline">
                          <strong className="text-danger">{selectedJob.deadline}</strong>
                        </p>
                      )}
                      
                      {selectedJob.application && (
                        <p className="job-modal-application mt-3">{selectedJob.application}</p>
                      )}
                      
                      {selectedJob.opportunity && (
                        <p className="fw-bold job-modal-opportunity mt-3 text-success">{selectedJob.opportunity}</p>
                      )}
                      
                      {selectedJob.contact && (
                        <p className="job-modal-contact mt-3">{selectedJob.contact}</p>
                      )}
                      
                      <div className="mt-4 p-3 bg-light rounded">
                        <small className="text-muted">
                          <i className="fa-solid fa-calendar me-1"></i>
                          İlan Tarihi: {new Date(selectedJob.createdAt).toLocaleDateString('tr-TR')}
                        </small>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button 
                        type="button" 
                        className="btn btn-secondary job-modal-close-button" 
                        onClick={handleCloseModal}
                      >
                        Kapat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop fade show"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IsStaj;
