import React from "react";
import rusEviBina from "./images/red.png";
import sotnichenko from "./images/Sotnichenko.jpg";
import SidebarKurum from "./SidebarKurum";

import ilkBina from "./images/ilkbina.jpg";
import sefaret from "./images/sefaret.jpg";
import modernBaskon from "./images/modernBaskon.jpg";
import bust from "./images/bust.jpg"; 

import BarKurum from "./BarKurum"

const KurumlarYaziBaskon = () => {
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
            Rusya’nın Ankara Büyükelçiliği
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rusya’nın Ankara Büyükelçiliği
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Elçilik Hakkında
          </h4>

          <p className="card-text">
            Sovyet Rusyası ile genç Türkiye arasındaki diplomatik ilişkilerin
            Dışişleri Halk Komiseri Georgiy Çiçerin’in Türkiye’yle sürekli
            ilişki kurmaya hazır olduklarını teyit ettiği mektubu Mustafa Kemal
            Atatürk’e gönderdiği 3 Haziran 1920’de başladığı kabul edilmektedir.
            4 Ekim 1920’de Sovyet diplomatik misyonu Ankara’ya gelmiş, 7 Ekim
            1920’de ise bir yabancı ülkenin Ankara’daki ilk diplomatik
            temsilciliği olan Sovyet büyükelçiliğinin açılışı yapılmıştır.
            Bilindiği gibi, Batılı devletler diplomatik temsilciliklerinin
            İstanbul’dan Ankara’ya taşınmasına uzun süre karşı çıkmıştır.
          </p>
          <div className="kurumFotolari">
            <img src={ilkBina} alt="" />
            <p>
              Rusya Sovyet Federatif Sosyalist Cumhuriyeti’nin Türkiye’deki
              Yetkili Temsilciliğinin ilk binası. Ankara, 1920
            </p>
          </div>
          <p className="card-text">
            İlk başlarda Ankara’daki Rus diplomatik misyonlarının binaları, Ulus
            Kalesi bölgesindeki kentin eski bölümünde yer alıyordu ve geçici
            nitelikteydi. Kasım 1921’de Türkiye’de görevlendirilen Semyon Aralov
            büyükelçilik binasını şöyle tanımlamıştır: “Yetkili temsilciliğimiz,
            kent merkezinde, iki aracın yan yana geçmesinin imkansız olduğu dar
            bir sokakta küçük iki katlı ahşap binada yer alıyordu. Sokağın
            sonunda yüksek minareli bir cami vardı.” Çok sayıda misafiri
            ağırlamak için yeterli alan bulunmaması nedeniyle civardaki bazı
            binalar boşaltıldı ve Rus diplomatik misyonunun bünyesine dahil
            edilmiştir.
          </p>

          <p className="card-text">
            Binalardan biri Ağustos 1922’de yandığı bilinmektedir. Sovyet
            sanatçı Yevgeniy Lansere’nin 1922 yazında Anadolu’yu ziyaretinden
            sonra yazdığı “Ankara Yazı” adlı kitaptaki anılarda bu yangından söz
            edilmiştir.
          </p>

          <p className="card-text">
            1922’de Türk hükümeti Sovyetler Birliği’ne Atatürk Bulvarı
            No.106’daki araziyi (günümüzde Ticaret Temsilciliği) hediye edilmiş
            ve kısa süre sonra arazide inşaat çalışmalarına başlanmıştır. Sovyet
            Büyükelçiliği, 1927 yılında ana hizmet binasının inşası
            tamamlandığında bu gayrimenkulü resmen mülkiyetine dahil etmiştir.
            Binanın mimarlığını Rus avangardının kuramcısı, SSCB İnşaat ve
            Mimarlık Akademisi muhabir üyesi, Mimarlık Enstitüsü Rektörü olan
            Genrich Ludwig yapmıştır. Ludwig, Afganistan ve Polonya’nın
            Ankara’daki elçilik binalarını da tasarlamıştır.
          </p>
          <div className="kurumFotolari">
            <img src={sefaret} alt="" />
            <p>SSCB’nin Ankara Büyükelçiliği Binası. 1930’lu yıllar</p>
          </div>
          <p className="card-text">
            Anıtkabir’deki müzede yer alan “İç ve Dış Politika Gelişmeleri
            (1923-1938)” ile ilgili salonda, Türkiye’nin başkentindeki ilk
            yabancı diplomatik temsilciliklerin inşaat fotoğraflarının
            sergilendiği bir stant bulunmaktadır. 1926 yılında çekilen bir
            fotoğrafta, Atatürk Bulvarı’ndaki SSCB Büyükelçiliği’nin inşaat
            aşaması görülmektedir. 1930 ve 1937 tarihli fotoğraflarda Almanya ve
            Fransa’nın diplomatik misyonlarının inşa halinde binaları yer
            almaktadır.
          </p>
          <p className="card-text">
            Türkiye Cumhuriyeti Birinci Cumhurbaşkanı M. Kemal Atatürk, Sovyet
            Büyükelçiliği’nin bu binasını birkaç kez ziyaret etmiştir. İkinci
            kattaki salonda Atatürk’ün de katıldığı diplomatik resepsiyonlar
            düzenlenmiştir.
          </p>
          <p className="card-text">
            Yakov Suriz, Lev Karahan, Mihail Karskiy, Aleksey Terenytev, Sergey
            Vinogradov, Aleksandr Lavrişev, Boris Podtserov, Nikita Rıjov gibi
            büyükelçiler de dahil olmak üzere ünlü Sovyet diplomatların adları
            bu binayla ilişkilidir.
          </p>
          <p className="card-text">
            1940’lı yıllarda Rus kozmonot Yuriy Baturin’in ebeveynleri Atatürk
            Bulvarı üzerindeki büyükelçilik binasında görev yapmış, Baturin de,
            Ankara’yı birkaç kez ziyaret etmiş ve yurttaşlarının yanı sıra Türk
            halkıyla bir araya gelmiştir. Yuriy Baturin, babası Mihail
            Baturin’in Türkiye’deki çalışmaları da dahil olmak üzere yaşam
            yolculuğunu konu alan “Kaşifin Dosyası” adlı bir kitap yazmıştır.
            Kozmonotun annesi Natalya Gradova, “Yalnız Değildim. Hatıra ve
            Fotoğraf Andacı” adlı anı kitabında Ankara’daki günlerini
            anlatmıştır.
          </p>
          <p className="card-text">
            Rusya Büyükelçiliği bugünkü binasına taşındıktan sonra, bu
            gayrimenkul 1962 yılında SSCB Dışişleri Bakanlığı’ndan Dış Ticaret
            Bakanlığı’na devredilmiştir. 1960’lı yıllarda Atatürk Bulvarı’ndaki
            bina restore edilmiştir.
          </p>
          <div className="kurumFotolari mt-4 mb-4">
            <img src={modernBaskon} alt="" />
            <p className="mt-1">Büyükelçiliğin modern binası.</p>
          </div>
          <p class="card-text">
    Türkiye’deki Rus diplomatik misyonu, haklı olarak Ankara’daki en büyük ve görkemli diplomatik misyonlardan biri olarak kabul edilmektedir. Büyükelçilik, Çankaya ilçesinin sakin bir mahallesinde Çankaya Köşkü’ne yakın bir mesafede bulunmaktadır.
  </p>

  <p class="card-text">
    Bu arazi, 1957 yılında SSCB Hükümeti tarafından satın alınmıştır. İdare ve temsilcilik binasının inşaatı, 30 Haziran 1960’da başlamış ve resmi kabul tutanağı imzalanarak 27 Mart 1962’de tamamlanmıştır.
  </p>

  <p class="card-text">
    Büyükelçilik kompleksi, Sovyet mimar, devlet sanatçısı, Moskova’daki Poklonnaya Tepesi Büyük Anavatan Savaşı Müzesi ile SSCB’nin Bonn Büyükelçiliği'nin (günümüzde Rusya Başkonsolosluğu) tasarımcısı Vladimir Bogdanov tarafından tasarlanmıştır. Bina, konstrüktivizm tarzında inşa edilmiş, dış cephesi kireç tüfünden (traverten) yapılmıştır.
  </p>

  <p class="card-text">
    Nikita Rıjov, Andrey Smirnov, Vasiliy Grubyakov, Aleksey Rodionov, Vladimir Lavrov, Albert Çernışev, Vadim Kuznetsov, Alexander Lebedev, Pyotr Stegniy, Vladimir İvanovsky, Andrey Karlov burada farklı dönemlerde büyükelçi olarak görev yapmıştır. Tesis, protokol etkinlikleri, konferanslar, konserler ve çalışma görüşmelerinin yapıldığı bir mekan olarak hizmet vermektedir.
  </p>
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
  <div className="memorial-container my-5">
      <div className="row shadow-lg rounded p-4 memorial-card">
        <div className="col-md-5 text-center memorial-image-col">
          <img src={bust} alt="Andrey Karlov Büstü" className="memorial-image img-fluid" />
          <div className="memorial-caption mt-3">
            <h5>Andrey Gennadyevich Karlov</h5>
            <p className="text-muted">Rusya Federasyonu Büyükelçisi</p>
          </div>
        </div>
        <div className="col-md-7 memorial-text-col d-flex flex-column">
          <h4 className="memorial-title mb-4">Anma Köşesi</h4>
          <p className="memorial-text">
          Anma köşesini bura da bitirdikten sonra: Aziz Büyükelçimiz, Rusya Federasyonu Kahramanı Andrey Karlov’u Rahmet ve Minnetle Anıyoruz
          </p>
          <p className="memorial-text">
          Ekibimle birlikte, Rusya Federasyonu’nun aziz kahramanı, değerli Büyükelçimiz Andrey Karlov’u derin bir saygı, rahmet ve minnetle anıyoruz.
Andrey Karlov, Rusya ile Türkiye arasındaki dostluk ve iş birliğini güçlendirmek için büyük bir özveriyle çalışmış, bu yolda hayatını feda etmiş bir diplomasi neferiydi. Onun mirası, iki ülke halkları arasında kurulan anlayış ve dostluk köprüsünün temel yapı taşlarından biri olarak yaşamaya devam edecektir.
          </p>
          <p className="memorial-text">
          Kendisine Allah’tan rahmet diliyor, hatırasını saygı ve şükranla yâd ediyoruz.
          Türk-Rus ilişkilerimizi hiçbir eylemin bozmasına izin vermeyeceğiz. Türk gençleri olarak, Avrasya kardeşimiz olan Rusya Federasyonu’yla kıymetli ilişkilerimizin güçlenmesi için var gücümüzle çalışıyoruz. Hiçbir kuvvetin bu ilişkilere zarar vermesine müsaade etmeyeceğiz.
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

export default KurumlarYaziBaskon;
