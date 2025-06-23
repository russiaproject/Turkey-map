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
            LUKOIL 
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-school text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">LUKOIL </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            LUKOIL Hakkında
          </h4>
          <p className="card-text">
           PJSC LUKOIL Oil Company (Rusça: Лукойл, LUKOIL veya ЛУКОЙЛ), merkezi Moskova’da bulunan Rusya merkezli çok uluslu bir enerji şirketidir. Şirket, petrol, doğalgaz, petrol ürünleri ve elektrik üretimi, taşımacılığı ve satışı alanlarında faaliyet göstermektedir.
          </p>
          <p className="card-text">
         LUKOIL, 1991 yılında Batı Sibirya'da yer alan üç devlet şirketinin birleşmesiyle kurulmuştur: Langepasneftegaz, Urayneftegaz ve Kogalymneftegaz. Bu şirketler adlarını bulundukları şehirlerden almıştır (Langepas, Uray, Kogalym). Şirketin adı da bu şehirlerin baş harflerinden oluşan "LUK" ile İngilizce “oil” (petrol) kelimesinin birleşiminden oluşmuştur.

          </p>
          <p className="card-text">
            Rusya'nın en büyük özel şirketi olan LUKOIL, ülkenin en büyük üçüncü şirketi konumundadır (Rosneft ve Gazprom’dan sonra). 2018 yılında 4,744 milyar ruble gelir elde eden şirket, 2020 Forbes Global 2000 listesinde dünyanın en büyük 99. halka açık şirketi olarak yer almıştır.

          </p>
          <p className="card-text">
            Uluslararası alanda da önemli bir oyuncu olan LUKOIL, 2019 yılında günlük 1,639 milyon varil (yılda 87,488 milyon ton) ham petrol ve 35,046 milyar metreküp doğalgaz üretmiştir. 2021 yılında 30'dan fazla ülkede faaliyet gösteren şirketin, 2025 itibarıyla faaliyet yürüttüğü ülke sayısı 14'e düşmüştür. 2022 yılında 2,9 trilyon ruble gelir elde eden LUKOIL’in 2024 yılı geliri 3 trilyon rubleye ulaşmıştır.

          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Türkiye’de LUKOIL:
          </h3>
          <p className="card-text">
            LUKOIL, Türkiye pazarında 1998 yılından itibaren faaliyet göstermektedir. 2006 yılında Enerji Piyasası Düzenleme Kurumu'ndan (EPDK) akaryakıt dağıtım lisansı alarak pazara hızlı bir giriş yapmıştır. Türkiye’deki konumunu güçlendirmek amacıyla 2008 yılında Akpet şirketini satın alarak sektördeki varlığını artırmıştır.

          </p>
          <p className="card-text">
           Günümüzde LUKOIL Eurasia Petrol A.Ş. ve iştiraki Akpet Akaryakıt Dağıtım A.Ş., Türkiye genelinde yaklaşık 600 istasyon ile akaryakıt dağıtım sektöründe faaliyet göstermeye devam etmektedir.

          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Yatırım Stratejisi:
          </h3>
