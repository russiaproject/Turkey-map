import React from "react";

import BarKurum from "./BarKurum"
import botasKurul from "./images/botasKurul.jpg";
import enerjiUcak from "./images/enerjiUcak.jpg"
import rusyaTurkiyeanlasma from "./images/rusyaTurkiyeanlasma.jpg"
import bakanlarGazprom from "./images/bakanlarGazprom.jpg"

const Gazprom = () => {
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
            Gazprom
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-fire-flame-simple text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Gazprom
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Gazprom Hakkında
          </h4>

          <p className="card-text">
            Gazprom, yalnızca Rusya’nın değil, aynı zamanda dünyanın en büyük doğalgaz üreticisi konumunda olan küresel bir enerji devidir. Şirket, Rusya içinde birçok önemli yapının merkezinde yer almakta; Gazprom Neft (petrol), Gazprombank (finans) ve Gazprom Media (iletişim ve yayıncılık) gibi güçlü iştirakleriyle çok yönlü bir kurumsal yapıya sahiptir. Bu yapı, Gazprom’u yalnızca enerji üreticisi değil, aynı zamanda jeopolitik ve ekonomik bir güç merkezi haline getirmektedir.
          </p>
          <p className="card-text">
            Küresel ölçekte birçok ülkede yatırımları bulunan Gazprom, Türkiye’ye ise özel bir önem atfetmektedir. Bu stratejik yaklaşımın en somut örneği, TürkAkım (TurkStream) projesidir. TurkStream, Karadeniz üzerinden Rusya’dan Türkiye’ye uzanan dev bir doğalgaz ihracat boru hattıdır. Hattın iki kolu bulunmaktadır:
          </p>
          <p className="card-text"><span className="fw-bold">İlk kol</span>, Türkiye’deki tüketicilere doğalgaz sağlamak amacıyla tasarlanmıştır.</p>
          <p className="card-text"><span className="fw-bold">İkinci kol</span>, ise, Güney ve Güneydoğu Avrupa ülkelerine gaz taşımaktadır.
</p>
 <p className="card-text">
            
TurkStream’in tasarım kapasitesi yılda 31,5 milyar metreküp doğalgazdır. Bu dev proje, yalnızca Türkiye’nin enerji arz güvenliğini artırmakla kalmayıp, aynı zamanda Türkiye’yi Avrupa için önemli bir enerji geçiş ülkesi konumuna taşımıştır.

          </p>
           <p className="card-text">
           TürkAkım, teknik bir başarı olmasının ötesinde, Türkiye-Rusya ilişkilerinde karşılıklı güvene dayalı stratejik iş birliğinin bir simgesi olarak kabul edilmektedir. Proje kapsamında yürütülen mühendislik, lojistik ve ticari iş birlikleri, iki ülke arasındaki enerji alanındaki ortaklığın ne denli güçlü olduğunu göstermektedir.

          </p>
 <p className="card-text">
            Ayrıca, Gazprom’un iştirakleri Türkiye'de çeşitli sektörlerde aktif olarak yer almakta, yerli şirketlerle ortak girişimler yürütmekte ve bilgi-teknoloji transferi gibi süreçlerle enerji alanındaki iş birliğini daha da derinleştirmektedir.
          </p>
          <div className="kurumFotolari mt-4 mb-4">
                      <img src={botasKurul} alt="" />
                    </div>
                    <p className="card-text">Alexey Miller ile BOTAŞ Yönetim Kurulu Başkanı Mehmet Konuk, Karadeniz üzerinden Türkiye’ye uzanacak doğalgaz boru hattının inşası için Mutabakat Zaptı’nı imzalarken. Eylül 2016’da Gazprom, Türk makamlarından TürkAkım projesi için ilk izinleri aldı.</p>
                    <div className="kurumFotolari mt-4 mb-4">
                      <img src={enerjiUcak} alt="" />
                    </div>
                    <p className="card-text">Türkiye Cumhuriyeti Enerji ve Tabii Kaynaklar Bakanı Taner Yıldız ile Alexey Miller, TürkAkım’ın kara hattı güzergâhı üzerinde uçarken.</p>
                    <div className="kurumFotolari mt-4 mb-4">
                      <img src={rusyaTurkiyeanlasma} alt="" />
                    </div>
                    <p className="card-text">10 Ekim 2016 tarihinde, Rusya Federasyonu Hükûmeti ile Türkiye Cumhuriyeti Hükûmeti arasında TürkAkım projesine ilişkin anlaşmanın imzalanması.</p>
                    <p className="card-text">Aralık 2016’da, South Stream Transport B.V. ile Allseas Group S.A., TürkAkım doğalgaz boru hattının deniz altı bölümünün ilk hattının inşası için sözleşme imzaladı. Sözleşmede ikinci hattın döşenmesi için de bir opsiyon yer aldı.
</p>
<p className="card-text">

Şubat 2017’de, South Stream Transport B.V. ile Allseas Group arasında TürkAkım doğalgaz boru hattının deniz altı bölümünün ikinci hattının inşası için bir sözleşme daha imzalandı.

</p>
          <p className="card-text">
            7 Mayıs 2017’de, TürkAkım doğalgaz boru hattının inşasına Karadeniz’de, Rusya kıyılarına yakın bir noktada başlandı.
            Ocak 2020’de TürkAkım üzerinden doğalgaz sevkiyatına başlandı.
          </p>
          <div className="kurumFotolari mt-4 mb-4">
                      <img src={bakanlarGazprom} alt="" />
                    </div>
                    <p className="card-text">TürkAkım doğalgaz boru hattının büyük açılış törenine, Rusya Federasyonu Devlet Başkanı Vladimir Putin, Türkiye Cumhuriyeti Cumhurbaşkanı Recep Tayyip Erdoğan, Sırbistan Cumhurbaşkanı Aleksandar Vučić, Bulgaristan Başbakanı Boyko Borisov, Rusya Federasyonu Enerji Bakanı Alexander Novak, Türkiye Enerji ve Tabii Kaynaklar Bakanı Fatih Dönmez ve Alexey Miller katıldı.</p>

                          <p>
  <span className="fw-bold">Web Site:</span> <a href="https://www.gazprom.com/" target="_blank">https://www.gazprom.com/</a>
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

export default Gazprom;
