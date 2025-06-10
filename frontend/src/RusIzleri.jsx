import React from "react";
import BarKurum from "./BarKurum";
import rusIziFoto from "./images/akkuyuFoto2.jpg"
import { Link } from "react-router-dom";
const RusIzleri = () => {
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
            Rus İzleri
          </li>
        </ol>
      </nav>

      {/* Page Title with Icon */}
      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-landmark text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">
Türkiye'deki Rus İzleri</h2>
      </div>

      {/* Main Content Column */}
      <div className="card shadow-sm border-0 h-100 kurum-card">
        <div className="card-body p-4">
            <div className="d-flex mb-4 justify-content-between w-100    ">
                 <h4 className="card-title mb-4 fw-bold">
            <i className="fa-solid fa-info-circle me-2 text-primary"></i>
            Türkiye'deki Rus İzleri
          </h4>
          <div>
                <Link to={"/rus-izi-ekle"} className="btn rusiziButtonUst py-2 px-4">Rus İzi Ekleyin!</Link>

          </div>
            </div>
 <div className="row g-4 justify-content-center">
        
        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
            <div className="rusizi-image-container">
              <img 
                src={rusIziFoto}
                className="card-img-top rusizi-card-image" 
                alt="Ankara'daki Rus İzleri" 
              />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi Ankara</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
             <div className="rusizi-image-container">
                <img 
                  src={rusIziFoto}
                  className="card-img-top rusizi-card-image" 
                  alt="İstanbul'daki Rus İzleri" 
                />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi İstanbul</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
             <div className="rusizi-image-container">
                <img 
                  src={rusIziFoto}
                  className="card-img-top rusizi-card-image" 
                  alt="Antalya'daki Rus İzleri" 
                />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi Antalya</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
             <div className="rusizi-image-container">
                <img 
                  src={rusIziFoto}
                  className="card-img-top rusizi-card-image" 
                  alt="Mersin'deki Rus İzleri" 
                />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi Mersin</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
             <div className="rusizi-image-container">
                <img 
                  src={rusIziFoto}
                  className="card-img-top rusizi-card-image" 
                  alt="İzmir'deki Rus İzleri" 
                />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi İzmir</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card h-100 rusizi-card shadow-sm">
             <div className="rusizi-image-container">
                <img 
                  src={rusIziFoto}
                  className="card-img-top rusizi-card-image" 
                  alt="Bursa'daki Rus İzleri" 
                />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title rusizi-card-title">Rus İzi Bursa</h5>
              <p className="card-text rusizi-card-text flex-grow-1">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae in perspiciatis, dolore iure quaerat inventore.
              </p>
              <a href="#" className="btn rusiziButton mt-auto align-self-start">Rus İzini Görün!</a>
            </div>
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

export default RusIzleri;
