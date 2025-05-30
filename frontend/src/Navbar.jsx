import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ rusevi, turkiyePng }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="navbarArka position-sticky top-0">
      <div className="container text-white px-4 px-lg-5 py-3">
        <div className="w-100 d-flex justify-content-between align-items-center">
          <div>
            <Link to="/">
              <img src={rusevi} className="ruseviLogo" alt="Rusevi logo" />
            </Link>
          </div>

          <div className="d-flex align-items-center gap-2">
            <Link to="/Admin" className="btn p-1 kayitOl p-2 px-3">
                admine gir
              </Link>
              <Link to="/KayıtOl" className="btn p-1 kayitOl p-2 px-3">
              Bizimle İş Birliği Yapın!
              </Link>
              <Link to="/harita" className="btn p-1">
                <img src={turkiyePng} className="turkiyePng" alt="TurkeyMap" />
              </Link>
             <div className="dropdown dropdownİslemi">
               <a className="btn dropdownİslemi dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 RU
               </a>
               <ul className="dropdown-menu">
                 <li><a className="dropdown-item" href="#">TR</a></li>
                 <li><a className="dropdown-item" href="#">EN</a></li>
               </ul>
             </div>
              <a href="https://turkiye.rs.gov.ru/" className="text-white text-decoration-none text-uppercase rusLink d-none d-lg-inline-flex align-items-center" target="_blank" rel="noreferrer">
                Русский Дом
                <i className="fa-solid fa-arrow-right mainpageRight ms-1"></i>
              </a>

            <button
              className="btn d-lg-none p-1"
              type="button"
              onClick={toggleNav}
              aria-controls="navbarMainCollapse"
              aria-expanded={isNavOpen}
              aria-label="Toggle navigation"
            >
              <i className={`fa-solid ${isNavOpen ? 'fa-times' : 'fa-bars'} text-white fs-4`}></i>
            </button>
          </div>
        </div>

        <hr className="d-none d-lg-block" />

        <div
          className={`navbar-main-collapse ${isNavOpen ? 'open' : ''} d-lg-flex justify-content-between align-items-center stiki`}
          id="navbarMainCollapse"
        >
          <div className='navbarLink d-lg-flex gap-3'>
            <Link to="/" className="nav-link-item text-white text-decoration-none">Ana Sayfa</Link>
            <Link to="/rusevi" className="nav-link-item text-white text-decoration-none">Rusevi Türkiye Hakkında</Link>
            <Link to="/harita" className="nav-link-item text-white text-decoration-none">Harita</Link>
            <Link to="/makale" className="nav-link-item text-white text-decoration-none">Makaleler</Link>
            <Link to="/credit" className="nav-link-item text-white text-decoration-none">Ekibe Katılın!</Link>
            <Link to="/IsStaj" className="nav-link-item text-white text-decoration-none">İş/Staj</Link>

            <Link to="/rusyaburslari" className="nav-link-item text-white text-decoration-none">Rusya Bursları</Link>


            <Link to="/contact" className="nav-link-item text-white text-decoration-none">İletişim</Link>
              <a href="https://turkiye.rs.gov.ru/" className="nav-link-item text-white text-decoration-none text-uppercase rusLink d-lg-none" target="_blank" rel="noreferrer">
                Русский Дом
                <i className="fa-solid fa-arrow-right mainpageRight ms-1"></i>
              </a>

              <a href="https://turkiye.rs.gov.ru/" className="nav-link-item text-white text-decoration-none text-uppercase rusLink d-lg-none" target="_blank" rel="noreferrer">
                İş/Staj
                <i className="fa-solid fa-arrow-right mainpageRight ms-1"></i>
              </a>
          </div>

          <div className='navbarSocial d-lg-flex justify-content-end ms-auto gap-3'>
            <a href="https://t.me/ankara_rusevi" target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-telegram"></i></a>
            <a href="tel:+903124420218"><i className="fa-solid fa-square-phone"></i></a>
            <a href="https://vk.com/rusevi" target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-vk"></i></a>
            <a href="https://www.instagram.com/rusevi_ankara/?hl=tr" target='_blank' rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
