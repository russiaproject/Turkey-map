import React from 'react';
import matrushka from "./images/matrushka.png";
import anitkabir from "./images/anitkabir.png";
import red from "./images/red.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-custom position-relative py-5 mt-5">
      <div class="position-absolute bottom-0 start-25 ms-5">
        <img src={red} alt="" className='redBina'/>
        </div>
        <div class="position-absolute top-0 end-0 me-5 rotateMat">
        <img src={matrushka} alt="" className='matrushka'/>
        </div>
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 col-md-4">
            <h5 className="footer-title mb-3">Русский Дом Анкара</h5>
            <p className="footer-text">Hilal mah., Rabindranath Tagore cad., n.68 Çankaya, Ankara</p>
            <p className="footer-text">
              <a href="mailto:turkey@rs.gov.ru" className="footer-link">
                turkey@rs.gov.ru
              </a>
            </p>
            <p className="footer-text">
              <a href="tel:+903124420218" className="footer-link">
                +90 312 442 02 18
              </a>
            </p>
          </div>
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="footer-title mb-3">Hızlı Gezinme</h5>
            <nav className="d-flex flex-column align-items-center align-items-md-start">
              <a href="#" className="footer-link mb-1">Ana Sayfa</a>
              <a href="#" className="footer-link mb-1">Rusevi Türkiye Hakkında</a>
              <a href="#" className="footer-link mb-1">Harita</a>
              <a href="#" className="footer-link mb-1">İletişim</a>
            </nav>
          </div>
          <div className="col-12 col-md-4 text-center text-md-start">
            <h5 className="footer-title mb-3">Rusevi Sosyalde!</h5>
            <div className="d-flex flex-column align-items-center align-items-md-start">
               <a href="https://x.com/rusevi_ankara" target="_blank" rel="noopener noreferrer" className="footer-link mb-1">
                 <i className="fa-brands fa-twitter me-2"></i>Twitter
               </a>
               <a href="https://www.instagram.com/rusevi_ankara/" target="_blank" rel="noopener noreferrer" className="footer-link mb-1">
                 <i className="fa-brands fa-instagram me-2"></i>Instagram
               </a>
               <a href="https://t.me/ankara_rusevi" target="_blank" rel="noopener noreferrer" className="footer-link mb-1">
                 <i className="fa-brands fa-telegram me-2"></i>Telegram(TR)
               </a>
                <a href="https://t.me/ankara_rusdom" target="_blank" rel="noopener noreferrer" className="footer-link mb-1">
                 <i className="fa-brands fa-telegram me-2"></i>Telegram(RU)
               </a>
              </a>
                <a href="https://vk.com/rusevi" target="_blank" rel="noopener noreferrer" className="footer-link mb-1">
                 <i className="fa-brands fa-telegram me-2"></i>VK
               </a>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center mt-5 pt-4">
          © {new Date().getFullYear()} Русский Дом Анкара. Tüm hakları saklıdır.
          <br />
          <Link to="/credit" className='katki'>Bu Siteye Katkısı Olanları Görün!</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
