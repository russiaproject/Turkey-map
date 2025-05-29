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

import gazprom from "./images/gazprom.jpg";
import akkuyuFoto from "./images/akkuyuFoto.jpg";
import konsolosluk from "./images/konsolosluk.jpg";
import ruseviYatay from "./images/ruseviYatay.jpg";
import rostecFoto from "./images/roctec.jpg";
import rosatomFoto from "./images/rosatomFoto.jpg";

import { Link } from 'react-router-dom';
import Makale from './Makale'

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
              <a href="#haritaAssagi" className='scroll-link'>
                <div className='scroll-arrow'></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      
      <div id="haritaAssagi">
        <TurkeyMap />
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
          <div className='col-lg-4 col-md-6 mb-2'>
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
          <div className='col-lg-4 col-md-6 mb-2'>
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
          <div className='col-lg-4 col-md-6 mb-2'>
            <div className='kurumCard h-100'>
              <img src={akkuyuDikey} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Nükleer Şirket</p>
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
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='kurumCard h-100'>
              <img src={gazprom} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Şirket</p>
                </div>
                <div className='kurumCardYazilar p-3'>
                  <h5>Gazprom</h5>
                  <p>Dünyanın en büyük doğalgaz üreticisi Gazprom, TürkAkım projesiyle Türkiye’yi Avrupa’ya bağlayan stratejik bir enerji köprüsüne dönüştürüyor.
                  </p>
                  <Link to="/gazprom" className='btn kurumButton'>Kurumu Görün!</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='kurumCard h-100'>
              <img src={rostecFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Savunma Sanayi</p>
                </div>
                <div className='kurumCardYazilar p-3'>
                  <h5>Rostec</h5>
                  <p>Üstün teknoloji sivil ve askeri kulanım sanayi ürünleri hazırlama, üretim ve ihracat yapma amacıyla 2007 yılının sonunda kurulmuştur.
                  </p>
                  <Link to="/rostec" className='btn kurumButton'>Kurumu Görün!</Link>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 mb-4'>
            <div className='kurumCard h-100'>
              <img src={rosatomFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
              <div className='photo-dark-overlay'></div>
              <div className='kurumCard-content'>
                <div className='custom-fit p-2 d-inline-block ms-2'>
                  <p className='d-inline mb-0'>Nükleer Şirket</p>
                </div>
                <div className='kurumCardYazilar p-3'>
                  <h5>Rosatom</h5>
                  <p>Rosatom iş birliğiyle Mersin’de inşa edilen Akkuyu, Türkiye’nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.
                  </p>
                  <Link to="/rosatom" className='btn kurumButton'>Kurumu Görün!</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='container mt-5 p-5'>
        <div className='d-flex px-3 justify-content-between w-100'>
          <h2 className='makaleBaslik'>Makalelerimiz</h2>
          <Link to="makale" className='makaleButton btn py-3'>Tüm Makaleler! <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
       <div className="row g-4 mt-2">
          <a href="#" className="col-lg-7 text-decoration-none d-flex">
            <div className="featured-post w-100">
              <div className="featured-image-wrapper">
                <img src={ruseviYatay} className="featured-image" alt="Öne çıkan blog gönderisi" />
                <div className="category-badge">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
              <div className="featured-content">
                <div className="post-meta mb-3">16 Haziran 2006</div>
                <h2 className="post-title">Teknoloji 2024'te İşin Geleceğini Nasıl Şekillendiriyor</h2>
                <p className="post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh, eu condimentum erat varius non varius non...
                </p>
              </div>
            </div>
          </a>
          
          <div className="col-lg-5 d-flex flex-column">
            <a href="#" className="text-decoration-none d-flex flex-grow-1">
              <div className="side-post mb-3 w-100">
                <div className="row g-0 h-100">
                  <div className="col-7">
                    <div className="side-post-content">
                      <div>
                        <div className="post-meta mb-1">16 Haziran 2006</div>
                        <h3 className="side-post-title">Modern İşletmelerde Yapay Zekayı Keşfetmek</h3>
                        <p className="side-post-excerpt">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                        </p>
                      </div>
                      <div className="category-badge-small mt-auto">
                        <p className="m-0">IT Alanı</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 d-flex">
                    <div className="side-image-wrapper w-100">
                      <img src={akkuyuFoto} className="side-image" alt="Blog gönderisi" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <a href="#" className="text-decoration-none d-flex flex-grow-1">
              <div className="side-post mb-3 w-100">
                <div className="row g-0 h-100">
                  <div className="col-7">
                    <div className="side-post-content">
                      <div>
                        <div className="post-meta mb-1">15 Haziran 2006</div>
                        <h3 className="side-post-title">Dikkat Edilmesi Gereken Siber Güvenlik Trendleri</h3>
                        <p className="side-post-excerpt">
                          Consectetur adipiscing elit. Donec posuere enim nibh, eu condimentum erat varius...
                        </p>
                      </div>
                      <div className="category-badge-small mt-auto">
                        <p className="m-0">Güvenlik</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 d-flex">
                    <div className="side-image-wrapper w-100">
                      <img src={konsolosluk} className="side-image" alt="Blog gönderisi" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
            <a href="#" className="text-decoration-none d-flex flex-grow-1">
              <div className="side-post w-100">
                <div className="row g-0 h-100">
                  <div className="col-7">
                    <div className="side-post-content">
                      <div>
                        <div className="post-meta mb-1">14 Haziran 2006</div>
                        <h3 className="side-post-title">Uzaktan İşbirliğinin Yükselişi</h3>
                        <p className="post-excerpt">
                          Adipiscing elit. Donec posuere enim nibh, eu condimentum erat varius non varius non...
                        </p>
                      </div>
                      <div className="category-badge-small mt-auto">
                        <p className="m-0">İş Dünyası</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 d-flex">
                    <div className="side-image-wrapper w-100">
                      <img src={ruseviYatay} className="side-image" alt="Blog gönderisi" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
