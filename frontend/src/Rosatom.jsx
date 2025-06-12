import React from "react";

import BarKurum from "./BarKurum";
import rosatomBakanlar from "./images/rosatomBakanlar.jpg";
const Rosatom = () => {
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
            Rosatom
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Rosatom</h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Rosatom Hakkında
          </h4>

          <p className="card-text">
            Rosatom Devlet Nükleer Enerji Şirketi (Rusça: Государственная
            корпорация по атомной энергии «Росатом»), 2007 yılında kurulan,
            Rusya Federasyonu’na bağlı çok sektörlü bir devlet holdingidir.
            Şirket, yalnızca nükleer enerji üretimiyle sınırlı kalmayıp; enerji
            mühendisliği, makine imalatı, dijital çözümler, tıp, lojistik ve
            yenilenebilir enerji gibi çok sayıda alanda faaliyet göstermektedir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Rosatom’un yapısında:
          </h3>
          <p className="card-text">
            450'den fazla iştirak,
            <br />
            420.000'e yakın çalışan,
            <br />
            Dünyanın tek nükleer buzkıran filosu,
            <br />
            Ve nükleer yakıt döngüsünün tüm aşamalarını kapsayan altyapı
            bulunmaktadır.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Küresel Liderlik ve Çevresel Sorumluluk:
          </h3>

          <p className="card-text">
            Küresel nüfusun ve enerji ihtiyacının hızla arttığı bir çağda,
            Rosatom, düşük karbonlu enerji üretimi ve iklim değişikliğiyle
            mücadele alanlarında öncü rol üstlenmektedir. 2023 yılında küresel
            karbon emisyonları 37,4 milyar tonu aşarken, nükleer enerji, sıfır
            emisyon stratejilerinin vazgeçilmez bir parçası haline gelmiştir.
          </p>
          <p className="card-text">
            2023 itibariyle Rosatom, 10 ülkede eşzamanlı olarak 39 nükleer
            reaktör (6'sı küçük modüler reaktör - SMR) inşa etmektedir.
          </p>
          <p className="card-text">
            Uluslararası Enerji Ajansı’na göre, küresel nükleer kapasite 2030’a
            kadar 455,2 GW’a çıkacaktır.
          </p>
          <p className="card-text">
            Rosatom, yakıt döngüsünün her aşamasını kapsayan dünyadaki tek
            şirkettir.
          </p>
          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
             Akkuyu Nükleer Güç Santrali: Dostluğun Simgesi:

          </h3>

          <p className="card-text">
            Rosatom ile Türkiye Cumhuriyeti arasında imzalanan anlaşma çerçevesinde Mersin’de inşası süren Akkuyu Nükleer Güç Santrali, Türkiye'nin ilk nükleer enerji santrali olma özelliği taşımaktadır. <span className="fw-bold">Proje</span>;

          </p>
          <p className="card-text">
            4 reaktörlü olup her biri 1200 MW kapasitelidir.
<br />
Türkiye’nin elektrik ihtiyacının yaklaşık %10’unu karşılayacaktır.
<br />
Yüzlerce Türk mühendise Rusya’da eğitim sağlanarak teknoloji transferi gerçekleştirilmektedir.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
             Sinop’ta İkinci Santral Görüşmeleri:

          </h3>

          <p className="card-text">Akkuyu’nun ardından, Sinop'ta ikinci bir nükleer güç santrali inşası için teknik ve finansal parametrelerin belirlendiği görüşmeler de devam etmektedir. Bu çerçevede Rosatom ve Türkiye Enerji ve Tabii Kaynaklar Bakanlığı, ortak çalışma grubu içerisinde müzakerelere aktif olarak katılmıştır. Bu görüşmeler, iki ülke arasında stratejik enerji ortaklığının sürdürülebilirliğini ve derinliğini göstermektedir.
</p>
<h3 className="fw-bold text-primary my-4 mb-3 fs-5">

Rosatom’un stratejik hedefleri:
          </h3>
          <p>Sıfır karbonlu enerji üretimi
<br />
Yüksek teknoloji ürünlerinin yaygınlaştırılması
<br />
Nükleer güvenlik, insan ve çevre sağlığına duyarlılık
<br />
Yeni alanlara (dijitalleşme, yapay zekâ, tıp, hidrojen teknolojisi) yatırım
<br />
Sivil üretim oranını artırmak
</p>
<p>Rosatom, fosil yakıtlardaki fiyat dalgalanmaları ve karbon vergilerinin ekonomik yükü nedeniyle, termik santrallerin uzun vadede yerini nükleere bırakacağı görüşünü benimsemektedir.
</p>
<h3 className="fw-bold text-primary my-4 mb-3 fs-5">


 Türkiye-Rusya Dostluğu:
          </h3>
          <p className="card-text">
            Akkuyu’dan Sinop’a uzanan süreç, yalnızca bir enerji iş birliği değil, karşılıklı güven, bilgi paylaşımı ve uzun vadeli kalkınma vizyonunun bir ürünüdür. Rosatom’un Türkiye’deki faaliyetleri, sürdürülebilir enerji, bilimsel ilerleme ve teknoloji ortaklığının somut göstergesi haline gelmiştir.

          </p>
          <p className="card-text">

Rosatom ile Türkiye’nin iş birliği, yalnızca bugünün enerji ihtiyacını değil; geleceğin temiz, güvenli ve dostane vizyonunu da şekillendirmektedir.
          </p>
          <div className="kurumFotolari mt-4 mb-4">
                      <img src={rosatomBakanlar} alt="" />
                      <p className="mt-1">Sayın Bakan Bayraktar ve Sayın Rosatom Başkanı Lihaçev görüşmesi sırasında.
                      </p>
                    </div>
                             <p>
  <span className="fw-bold">Web Site:</span> <a href="https://www.rosatom.ru/en/" target="_blank">https://www.rosatom.ru/</a>
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

export default Rosatom;
