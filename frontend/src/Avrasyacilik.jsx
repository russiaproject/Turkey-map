import React from "react";
import BarKurum from "./BarKurum";

import TurkeyFlag from "./images/TurkeyFlag.svg";
import RussiaFlag from "./images/RussiaFlag.svg";
import AvrasyaFoto1 from "./images/AvrasyaFoto1.jpg"
import AvrasyaFoto2 from "./images/AvrasyaFoto2.jpg"

const Avrasyacilik = () => {
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
            "Avrasyacılık: Ortak Vizyon" Konferansı
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          "Avrasyacılık: Ortak Vizyon" Konferansı
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Hakkında
          </h4>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            <img src={TurkeyFlag} alt="Türkiye Bayrağı" style={{ width: "5%" }} />
          </h3>
          <p className="card-text">
            Ankara Üniversitesi Siyasal Bilgiler Fakültesi’nde, Primakov Dış Politika İşbirliği Merkezi ve Ankara Rus Evi tarafından düzenlenen “Avrasyacılık: Ortak Vizyon” konferansı başladı.
          </p>
          <p className="card-text">
            Konferans, üniversitenin rektörü Necdet Ünüvar’ın konuşmasıyla açıldı.
          </p>
          <p className="card-text">
            Açılışta, Rusya Federasyonu Türkiye Büyükelçisi Aleksey Vladimiroviç Yerhov ve Belarus Türkiye Büyükelçisi Viktor Vasilyeviç Rıbak da açılış konuşmalarını yaptı.
          </p>
          <p className="card-text">
            Genel oturumda, Rusya Bilimler Akademisi Doğu Bilimleri Enstitüsü Direktörü Alikber Alikberov, Rusya Başbakan Yardımcısı A.L. Overçuk’un genel editörlüğünde yayımlanan ve konferansın temelini oluşturan “Avrasyacılık: Ortak Vizyon” kitabının yazılma fikrinin nasıl doğduğunu ve hayata geçirildiğini anlattı.
          </p>
          <p className="card-text">
            Kapanış oturumu olan yuvarlak masa toplantısını, Avrasyacılık teorisinin incelenmesindeki temel sorunlu noktalar hakkında bir sunumla Rus Evi Ankara Başkanı Aleksandr Sotniçenko açtı.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            <img src={RussiaFlag} alt="Rusya Bayrağı" style={{ width: "5%" }} className="border" />
          </h3>
          <p className="card-text">
            На факультете политологии Анкарского университета началась конференция «Евразийство. Видение общего», организованная Центром внешнеполитического сотрудничества им. Е.М. Примакова и Русским домом в Анкаре.
          </p>
          <p className="card-text">
            Конференция открылась выступлением ректора университета Неджета Унювара.
          </p>
          <p className="card-text">
            С приветственными словами на открытии выступили Посол  России в Турции Алексей Владимирович Ерхов и Посол Беларуси в Турции Виктор Васильевич Рыбак.
          </p>
          <p className="card-text">
            На пленарной сессии директор Института Востоковедения РАН Аликбер Аликберов рассказал о том, как родилась и была воплощена в жизнь идея написания книги «Евразийство. Видение общего», вышедшей под общей редакцией заместителя председателя правительства России А.Л. Оверчука, вокруг которой и выстроена вся конференция.
          </p>
        </div>
        
        {/* CORRECTED ACTION: Use an anchor tag with the 'download' attribute to force download */}
      <div className="ms-4">
          <a 
          href="./Avrasya.docx" 
          download="Avrasyacilik_Ortak_Vizyon_Raporu.docx" 
          className="btn btn-primary     mb-4"
          role="button"
        >
          <i className="fa-solid fa-download me-2"></i>
          Dosyayı İndir
        </a>
      </div>
              <div>
        <div id="carouselExampleIndicators" className="carousel slide w-50 p-3">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={AvrasyaFoto1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={AvrasyaFoto2} className="d-block w-100"  alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
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

export default Avrasyacilik;