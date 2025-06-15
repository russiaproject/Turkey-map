import React from "react";

import BarKurum from "./BarKurum";

import akkuyuPutinErdogan from "./images/erdogan-putin-akkuyu.jpg";
import dostlukAnlasmasi from "./images/dostluk-anlasmasi.jpg";
import petersburgMeydan from "./images/petersburg-meydan.jpg";
import aliFuatCebesoy from "./images/ali-fuat-cebesoy.jpg";
import turkAkimAcilis from "./images/turk-akim-acilis.jpg";
import ataturkSemyonAralov from "./images/ataturk-semyon-aralov.jpg";

const Dostluk = () => {
  return (
    <div className="container my-5 py-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Türkiye ve Rusya Dostluğu
          </li>
        </ol>
      </nav>

      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-handshake text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Türkiye ve Rusya Dostluğu</h2>
      </div>

      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Türkiye ve Rusya Dostluğu Hakkında
          </h4>

          <p className="card-text">
            Türkiye-Rusya ilişkileri, dostluk ve iş birliği temelinde tarih
            boyunca önemli gelişmeler kaydetmiştir.
          </p>
          <p className="card-text">
            Kurtuluş Savaşı sırasında Sovyetler Birliği, Türkiye'ye kritik
            ekonomik ve askeri desteklerde bulundu. Silah, mühimmat ve maddi
            yardımlar savaşın seyrinde Türkiye'ye önemli avantajlar sağladı.
            Mustafa Kemal öncülüğünde kurulan Büyük Millet Meclisi 23 Nisan
            1920'de Ankara'da açılırken Sovyetlerin desteği de giderek
            artıyordu. Bu yardımlar Rusya'nın Tuapse, Novorosisk ve Batum
            limanlarından alınıp Trabzon'a getiriliyor, oradan da Anadolu'daki
            direnişe gönderiliyordu.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Sovyetler Tarafından Gönderilen İlk Yardım Malzemeleri Şu
            Şekildeydi:
          </h3>

          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th scope="col">Tarih</th>
                <th scope="col">Tüfek</th>
                <th scope="col">Kasatura</th>
                <th scope="col">Sandık Cephane</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22 Eylül 1920</td>
                <td>184</td>
                <td>192</td>
                <td>422</td>
              </tr>
              <tr>
                <td>25 Eylül 1920</td>
                <td>315</td>
                <td>315</td>
                <td>299</td>
              </tr>
              <tr>
                <td>27 Eylül 1920</td>
                <td>191</td>
                <td>191</td>
                <td>59</td>
              </tr>
              <tr>
                <td>1 Ekim 1920</td>
                <td>205</td>
                <td>205</td>
                <td>30</td>
              </tr>
              <tr>
                <td>4 Ekim 1920</td>
                <td>858</td>
                <td>1108</td>
                <td>727</td>
              </tr>
            </tbody>
          </table>

          <p className="card-text">
            Sovyetlerin genç Türkiye Cumhuriyeti'ne yardımları 1920-1922 yılları
            arasında düzenli olarak devam etti. Türk ve Rus kaynaklarında ufak
            farklılıklar olsa da, Kurtuluş Savaşı süresince Anadolu'ya
            gönderilen toplam Sovyet yardımı yaklaşık olarak şu şekildedir:
          </p>

          <table className="table table-striped table-bordered">
            <thead className="table-primary">
              <tr>
                <th scope="col">Malzeme Türü</th>
                <th scope="col">Miktar</th>
                <th scope="col">Birim</th>
                <th scope="col">Yıl</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Tüfek</td>
                <td>39.325</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Tüfek Mermisi</td>
                <td>62.986.000</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Top</td>
                <td>54</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Top Mermisi</td>
                <td>147.079</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>El Bombası</td>
                <td>4.000</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Şarapnel Mermisi</td>
                <td>4.000</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Makineli Tüfek</td>
                <td>327</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Gaz Maskesi</td>
                <td>20.000</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Kılıç</td>
                <td>1.500</td>
                <td>Adet</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Altın</td>
                <td>200,6</td>
                <td>kg</td>
                <td>Erzurum, Eylül 1920</td>
              </tr>
              <tr>
                <td>Altın Ruble</td>
                <td>10.000.000</td>
                <td>Adet</td>
                <td>Nisan 1921 - Mayıs 1922</td>
              </tr>
            </tbody>
          </table>

          <p className="card-text">
            Bunlara ek olarak, 3 Ekim 1921'de Jivo ve Jutkoy adlı iki destroyer
            Sovyetler Birliği tarafından Trabzon'da Ankara hükümetine hibe
            edilmiştir.
          </p>

          <p className="card-text">
            Türkiye Büyük Millet Meclisi'nin açılmasının hemen ardından, Mustafa
            Kemal Atatürk, 26 Nisan 1920 tarihinde Sovyetler Birliği'nin
            kurucusu Vladimir Lenin'e karşılıklı dostluk ve ilişki kurma
            teklifini içeren bir mektup gönderdi. Sovyet Dışişleri Komiseri
            Georgi Çiçerin, 3 Haziran 1920 tarihinde mektuba olumlu yanıt
            vererek diplomatik ilişkilerin başlangıcını sağladı.
          </p>

          <p className="card-text">
            İlk Türk büyükelçisi Ali Fuat Cebesoy, 21 Kasım 1920'de Moskova'ya
            atanırken, ilk Rus diplomat olan Semyon Aralov 15 Aralık 1920'de
            Ankara'da göreve başladı. Diplomatik ilişkiler, 16 Mart 1921'de
            imzalanan Moskova Antlaşması ile resmileşti ve dostluk ile kardeşlik
            ruhuyla pekiştirildi.
          </p>

          <p className="card-text">
            1932 yılında Türkiye'ye verilen ve Kayseri ile Nazilli'de tekstil
            fabrikalarının inşasında kullanılan Sovyet kredisi, ekonomik
            ilişkileri güçlendiren somut adımlardan biri oldu.
          </p>

          <p className="card-text">
            1950'lerden itibaren ilişkiler yeniden ivme kazandı. 1958'de
            Sovyetler Birliği'nin sağladığı kredi ile Çarova'da cam fabrikası
            kuruldu. Türkiye, bu yatırımlar sayesinde birçok sektörde kendi
            kendine yeter hale geldi.
          </p>

          <p className="card-text">
            1980'li yıllarda Sovyetler Birliği, Türkiye'ye doğal gaz ihracatına
            başlayarak ekonomik ilişkileri stratejik boyuta taşıdı. Sovyetler'in
            dağılmasının ardından Türkiye ile Rusya arasındaki ilişkiler
            ekonomik, turistik ve kültürel alanlarda derinleşti. 2000'li
            yıllardan itibaren turizm sektöründeki iş birliği büyük ilerleme
            kaydetti; Rusya, Türkiye için önemli bir turist kaynağı haline
            geldi.
          </p>

          <p className="card-text">
            Son yıllarda Türkiye Cumhurbaşkanı Recep Tayyip Erdoğan ve Rusya
            Devlet Başkanı Vladimir Putin arasındaki samimi ve yapıcı diyalog
            sayesinde ilişkiler stratejik düzeye yükseldi.
          </p>

          <p className="card-text">
            Bugün Türkiye-Rusya ilişkileri; enerji, turizm ve savunma sanayisi
            gibi alanlarda stratejik projelerle güçlenmektedir. Akkuyu Nükleer
            Güç Santrali ve TürkAkım Doğal Gaz Boru Hattı gibi projeler,
            ilişkilerin derinleştiğinin göstergesidir. Bu ilişkiler, karşılıklı
            güven ortamının güçlendirilmesi ve samimi diyaloğun sürdürülmesi
            esasına dayanarak gelecekte de güçlü bir şekilde devam edecektir.
          </p>

          <p className="card-text">
            Mustafa Kemal Atatürk'ün şu sözleri, bu dostluğun önemini ortaya
            koymaktadır: "Eğer Rusya'nın desteği olmasaydı, yeni Türkiye'nin
            istilacılara karşı kazandığı zafer, çok daha büyük kayıplarla elde
            edilebilirdi hatta belki de hiç mümkün olmazdı. Rusya, Türkiye'ye
            hem manevi hem de maddi anlamda yardımda bulunmuştur. Milletimizin
            bu yardımı unutmaması, bir vefa borcudur."
          </p>

          <p className="card-text">
            Bu vefa duygusunun bir nişanesi olarak, Taksim'deki Cumhuriyet
            Anıtı'nda Mustafa Kemal, İsmet İnönü ve Fevzi Çakmak'ın yanı sıra
            iki Sovyet komutanı General Voroşilov ve General Frunze'nin
            heykelleri de yer almaktadır. Bu heykeller, Mustafa Kemal'in
            önerisiyle, Türk milletinin Kurtuluş Savaşı'ndaki dostlarını
            unutmadığını göstermek üzere anıta dahil edilmiştir.
          </p>

          <p className="card-text">
            Ülkemizin Moskova'da Büyükelçiliği; Kazan, Novorossisk ve St.
            Petersburg'da muvazzaf Başkonsoloslukları, Yekaterinburg'da ise
            Fahri Konsolosluğu bulunmaktadır. Rusya Federasyonu'nun ise
            Ankara'da Büyükelçiliği; Antalya, İstanbul ve Trabzon'da muvazzaf
            Başkonsoloslukları; İzmir'de Fahri Konsolosluğu mevcuttur.
          </p>

          <div className="row g-0 my-4 mt-5">
            <div className="col-lg-6">
              <div className="text-center">
                <img
                  src={aliFuatCebesoy}
                  className="rounded shadow-sm"
                  style={{ width: "90%", objectFit: "cover" }}
                  alt="Ali Fuat Cebesoy"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-3">
                <h5 className="text-primary fw-bold mb-3">
                  Diplomatik İlişkilerin Başlangıcı
                </h5>
                <p className="card-text">
               İlk Türk büyükelçisi Ali Fuat Cebesoy, Türkiye ile Sovyetler Birliği arasında gelişen dostane ilişkilerin bir yansıması olarak, 21 Kasım 1920 tarihinde Moskova’ya atanmıştır. Bu adım, henüz Türkiye Cumhuriyeti resmen kurulmadan önce, Anadolu’da kurulan yeni yönetimin uluslararası alanda tanınması ve diplomatik ilişkilerin tesis edilmesi yönünde atılan önemli bir diplomatik hamle olmuştur. Aynı şekilde, Sovyetler Birliği de bu sürece karşılık vererek, ilk resmî temsilcisi olan Semyon Aralov’u 15 Aralık 1920’de Ankara’ya büyükelçi olarak göndermiştir. Aralov’un gelişi, Sovyetlerin Ankara Hükûmeti’ni muhatap alma konusundaki kararlılığını ve destekleyici tavrını göstermesi açısından son derece anlamlıdır
                </p>
              </div>
            </div>
          </div>
           <div className="row g-0 my-4 mt-5">

            <div className="col-lg-6">
              <div className="ps-lg-3">
                <h5 className="text-primary fw-bold mb-3">
Dostluk ve Tarafsızlık Antlaşması</h5>
                <p className="card-text">
               16 Mart 1921’de Moskova’da imzalanan “Dostluk ve Tarafsızlık Antlaşması”, Türkiye ile Sovyetler Birliği arasındaki diplomatik ilişkilerin başlangıcını simgeler. Antlaşmayı Sovyetler adına Dışişleri Halk Komiseri Georgiy Çiçerin, Türkiye adına ise Ankara Hükûmeti’nin Dışişleri Bakanı Yusuf Kemal Tengirşenk imzalamıştır. Taraflar birbirlerinin sınırlarını tanımış, saldırmazlık ve iç işlerine karışmama ilkelerinde uzlaşmıştır. İki ülke arasında kardeşlik ve dostluğun nişanesi sayılan bu antlaşmanın imza törenine ait fotoğraf, 16 Mart 2011’de, antlaşmanın 90. yıl dönümünde, Rusya eski Devlet Başkanı Dimitri Medvedev tarafından Türkiye Başbakanı Recep Tayyip Erdoğan’a hediye edilmiştir.
                </p>
              </div>
            </div>
                        <div className="col-lg-6">
              <div className="text-center">
                <img
                  src={dostlukAnlasmasi}
                  className=" rounded shadow-sm"
                  alt="Ali Fuat Cebesoy"
                  style={{ width:"90%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
            <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Rusya-Türkiye Dostluğu Hakkında Ek Bilgiler:
          </h3>
<div id="carouselExampleCaptions" className="carousel slide w-100">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={ataturkSemyonAralov} className="d-block w-100" alt="Atatürk ve Semyon Aralov" style={{ height: "500px", objectFit: "cover" }} />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Atatürk ve Semyon Aralov</h5>
        <p>Mustafa Kemal Atatürk ve Sovyetler Birliği’nin Ankara’daki ilk büyükelçisi Semyon Aralov</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={akkuyuPutinErdogan} className="d-block w-100" alt="Akkuyu Nükleer Santrali" style={{ height: "500px", objectFit: "cover" }} />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Akkuyu Nükleer Güç Santrali</h5>
        <p>Akkuyu Nükleer Güç Santrali’nin temel atma töreninde Türkiye Cumhurbaşkanı Erdoğan ve Rusya Devlet Başkanı Putin</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={petersburgMeydan} className="d-block w-100" alt="St. Petersburg Meydanı" style={{ height: "500px", objectFit: "cover" }} />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>St. Petersburg Meydanı</h5>
        <p>Ankara’da bulunan Saint Petersburg Meydanı</p>
      </div>
    </div>
     <div className="carousel-item">
      <img src={turkAkimAcilis} className="d-block w-100" alt="St. Petersburg Meydanı" style={{ height: "500px", objectFit: "cover" }} />
      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
        <h5>Türk Akım Açılış</h5>
        <p>Türkiye Cumhurbaşkanı Recep Tayyip Erdoğan ile Rusya Devlet Başkanı Vladimir Putin, 19 Kasım 2018 tarihinde TürkAkım açılış törenine birlikte katılmışlardır.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
</div>

        </div>
      </div>
      <BarKurum />

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

export default Dostluk;
