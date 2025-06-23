import React from "react";
import BarKurum from "./BarKurum";
import { Link } from "react-router-dom";


const MezuniyetKulubu = () => {
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

Mezuniyet Kulübü          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-graduation-cap text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
Rus ve Sovyet Üniversiteleri Mezunu Türk Mezunlar Kulübü        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
           <div className="d-flex mb-4 justify-content-between w-100    ">
                 <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Mezuniyet Kulübü Hakkında
          </h4>
          <div>
                <Link to={"/mezuniyet-kayit"} className="btn rusiziButtonUst py-2 px-4">Mezuniyete Üye Olun!</Link>

          </div>
            </div>

          <p className="card-text">
            Rusya Federasyonu’nun Türkiye Cumhuriyeti Temsilciliği, Rus ve Sovyet üniversitelerinden mezun olan Türk vatandaşları için bir Mezunlar Kulübü oluşturma çalışmaları yürütmektedir.
          </p>

          <p className="card-text">
            Bu gayriresmî meslekî topluluğun faaliyetleri aşağıdaki alanlarda destek sağlamaya yönelik olacaktır:
          </p>
          <ul>
            <li>
                Rus ve Türk eğitim ve bilim kurumları arasında ilişkilerin geliştirilmesi;
            </li>
            <li>
                Rusya ve Türkiye halklarının kültürlerinin tanıtılması;
            </li>
            <li>
                Gençlik ve öğrenci değişimlerinin geliştirilmesi; yeni mezunların kulüp faaliyetlerine dâhil edilmesi ve onların istihdamına destek sağlanması;
            </li>
            <li>
                Rusya ve Türkiye’yi birbirine bağlayan eğitim, bilim ve kültür alanlarındaki projelerin hayata geçirilmesi.
            </li>
          </ul>
          <p className="card-text">
Kulübün çalışmaları, Rusya Federasyonu’nun Türkiye Cumhuriyeti Temsilciliği tarafından koordine edilecektir.
          </p>
          <p className="card-text">

Eğer siz de Türkiye’de daimi ikamet eden, Rusya veya Sovyetler Birliği dönemine ait bir yükseköğretim kurumundan mezun biriyseniz ve yukarıda belirtilen faaliyet alanlarına ilgi duyuyorsanız, Mezunlar Kulübü’ne üye olmak isterseniz, Mezunlar Kulübü’ne üye olmak istiyorsanız, lütfen '<Link to="/mezuniyet-kayit">Üye Ol</Link>' butonuna tıklayınız.
          </p>
           <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
            Gerekçe:          </h3>
            <p className="card-text">
              2015 yılından itibaren Rusya Federasyonu’nun Türkiye Cumhuriyeti Temsilciliği, mezunların ileride ilgili topluluk bünyesinde birleştirilmesi amacıyla mezun havuzu oluşturma çalışmalarına başlamıştır.
            </p>
            <p className="card-text">
              29 Kasım 2016 tarihinde Rusya Büyükelçiliği’nde mezunların ilk resmî buluşma etkinliği düzenlenmiştir.
            </p>
            <p className="card-text">
              2017 yılında, Rusya Federasyonu’nun Türkiye Temsilciliği tarafından Rus (Sovyet) Üniversiteleri Mezunu Türk Mezunlar Kulübü’nün oluşturulmasına yönelik ön hazırlık çalışmaları yürütülmüştür.
Kulübün Danışma Kurulu, Ağrı, Ankara, Antalya, Kayseri, İstanbul, Trabzon, Erzurum ve Eskişehir şehirlerinden aktif mezunlardan oluşturulacaktır. İlerleyen dönemde diğer şehirlerden temsilciler ve adı geçen şehirlerden ek üyeler de bu çalışmalara dâhil edilecektir.
            </p>
             <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Mezunlar Kulübü’nün Temel Görevleri:</h3>
             <ul>
              <li>Rusya ve Türkiye’deki eğitim ve bilim kuruluşları arasında işbirliği ve bağlantıların kurulmasına katkıda bulunmak,
</li>
<li>Rusya ve Türkiye halklarının kültürlerini tanıtmak ve yaygınlaştırmak,
</li>
<li>Gençlik ve öğrenci değişimlerini geliştirmek,
</li>
<li>
Yeni mezunları kulüp faaliyetlerine dâhil etmek ve onların iş bulma süreçlerine destek sağlamak.
</li>
             </ul>
             <p className="card-text">
              
Kulübün temel yapısını ve faaliyetlerinin koordinasyonunu Rusya Federasyonu’nun Türkiye Temsilciliği yürütecektir
             </p>
              <h3 className="fw-bold text-primary my-4 mb-3 fs-5">
2025 Yılı İçin Mezunlar Kulübü Danışma Kurulu’nun Temel Hedefi:
          </h3>
          <p className="card-text">
            Danışma Kurulu’nda temsil edilen Türkiye şehirlerinden üniversiteler ile Rusya’daki üniversiteler arasında akademik işbirliği anlaşmaları imzalanmasını sağlamak.
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

export default MezuniyetKulubu;
