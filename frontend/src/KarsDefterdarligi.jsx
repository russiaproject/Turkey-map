import React from "react";
import karsDefterdarligi from "./images/karsDefterdarligiSf.jpeg";

import BarKurum from "./BarKurum"

const KarsDefterdarligi = () => {
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
            Kars Defterdarlığı
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-building-columns text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Kars Defterdarlığı
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
            Kars şehir merkezinde yer alan Kars Defterdarlığı Binası, 19. yüzyılın son çeyreğinde, bölgenin Rus İmparatorluğu yönetiminde bulunduğu 1878–1918 yılları arasında inşa edilen önemli kamu yapılarından biridir. Bu yapı, sadece işlevsel bir kamu binası olmanın ötesinde, Rus dönemi mimarisinin Kars'taki etkilerini gözler önüne seren bir mimari miras olarak değerlidir.
          </p>

          <p className="card-text">
            Bina, dönemin Baltık mimarisi etkisinde, taş işçiliğiyle inşa edilmiştir. Kalın kesme taş duvarlara sahip olan yapı, simetrik plan düzeni, geniş pencereleri ve sade ama sağlam cephe tasarımıyla dikkat çeker. Özellikle kemerli giriş kapısı ve pencere çevrelerinde görülen taş işçiliği, yapının zarafetle güçlülüğü bir araya getirdiğini gösterir.
          </p>

          <p className="card-text">
            Rus döneminden günümüze kadar farklı amaçlarla kullanılan bu bina, Türkiye Cumhuriyeti'nin kurulmasından sonra Mal Müdürlüğü ve sonrasında Defterdarlık hizmetleri için tahsis edilmiştir. Yapının mimari bütünlüğü büyük ölçüde korunmuş olup, günümüzde hâlâ kamu hizmeti vermektedir.
          </p>

          <p className="card-text">
            Defterdarlık binası, Kars'ın şehir merkezinde yer alan diğer Rus dönemi yapılarıyla birlikte, şehrin tarihî dokusunun önemli bir parçasını oluşturmaktadır. Bu yapı, hem yerel halk hem de şehri ziyaret eden turistler için Kars'ın çok katmanlı tarihine tanıklık eden önemli bir mimari eser niteliğindedir.
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Mimari Özellikler:</h3>
          <p className="card-text">
            <span className="fw-bold">İnşa Dönemi:</span> 1878-1918 (Rus İmparatorluğu Dönemi)
          </p>
          <p className="card-text">
            <span className="fw-bold">Mimari Stil:</span> Baltık Mimarisi
          </p>
          <p className="card-text">
            <span className="fw-bold">Malzeme:</span> Kesme taş duvarlar
          </p>
          <p className="card-text">
            <span className="fw-bold">Özellikler:</span> Simetrik plan düzeni, geniş pencereler, kemerli giriş kapısı
          </p>
          <p className="card-text">
            <span className="fw-bold">Güncel Kullanım:</span> Kars Defterdarlığı Binası
          </p>
          <p className="card-text">
            <span className="fw-bold">Konum:</span> Kars şehir merkezi
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İlgili Fotoğraf:</h3>
          
          {/* Tek Fotoğraf */}
          <div>
            <img 
              src={karsDefterdarligi} 
              className="img-fluid rounded-4 shadow-sm" 
              alt="Kars Defterdarlığı Binası" 
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

export default KarsDefterdarligi;