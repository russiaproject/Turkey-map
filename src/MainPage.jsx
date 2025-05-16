import React from 'react';

import turkeyHigh from "./images/fly.png";
import rusevi from "./images/rusevi.png";
import matrushka from "./images/matrushka.png";
import decoration from "./images/homepage-offer-decoration.svg";
import ornekDergi from "./images/ornekDergi.jpg";
import ruseviBina from "./images/ruseviBina.jpg";
import blogOrnek from "./images/aaa.webp";
import akkuyuDikey from "./images/akkuyuFotoDikey.jpg";
import konsoloslukDikey from "./images/konsoloslukDikey.jpg";


import { Link } from 'react-router-dom';

import TurkeyMap from './TurkeyMap';

const MainPage = () => {
  return (
    <div>
      <div className='w-100 py-5 overflow-hidden mainPageFirst position-relative'>
        <div className='position-absolute w-100 h-100 turkiyeArka'>
        </div>
        <div className='container mainZN pt-4 pb-5'>
          <div className='text-center'>
            <h1 className='text-white display-4 fw-bold w-75 mx-auto'>Türkiye'de Kurum: okul, üniversite, Konsolosluklar</h1>
            <p className='text-white'>
Türkiye genelindeki tüm Rusya Federasyonuna ait eğitim ve resmi kurumlara ulaşın.</p>
            <div className='d-flex justify-content-center gap-2 mt-3'>
              <a href="#kurumlarBazi" className='btnAnaSayfa'>Başlıca Kurumları Gör!</a>
              <Link to="/harita" className='btnAnaSayfa'>Haritadaki Kurumları Gör!</Link>
            </div>
            <div className='scroll-indicator-container mt-4'>
              <a href="#kurumlarBazi" className='scroll-link'>
                <div className='scroll-arrow'></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        <TurkeyMap/>
      </div>
      <div className='position-relative'>
        <div class="position-absolute top-0 end-0 ms-5">
                <img src={matrushka} alt="" className='redBina'/>
                </div>
        <div className='container mt-5 px-lg-5 px-3'>
        <div className='d-flex flex-column flex-md-row px-3 justify-content-between align-items-center w-100 mb-3'>
          <h2 className='normalBaslik mb-md-0' id='kurumlarBazi'>Bazı Kurumları Tanıyın!</h2>
        </div>
        <div className='row px-3 pt-4 g-4'>
          <div className='col-lg-4 col-md-6 mb-4'>
             <div className='kurumCard h-100'>
               <img src={konsoloslukDikey} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
               <div className='photo-dark-overlay'></div>
               <div className='kurumCard-content'>
                 <div className='custom-fit p-2 d-inline-block ms-2'>
                   <p className='d-inline mb-0'>Büyükelçilik</p>
                 </div>
                 <div className='kurumCardYazilar p-3'>
                   <h5>Ankara Büyükelçiliği</h5>
                   <p>Rusya Federasyonu’nun Türkiye Büyükelçiliği, diplomatik ilişkileri geliştirmek ve vatandaşlarına hizmet sunmak amacıyla resmi olarak faaliyet göstermektedir. 
                   </p>
                   <Link to="/konsolosluk" className='btn kurumButton'>Kurumu Görün!</Link>
                 </div>
               </div>
             </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='kurumCard h-100'>
              <img src={ruseviBina} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Büyükelçilik</p>
                </div>
                <div className='kurumCardYazilar p-3'>
                  <h5>Rus Evi Ankara</h5>
                  <p>Rus Evi Ankara, kültürel etkinlikler, dil kursları ve halkla ilişkiler yoluyla Türkiye-Rusya dostluğunu güçlendirmeyi amaçlamaktadır.
                  </p>
                  <Link to="/rusevi" className='btn kurumButton'>Kurumu Görün!</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='kurumCard h-100'>
              <img src={akkuyuDikey} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Nükleer Santral</p>
                </div>
                <div className='kurumCardYazilar p-3'>
                  <h5>Akkuyu Nükleer Santrali</h5>
                  <p>Rosatom iş birliğiyle Mersin’de inşa edilen Akkuyu, Türkiye’nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.
                  </p>
                  <Link to="/akkuyu" className='btn kurumButton'>Kurumu Görün!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
