import React from 'react';

const SuccessMessage = ({ onClose, onReturn }) => {
  return (
    <div className="success-container bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center p-5">
                <div className="success-icon mb-4">
                  <i className="fa-solid fa-circle-check text-success" style={{ fontSize: "5rem" }}></i>
                </div>
                <h2 className="mb-3">Başvurunuz Alındı!</h2>
                <p className="text-muted mb-4">
                  Teşekkürler! Başvurunuz başarıyla kaydedildi. Değerlendirme sürecimiz tamamlandığında 
                  sizinle iletişime geçeceğiz.
                </p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button 
                    className="btn btn-primary px-4 py-2" 
                    onClick={onReturn}
                  >
                    Ekip Sayfasına Dön
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;