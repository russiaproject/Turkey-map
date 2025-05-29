import React from 'react';
// Resim dosyalarının doğru yolda olduğundan emin olun
import akkuyuFoto from "./images/akkuyuFoto.jpg";
import konsolosluk from "./images/konsolosluk.jpg";
import ruseviYatay from "./images/ruseviYatay.jpg";
import konsoloslukBayrakYatay from "./images/konsoloslukBayrakYatay.jpg";

// react-router-dom'dan Link ve useLocation kancasını içe aktarın
import { Link, useLocation } from 'react-router-dom';

const SidebarKurum = () => {
  // Mevcut konumu (URL yolunu) almak için useLocation kancasını kullan
  const location = useLocation();
  const { pathname } = location; // pathname değişkenine geçerli yolu ata (/rusevi, /akkuyu vb.)

  return (
    // Kenar çubuğu ana kapsayıcısı
    <div className="col-lg-4">

      {/* Rus Evi Kartı - Sadece mevcut yol /rusevi DEĞİLSE göster */}
      {pathname !== '/rusevi' && (
        <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card">
          <img
            src={ruseviYatay}
            className="card-img-top"
            alt="Rus Evi Ankara Görünüm"
            // Resim yüklenemezse çalışacak fallback (isteğe bağlı)
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/ffffff?text=Resim+Yok"; }}
          />
          <div className="card-body p-3">
            <h5 className="card-title fw-bold">
              <i className="fa-solid fa-building me-2 text-primary"></i>
              Rus Evi Ankara
            </h5>
            <p className="card-text">
            Rus Evi Ankara, kültürel etkinlikler, dil kursları ve halkla ilişkiler yoluyla Türkiye-Rusya dostluğunu güçlendirmeyi amaçlamaktadır.

            </p>
            <Link to="/rusevi" className="btn btn-primary rounded-pill px-3">
              <i className="fa-solid fa-circle-info me-2"></i>
              Detaylı Bilgi
            </Link>
          </div>
        </div>
      )}

      {/* Akkuyu Etkinlik Kartı - Sadece mevcut yol /akkuyu DEĞİLSE göster */}
      {pathname !== '/akkuyu' && (
        <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card">
          <img
            src={akkuyuFoto}
            className="card-img-top"
            alt="Akkuyu NGS Etkinlik"
             // Resim yüklenemezse çalışacak fallback (isteğe bağlı)
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/ffffff?text=Resim+Yok"; }}
          />
          <div className="card-body p-3">
            <h5 className="card-title fw-bold">
              <i className="fa-solid fa-atom me-2 text-primary"></i> {/* İkon güncellendi */}
              Akkuyu NGS
            </h5>
            <p className="card-text">
            Rosatom iş birliğiyle Mersin’de inşa edilen Akkuyu, Türkiye’nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.
            </p>
            <Link to="/akkuyu" className="btn btn-primary rounded-pill px-3">
              <i className="fa-solid fa-info-circle me-2"></i> {/* İkon güncellendi */}
              Detaylı Bilgi
            </Link>
          </div>
        </div>
      )}

      {/* Konsolosluk Kartı - Sadece mevcut yol /konsolosluk DEĞİLSE göster */}
      {pathname !== '/konsolosluk' && (
        <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card">
          <img
            src={konsoloslukBayrakYatay}
            className="card-img-top"
            alt="Rusya Federasyonu Türkiye Konsoloslukları"
             // Resim yüklenemezse çalışacak fallback (isteğe bağlı)
            onError={(e) => { e.target.onerror = null; e.target.src=""; }}
          />
          <div className="card-body p-3">
            <h5 className="card-title fw-bold">
              <i className="fa-solid fa-flag me-2 text-primary"></i> {/* İkon güncellendi */}
              Bütün Rusya Konsoloslukları
            </h5>
            <p className="card-text">
            Büyükelçilikler ve konsolosluklar, bir ülkenin başka bir ülkedeki vatandaşlarını ve çıkarlarını koruyan kurumlardır; ancak görev ve faaliyet alanları açısından farklılık gösterirler.
            </p>
            <Link to="/konsolosluklar" className="btn btn-primary rounded-pill px-3">
              <i className="fa-solid fa-building-columns me-2"></i> {/* İkon güncellendi */}
              Detaylı Bilgi
            </Link>
          </div>
        </div>
      )}

    </div>
  );
};

export default SidebarKurum;
