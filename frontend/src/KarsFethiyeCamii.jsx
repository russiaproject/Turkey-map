import React from "react";
import karsFethiyeCamii from "./images/karsFethiyeCamii.jpeg";

import BarKurum from "./BarKurum"

const FethiyeCamii = () => {
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
          <li className="breadcrumb-item">
            <a href="/rus-izleri" className="text-decoration-none">
              Rus İzleri
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Kars Fethiye Camii
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-mosque text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Kars Fethiye Camii
        </h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
          <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Hakkında
          </h4>

          <p className="card-text">
            Kars'ta bulunan Fethiye Camii, Türkiye'deki geç dönem mimari yapılar arasında dikkat çeken örneklerden biridir. 19. yüzyılın sonlarında, Kars'ın farklı kültürel ve yönetimsel etkiler altında olduğu bir dönemde inşa edilen yapı, başlangıçta bir Rus Ortodoks Kilisesi olarak tasarlanmış ve kullanılmıştır. Orijinal adıyla Alexander Nevski Kilisesi, döneminin mimari anlayışını yansıtan özenli taş işçiliği ve dengeli cephe düzeniyle öne çıkar.
          </p>

          <p className="card-text">
            Yaklaşık 1885-1890 yılları arasında inşa edilen yapı, Baltık mimarisinin özelliklerini taşır. Dış cephesinde koyu renkli düzgün kesme taşlar kullanılmış; yüksek kemerli pencereler, girişteki sütunlar ve simetrik cephe düzeni, dönemin şehir planlamasına ve mimari estetiğine işaret eder.
          </p>

          <p className="card-text">
            1921 yılında Kars'ın Türkiye sınırları içine dâhil edilmesinin ardından, yapı yeni işlevi doğrultusunda camiye dönüştürülmüş ve Fethiye Camii adını almıştır. Camiye dönüştürülme sürecinde, dış mimari büyük ölçüde korunmuş; iç mekânda ise ibadete uygun düzenlemeler yapılmıştır. Minare sonradan yapıya eklenmiştir.
          </p>

          <p className="card-text">
            Günümüzde Fethiye Camii, hem ibadethane olarak hizmet vermekte hem de mimariye ilgi duyan yerli ve yabancı ziyaretçilerin dikkatini çeken önemli bir kültürel ve tarihî yapı olarak değerini korumaktadır. Farklı dönemlerin izlerini taşıyan bu yapı, Kars'ın çok katmanlı tarihine ve mimari çeşitliliğine ışık tutmaktadır.
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Mimari Özellikler:</h3>
          <p className="card-text">
            <span className="fw-bold">İnşa Tarihi:</span> 1885-1890 yılları
          </p>
          <p className="card-text">
            <span className="fw-bold">Orijinal Adı:</span> Alexander Nevski Kilisesi
          </p>
          <p className="card-text">
            <span className="fw-bold">Mimari Stil:</span> Baltık Mimarisi
          </p>
          <p className="card-text">
            <span className="fw-bold">Malzeme:</span> Düzgün kesme taş
          </p>
          <p className="card-text">
            <span className="fw-bold">Dönüştürülme:</span> 1921 yılında camiye çevrildi
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İlgili Fotoğraf:</h3>
          
          {/* Tek Fotoğraf */}
          <div>
            <img 
              src={karsFethiyeCamii} 
              className="img-fluid rounded-4 shadow-sm" 
              alt="Kars Fethiye Camii" 
              style={{maxHeight: "400px", width: "auto"}}
            />
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.123!2d43.0926!3d40.6087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDM2JzMxLjIiTiA0M8KwMDUnMzMuNCJF!5e0!3m2!1str!2str!4v1"
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

export default FethiyeCamii;