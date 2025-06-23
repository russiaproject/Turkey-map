import React from "react";
import BarKurum from "./BarKurum";

const Tass = () => {
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
Tass Rusya Haber Ajansı
</li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-tv text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
         Tass Rusya Haber Ajansı
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Tass Hakkında
          </h4>

          <p className="card-text">
          TASS, Rusya'nın önde gelen ve en köklü devlet haber ajansıdır. 1 Eylül 2024 tarihinde kuruluşunun 120. yılını kutlayan ajans, kökenini 1904 yılında faaliyetlerine başlayan Sankt-Peterburg Telgraf Ajansı'na dayandırmaktadır. Geniş muhabir ağı ve teknolojik altyapısıyla TASS, küresel medya alanında saygın ve etkili bir haber sağlayıcısı konumundadır.

          </p>

          <p className="card-text">
Ajans, dünya genelinde 54 ülkede 59 temsilcilik ve Rusya genelinde 68 yerel büro ile faaliyet göstermektedir. Günlük yaklaşık 3.000 haber ve 1.000'e yakın fotoğraf ve video içeriği yayınlayan TASS, 6 dilde yayın yapan haber akışlarıyla uluslararası izleyici kitlesine ulaşmaktadır. Ajansın medya bankasında 65 milyonun üzerinde içerik bulunmakta olup, bunların 1,2 milyonu 20. yüzyıl başlarından itibaren arşivlenmiş özgün tarihi fotoğraflardır.

          </p>
               <p className="card-text">
Ajans, sadece haber üretimiyle değil, aynı zamanda medya teknolojileri geliştirme, veri analiz sistemleri sunma, eğitim programları düzenleme ve küresel medya kuruluşlarıyla iş birliği yürütme alanlarında da aktif rol üstlenmektedir. TASS, UNESCO bünyesindeki İletişim Geliştirme Programı ve çeşitli uluslararası medya birliklerinde temsil edilmektedir. 2024 yılında TASS, Rusya Federasyonu Başkanı’nın kararıyla "Onurlu Emek Nişanı" ile ödüllendirilmiştir.


          </p>
               <p className="card-text">
TASS'ın özel projeleri; tarih, uzay, müzik, mimari, yapay zekâ, mühendislik ve sosyal konular gibi birçok alanda bilgilendirici ve etkileşimli içerikler sunmakta, hem ulusal hem de uluslararası basın ödüllerine layık görülmektedir. Ayrıca medya eğitimine yönelik olarak kurulan "TASS Haber Akademisi", gazeteciler ve iletişim profesyonellerine yönelik kapsamlı programlar sunmaktadır.


          </p>
               <p className="card-text">
TASS, dijital çağın gereklerine uygun olarak haber terminali, medya bankası, reklam çözümleri ve içerik servisleriyle medya sektörüne yenilikçi çözümler sunmayı sürdürmektedir. Ajansın web platformu <a href="tass.ru" target="_blank">tass.ru</a>'nun yıllık kullanıcı sayısı 132 milyonu aşarken, sosyal medya platformlarında toplam takipçi sayısı 4,6 milyonu geçmiştir.



          </p>
               <p className="card-text">
TASS, 2024 yılı içerisinde 310'dan fazla ulusal ve uluslararası etkinliğe medya ortağı olarak destek vermiş; siyaset, ekonomi, kültür ve bilim alanlarında liderleri bir araya getiren önemli forumların organizasyonlarında aktif rol oynamıştır.

          </p>
               <p className="card-text">
Köklü geçmişi, güçlü kadrosu ve uluslararası iş birlikleriyle TASS, sadece Rusya'nın değil, küresel basının da güvenilir bilgi kaynaklarından biri olmayı sürdürmektedir.
          </p>
                      <p>
              <span className="fw-bold">Web Sitesi: </span> 
              <a
                href="https://tass.ru/" target="_blank"
              >
https://tass.ru/              </a>
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

export default Tass;
