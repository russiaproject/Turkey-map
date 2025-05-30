import React from "react";
import BarKurum from "./BarKurum";

const RusyaBurslari = () => {
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
          <li className="breadcrumb-item active" aria-current="page">
            Rusya Bursları Sayfası
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rusya’da Burslu Eğitim İmkânı
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Hakkında
          </h4>

          <p className="card-text">
            Türkiye ile Rusya Federasyonu arasında imzalanan devletlerarası
            anlaşma çerçevesinde, her yıl birçok Türk öğrenciye Rusya’da burslu
            eğitim hakkı tanınmaktadır. Bu burslar, yalnızca akademik gelişimi
            değil, aynı zamanda iki ülke arasında dostane ilişkilerin ve
            kültürel etkileşimin güçlenmesini de hedeflemektedir.
          </p>

          <p className="card-text">
            Rusya Hükümeti’nin gençlere verdiği bu kıymetli destek, ülkenin
            yükseköğretimdeki kalite vizyonunun ve Türkiye ile olan stratejik
            ortaklığının açık bir göstergesidir. Mülakatlar Rusya Bilim ve
            Kültür Merkezi (Rus Evi) tarafından yürütülmektedir. Tüm güncel
            bilgiler ve duyurular ise Rus Evi’nin resmî sosyal medya hesapları
            üzerinden paylaşılmaktadır.
          </p>
          <div>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İletişim Bilgileri:</h3>
              <div className="d-flex gap-2">
                <a href="https://www.instagram.com/rusevi_ankara" target="_blank" className="p-2 px-3 rusyaBurslariContact">İnstagram <i className="fa-brands fa-instagram"></i></a>
                <a href="https://t.me/ankara_rusevi" target="_blank" className="p-2 px-3 rusyaBurslariContact">Telegram <i className="fa-brands fa-telegram"></i></a>
                <a href="https://vk.com/rusevi" target="_blank" className="p-2 px-3 rusyaBurslariContact">VK <i className="fa-brands fa-vk"></i></a>
              </div>
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

export default RusyaBurslari;
