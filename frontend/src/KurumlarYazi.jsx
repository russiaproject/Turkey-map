import React from "react";
import rusEviBina from "./images/red.png";
import sotnichenko from "./images/Sotnichenko.jpg";
import BarKurum from "./BarKurum";
import { Link } from "react-router-dom";

const KurumlarYazi = () => {
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
            Rus Evi Ankara
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-building-flag text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Rus Evi Ankara</h2>
      </div>

      <div className="">
        {/* Main Content Column */}
        <div >
          <div className="card shadow-sm border-0 h-100 kurum-card">
            <div className="card-body p-4">
              <h4 className="card-title mb-4 fw-bold">
                <i className="fa-solid fa-info-circle me-2 text-primary"></i>
                Rus Evi Ankara Hakkında
              </h4>

              <p className="card-text">
                Türkiye'de faaliyet gösteren Rusya Bilim ve Kültür Merkezi (Rus
                Evi Ankara), Rusya Federasyonu ile Türkiye Cumhuriyeti arasında
                akdedilen ve 3 Aralık 2012 tarihinde imzalanan Hükümetler Arası
                Mutabakat çerçevesinde 27 Şubat 2014 tarihinde hizmete
                açılmıştır.
              </p>

              <p className="card-text">
                Rusya Uluslararası İşbirliği Ajansı Rossotrudniçestvo'nun
                Türkiye'deki temsilciliği olan Rus Evi Ankara, uluslararası
                düzeyde düzenlenen kültürel, bilimsel ve eğitsel etkinliklere,
                festivallere, olimpiyatlara ve yarışmalara önem vermekte ve bu
                etkinliklerin organizasyon süreçlerini öncelikli faaliyet konusu
                olarak kabul etmektedir. Rus Evi Ankara, düzenli olarak çağdaş
                ve klasik müzik konserlerine, Rus ve Türk sanatçıların
                eserlerinden oluşan sergilere, bilimsel konferanslara ve gençlik
                etkinliklerine ev sahipliği yapmaktadır. Ayrıca kurumda tüm
                seviyelerde Rusça dil kursları, tiyatro ve dans kursları, müzik
                ve resim dersleri de verilmektedir.
              </p>

              <p>
                2023 yılının sonbaharından itibaren kurum bünyesinde Türkiye'de
                ikamet eden yurttaşların çocukları için hafta sonu okulu
                etkinlikleri düzenlenmektedir.
              </p>

              <p>
                Rusya ve Türkiye arasında coğrafi, kültürel ve tarihi bağlar
                bulunmaktadır. Rus Evi Ankara'nın temel görevi, Rus ve Türk
                toplumları arasındaki insani ve kültürel ilişkileri
                geliştirmektir.
              </p>

              <p>
                Rus Evi Ankara, tüm çocukları, gençleri ve yetişkinleri kurum
                kurslarına katılmaya davet etmektedir. Yetişkinler için her
                seviyeye uygun Rusça dil kursları, anadili Rusça olan eğitmenler
                tarafından yüz yüze ve çevrimiçi formatta hem özel hem de grup
                dersleri olarak verilmektedir. Ayrıca hafta sonları faaliyet
                gösteren Rusça konuşma kulübü de bulunmaktadır. Çocuklar içinse
                tiyatro, dans, resim ve müzik (piyano) dersleri sunulmaktadır.
              </p>

              {/* Website Button */}
              <div className="mb-3 mt-4">
                <a 
                  href="https://turkiye.rs.gov.ru/" 
                  className="btn btn-sm mt-2" 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    backgroundColor: '#0032A0', 
                    color: '#FFFFFF',
                    borderColor: 'transparent',
                    padding: '8px 15px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textDecoration: 'none'
                  }}
                >
                  <i className="fa-solid fa-globe me-2"></i>
                  Websitesini Ziyaret Et
                </a>
              </div>

              {/* Director Profile Card - Enhanced */}
              <div className="mt-5 w-full px-2 md:w-3/5 mx-auto">
  <div className="card border-0 p-2 shadow-sm mb-3 director-card">
    <div className="row g-0">
      <div className="col-12 col-md-3">
        <img src={sotnichenko} className="img-fluid rounded-3 w-full" alt="Aleksandr Sotniçenko" />
      </div>
      <div className="col-12 col-md-9">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="fa-solid fa-user-tie me-2 text-primary"></i>
            Aleksandr Sotniçenko
          </h5>
          <p className="text-muted mb-2 fst-italic">Rus Evinin Kıymetli Başkanı</p>
          <div className="quote-container my-3 p-2 border-start border-4 border-primary ps-3">
            <p className="mb-1">
              <i className="fa-solid sotnicenkoYazi fa-quote-left me-2 text-primary"></i>
              Türkiye Rusya'dan Rusya da Türkiye'den vazgeçmeyecek. Biz birlikte daha güçlüyüz. Biz bağımsız kalmak istiyoruz. Bunun için iş birliği yapmamız lazım.
            </p>
          </div>
          <p className="altIsim2 text-start">
            Bu Değerli Sözün Sahibi Aleksandr Sotniçenko
          </p>
          <Link to="/sotnicenko" className="btn btn-outline-primary hoverSotn mt-2">
            <i className="fa-solid fa-user me-2"></i>
            Rus Evi Başkanını Tanıyın
            <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
      <BarKurum/>

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

export default KurumlarYazi;
