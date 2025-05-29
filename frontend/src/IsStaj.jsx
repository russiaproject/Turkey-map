import React, { useState, useEffect } from 'react';
import isFotoOrnek from './images/isFotoOrnek.jpg';

const initialJobsData = [
  {
    id: 1,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
  {
    id: 2,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
  {
    id: 3,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
  {
    id: 4,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
  {
    id: 5,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
  {
    id: 6,
    title: '🎓 TEMMUZ – AĞUSTOS 2025 STAJ DUYURUSU',
    photoSrc: isFotoOrnek,
    location: '📍 Akkuyu Nükleer “Anaokul ve Okul” Proje Ofisi',
    description: 'Yaşam Kampüsü içerisinde yer alan yeni anaokulu ve okul binalarının donatım sürecine destek olmak üzere, Rusça bilen üniversite öğrencileri arıyoruz.',
    details: [
      '📌 Staj gönüllülük esasına dayalıdır.',
      'Yemek, konaklama veya ücret ödemesi yapılmayacaktır.',
      'Ancak konaklama için Taşucu’nda bulunan KYK yurdundan faydalanma imkanı olabilir.',
      'Ayrıca stajyerler için servis imkânı sağlanacaktır.'
    ],
    quota: [
      '👥 Her ay için 5 kişilik kontenjan planlanmaktadır:',
      '– Temmuz: 5 kişi',
      '– Ağustos: 5 kişi'
    ],
    deadline: '📅 Son Başvuru Tarihi: 02.05.2025',
    application: '📨 Başvurular LinkedIn üzerinden sayfamızı takip ederek ya da doğrudan mesaj yoluyla CV göndererek yapılabilir.',
    opportunity: '📌 Proje çalışmalarına katkı sağlamak ve gerçek bir deneyim kazanmak için harika bir fırsat!',
    contact: '📞 Tüm sorularınız için doğrudan Akkuyu Nükleer ile iletişime geçebilirsiniz.'
  },
];

const IsStaj = () => {
  const [jobs, setJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(3);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setJobs(initialJobsData);
  }, []);

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
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">İş Ve Staj İlanları</h2>
      </div>
      <div className="">
        {/* Main Content Column */}
        <div >
          <div className="card shadow-sm border-0 h-100 kurum-card">
            <div className="card-body p-4">
              <h4 className="card-title mb-4 fw-bold">
                <i className="fa-solid fa-info-circle me-2 text-primary"></i>
                İş ve Staj İlanları
              </h4>
              <div className="row pt-3">
        {jobs.slice(0, visibleJobs).map(job => (
          <div key={job.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card job-card h-100">
              <img
                src={job.photoSrc}
                className="card-img-top job-card-img"
                alt={job.title}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/FFF?text=Resim+Bulunamadı"; }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title job-card-title">{job.title}</h5>
                <p className="card-text job-card-location">{job.location}</p>
                <p className="card-text job-card-description flex-grow-1">{job.description.substring(0,100)}...</p>
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

      {visibleJobs < jobs.length && (
        <div className="text-center mt-4">
          <button onClick={loadMoreJobs} className="btn mb-3 btn-outline-primary load-more-button">
            Daha Fazla Yükle
          </button>
        </div>
      )}

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
                    src={isFotoOrnek}
                    className="img-fluid mb-3 job-modal-img"
                    alt={selectedJob.title}
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x300/CCCCCC/FFF?text=Resim+Bulunamadı"; }}
                  />
                  <h6 className="job-modal-location-title">{selectedJob.location}</h6>
                  <p className="job-modal-description">{selectedJob.description}</p>
                  {selectedJob.details && selectedJob.details.length > 0 && (
                    <>
                      <h6 className="mt-3 job-modal-section-title">Detaylar:</h6>
                      <ul className="job-modal-list">
                        {selectedJob.details.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {selectedJob.quota && selectedJob.quota.length > 0 && (
                    <>
                      <h6 className="mt-3 job-modal-section-title">Kontenjan Bilgisi:</h6>
                        <ul className="job-modal-list">
                        {selectedJob.quota.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {selectedJob.deadline && <p className="mt-3 job-modal-deadline"><strong>{selectedJob.deadline}</strong></p>}
                  {selectedJob.application && <p className="job-modal-application">{selectedJob.application}</p>}
                  {selectedJob.opportunity && <p className="fw-bold job-modal-opportunity">{selectedJob.opportunity}</p>}
                  {selectedJob.contact && <p className="job-modal-contact">{selectedJob.contact}</p>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary job-modal-close-button" onClick={handleCloseModal}>
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
      </div>
      
    </div>
  );
};

export default IsStaj;
