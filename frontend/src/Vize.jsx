import React from "react";
import BarKurum from "./BarKurum";

const Vize = () => {
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
            Rusya Vizesi Alma Süreci

          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rusya Vizesi Alma Süreci

        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Vize Alma Hakkında
          </h4>

          <p className="card-text">
Vize Veren Kurumlar (Rusya Konsoloslukları)
Türkiye’de Rusya Federasyonu adına vize işlemleri gerçekleştiren <span className="fw-bold">temsilcilikler şunlardır:</span>

          </p>
          <ul>
            <li>
                Antalya
            </li>
            <li>Ankara
            </li>
            <li>
                İstanbul
            </li>
            <li>
                Trabzon
            </li>
          </ul>

 <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
Rusya’ya Giriş Amacına Göre Başvurulabilecek Vize Türleri Şunlardır:
          </h3>
          <ul>
            <li>Turistik Vize
                </li>
                <li>
                Ticari Vize
                </li>
                <li>
                    Aile Ziyareti Vizesi
                </li>
                <li>
                    Humaniter (İnsani) Vize
                </li>
                <li>
                Transit Vize
                </li>
                <li>
                Çalışma Vizesi
                </li>
          </ul>
          <p className="card-text">
Her vize türü, başvuru sahibinin ülkeye giriş amacı ve kalış süresine göre farklılık göstermektedir.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
Vize Başvurusu İçin Gerekli Belgeler:
          </h3>
          <ul>
            <li>
                <span className="fw-bold">
                    Pasaport</span> – Vize bitiş tarihinden itibaren en az 6 ay geçerli olmalıdır.
            </li>
            <li>
                <span className="fw-bold">
                    Biyometrik Fotoğraf</span> – 3.5 x 4.5 cm boyutlarında, beyaz arka fonlu ve güncel.

            </li>
            <li>
                <span className="fw-bold">
                    Vize Başvuru Formu
                    </span> – <a href="https://visa.kdmid.ru" target="_blank">https://visa.kdmid.ru</a> adresinden doldurulmalıdır.

            </li>
            <li>
                <span className="fw-bold">Turistik Voucher</span> (turistik vize için)
            </li>
            <li>
                <span className="fw-bold">Otel Rezervasyonu</span>
            </li>
            <li>
                <span className="fw-bold">Gidiş-Dönüş Uçak Bileti Rezervasyonu</span>
            </li>
          </ul>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
Rusya Vize Başvuru Süreci:
          </h3>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            1- Başvuru Formunu Doldurun
          </h3>
          <p>
            <a
              href="https://electronic-visa.kdmid.ru/index_en.html"
              target="_blank"
            >
              https://electronic-visa.kdmid.ru/index_en.html 
            </a> adresine girerek formu doldurun .

          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            2- Vize Ücretini Ödeyin
          </h3>
          <p>
            Vize başvuru ücretleri yalnızca Rusya Vize Başvuru Merkezi'nde ve nakit olarak ödenebilmektedir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            3-Başvuruyu Gönderin

          </h3>
          <p>
Gerekli bilgileri girdikten sonra başvurunuzu gönderin.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
4-Bildirim Alın
          </h3>
          <p>
           E-posta veya sistem üzerinden e-vize onayı bildirimini alın.

          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
5-Bildirimi Kaydedin
          </h3>
          <p>
           Bu bildirimi yazdırın veya telefonunuza kaydedin.

          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            6-Taşıyıcı Kuruma Gösterin

          </h3>
          <p>
Ulaşım sağlayan kurumun görevlisine bildirimi ibraz edin.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
7-Sınır Kontrol Noktasında Gösterin

          </h3>
          <p>
Rusya’ya girişte sınır görevlisine bildirimi göstererek ülkeye giriş yapın.
          </p>
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

export default Vize;
