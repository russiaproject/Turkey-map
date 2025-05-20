import React from "react";

import akkuyuFoto from "./images/akkuyuFoto.jpg";
import konsolosluk from "./images/konsolosluk.jpg";
import ruseviYatay from "./images/ruseviYatay.jpg";
import  konsoloslukBayrakYatay from "./images/konsoloslukBayrakYatay.jpg";

import { Link } from "react-router-dom";

const BarKurum = () => {
  return (
    <div>
      <h4 className="card-title mb-4 mt-5 fw-bold ">
        <i className="fa-solid fa-info-circle me-2 text-primary"></i>
        Başka Kurumlarada Bakın!
      </h4>
      <div className="row">
        <div className="col-lg">
          <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card h-100">
            <div
              className="img-container"
              style={{ height: "200px", overflow: "hidden" }}
            >
              <img
                src={ruseviYatay}
                className="card-img-top img-fluid w-100 h-100"
                alt="Rusya Federasyonu Ankara Büyükelçiliği"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card-body p-3">
              <h5 className="card-title fw-bold">
                <i className="fa-solid fa-flag me-2 text-primary"></i>
                Rus Evi Ankara
              </h5>
              <p className="card-text">
              Rus Evi Ankara, kültürel etkinlikler, dil kursları ve halkla ilişkiler yoluyla Türkiye-Rusya dostluğunu güçlendirmeyi amaçlamaktadır.

              </p>
              <Link to="/rusevi" className="btn btn-primary rounded-pill px-3">
                <i className="fa-solid fa-building-columns me-2"></i>
                Detaylı Bilgi
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg">
          <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card h-100">
            <div
              className="img-container"
              style={{ height: "200px", overflow: "hidden" }}
            >
              <img
                src={akkuyuFoto}
                className="card-img-top img-fluid w-100 h-100"
                alt="Akkuyu NGS"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card-body p-3">
              <h5 className="card-title fw-bold">
                <i className="fa-solid fa-flag me-2 text-primary"></i>
                Akkuyu NGS
              </h5>
              <p className="card-text">
              Rosatom iş birliğiyle Mersin’de inşa edilen Akkuyu, Türkiye’nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.

              </p>
              <Link to="/akkuyu" className="btn btn-primary rounded-pill px-3">
                <i className="fa-solid fa-building-columns me-2"></i>
                Detaylı Bilgi
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg">
          <div className="card shadow-sm border-0 mb-4 kurum-sidebar-card h-100">
            <div
              className="img-container"
              style={{ height: "200px", overflow: "hidden" }}
            >
              <img
                src={konsoloslukBayrakYatay}
                className="card-img-top img-fluid w-100 h-100"
                alt=" Bütün Rusya Konsoloslukları"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="card-body p-3">
              <h5 className="card-title fw-bold">
                <i className="fa-solid fa-flag me-2 text-primary"></i>
                 Bütün Rusya Konsoloslukları

              </h5>
              <p className="card-text">
              Büyükelçilikler ve konsolosluklar, bir ülkenin başka bir ülkedeki vatandaşlarını ve çıkarlarını koruyan kurumlardır; ancak görev ve faaliyet alanları açısından farklılık gösterirler.

              </p>
              <Link
                to="/konsolosluklar"
                className="btn btn-primary rounded-pill px-3"
              >
                <i className="fa-solid fa-building-columns me-2"></i>
                Detaylı Bilgi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarKurum;
