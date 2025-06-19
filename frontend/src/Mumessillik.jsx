import React from "react";
import BarKurum from "./BarKurum";
import gashigullin from "./images/gashigullin.jpg";
import { Link } from "react-router-dom";
const Mumessillik = () => {
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
            Rusya Federasyonu Ticaret Mümessilliği
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-briefcase text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
            Rusya Federasyonu Ticaret Mümessilliği

        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rusya Federasyonu Ticaret Mümessilliği Hakkında
          </h4>
          <p className="card-text">
            Rusya Federasyonu Ticaret Mümessilliği, Rusya’nın diplomatik
            misyonları bünyesinde faaliyet gösteren ve ülkeler arasında
            ticari-ekonomik ilişkiler, yatırımlar ve bölgesel iş birliklerinin
            geliştirilmesine yardımcı olan resmi bir devlet kurumudur. Bu
            kurumların genel koordinasyonu Rusya Federasyonu Sanayi ve Ticaret
            Bakanlığı tarafından yürütülmektedir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Ticaret Mümessilliğinin Görevleri:
          </h3>
          <p>
            <ul>
              <li>Rusya'nın dış ticaret ilişkilerinin geliştirilmesi,</li>
              <li>
                Rus mal ve hizmetlerinin ihracatının artırılması ve
                çeşitlendirilmesi,
              </li>
              <li>
                İkamet edilen ülkede, Rusya'nın yüksek teknolojili ve ihracat
                odaklı sektörlerinin rekabet avantajlarını destekleyen
                koşulların oluşturulması,
              </li>
              <li>
                Küçük ve orta ölçekli Rus ihracatçı işletmelerin payının
                artırılması,
              </li>
              <li>
                Rusya ile bulunulan ülke arasında sanayi iş birliğinin
                güçlendirilmesi,
              </li>
              <li>
                Rus şirketlerinin uluslararası üretim ve tedarik zincirlerine
                entegrasyonunun teşvik edilmesi.
              </li>
            </ul>
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Ticaret Mümessilliğinin Hizmetleri:
          </h3>
          <p>
            <ul>
              <li>
                İş projeleri için girişimcilere danışmanlık, organizasyonel ve
                bilgi desteği sağlanması,
              </li>
              <li>
                Potansiyel iş ortaklarının bulunması ve bu ortakların
                güvenilirliklerinin değerlendirilmesine yardımcı olunması,
              </li>
              <li>
                İş yapma alanında hukuki konularda danışmanlık sağlanması,
              </li>
              <li>
                Kongre, fuar ve çeşitli etkinliklere katılım konusunda destek
                verilmesi ve eşlik edilmesi,
              </li>
              <li>
                Devlet ve özel sektör ihalelerine katılım konusunda danışmanlık
                hizmeti sunulması,
              </li>
              <li>
                Rusya’daki iş yapma koşullarına dair detaylı analiz raporlarının
                hazırlanması,
              </li>
              <li>
                Ticari anlaşmazlıkların mahkeme öncesi aşamasında çözümüne
                yönelik destek sağlanması.
              </li>
            </ul>
          </p>
          {/* Director Profile Card - Enhanced */}
              <div className="my-5 w-full px-2 md:w-3/5 mx-auto">
  <div className="card border-0 p-2 shadow-sm mb-3 director-card">
    <div className="row g-0">
      <div className="col-12 col-md-3">
        <img src={gashigullin} className="img-fluid rounded-3 w-full" alt="Aydar Gashigullin" />
      </div>
      <div className="col-12 col-md-9">
        <div className="card-body">
          <h5 className="card-title fw-bold">
            <i className="fa-solid fa-user-tie me-2 text-primary"></i>
            Aydar Gashigullin
          </h5>
          <p className="text-muted mb-2 fst-italic">Rusya Federasyonu Türkiye Cumhuriyeti Ticaret Mümessili</p>
          <div className="quote-container my-3 mt-1 p-1">
            <p className="mb-1">
              <i className="fa-solid sotnicenkoYazi fa-quote-left text-primary d-none"></i>
              Türkiye'de binden fazla Rus şirket faaliyet gösteriyor. Bunların arasında devlet şirketleri, büyük özel holdingler ile orta ve küçük işletmeler bulunuyor. Türk ekonomisindeki Rus yatırımlarının toplam hacmi 30 milyar doları aşıyor. Çeşitlendirilmiştir bir yapısı olan bu yatırımlar enerjiye, metalurjiye, otomotive, petrol arıtmaya, yakıt ve enerji kompleksine yöneliktir.
            </p>
          </div>
          <Link to="/gashigullin" className="btn btn-outline-primary hoverSotn">
            <i className="fa-solid fa-user"></i> Aydar Gashigullin'i Tanıyın
            <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </div>
  </div>
</div>
          <div>
            <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
              Rusya Federasyonu Türkiye Cumhuriyeti Ticaret Mümessilliği -
              Ankara
            </h3>
            <p>
              <span className="fw-bold">Adres:</span>Atatürk Bulvarı No: 106,
              06680, Ankara, Türkiye
              <br />
              <span className="fw-bold">Tel:</span> +90 (312) 425 46 90, +7
              (495) 870 29 21 (Dahili: 27411)
              <br />
              <span className="fw-bold">E-Mail:</span> 
              <a
                href="mailto:ankara@minprom.gov.ru"
              >
                ankara@minprom.gov.ru{" "}
              </a>
            </p>
            <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
              Rusya Federasyonu Türkiye Cumhuriyeti Ticaret Mümessilliği -
              İstanbul
            </h3>
            <p>
              <span className="fw-bold">Adres:</span>Süzer Plaza, Asker Ocağı Caddesi, No: 6, Kat: 16, Ofis No: 1604,
Elmadağ, Şişli, İstanbul, Türkiye, 34367

              <br />
              <span className="fw-bold">Tel:</span>+90 (212) 244 35 87, +7 (499) 346 05 05, +7 (495) 870 29 21 (Dahili: 27413)
              <br />
              <span className="fw-bold">E-Mail:</span> 
              <a
                href="mailto:istanbul@minprom.gov.ru"
              >
                istanbul@minprom.gov.ru 
              </a>
              <br />
              <span className="fw-bold">Web Site:</span> 
              <a
                href="https://tur.minpromtorg.gov.ru/"
              >
                https://tur.minpromtorg.gov.ru/
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

export default Mumessillik;
