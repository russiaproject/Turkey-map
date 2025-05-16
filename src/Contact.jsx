import React from "react";
import rusEviBina from "./images/red.png";
import akkuyuFoto2 from "./images/akkuyuFoto2.jpg";
import SidebarKurum from './SidebarKurum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';

const KurumlarYazi = ({akkuyuFoto}) => {
  return (
    <div className="container my-5 p-5 py-3">
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
        <path fill="currentColor" d="M272 0l80 0c8.8 0 16 7.2 16 16l0 64c0 8.8-7.2 16-16 16l-80 0 0 32 192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 192c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0 0-112c0-8.8 7.2-16 16-16l16 0zM64 224l64 0 0 192 40 0 0-192 64 0 0 192 48 0 0-192 64 0 0 192 40 0 0-192 64 0 0 196.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512L32 512c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1L64 224z"></path>
        <h2 className="fw-bold text-primary m-0">Rus Evi Ankara İletişim</h2>
      </div>

      <div className='otherSiteBox p-4 mt-4'>
        <div className='row'>
            <div className="col-lg">
                <div className='iletisimSolYazılar'>
                <p className='d-inline'>Adres:</p>
                <p>Hilal, Rabindranath Tagore Cd. No:68, 06550 Çankaya/Ankara</p>
                <p className='d-inline'>Çalışma Saatleri:</p>
                <p>
                Pazar   10:00 – 20:00
                <br />
                Pazartesi   08:30 – 21:00
                <br />
                Salı    08:30 – 21:00
                <br />
                Çarşamba    08:30 – 21:00
                <br />
                Perşembe 08:30 – 21:00
                <br />
                Cuma    08:30 – 21:00
                <br />
                Cumartesi   10:00 – 20:00
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
                <p>Hilal, Rabindranath Tagore Cd. No:68, 06550 Çankaya/Ankara</p>
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
