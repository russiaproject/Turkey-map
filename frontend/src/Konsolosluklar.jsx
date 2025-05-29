import React from "react";

import bust from "./images/bust.jpg";
import ankaraKonsolosluk from "./images/modernBaskon.jpg";
import istanbulKonsolosluk from "./images/konsolosluk.jpg";
import antalyaKonsolosluk from "./images/antalyaKonsolosluk.jpg";
import trabzonKonsolosluk from "./images/trabzonKonsolosluk.jpg";

import BarKurum from "./BarKurum";

const Konsolosluklar = () => {
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
            Rusya Konsoloslukları
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Bütün Rusya Konsoloslukları
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Bütün Konsolosluklar Hakkında
          </h4>

          <p className="card-text">
            Büyükelçilik ve Konsolosluk Arasındaki Farklar Bir ülkenin başka bir
            ülkedeki vatandaşlarını ve çıkarlarını korumak için kurduğu
            temsilcilikler, genellikle iki ana başlık altında toplanır:
            büyükelçilikler ve konsolosluklar. Bu iki kurum benzer görünse de,
            görevleri ve çalışma alanları bakımından önemli farklılıklar taşır.
          </p>
          <p className="card-text">
            Büyükelçilik, bir devletin başka bir devletteki en üst düzeydeki
            diplomatik temsilcisidir. Genellikle ev sahibi ülkenin başkentinde
            yer alır ve devletler arası siyasi ilişkileri yürütmekle sorumludur.
            Büyükelçiliğin başında bulunan kişi, o ülkenin cumhurbaşkanı ya da
            hükümeti tarafından atanan büyükelçidir. Büyükelçilikler, iki ülke
            arasında anlaşmaların yapılması, siyasi gelişmelerin takibi ve
            hükümetler arası iletişimin sağlanması gibi görevleri yerine
            getirir.
          </p>
          <p className="card-text">
            Konsolosluk ise, daha çok bireysel hizmetlere odaklanır. Pasaport
            yenileme, vize işlemleri, doğum ve ölüm belgeleri düzenleme, evlilik
            işlemleri gibi konularda vatandaşlara destek sağlar. Konsolosluklar,
            sadece başkentte değil, büyük şehirlerde veya Türk vatandaşlarının
            yoğun yaşadığı bölgelerde de bulunabilir. Bu kurumların başında ise
            konsolos ya da başkonsolos bulunur.
          </p>
          {/* istanbul */}
          <div className="mt-5 fotoKonsolosluklarHepsi">
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İstanbul Konsolosluğu:</h3>

            <img src={istanbulKonsolosluk} alt="" />
            <p className="yaziKonsolosluklarHepsi">
              İstanbul Rusya Federasyonu Konsolosluğu
            </p>
            <div>
              <p>
                <span className="fw-bold">Adres:</span> İstiklal Caddesi,
                219-225a, 34430, Beyoğlu, İstanbul, Türkiye
                <br />
                <span className="fw-bold">Tel:</span> ‪(+90212) 292-5101‬
<br />
                <span className="fw-bold">Web Sitesi:</span> <a href="https://istanbul.mid.ru/tr/">https://istanbul.mid.ru/tr/</a>
                <br />
                <span className="fw-bold">Faks: </span>‪+90-312-438-39-52‬, 442-90-20
                <br />
                <span className="fw-bold">E-Mail:</span> <a href="mailto:stambul@mid.ru ">stambul@mid.ru </a>
              </p>
            </div>
          </div>
          {/* Ankara */}
          <div className="mt-4 fotoKonsolosluklarHepsi">
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Ankara Başkonsolosluğu:</h3>

            <img src={ankaraKonsolosluk} alt="" />
            <p className="yaziKonsolosluklarHepsi">
              Ankara Rusya Federasyonu Başkonsolosluğu
            </p>
            <div>
              <p>
  <span className="fw-bold">Adres:</span> Karyağdı sk., No 5, 06692, Çankaya (P.K.35 Kavaklıdere), Ankara TÜRKİYE
  <br />
  <span className="fw-bold">Tel:</span> +90-312-440-94-85, +90-312-439-21-83
  <br />
  <span className="fw-bold">Web Site:</span> <a href="https://turkey.mid.ru/">https://turkey.mid.ru/</a>
<br />
  <span className="fw-bold">Faks: </span>+90-312-440-14-85
  <br />
  <span className="fw-bold">E-Mail:</span> <a href="mailto:ankarakons@yandex.ru">ankarakons@yandex.ru</a>
  <br />
  <span className="fw-bold">Mesai Saatleri:</span> Pazartesi, Çarşamba, Cuma günleri 09.00-12.00
</p>
            </div>
          </div>
          {/* Antalya */}
          <div className="my-4 fotoKonsolosluklarHepsi">
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Antalya Konsolosluğu:</h3>

            <img src={antalyaKonsolosluk} alt="" />
            <p className="yaziKonsolosluklarHepsi">
              Antalya Rusya Federasyonu Konsolosluğu
            </p>
            <div>
              <p>
  <span className="fw-bold">Adres:</span> Rusya Federasyonu Antalya Başkonsolosluğu, Çağlayan Mah., 2011 Sk., No:10, Muratpaşa/Antalya
  <br />
  <span className="fw-bold">Tel:</span> ‪+(90242) 248-32-02‬
  <br />
  <span className="fw-bold">Web Sitesi: </span><a href="https://antalya.mid.ru">https://antalya.mid.ru/tr/</a>
  <br />
  <span className="fw-bold">Faks: </span>‪+(90242) 248-44-68‬
  <br />
  <span className="fw-bold">E-Mail:</span> <a href="mailto:ruskonsant@yandex.ru">ruskonsant@yandex.ru</a>
</p>
            </div>
          </div>
          {/* trabzon */}
           <div className="mt-4 fotoKonsolosluklarHepsi">
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Trabzon Konsolosluğu:</h3>

            <img src={trabzonKonsolosluk} alt="" />
            <p className="yaziKonsolosluklarHepsi">
              Trabzon Rusya Federasyonu Konsolosluğu
            </p>
            <div>
             <p>
  <span className="fw-bold">Adres:</span> Rusya Federasyonu Trabzon Başkonsolosluğu Şehit Refik Cesur Cad.6, Ortahisar/Trabzon, Türkiye
  <br />
  <span className="fw-bold">Tel:</span> ‪+90-462-326-26-00‬
  <br />
  <span className="fw-bold">Web sitesi:</span> <a href="https://trabzon.mid.ru">https://trabzon.mid.ru</a>

  <br />
  <span className="fw-bold">Acil durumlarda iletişim için:</span> ‪+90 534 030 28 89‬
  <br />
  <span className="fw-bold">Faks: </span>‪+90-462-326-26-01‬ – ofis, ‪+90-462-326-26-77‬ – muhasebe
  <br />
  <span className="fw-bold">E-posta:</span> <a href="mailto:trabzon@yandex.ru">trabzon@yandex.ru</a>
</p>
            </div>
          </div>
          <div className="memorial-container my-5">
            <div className="row shadow-lg rounded p-4 memorial-card">
              <div className="col-md-5 text-center memorial-image-col">
                <img
                  src={bust}
                  alt="Andrey Karlov Büstü"
                  className="memorial-image img-fluid"
                />
                <div className="memorial-caption mt-3">
                  <h5>Andrey Gennadyevich Karlov</h5>
                  <p className="text-muted">Rusya Federasyonu Büyükelçisi</p>
                </div>
              </div>
              <div className="col-md-7 memorial-text-col d-flex flex-column">
                <h4 className="memorial-title mb-4">Anma Köşesi</h4>
                <p className="memorial-text">
                  Anma köşesini bura da bitirdikten sonra: Aziz Büyükelçimiz,
                  Rusya Federasyonu Kahramanı Andrey Karlov’u Rahmet ve
                  Minnetle Anıyoruz
                </p>
                <p className="memorial-text">
                  Ekibimle birlikte, Rusya Federasyonu’nun aziz kahramanı,
                  değerli Büyükelçimiz Andrey Karlov’u derin bir saygı, rahmet
                  ve minnetle anıyoruz. Andrey Karlov, Rusya ile Türkiye
                  arasındaki dostluk ve iş birliğini güçlendirmek için büyük bir
                  özveriyle çalışmış, bu yolda hayatını feda etmiş bir diplomasi
                  neferiydi. Onun mirası, iki ülke halkları arasında kurulan
                  anlayış ve dostluk köprüsünün temel yapı taşlarından biri
                  olarak yaşamaya devam edecektir.
                </p>
                <p className="memorial-text">
                  Kendisine Allah’tan rahmet diliyor, hatırasını saygı ve
                  şükranla yâd ediyoruz. Türk-Rus ilişkilerimizi hiçbir eylemin
                  bozmasına izin vermeyeceğiz. Türk gençleri olarak, Avrasya
                  kardeşimiz olan Rusya Federasyonu’yla kıymetli ilişkilerimizin
                  güçlenmesi için var gücümüzle çalışıyoruz. Hiçbir kuvvetin bu
                  ilişkilere zarar vermesine müsaade etmeyeceğiz.
                </p>
              </div>
            </div>
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

export default Konsolosluklar;