<p className="card-text">
  <span className="fw-bold">
           LUKOIL, Türkiye'deki ilk istasyon ağının kurulmasıyla birlikte üç temel yatırım stratejisi benimsemiştir:
  </span>
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            1. Rekabet:
          </h3>
          <p className="card-text">
            Müşterilere Türkiye'nin her yerinden kolayca ulaşılabilir lokasyonlarda, güvenilir bayilerle birlikte yüksek standartlara ve teknolojik altyapıya sahip istasyonlar kurmaktadır. Kaliteli ürünleri, güler yüzlü hizmet anlayışıyla ve uygun fiyata sunmak, rekabet stratejisinin temelini oluşturur.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            2. Büyüme:
          </h3>
          <p className="card-text">
           2008’de Akpet’i satın alarak geniş bir istasyon ağına ve güçlü lojistik altyapıya kavuşan LUKOIL, şehir merkezleri ve ana bağlantı yollarına yaptığı yatırımlarla büyümeye devam etmektedir. Operasyonu yapılan istasyon şebekesinin genişletilmesi de bu stratejinin bir parçasıdır.

          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-6">
            3. Esnek Yatırım Modelleri:
          </h3>
          <p className="card-text">
            LUKOIL, klasik yatırım anlayışının yanı sıra her lokasyon, bayi ve müşterinin beklentilerini ayrı ayrı değerlendirerek güncel ve rekabetçi esnek yatırım formülleri uygulamaktadır. Bu yaklaşım hem bayileri hem de müşterileri memnun etmekte, yatırımların verimliliğini artırmaktadır.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Yönetim ve İnsan Kaynakları:
          </h3>
          <p className="card-text">
            İktisat ve İşletme bölümünden mezun olan Mihajlo Djurović, kariyerine Rusya ve Sırbistan'daki çeşitli şirketlerde devam ettikten sonra son üç yıldır LUKOIL Georgia'nın Genel Müdürü olarak görev yapmıştır. Daha önce LUKOIL Montenegro’da da görev yapan Djurović, evli ve iki çocuk babasıdır. Şirketin yeniden yapılanma sürecini tamamlayan yeni yönetim kadrosu, Türkiye'deki üstün ürün ve hizmet kalitesini her lokasyonda homojen şekilde sunmayı hedeflemektedir.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Sürdürülebilirlik ve Ürün Kalitesi:
          </h3>
          <p className="card-text">
          LUKOIL, stratejik geliştirme programı kapsamında SEÇ-S (Sağlık, Emniyet, Çevre ve Sosyal Sorumluluk) standartlarına ve yakıt kalite güvencesine büyük önem vermektedir. Yılda 4 milyondan fazla araca akaryakıt dolumu gerçekleştirilen LUKOIL istasyonlarında, ürün kalitesini yüksek tutmak adına ciddi yatırımlar ve araştırmalar yürütülmektedir.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Bayi İlişkileri ve Gelecek Vizyonu:
          </h3>
          <p className="card-text">
LUKOIL, müşteri odaklı yeni işbirliği modelleri geliştirerek bayi ilişkilerini yeniden yapılandırmaktadır. Tüketicilerin yakıt tasarrufu konusundaki artan hassasiyeti ve kalite beklentileri doğrultusunda, ortak projelerle bayilik sisteminin temelleri bu yönde şekillendirilmektedir.
          </p>
<p className="card-text">
  LUKOIL’in dünya markası olması, bayilerle iletişimde her aşamada olumlu etki yaratmaktadır. Şirketin perakende satış ağı; Azerbaycan, Gürcistan, Rusya, ABD, BDT ve Avrupa ülkeleri dahil olmak üzere yaklaşık 27 ülkede 6.000 istasyona ulaşmıştır. Tüm istasyonlarda, LUKOIL’e özgü yüksek hizmet, çevre ve güvenlik standartlarına uygun çevre dostu ECTO yakıtları sunulmaktadır.

</p>
<p className="card-text">
Yeni yönetim, bu güçlü imajı sürdürmek adına bayilerle ortak sorumluluk içeren projelere imza atmaktadır.
</p>
 <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Hedefler:
          </h3>
          <p className="card-text">
            LUKOIL’in önümüzdeki dönemdeki temel hedefi, Türkiye'deki akaryakıt satış hacmini artırmak ve dağıtım kanallarını daha da genişletmektir.
          </p>
          <div>
            <p>
              <span className="fw-bold">Adres:</span> Gazeteci Ümit Deniz Sok., No.12, 3. Levent, İSTANBUL
              <br />
                 <span className="fw-bold">Website:</span> <a href="https://www.lukoil.com.tr" target="_blank">https://www.lukoil.com.tr</a>
              <br />
              <span className="fw-bold">Telefon:</span> <a href="tel:+902122829471" target="_blank">+90-212-282-94-71</a>
              <br />
              <span className="fw-bold">Fax:</span> +90-212-282-94-68
              <br />
              <span className="fw-bold">E-Mail:</span> 
              <a
                href="mailto:info@lukoil.com.tr"
              > info@lukoil.com.tr
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
