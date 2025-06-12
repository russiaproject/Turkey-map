import React from "react";
import rusEviBina from "./images/red.png";
import akkuyuFoto from "./images/akkuyuFoto.jpg";
import akkuyuFoto2 from "./images/akkuyuFoto2.jpg";


import BarKurum from "./BarKurum"

const KurumlarYaziAkkuyu = () => {
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
           Akkuyu Nükler Santrali
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
         Akkuyu Nükler Santrali
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
              Akkuyu Nükleer Güç Santrali, Türkiye'nin ilk nükleer enerji santrali olup, aynı zamanda Türkiye'nin tek kalemdeki en büyük yatırımıdır. Türkiye Cumhuriyeti ile Rusya Federasyonu arasındaki ikili dostluk ve iş birliğini güçlendiren önemli projelerden biridir. Santralin inşası, Rusya'nın devlet nükleer enerji kuruluşu Rosatom ile ortaklaşa yürütülmekte olup, projenin yapımı hâlen devam etmektedir.

              </p>

              <p className="card-text">
              2010 yılında Türkiye Cumhuriyeti ve Rusya Federasyonu arasında Akkuyu bölgesinde nükleer santral yapımına ilişkin bir anlaşma imzalanmıştır. 2012 yılında ise Türkiye Atom Enerjisi Kurumu (TAEK) tarafından Rusya Federasyonu'ndaki Kalininskaya Nükleer Santrali referans santral olarak belirlenmiştir.

              </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Santralin İnşaatı Kapsamında:</h3>
              <p className="card-text"><span className="fw-bold">Akkuyu 1. Ünite</span>: VVER V-509 modeli, 1114 MW kapasite, inşaat başlangıcı 3 Nisan 2018, elektrik üretimi planlanan yıl 2025.
              </p>
              <p className="card-text"><span className="fw-bold">Akkuyu 1. Ünite</span>: VVER V-509 modeli, 1114 MW kapasite, inşaat başlangıcı 3 Nisan 2018, elektrik üretimi planlanan yıl 2025.
              </p>
              <p className="card-text"><span className="fw-bold">Akkuyu 2. Ünite</span>: VVER V-509 modeli, 1114 MW kapasite, inşaat başlangıcı 26 Haziran 2020, elektrik üretimi planlanan yıl 2026.

              </p> <p className="card-text"><span className="fw-bold">Akkuyu 3. Ünite</span>: VVER V-513 modeli, 1114 MW kapasite, inşaat başlangıcı 10 Mart 2021, elektrik üretimi planlanan yıl 2027.

              </p> <p className="card-text"><span className="fw-bold">Akkuyu 4. Ünite</span>: VVER V-513 modeli, 1114 MW kapasite, inşaat başlangıcı 21 Temmuz 2022, elektrik üretimi planlanan yıl 2028.
              </p>
              <p>
  <span className="fw-bold">Web Site:</span> <a href="https://akkuyu.com/tr" target="_blank">https://akkuyu.com/</a>
</p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İlgili Fotoğraflar:</h3>
             
              <div>
  <div id="carouselExampleIndicators" className="carousel slide w-50">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={akkuyuFoto} className="d-block w-100" alt="..." />
      </div>
      <div className="carousel-item">
        <img src={akkuyuFoto2} className="d-block w-100"  alt="..." />
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
              src="https://yandex.com/map-widget/v1/-/CHrq7I4P"
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

export default KurumlarYaziAkkuyu;
