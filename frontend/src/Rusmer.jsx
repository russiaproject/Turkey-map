import React from "react";
import BarKurum from "./BarKurum";

const Rusmer = () => {
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
            Rusmer
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-language text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Rusmer</h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rusmer Hakkında
          </h4>
          <p className="card-text">
            Rus Dili ve Kültür Merkezi (RUSMER), Türkiye'de Rus dili ve kültürü
            üzerine öncü eğitim ve kültür kurumlarından biridir. Merkezin
            kurucusu ve direktörü Liudmila Nosova Kural'dır.
          </p>
          <p className="card-text">
            RUSMER, Türkiye ile Rusya arasındaki kültürel iletişimi
            güçlendirmeyi ve Rus dilinin yaygınlaşmasını sağlamayı
            hedeflemektedir. Bu amaç doğrultusunda merkezde her seviyeye uygun
            Rusça kursları düzenlenmektedir. Standart ve yoğun eğitim
            programlarının yanı sıra, YDS ve TORFL sınavlarına hazırlık grupları
            ile konuşma kulübü faaliyetleri de sunulmaktadır. Kurslar,
            Ankara'nın merkezi semti olan Kızılay'da, Lingosmart Yabancı Dil
            Kursları bünyesinde verilmektedir.
          </p>
          <p className="card-text">
            Ayrıca RUSMER bünyesinde faaliyet gösteren TORFL Sınav Merkezi,
            Türkiye’deki yetkili sınav koordinasyon merkezidir. Sınavlar,
            Sankt-Peterburg Devlet Üniversitesi iş birliği ile yapılmakta olup,
            YÖK yönetmeliğine uygun şekilde Türkiye’nin önemli devlet
            üniversiteleriyle birlikte gerçekleştirilmektedir. Bu üniversiteler
            arasında Ankara Yıldırım Beyazıt Üniversitesi, Atatürk Üniversitesi
            (Erzurum) ve Isparta Uygulamalı Bilimler Üniversitesi bulunmaktadır.
            TORFL sınavları, Ankara, İstanbul ve Alanya'da her dil seviyesine
            uygun olarak yetişkinler ve okul öğrencileri için düzenlenmektedir.
          </p>
          <p className="card-text">
            RUSMER ayrıca, çeşitli konferanslar, eğitim seminerleri, yetiştirme
            kursları ve interaktif etkinlikler düzenleyerek katılımcılarına Rus
            dilini uygulamalı olarak geliştirme fırsatı sunmaktadır. Üniversite
            yönetimleri, gençlerin bilim ve kültür alanlarında kendilerini
            geliştirmeleri ve Rus kültürünün zengin kaynaklarıyla tanışmaları
            amacıyla Rusça öğrenimini desteklemekte ve bu alana büyük
            önem vermektedir.
          </p>
          <div>
            <p>
              <span className="fw-bold">Adres:</span> Lingosmart Yabancı Dil
              Kursları, Meşrutiyet caddesi, No 1, Koray Han, kat 2 ve 3,
              Kızılay, Ankara
              <br />
              <span className="fw-bold">Tel:</span> ‪(+90) 537 574 5518‬, ‪(+90)
              536 722 0670‬
              <br />
              <span className="fw-bold">E-Mail:</span> 
              <a
                href="mailto:info@rusmer.org
"
              >
                info@rusmer.org
              </a>
            </p>
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

export default Rusmer;
