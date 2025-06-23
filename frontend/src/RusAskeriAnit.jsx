import React from "react";
import RusIzleriSlider from "./RusIzleriSlider";

const RusAskeriAnit = () => {
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
            Rus Askerlerinin Anıtı
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-school text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rus Askerlerinin Anıtı
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rus Askerleri Hakkında
          </h4>

          <p className="card-text">
            Anıt, Osmanlı-Rus Savaşı (1828-1829) sırasında yaşamını yitiren Rus askerlerinin anısına adada yaptırılmıştır. Daha sonra Deniz Kuvvetleri Makine Sınıf Okulları binasının bahçesinde kalan anıt, mermer bir melek figürüne sahiptir. Başlangıçta elinde tarihi bir simge taşıyan bu figür, demir parmaklıklarla çevrilmiştir. Anıtın tabanında Latin harfleriyle "1828-1829" yılları belirtilmiş olup bir tarafında Rusça, diğer tarafında Yunanca yazılar bulunmaktadır.

          </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-6">Anıtın Yunanca yazıtında şöyle denmektedir:</h3>


          <p className="card-text">
           “<div className="fw-bold">
            1828-1829
           </div>

Savaş sırasında esir alınan bin üç yüz Rus askeri burada yatmaktadır. Bu anıt, askerlerinin cesaretini ve anısını onurlandırmak üzere İmparator tarafından yaptırılmıştır. Özgürlük ve onur uğruna yapılan fedakârlıkları burada anılmaktadır. Kahramanlıkları ve bağlılıkları Tunca, Arda (Barnate), Dristia ve Edirne bölgelerinde daima hatırlanacaktır.”

          </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-6">Anıtın Rusça yazıtında ise şu ifade yer almaktadır:</h3>
<p className="card-text">
  “Burada, 1828-1829 yıllarında esaret altında yaşamını yitiren Rus askerleri yatmaktadır. Bir insanın dostları uğruna hayatını feda etmesinden daha büyük bir sevgi yoktur. <div className="fw-bold">
    (Yuhanna İncili, 15:13)</div>”
          </p>
        </div>
      </div>
      <RusIzleriSlider />

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

export default RusAskeriAnit;
