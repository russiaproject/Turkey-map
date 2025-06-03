import React from "react";

import akkuyuFoto from "./images/akkuyuFoto.jpg";
import konsolosluk from "./images/konsolosluk.jpg";
import ruseviYatay from "./images/ruseviYatay.jpg";
import konsoloslukBayrakYatay from "./images/konsoloslukBayrakYatay.jpg";
import gazprom from "./images/gazprom.jpg";
import rostecFoto from "./images/roctec.jpg";
import rosatomFoto from "./images/rosatomFoto.jpg";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import konsoloslukDikey from "./images/konsoloslukDikey.jpg";
import ruseviBina from "./images/ruseviBina.jpg";
import akkuyuDikey from "./images/akkuyuFotoDikey.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TurkeyMap from './TurkeyMap';
import RusenFoto from "./images/rusen.jpg";
import RusmerFoto from "./images/rusmer.jpg";
import SputnikFoto from "./images/sputnik.jpg";

const BarKurum = () => {
  return (
    <div className="my-5">
      <h4 className="card-title mb-4 mt-5 fw-bold ">
        <i className="fa-solid fa-info-circle me-2 text-primary"></i>
        Başka Kurumlarada Bakın!
      </h4>
     <Slider
              dots={true}
              infinite={true}
              speed={800}
              slidesToShow={3}
              slidesToScroll={3}
              autoplay={true}
              autoplaySpeed={3000}
              responsive={[
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]}
              className='kurum-slider'
            >
              {/* Card 1 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={konsoloslukBayrakYatay} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Konsolosluklar</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>                Bütün Rusya Konsoloslukları
</h5>
                      <p>                Büyükelçilikler ve konsolosluklar, yurtdışındaki vatandaşları ve çıkarları koruyan, görev ve faaliyetleri farklılaşan kurumlardır.
</p>
                      <Link to="/konsolosluklar" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={ruseviBina} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Rus Evi</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rus Evi Ankara</h5>
                      <p>Rus Evi Ankara, kültürel etkinlikler, dil kursları ve halkla ilişkiler yoluyla Türkiye-Rusya dostluğunu güçlendirmeyi amaçlamaktadır.</p>
                      <Link to="/rusevi" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={akkuyuDikey} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Nükleer Şirket</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Akkuyu Nükleer Santrali</h5>
                      <p>Rosatom iş birliğiyle Mersin'de inşa edilen Akkuyu, Türkiye'nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.</p>
                      <Link to="/akkuyu" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 4 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={gazprom} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Şirket</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Gazprom</h5>
                      <p>Dünyanın en büyük doğalgaz üreticisi Gazprom, TürkAkım projesiyle Türkiye'yi Avrupa'ya bağlayan stratejik bir enerji köprüsüne dönüştürüyor.</p>
                      <Link to="/gazprom" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 5 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={rostecFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Savunma Sanayi</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rostec</h5>
                      <p>Üstün teknoloji sivil ve askeri kulanım sanayi ürünleri hazırlama, üretim ve ihracat yapma amacıyla 2007 yılının sonunda kurulmuştur.</p>
                      <Link to="/rostec" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 6 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={rosatomFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Nükleer Şirket</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rosatom</h5>
                      <p>Rosatom iş birliğiyle Mersin'de inşa edilen Akkuyu, Türkiye'nin ilk nükleer enerji santrali olarak enerji alanında devrim niteliğindedir.</p>
                      <Link to="/rosatom" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* card 7 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={RusmerFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Rus Dili ve Kültür Merkezi</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rusmer</h5>
                      <p>Rusça kursları, TORFL sınavları ve kültürel etkinliklerle Türkiye-Rusya arasında dil ve kültür köprüsü kuruyor. Eğitimler her seviyeye uygun olarak Ankara, İstanbul ve Alanya’da sunuluyor.</p>
                      <Link to="/rusmer" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* card 8 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={RusenFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Rusya Araştırmaları Enstitüsü</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rusen</h5>
                      <p>Rusya ve Avrasya üzerine akademik ve kültürel çalışmalar yürüten RUSEN, karşılıklı anlayış, işbirliği ve entelektüel etkileşimi teşvik eden, Türkiye merkezli bir düşünce kuruluşudur.</p>
                      <Link to="/rusen" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* card 9 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={SputnikFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Haber AJansı</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Sputnik</h5>
                      <p>Uluslararası haber ajansı Sputnik, İstanbul merkezli ofisiyle dijital ve radyo yayınları sunar. Türkiye’nin 24 şehrinde 7/24 karasal radyo yayını yapmaktadır.</p>
                      <Link to="/sputnik" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
    </div>
  );
};

export default BarKurum;
