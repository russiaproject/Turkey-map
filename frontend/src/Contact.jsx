import React from "react";
import rusEviBina from "./images/red.png";
import akkuyuFoto2 from "./images/akkuyuFoto2.jpg";
import SidebarKurum from './SidebarKurum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';

const KurumlarYazi = ({akkuyuFoto}) => {
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
            Rus Evi İletişim
          </li>
        </ol>
      </nav>

      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-address-book text-primary me-2 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
          Rus Evi Ankara İletişim
        </h2>
      </div>

      <div className='otherSiteBox p-4 mt-4'>
        <div className='row'>
            <div className="col-lg">
                <div className='iletisimSolYazılar'>
                <p className='d-inline'>Adres:</p>
                <p>Hilal Mahallesi, Rabindranath Tagore Caddesi, No:68, 06550 Çankaya/Ankara</p>
                <p className='d-inline'>Çalışma Saatleri:</p>
                <p>
                Pazar   09:00 – 18:00
                <br />
                Pazartesi   09:00 – 18:00
                <br />
                Salı    09:00 – 18:00
                <br />
                Çarşamba    09:00 – 18:00
                <br />
                Perşembe 09:00 – 18:00
                <br />
                Cuma    09:00 – 18:00
                <br />
                Cumartesi   09:00 – 18:00
                <br/>
(Bayram ve Hafta Sonlarında Mesai Saatleri Farklılık Gösterebilir.) 
                </p>
                </div>
            </div>
            <div className="col-lg ">
                <div>
                    <a href="https://yandex.com/maps/-/CHfGFA~S" className='text-decoration-none iletisimHover p-4 py-4 d-block rounded-4' style={{background:"#ecf2ff"}}>
                    <p className='d-inline text-black fw-bold'>Rusevi'ne Nasıl Giderim?</p>
                    <p className='mt-2 ms-3 pb-2 basmakIletisim'>Buraya Basarak Gidebilirsiniz!</p>
                    </a>
                </div>
                <div className='iletisimSolYazılar mt-2'>
                <div className='sagIletisim'>
                <p className='d-inline'>Telefon Numarası</p>
                <p>+90 312 442 02 18</p>
                <div className='sagIletisimControl'>
                <p className='d-inline'>E-Mail</p>
                <p>turkey@rs.gov.ru</p></div>
                </div>
                </div>
            </div>
        </div>
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
    </div>
  );
};

export default KurumlarYazi;
