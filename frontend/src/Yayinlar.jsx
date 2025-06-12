import React from "react";
import BarKurum from "./BarKurum";
import { Link } from "react-router-dom";

const Yayinlar = () => {
  return (
    <div className="container my-5 py-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              <i className="fa-solid fa-house me-1"></i> Ana Sayfa
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Yayınlar
          </li>
        </ol>
      </nav>

      <div className="d-flex align-items-center mb-4">
        <i className="fa-solid fa-book-open text-primary me-3 fs-2"></i>
        <h2 className="fw-bold text-primary m-0">Yayınlar</h2>
      </div>

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-4">
          <div className="row g-3 align-items-end">
            <div className="col-lg-7 col-md-12">
              <label htmlFor="searchInput" className="form-label fw-bold">
                Yayın Ara
              </label>
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Makale adı, yazar, anahtar kelime..."
              />
            </div>
            <div className="col-lg-3 col-md-6">
              <label htmlFor="typeSelect" className="form-label fw-bold">
                Yayın Türü
              </label>
              <select className="form-select" id="typeSelect">
                <option selected>Tümü</option>
                <option value="1">Makale</option>
                <option value="2">Bildiri</option>
                <option value="3">Kitap</option>
                <option value="4">Tez</option>
                <option value="5">Konferans</option>

              </select>
            </div>
            <div className="col-lg-2 col-md-6">
              <button className="btn btn-primary w-100">
                <i className="fa-solid fa-filter me-2"></i>Filtrele
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6 hoverYayinlar">
          <div className="yayinlarDiv d-flex flex-column h-100 p-4 position-relative">
            <div className="yayinlarTuru position-absolute top-0 start-0 m-3">
              <p className="p-2 m-0">Konferans</p>
            </div>
            <h4 className="fw-bold text-primary mt-5">
Avrasyacılık: Ortak Vizyon konferansı            </h4>
            <p className="text-muted small">
              <i className="fa-solid fa-user me-2"></i>Ankara Rus Evi
            </p>
            <p className="text-secondary">
              "Avrasyacılık: Ortak Vizyon" Konferansı
Ankara Üniversitesi Siyasal Bilgiler Fakültesi
Primakov Dış Politika İşbirliği Merkezi & Rus Evi Ankara iş birliğiyle
            </p>
            <div className="mt-auto">
              <Link to="/avrasyacilik" className="btn btn-sm btn-outline-primary me-2">
                Detayları Gör
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BarKurum />

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

export default Yayinlar;
