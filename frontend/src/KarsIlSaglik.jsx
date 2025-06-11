import React from "react";
import karsİlSaglik from "./images/karsİlSaglik.jpeg";

import BarKurum from "./BarKurum"

const KarsIlSaglik = () => {
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
            Kars İl Sağlık Müdürlüğü
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-hospital text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Kars İl Sağlık Müdürlüğü Binası
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
            Kars'ın şehir merkezinde yer alan İl Sağlık Müdürlüğü Binası, 19. yüzyıl sonlarında inşa edilmiş olan, Rus İmparatorluğu dönemine ait özgün kamu yapılarından biridir. Bu yapı, o dönemde inşa edilen pek çok resmî bina gibi, işlevselliği ön planda tutan, sade ama etkileyici Baltık mimarisi üslubuyla yapılmıştır. Günümüzde hâlâ kamu hizmeti veren bu bina, Kars'ta Rus izlerini taşıyan mimari yapılar arasında önemli bir yere sahiptir.
          </p>

          <p className="card-text">
            Bina, Rus İmparatorluğu'nun Kars'ı yönettiği 1878-1918 yılları arasında, şehrin idari ve sosyal altyapısını güçlendirmek amacıyla inşa edilen kamu binalarından biridir. Dönemin mimari anlayışına uygun olarak, hem işlevsel hem de estetik açıdan dengeli bir tasarımla hayata geçirilmiştir.
          </p>

          <p className="card-text">
            Yapının mimari özellikleri, Baltık bölgesinin sade ve işlevsel mimari geleneğini yansıtmaktadır. Kalın kesme taş duvarlar, simetrik pencere düzeni ve sağlam yapı tekniği ile dikkat çeken bina, dönemin inşaat teknolojisinin ve estetik anlayışının bir ürünüdür. Özellikle cephe düzenlemesi ve taş işçiliği, yapının mimari değerini ortaya koymaktadır.
          </p>

          <p className="card-text">
            Türkiye Cumhuriyeti'nin kurulmasından sonra da kamu hizmeti vermeye devam eden yapı, günümüzde İl Sağlık Müdürlüğü olarak işlevini sürdürmektedir. Bu süreklilik, yapının hem mimari hem de işlevsel açıdan ne kadar değerli olduğunu göstermektedir. Bina, Kars'ın tarihî dokusunun korunması ve gelecek nesillere aktarılması açısından büyük önem taşımaktadır.
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">Mimari Özellikler:</h3>
          <p className="card-text">
            <span className="fw-bold">İnşa Dönemi:</span> 19. yüzyıl sonları (1878-1918 Rus Dönemi)
          </p>
          <p className="card-text">
            <span className="fw-bold">Mimari Stil:</span> Baltık Mimarisi
          </p>
          <p className="card-text">
            <span className="fw-bold">Malzeme:</span> Kesme taş duvarlar
          </p>
          <p className="card-text">
            <span className="fw-bold">Tasarım Özelliği:</span> Sade ve işlevsel mimari
          </p>
          <p className="card-text">
            <span className="fw-bold">Cephe Düzeni:</span> Simetrik pencere düzeni
          </p>
          <p className="card-text">
            <span className="fw-bold">Güncel Kullanım:</span> Kars İl Sağlık Müdürlüğü
          </p>
          <p className="card-text">
            <span className="fw-bold">Durum:</span> Aktif kamu hizmeti binası
          </p>

          <h3 className="fw-bold text-primary my-4 mb-3 fs-5">İlgili Fotoğraf:</h3>
          
          {/* Tek Fotoğraf */}
          <div>
            <img 
              src={karsİlSaglik} 
              className="img-fluid rounded-4 shadow-sm" 
              alt="Kars İl Sağlık Müdürlüğü Binası" 
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

export default KarsIlSaglik;