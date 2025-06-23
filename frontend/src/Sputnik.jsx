import React from "react";
import BarKurum from "./BarKurum";

const Sputnik = () => {
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
            Sputnik
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-tv text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Sputnik</h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Sputnik
          </h4>
          <p className="card-text">
           Sputnik Türkiye, haber akış sistemleri, internet siteleri, sosyal medya hesapları, mobil uygulamalar, radyo yayını ve multimedya basın merkezleri aracılığıyla hizmet sunan modern bir uluslararası haber ajansıdır. Sputnik'in merkezi Moskova'dadır ve bölge ofisleri Türkiye (İstanbul), ABD (Washington), Çin (Pekin), Fransa (Paris), Almanya (Berlin), Mısır (Kahire) ve İngiltere (Londra) gibi dünyanın stratejik noktalarında bulunmaktadır.

          </p>
          <p className="card-text">
        Ajans, dünya siyaseti ve ekonomi alanlarında kapsamlı haberler üreterek uluslararası okuyuculara ulaşmayı hedeflemektedir. Sputnik markası, Rus medya grubu ‘Rossiya Segodnya’ tarafından 10 Kasım 2014 tarihinde hayata geçirilmiştir. Bugün ajansın uluslararası editör ekibi İngilizce, İspanyolca, Fransızca, Almanca, Arapça ve Çince dahil olmak üzere 30'dan fazla dilde haber üretimini sürdürmektedir.

          </p>
          <p className="card-text">

Sputnik, FM ve DAB/DAB+ frekanslarının yanı sıra internet siteleri üzerinden de günlük 800 saatin üzerinde radyo yayını yapmaktadır. Ajans, güçlü fotoğrafçılık ağıyla dünyanın dört bir yanında görev yapmakta ve World Press Photo ile Magnum Photography Awards gibi prestijli yarışmalarda birçok kez ödül kazanmıştır.

          </p>
          <p className="card-text">
   Sputnik'in ayrıca Sputnik Mediabank adlı bir dijital platformu bulunmaktadır. Bu platform üzerinden profesyonel fotoğraflar, videolar ve infografikler satılarak medya kuruluşları ve profesyonellere içerik sağlanmaktadır
          </p>
          <p className="card-text">
Sputnik Türkiye’nin Radyo Frekansları
Radyo Sputnik’in karasal radyo yayınını 7 gün 24 saat Türkiye’nin 24 kentinden dinleyebilirsiniz.

          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
       Güncel Frekans Bilgileri Şöyle:

          </h3>
          <p>
           <ul>
        <li>Adana – 107.4</li>
        <li>Ankara – 96.2</li>
        <li>Antalya – 104.8</li>
        <li>Bursa – 101.4</li>
        <li>Çanakkale – 107.2</li>
        <li>Diyarbakır – 89.6</li>
        <li>Gaziantep – 104.3</li>
        <li>Hatay – 106.1</li>
        <li>İstanbul – 97.8</li>
        <li>İzmir – 91.0</li>
        <li>Kahramanmaraş – 92.3</li>
        <li>Kayseri – 105.5</li>
        <li>Kocaeli – 90.2</li>
        <li>Konya – 88.6</li>
        <li>Malatya – 106.0</li>
        <li>Manisa – 101.0</li>
        <li>Mardin – 92.2</li>
        <li>Ordu – 99.6</li>
        <li>Sakarya – 90.2</li>
        <li>Samsun – 107.7</li>
        <li>Sivas – 104.2</li>
        <li>Şanlıurfa – 95.3</li>
        <li>Trabzon – 102.4</li>
        <li>Van – 88.0</li>
    </ul>
          </p>

          <div>
            <p>

              <span className="fw-bold">Web Site: </span> 
                <a
                  href="
                  https://anlatilaninotesi.com.tr/" target="_blank"
                >
                  https://anlatilaninotesi.com.tr/
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

export default Sputnik;
