import React from "react";

import BarKurum from "./BarKurum"
const Rostec = () => {

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
            Rostec
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-jet-fighter-up text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rostec
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rostec Hakkında
          </h4>

          <p className="card-text">
            Rostec (Ростех), 2007 yılında Sayın Rusya Devlet Başkanı Vladimir Putin’in imzasıyla kurulan, hem askeri hem sivil yüksek teknolojilere odaklanan devlet destekli bir teknoloji ve savunma sanayi kuruluşudur. 60’tan fazla bölgede faaliyet gösteren 800’den fazla bilimsel ve üretim kuruluşunu bünyesinde bulunduran Rostec, havacılık, elektronik, tıbbi teknoloji, inovatif malzeme ve iletişim gibi stratejik alanlarda faaliyet göstermektedir.

          </p>
          <p className="card-text">
            
Şirketin ana hedeflerinden biri, Rusya'nın küresel pazarlarda rekabetçi yüksek teknoloji ürünleriyle varlık göstermesi, sivil üretimin artırılması ve dost ülkelerle stratejik iş birliklerinin güçlendirilmesidir.

          </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5"> Türkiye ile Gelişen Savunma ve Uzay İş Birliği:</h3>

          <p className="card-text">Rostec, Türkiye ile birçok alanda sürdürülen dostane ilişkiler çerçevesinde uzay, savunma, sanayi ve teknoloji alanlarında yapıcı bir ortaklık yürütmektedir. Rostec’in Uluslararası İşbirliği Direktörü Viktor Kladov, Türkiye Uzay Ajansı’nın kurulma sürecinde destek vermeye hazır olduklarını belirtmiş, Rusya’nın Soyuz roketlerinden uzay giysilerine kadar birçok teknolojide Türk uzmanlarla bilgi paylaşımına açık olduğunu ifade etmiştir.
</p>
 <p className="card-text">
            
Aynı zamanda Rosoboroneksport ile birlikte uzay araçları geliştiren Rostec, uzaktan algılama ve uydu teknolojileri konusunda da uluslararası iş birlikleri yürütmekte, bu kapsamda Türkiye’ye teknoloji ve eğitim desteği sağlamaktadır.

          </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
 S-400 Teslimatı:</h3>

           <p className="card-text">
          2019 yılında Rostec’in CEO’su Sergey Çemezov, Türkiye ile imzalanan S-400 hava savunma sistemi anlaşmasının teslimat sürecinin başladığını ve ilk sevkiyatların iki ay içinde yapılacağını açıklamıştır. Ayrıca Türk askerî personelin S-400 sistemlerinin işletimi konusunda eğitimlerinin Rusya’da başarıyla tamamlandığı da belirtilmiştir.


          </p>
 <p className="card-text">
            Türkiye'nin egemen bir savunma politikası doğrultusunda gerçekleştirdiği bu satın alma, NATO içindeki tüm baskılara rağmen Rusya ile güven temelli iş birliğinin kararlılıkla sürdürüldüğünü ortaya koymuştur.

          </p>
          <p className="card-text">
            Rostec’in 2023 yılı itibariyle yıllık cirosu 2,9 trilyon rubleyi aşmış, ürünleri 100’den fazla ülkeye ihraç edilmiştir. Sivil ürünlerin payı 1 trilyon rubleye ulaşmıştır. Savunmadan sağlığa, havacılıktan uzaya kadar pek çok alanda üretim yapan Rostec, Türkiye ile teknoloji ve bilgi odaklı çok boyutlu bir dostluk inşa etmeye devam etmektedir.

          </p>


                    <p className="card-text"><span className="fw-bold">Web Sitesi: </span><a href="https://rostec.ru/en/?ysclid=max4h89wam258955078" target="_blank">
https://rostec.ru/en/?ysclid=max4h89wam258955078 </a></p>
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
              src="https://yandex.com/map-widget/v1/-/CHryzWkf"
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

export default Rostec;
