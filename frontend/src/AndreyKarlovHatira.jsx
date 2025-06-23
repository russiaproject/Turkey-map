import React from "react";
import RusIzleriSlider from "./RusIzleriSlider";

const AndreyKarlovHatira = () => {
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
            Büyükelçi Andrey Karlov’un Aziz Hatırası
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-school text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Büyükelçi Andrey Karlov’un Aziz Hatırası
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Andrey Karlov’un Aziz Hatırası Hakkında
          </h4>

          <p className="card-text">
      2018 yılında, Aralık 2016'da hain bir suikast sonucu hayatını kaybeden vefat eden Rusya'nın Ankara Büyükelçisi Andrey Karlov'un anısına Antalya'nın Demre ilçesinde bir anıt dikildi. Bu anlamlı anıt, sadece bir diplomata duyulan saygıyı değil, aynı zamanda Türkiye ile Rusya arasındaki dostluk ve karşılıklı anlayışın güçlü bir simgesini temsil ediyor.
          </p>


          <p className="card-text">
Demre’deki bir sokağa da Andrey Karlov’un ismi verildi. Bu saygı duruşu, iki halk arasındaki yakın ilişkilere duyulan değeri bir kez daha ortaya koyuyor. Anıtın Demre'de yapılması ise rastlantı değil; çünkü Demre, Büyükelçi Karlov’un çocukluk ve gençliğini geçirdiği Rusya'nın Bryansk bölgesindeki Klintsy şehriyle kardeş şehir olma özelliğini taşıyor.

          </p>
<p className="card-text">
Bu tür semboller, ülkelerimiz arasındaki dostane ilişkilerin ne denli derin olduğunu gösteriyor. Sayın Karlov’un anısı, iki milletin barış, saygı ve dostluk içinde geleceğe birlikte yürüme kararlılığının bir nişanesi olarak yaşamaya devam edecek.

          </p>
          <p className="card-text">
Sayın Andrey Karlov’u, dostluk ve barış adına verdiği hizmetlerle daima hatırlayacak; kendisini rahmetle ve saygıyla anacağız. Hafızası ebedi olsun.
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

export default AndreyKarlovHatira;
