import React from "react";
import rusEviBina from "./images/red.png";
import sotnichenko from "./images/Sotnichenko.jpg";
import BarKurum from "./BarKurum";

const Sotnicenko = () => {
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
            Aleksandr Sotniçenko{" "}
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-user text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Aleksandr Sotniçenko'yu Tanıyın!
        </h2>
      </div>

          <div className="card shadow-sm border-0 h-100 kurum-card">
            <div className="card-body p-4">
              <h4 className="card-title mb-4 fw-bold">
                <i className="fa-solid fa-info-circle me-2 text-primary"></i>
                Hakkında
              </h4>

              <h5 className="mt-4">Özgeçmiş</h5>
              <p className="card-text">
                1 Şubat 1977’de Leningrad’da, asker bir ailenin albay rütbesindeki çocuğu olarak dünyaya geldi.
              </p>
              <h5 className="mt-4">Görev ve Yetkiler</h5>
              <p className="card-text">
                Halen Rossotrudniçestvo Ajansı Türkiye Temsilciliği ve Rus Evi
                Ankara Başkanlığı görevini yürütmektedir. Aynı zamanda Rusya
                Federasyonu Ankara Büyükelçiliği’nde Müsteşar olarak görev
                yapmaktadır.
              </p>
              <h5 className="mt-4">Eğitim</h5>
              <p className="card-text">
                1998 yılında St. Petersburg Devlet Üniversitesi Şarkiyat
                Fakültesi’nden mezun oldu. Doktora tezini, aynı üniversitenin
                Uluslararası İlişkiler Fakültesi’nde 2003 yılında başarıyla
                savundu. 2002-2016 yılları arasında St. Petersburg Devlet
                Üniversitesi Uluslararası İlişkiler Fakültesi’nde lisans, yüksek
                lisans ve doktora düzeyinde dersler verdi. 2013 yılında "Doçent"
                unvanını aldı.
              </p>
              <p>
                Türkçe ve İngilizce dillerinde ileri düzeyde yetkinliğe
                sahiptir.
              </p>
              <h5 className="mt-4">Mesleki Deneyim</h5>
              <p className="card-text">
                2012 yılından bu yana diplomatik hizmetlerde görev yapmaktadır.
                2012-2013 yıllarında Rusya Federasyonu’nun İsrail
                Büyükelçiliği’nde Birinci Sekreter olarak görev aldı. 2016-2017
                yılları arasında Rossotrudniçestvo Ajansı'nın Suriye Arap
                Cumhuriyeti Temsilciliği’nde Danışmanlık yaptı. 2017-2020
                yılları arasında Rusya Federasyonu Türkiye Büyükelçiliği’nde
                Müsteşar olarak görev yaptı. 2021 yılından bu yana
                Rossotrudniçestvo Ajansı Türkiye Temsilciliği ve Rus Evi Ankara
                Başkanlığı görevlerini sürdürmektedir.
              </p>  
            </div>
          </div>
          <BarKurum/>

        {/* Sidebar Column */}

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

export default Sotnicenko;
