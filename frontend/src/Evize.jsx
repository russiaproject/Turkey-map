import React from "react";
import BarKurum from "./BarKurum";
import evizeAlmak from "./images/evizeAlmak.jpg"
const Evize = () => {
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
            Rusya E-Vize
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rusya E-Vizesi ile Kolay ve Hızlı Seyahat
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            E-Vize Nedir ve Nasıl Alınır
          </h4>
          <img src={evizeAlmak} className="mt-4 evizeFotoResponsive" style={{width:"70%"}} alt="E-vize Alma rehberi" />

          <p className="card-text">
            Rusya Federasyonu’nu kısa süreli olarak ziyaret etmek isteyen
            yabancı ülke vatandaşları için elektronik vize (e-vize) uygulaması,
            hızlı ve pratik bir çözüm sunuyor. Bu sistem sayesinde yalnızca
            birkaç adımda vizenizi alabilir, Rusya’ya sorunsuz şekilde seyahat
            edebilirsiniz.
          </p>

          <p className="card-text">
            E-vize sistemi, Rusya Hükûmeti tarafından onaylanan belirli ülke
            vatandaşları için geçerlidir ve yalnızca belirlenen sınır
            kapılarından giriş-çıkış yapılmasına izin verir. E-vize ile
            turistik, ticari, kültürel, bilimsel ve sportif etkinliklere katılım
            gibi çeşitli amaçlarla Rusya’ya giriş yapılabilir. Bu vize türü,
            davet mektubu veya otel rezervasyonu gibi belgeler gerektirmez.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            1- Başvuru Formunu Doldurun
          </h3>
          <p>
            <a
              href="https://electronic-visa.kdmid.ru/index_en.html"
              target="_blank"
            >
              https://electronic-visa.kdmid.ru/index_en.html 
            </a> adresine girerek çevrimiçi anketi doldurun. Dilerseniz QR kodu
            okutarak da başvuru sayfasına ulaşabilirsiniz.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            2- E-Vize Ücretini Ödeyin
          </h3>
          <p>
            Başvuru formunu tamamladıktan sonra sistem sizi ödeme ekranına
            yönlendirecektir. Uluslararası banka kartlarıyla güvenli bir şekilde
            ödemenizi gerçekleştirin.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            3- Onay Bildirimini Alın
          </h3>
          <p>
            Başvurunuz incelendikten sonra onay bildirimi, e-posta yoluyla ya da sistem üzerinden size iletilecektir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            4-Bildirimi Kaydedin veya Yazdırın
          </h3>
          <p>
            Size gönderilen bildirimi bir yazıcıdan çıktı alın ya da mobil cihazınıza kaydedin. Bu belgeyi yolculuk boyunca yanınızda bulundurmanız gerekir.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            5-Ulaşım Görevlisine Bildirimi Gösterin
          </h3>
          <p>
            Uçağa, otobüse veya trene binerken ulaşım sağlayan kurumun görevlisine e-vize bildiriminizi ibraz edin.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            6- Sınır Kontrol Noktasında Sunun
          </h3>
          <p>
            Rusya'ya girişte, sınır kontrol memuruna e-vize bildiriminizi göstererek ülkeye sorunsuz şekilde giriş yapın.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Bilmeniz Gereken Önemli Detaylar:
          </h3>
          <ul>
            <li><span className="fw-bold">Tek girişlidir. </span> Her başvuru yalnızca bir defa giriş hakkı verir.</li>
            <li><span className="fw-bold">Geçerlilik süresi </span> Vize veriliş tarihinden itibaren 60 gün.</li>
            <li><span className="fw-bold">Rusya'da kalış süresi </span> Giriş tarihinden itibaren en fazla 16 gün. Giriş ve çıkış günleri de bu süreye dâhildir.

</li>
            <li><span className="fw-bold">Tıbbi seyahat sigortası </span> zorunludur (bazı ülkeler hariç).</li>
            <li><span className="fw-bold">Pasaportunuzun </span>  en az 6 ay geçerli olması ve makineyle okunabilir nitelikte olması gerekmektedir.
</li>
            <li><span className="fw-bold">Çocuklar için</span>  ayrı başvuru yapılmalıdır. Her çocuk için bireysel e-vize alınması zorunludur.
</li>
            <li><span className="fw-bold">Halihazırda geçerli bir Rusya vizeniz varsa</span>  e-vize almanıza gerek yoktur.</li>


          </ul>

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

export default Evize;
