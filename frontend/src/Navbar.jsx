import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// CSS dosyasını import ettiğinizden emin olun, örneğin:
// import './Navbar.css'; 

const Navbar = ({ rusevi, turkiyePng }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="navbarArka position-sticky top-0">
        <div className="container text-white px-4 px-lg-5 py-3">
          <div className="w-100 d-flex justify-content-between align-items-center">
            <div>
              <Link to="/">
                <img src={rusevi} className="ruseviLogo ruseviLogoNavbar" alt="Rusevi logo" />
              </Link>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Link to="/KayıtOl" className="btn p-1 kayitOl p-2 px-3 d-none d-lg-inline-flex">
                Haritaya Kurumunuzu Ekleyin
              </Link>
              
              <Link to="/harita" className="btn p-1">
                <img src={turkiyePng} className="turkiyePng" alt="TurkeyMap" />
              </Link>
              <div className="dropdown dropdownİslemi">
                <a className="btn dropdownİslemi dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  TR
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">RU</a></li>
                  <li><a className="dropdown-item" href="#">EN</a></li>
                </ul>
              </div>
              <a href="https://turkiye.rs.gov.ru/" className="text-white text-decoration-none text-uppercase rusLink d-none d-lg-inline-flex align-items-center" target="_blank" rel="noreferrer">
                Русский Дом
                <i className="fa-solid fa-arrow-right mainpageRight ms-1"></i>
              </a>
              
              {/* Mobil için Hamburger Menü Butonu */}
              <button
                className="btn p-1 d-lg-none" /* Sadece lg altı ekranlarda görünür */
                type="button"
                onClick={toggleSidebar}
                aria-controls="appOffcanvasSidebar"
                aria-expanded={isSidebarOpen}
                aria-label="Toggle navigation"
              >
                <i className={`fa-solid ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-white fs-4`}></i>
              </button>
            </div>
          </div>

          <hr className="d-none d-lg-block mt-2 mb-2" />
          <div className="d-none d-lg-flex justify-content-between align-items-center" id="desktopSocialIconsBar">
            <div className='desktop-navbar-social d-lg-flex align-items-center gap-3'>
              <a href="https://t.me/ankara_rusevi" target='_blank' rel="noopener noreferrer" className="desktop-social-icon"><i className="fa-brands fa-telegram"></i></a>
              <a href="tel:+903124420218" className="desktop-social-icon"><i className="fa-solid fa-square-phone"></i></a>
              <a href="https://vk.com/rusevi" target='_blank' rel="noopener noreferrer" className="desktop-social-icon"><i className="fa-brands fa-vk"></i></a>
              <a href="https://www.instagram.com/rusevi_ankara/?hl=tr" target='_blank' rel="noopener noreferrer" className="desktop-social-icon"><i className="fa-brands fa-instagram"></i></a>
            </div>
            {/* Masaüstü için Hamburger Menü Butonu */}
            <button
                className="btn p-1" /* d-lg-none kaldırıldı, görünürlüğü parent div'e bağlı */
                type="button"
                onClick={toggleSidebar}
                aria-controls="appOffcanvasSidebar"
                aria-expanded={isSidebarOpen}
                aria-label="Toggle navigation"
              >
                <i className={`fa-solid ${isSidebarOpen ? 'fa-times' : 'fa-bars'} text-white fs-4`}></i>
            </button>
          </div>
        </div>
      </div>

      <div className={`app-offcanvas-sidebar ${isSidebarOpen ? 'open' : ''}`} id="appOffcanvasSidebar">
        <div className="offcanvas-header">
          <img src={rusevi} className="ruseviLogo" alt="Rusevi logo" />
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <Link to="/KayıtOl" className="btn kayitOl-sidebar w-100 mb-3" onClick={toggleSidebar}>
            Haritaya Kurumunuzu Ekleyin
          </Link>

          <div className='sidebar-social-section mb-3'>
            <div className="d-flex flex-wrap gap-3 justify-content-start">
              <a href="https://t.me/ankara_rusevi" target='_blank' rel="noopener noreferrer" className="sidebar-social-icon-link" onClick={toggleSidebar}>
                <i className="fa-brands fa-telegram fs-4"></i>
              </a>
              <a href="tel:+903124420218" className="sidebar-social-icon-link" onClick={toggleSidebar}>
                <i className="fa-solid fa-square-phone fs-4"></i>
              </a>
              <a href="https://vk.com/rusevi" target='_blank' rel="noopener noreferrer" className="sidebar-social-icon-link" onClick={toggleSidebar}>
                <i className="fa-brands fa-vk fs-4"></i>
              </a>
              <a href="https://www.instagram.com/rusevi_ankara/?hl=tr" target='_blank' rel="noopener noreferrer" className="sidebar-social-icon-link" onClick={toggleSidebar}>
                <i className="fa-brands fa-instagram fs-4"></i>
              </a>
            </div>
          </div>
          
          <hr className="text-white-50"/>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}> <i className="fa-solid fa-house"></i>  Ana Sayfa</Link>
            </li>
            <li className="nav-item">
              <Link to="/rusevi" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-building-flag"></i> Rus Evi Ankara Hakkında</Link>
            </li>
            <li className="nav-item">
              <Link to="/harita" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-map"></i> Harita</Link>
            </li>
            <li className="nav-item">
              <Link to="/yayinlar" className="nav-link-item text-white text-decoration-none py-2 d-block" onClickName={toggleSidebar}><i class="fa-solid fa-book-open"></i> Yayınlar</Link>
            </li>
            <li className="nav-item">
              <Link to="/credit" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-user"></i> Ekibe Katılın!</Link>
            </li>
            <li className="nav-item">
              <Link to="/konsolosluklar" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-building-columns"></i> Konsolosluklar</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-graduation-cap"></i> Mezuniyet Klübü</Link>
            </li>
            <li className="nav-item">
              <Link to="/IsStaj" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-briefcase"></i> İş/Staj</Link>
            </li>
            <li className="nav-item">
              <Link to="/rusyaburslari" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-school"></i> Rusya Bursları</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link-item text-white text-decoration-none py-2 d-block" onClick={toggleSidebar}><i className="fa-solid fa-address-book"></i> İletişim</Link>
            </li>
            <li className="nav-item">
              <a href="https://turkiye.rs.gov.ru/" className="nav-link-item text-white text-decoration-none text-uppercase rusLink-sidebar py-2 d-block" target="_blank" rel="noreferrer" onClick={toggleSidebar}>
                Русский Дом
                <i className="fa-solid fa-arrow-right mainpageRight ms-1"></i>
              </a>
            </li>
          </ul>
        </div>  
      </div>
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Navbar;
