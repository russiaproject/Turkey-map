import React from "react";
import rusEviBina from "./images/red.png";
import sotnichenko from "./images/Sotnichenko.jpg";
import BarKurum from "./BarKurum";

const Gashigullin = () => {
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
            Aydar Gashigullin
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-user text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Aydar Gashigullin'i Tanıyın!
        </h2>
      </div>

          <div className="card shadow-sm border-0 h-100 kurum-card">
            <div className="card-body p-4">
              <h4 className="card-title mb-4 fw-bold">
                <i className="fa-solid fa-info-circle me-2 text-primary"></i>
                Hakkında
              </h4>

              <h5 className="mt-4">Doğum Yeri ve Tarihi</h5>
              <p className="card-text">
9 Eylül 1978 tarihinde, Tataristan Cumhuriyeti'nin başkenti Kazan’da doğdu.
              </p>
              <h5 className="mt-4">Eğitim</h5>
              <p className="card-text">
                2001 yılında Bilkent Üniversitesi Uluslararası İlişkiler Fakültesi’nden mezun oldu. <br />
2011 yılında Rusya Federasyonu İçişleri Bakanlığı’na bağlı Kazan Hukuk Enstitüsü’nü tamamladı.
              </p>
              <h5 className="mt-4">Mesleki Deneyim</h5>
              <p className="card-text">
                2002 yılında, Tarımsal İşletme Personeli’nin Yeniden Eğitilmesi Tatar Enstitüsü’nde Uluslararası İlişkiler Bölüm Başkanı olarak görev yaptı.
                <br />
                2002 yılından itibaren Tataristan Cumhuriyeti Ticaret ve Dış Ekonomik İşbirliği Bakanlığı’nda çeşitli görevlerde bulundu.
<br />
2007 yılında, Tataristan Cumhuriyeti Bakanlar Kurulu’na bağlı Uluslararası İşbirliği Kalkınma Ajansı’nda İdari İşler Müdürü olarak görev yaptı.
<br />
2008 yılında, Tataristan Cumhuriyeti’nin Türkiye Cumhuriyeti’ndeki Tam Yetkili Temsilcisi nezdinde danışmanlık görevine atandı.
<br />

2012 yılında, aynı temsilciliğin yardımcılığına getirildi ve aynı yıl içerisinde Tataristan Cumhuriyeti’nin Türkiye Cumhuriyeti’ndeki Tam Yetkili Temsilcisi olarak atandı.
<br />

2016 yılında, Rusya Federasyonu’nun Türkiye Cumhuriyeti nezdindeki Ticaret Mümessili görevine atandı.

              </p>
              <h5 className="mt-4">Diller</h5>
              <p>
               İngilizce, Fransızca ve Türkçe bilmektedir.
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

export default Gashigullin;
