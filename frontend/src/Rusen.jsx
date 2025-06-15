import React from "react";
import BarKurum from "./BarKurum";

const Rusen = () => {
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
            Rusen
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-school text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Rusen</h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rusya Araştırmaları Enstitüsü (RUSEN)
          </h4>
          <p className="card-text">
            Rusya Araştırmaları Enstitüsü (RUSEN), Rusya ve Avrasya
            coğrafyasındaki toplumlararası etkileşim, duyarlılık ve dayanışmanın
            artırılmasını amaçlayan, Türkiye merkezli entelektüel bir sivil
            toplum kuruluşudur.
          </p>
          <p className="card-text">
            RUSEN, Rusya ve Avrasya bölgesinde bulunan kadim kültür ve
            medeniyetlerin edebiyat, dil bilim, sanat, mimari, arkeoloji,
            felsefe, tarih, siyaset bilimi ve iktisat alanlarında daha
            derinlemesine incelenmesi için çalışmalar yapar. İlgili ülkelerin
            üniversiteleri, sivil toplum kuruluşları, resmi kültür merkezleri ve
            alanın önde gelen entelektüelleriyle kurumsal ve bireysel düzeyde
            işbirliği yaparak etkinlikler düzenlemektedir.
          </p>
          <p className="card-text">
            Enstitü, Rusya ve Avrasya bölgesindeki ülkelerin köklü geçmişine,
            gelişmişlik düzeyine, öz kültürüne ve içişlerine tam bir saygıyla
            yaklaşır. Karşılıklı kültürel tanıma, anlama ve etkileşim
            süreçlerini güçlendirmeyi hedeflemektedir.
          </p>
          <p className="card-text">
            RUSEN, Türkiye’nin Rusya ile olan tarihî, ekonomik, siyasi ve askerî
            ilişkilerini daha iyi anlaşılır kılmak için akademik ve kültürel
            faaliyetler düzenler. Yapılan araştırmalar Türkiye, Rusya ve Avrasya
            coğrafyasında uluslararası kamuoyuna sunulur. İki ülke arasındaki
            ilişkilerin tarihî rekabet yerine karşılıklı anlayış ve işbirliği
            temeline oturması hedeflenir.
          </p>
          <p className="card-text">
            RUSEN'in çalışmalarında, Rusya'nın SSCB sonrası dönemde Avrasyacılık
            felsefesi çerçevesinde Çin, Orta Asya, İran ve Türkiye ile kurmaya
            çalıştığı ekonomik, siyasi ve kültürel işbirliği girişimleri de
            önemli yer tutmaktadır. Avrasya bölgesinin küresel üstünlük
            mücadelesinin merkezi olduğuna vurgu yapan enstitü, Avrasya Ekonomi
            Birliği, Yeni İpek Yolu Ekonomi Kuşağı, Türk Konseyi ve Büyük Orta
            Asya Projesi gibi girişimleri takip etmekte ve değerlendirmektedir.
          </p>
          <p className="card-text">
            RUSEN, Türkiye'nin Batılı müttefikleriyle ilişkilerinin
            karmaşıklaştığı dönemlerde Rusya ile artan işbirliği potansiyelini
            araştırmalarıyla desteklemeyi amaçlamaktadır. Türkiye’de bağımsız
            Rusya araştırmaları yapan bir enstitünün bulunmadığını ve bu alanda
            uzmanlık düzeyinde çalışmaların yetersiz olduğunu belirten RUSEN,
            Rusya'nın daha iyi anlaşılması için önemli bir eksikliği gidermeyi
            amaçlamaktadır.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Temel İlkeleri:
          </h3>
          <p>
            <ul>
              <li>
                Evrensel değerlere, insan onuruna, bireysel potansiyele, ifade
                ve düşünce özgürlüğüne inanmak.
              </li>
              <li>Dünyayı tüm insanlığın ortak yaşam alanı olarak görmek.</li>
              <li>
                Kadim kültür ve medeniyetlerin daha iyi tanınmasına öncelik
                vermek.
              </li>
              <li>
                Rusya ve Avrasya coğrafyasında her türlü yapıcı etkileşimi
                teşvik etmek.
              </li>
              <li>
                Karşılıklı yarar temelinde bölgesel güvene, dayanışmaya ve
                işbirliğine önem vermek.
              </li>
              <li>
                Ortak coğrafya ve tarih bilincinden hareketle entelektüel
                düzeyde yakınlaşmayı arzulamak.
              </li>
              <li>
                yüzyılın kaotik görünümünün bertaraf edilmesinde Türkiye, Rusya
                ve Avrasya ülkelerinin kaderdaş olduğunu düşünmek.
              </li>
              <li>
                Rusya, Türkiye ve Avrasya ülkelerinin gelişmişlik düzeyine, öz
                kültürüne ve iç işlerine saygılı olmak.
              </li>
              <li>
                Rusya, Türkiye ve Avrasya coğrafyasındaki benzer duygu ve
                düşünceyi taşıyan sivil oluşumlarla işbirliğine hazır olmak.
              </li>
            </ul>
          </p>

          <div>
            <p>
              <span className="fw-bold">Yönetim Adresi:</span> Çukurambar/Ankara
              <br />
                 <span className="fw-bold">Website:</span> <a href="https://www.rusen.org/" target="_blank">https://www.rusen.org/</a>
              <br />
              <span className="fw-bold">E-Mail:</span> 
              <a
                href="mailto:rusencenter@gmail.com
"
              >
                rusencenter@gmail.com
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

export default Rusen;
