import React from "react";
import BarKurum from "./BarKurum";

const Rt = () => {
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
Rt Rusya Haber Kanalı          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
Rt Rusya Haber Kanalı        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            RT Hakkında
          </h4>

          <p className="card-text">
2005 yılında ilk uluslararası yayınını gerçekleştiren RT (Russia Today), günümüzde dünyanın en büyük ve etkili küresel haber televizyon ağlarından biridir. Güncel haberler, analizler, yorumlar ve belgeseller üreten RT; İngilizce, Arapça, İspanyolca, Fransızca, Almanca, Sırpça, Çince, Hintçe, Portekizce ve Rusça olmak üzere toplam 10 farklı dilde yayın yapmaktadır. RT'nin medya yapısının önemli bir bileşeni olan Ruptly ise multimedya haber ajansı olarak küresel çapta faaliyet göstermektedir. Bugün RT’nin yayınları 100’den fazla ülkede 900 milyondan fazla izleyiciye ulaşmakta, yalnızca 2024 yılı içinde çevrimiçi platformlarda 23 milyardan fazla görüntülenme elde edilmiştir.

          </p>

          <p className="card-text">
RT, izleyicilerini olayları sorgulamaya teşvik eden özgün bir habercilik anlayışıyla hareket eder. Ana akım medyada yer bulamayan ya da göz ardı edilen konuları ele alarak, küresel gelişmelere alternatif bakış açıları ve Rusya perspektifinden yorumlar sunar. 
RT bünyesinde 2013 yılında kurulan Ruptly haber ajansı, özellikle BRICS ülkeleri ve Küresel Güney’e odaklanarak güncel video haberleri, viral içerikler ve canlı yayınlar sunar. Sosyal, siyasi, kültürel ve sportif alanlardaki olayları kapsayan geniş bir içerik yelpazesine sahip olan ajans, aynı zamanda Rusya liderliğinin uluslararası temaslarında teknik yayın desteği sağlamaktadır. Bugün Ruptly, 133 ülkede yaklaşık 2500 kurumsal müşteri için her ay 1.500’den fazla haber ve 300 canlı yayın üretmektedir.

          </p>
                    <p className="card-text">
RT, gazetecilik alanında yeni nesilleri yetiştirmek amacıyla 2016 yılında Moskova’da RT School adlı bir eğitim programı başlatmış, 2024 itibarıyla uluslararası düzeye taşıdığı RT Academy üzerinden yabancı dillerde de eğitim vermeye başlamıştır. Bugüne dek 50’den fazla ülkeden 3.000’den fazla genç gazeteci ve blog yazarı, RT’nin seçkin eğitim programlarından mezun olmuştur.


          </p>
                    <p className="card-text">

RT, Rusya’dan Emmy Ödülleri’ne aday gösterilen tek televizyon kanalıdır. Musul’daki insani kriz, Guantanamo’daki açlık grevi, Wall Street protestoları gibi olaylara dair yaptığı yayınlarla 11 kez Emmy finalisti olmuştur. Ayrıca Auschwitz-Birkenau kampının kurtuluşunun 75. yılına ithafen hazırladığı “Auschwitz’in Dersleri” adlı VR projesiyle de belgesel dalında Emmy adaylığı elde etmiştir. RT America’nın “Boom Bust” adlı ekonomi programı grafik tasarım dalında Emmy finalistleri arasına girmiş, Pulitzer ödüllü Chris Hedges’in sunduğu “On Contact” programı ise RT’ye ilk Gündüz Emmy adaylığını kazandırmıştır.

          </p>
                    <p className="card-text">
RT, ayrıca New York Festivals, Monte Carlo TV Festivali, Cannes Lions, Webby, Lovies, Shorty, Uluslararası Yayıncılık Birliği ve Asya-Pasifik Yayın Birliği gibi pek çok prestijli uluslararası medya organizasyonundan ödüller almıştır. RT, dijital medya ve yeni nesil teknolojilerden faydalanarak interaktif haber projeleri, belgeseller, animasyonlar ve eğitici içerikler üretmekte, böylece güncel haberciliği çok boyutlu bir medya deneyimine dönüştürmektedir.


          </p>
                    <p className="card-text">
Küresel habercilikte Rusya'nın sesini dünyaya duyuran RT, yalnızca haber sunan bir kuruluş olmanın ötesinde; dünya olaylarına farklı perspektifler getiren, dijital çağın gerekliliklerini yerine getiren ve alternatif bakış açılarına alan açan etkili bir uluslararası medya ağı olarak ön plana çıkmaktadır.
          </p>
       <p>
              <span className="fw-bold">Web Sitesi: </span> 
              <a
                href="https://www.rt.com/" target="_blank"
              >
https://www.rt.com/            </a>
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

export default Rt;
