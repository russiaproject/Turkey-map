import React from "react";
import BarKurum from "./BarKurum";

const Sberbank = () => {
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
            SberBank Rusya Bankası
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-ruble-sign text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">SberBank Rusya Bankası </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            SberBank Hakkında
          </h4>

          <p className="card-text">
            Sberbank, Rusya'nın en eski ve en büyük finans kuruluşudur. Kuruluş
            kökleri, 1841 yılında İmparator I. Nikolay tarafından çıkarılan bir
            kararnameye dayanmaktadır. Bu kararnamenin ardından açılan ilk
            tasarruf kasaları, 19. yüzyıl Rusya’sında tasarrufu teşvik eden
            devlet güvenceli kurumlar olarak ortaya çıkmıştır. Bugün Sber,
            dijital çözümleri, kullanıcı dostu uygulamaları ve geniş müşteri
            tabanı ile yalnızca bir banka değil; aynı zamanda tam kapsamlı bir
            teknoloji ekosistemidir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Tarihî Gelişim Süreci:
          </h3>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1841–1861:</h5>
          <p className="card-text">
            12 Kasım 1841’de İmparator Nikolay I’in imzasıyla kurulan ilk
            tasarruf kasası, halkın güvenli şekilde birikim yapmasını sağlamak
            amacıyla açıldı. İlk müşteri, 1 Mart 1842’de 10 ruble yatıran
            Nikolay Kristofari oldu.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1862–1895:</h5>
          <p className="card-text">
            İmparator II. Aleksandr’ın çıkardığı yeni yasa ile tüm şehir ve
            kasabalarda tasarruf kasalarının kurulması sağlandı. 1895'e kadar
            3875 şube açıldı ve halkın tasarrufları 368 milyon rubleye ulaştı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1895–1916:</h5>
          <p className="card-text">
            Tasarruf kasaları yaygınlaştı, sigorta hizmetleri sunmaya başladı.
            1902 itibariyle donanma gemilerinde dahi şubeler vardı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1917–1940:</h5>
          <p className="card-text">
            Sovyetler döneminde Gostrudsberkassa’ya dönüştü. Devlet tahvilleri
            aracılığıyla sanayileşme finansmanı sağlandı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1941–1952:</h5>
          <p className="card-text">
            II. Dünya Savaşı sırasında savunma fonlarına bağış ve borçlanmalarla
            72 milyar ruble toplandı. Bu, savaş masraflarının %15’ini karşıladı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1953–1986:</h5>
          <p className="card-text">
            Sber’in şube sayısı 30 yılda iki katına çıkarak 79 bine ulaştı.
            1986'da 171 milyon hesapta 220 milyar ruble birikmişti. Hizmetler
            maaş ödemeleri ve kamu ödemeleri ile genişledi.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1987–1990:</h5>
          <p className="card-text">
            Perestroyka ile Sberbank SSCB'nin resmi bankası oldu. İlk ATM
            1988’de Moskova’da kuruldu.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">1990–2006:</h5>
          <p className="card-text">
            1991’de Sberbank Rusya adıyla tescil edildi. Uluslararası yatırımlar
            başladı, 2006’da Kazakistan’da banka satın alındı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">2007–2008:</h5>
          <p className="card-text">
            Herman Gref başkan olarak atandı. Yeni vizyon ile dijital ve modern
            bankacılık dönüşümü başlatıldı.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">2009–2016:</h5>
          <p className="card-text">
            Agile yöntemleri benimsendi, çevrim içi hizmetler geliştirildi.
            Sber, dünyanın en değerli finans markaları arasına girdi.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">2017–2020:</h5>
          <p className="card-text">
            Sber, tam anlamıyla teknoloji şirketine dönüştü. Yapay zekâ, siber
            güvenlik ve kültürel projelerle toplumla bütünleşti.
          </p>
          <h5 className="fw-bold text-primary my-4 mb-3 fs-5">2021–günümüz:</h5>
          <p className="card-text">
            Pandemi döneminde halk ve devlet destek programlarında öncü rol
            üstlendi. Telemedisin, dijital devlet hizmetlerinde altyapı sundu.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            2024 Verileri ile Sberbank'ın Etkisi:
          </h3>
          <ul>
            <li>
              - 110,6 milyon aktif bireysel müşteri 3,4 milyon aktif kurumsal
              müşteri
            </li>
            <li>84 milyon aktif Sberbank Online kullanıcısı</li>
            <li>22,1 milyon SberPrime abonesi</li>
            <li>1,9 milyon hissedar</li>
          </ul>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Uluslararası Varlık ve Faaliyet Alanları:
          </h3>
          <p className="card-text">
            , Sberbank, merkez ülkesi Rusya Federasyonu dışında aktif olarak
            Kazakistan, Belarus, İsviçre, Avusturya, Almanya, Çekya ve
            Macaristan gibi ülkelerde faaliyet göstermektedir. Avrupa pazarında
            Sberbank Europe AG ile varlık gösteren banka, uluslararası arenada
            finansal çözümler ve danışmanlık hizmetleri sunmaktadır. Bu küresel
            açılım, Sberbank'ın sadece yerel değil, uluslararası ölçekte de
            önemli bir finansal şirket olmasını sağlamıştır.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Vizyon ve Değerleri:
          </h3>
          <ul>
            <li>Ben – Liderim: Sorumluluk alırım, dürüstüm ve çevreme değer katmak için çalışırım.
</li>
<li>
    Biz – Takımız: Birbirimize destek oluruz, birlikte gelişiriz ve güven ortamı oluştururuz.
</li>
<li>
Her Şey – Müşteri İçin: Tüm çalışmalarımız müşteri memnuniyetini önceler, beklentileri aşmayı hedefleriz.

</li>

          </ul>
               <p>
              <span className="fw-bold">Web Sitesi: </span>  
              <a
                href="https://www.sberbank.ru/" target="_blank"
              >
https://www.sberbank.ru/             </a>
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

export default Sberbank;
