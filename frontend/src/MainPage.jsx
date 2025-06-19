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
import Yayinlar from './Yayinlar'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TurkeyMap from './TurkeyMap';
import RusenFoto from "./images/rusen.jpg";
import MumessilikFoto from "./images/mumessilik.jpg";
import SputnikFoto from "./images/sputnik.jpg";
import RTFoto from "./images/RT.png"
import SberbankFoto from "./images/sberbank.png"
import TassFoto from "./images/Tass.png"

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
Türkiye genelindeki tüm Rusya Federasyonuna ait eğitim ve resmi kurumlara ulaşın.</p>
            <div className='d-flex justify-content-center gap-2 mt-3'>
              <a href="#kurumlarBazi" className='btnAnaSayfa'>Başlıca Kurumları Gör!</a>
              <Link to="/konsolosluklar" className='btnAnaSayfa'>Bütün Konsoloslukları Gör!</Link>
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
        <div className='container mt-5 px-lg-5 px-3'>
          <div className='d-flex flex-column flex-md-row px-3 justify-content-between align-items-center w-100 mb-3'>
            <h2 className='normalBaslik mb-md-0' id='kurumlarBazi'>Bazı Kurumları Tanıyın!</h2>
          </div>
          <div className='px-3 pt-4'>
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
                  <img src={konsoloslukDikey} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Büyükelçilik</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Ankara Büyükelçiliği</h5>
                      <p>Rusya Federasyonu'nun Türkiye Büyükelçiliği, diplomatik ilişkileri geliştirmek ve vatandaşlarına hizmet sunmak amacıyla resmi olarak faaliyet göstermektedir.</p>
                      <Link to="/konsolosluk" className='btn kurumButton'>Kurumu Görün!</Link>
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
                  <img src={MumessilikFoto} className='rounded-4 card-img-top' alt="Mumessilik Foto" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Sanayi ve Yatırım Kurumu</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Rusya Federasyonu Ticaret Mümessilliği</h5>
                      <p>İkili ticaret, sanayi ve yatırım alanlarında iş birliğini geliştirmekle görevli resmî Rus devlet kurumudur.</p>
                      <Link to="/mumessillik" className='btn kurumButton'>Kurumu Görün!</Link>
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
                      <p className='d-inline mb-0'>Haber Ajansı</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Sputnik</h5>
                      <p>Uluslararası haber ajansı Sputnik, İstanbul merkezli ofisiyle dijital ve radyo yayınları sunar. Türkiye’nin 24 şehrinde 7/24 karasal radyo yayını yapmaktadır.</p>
                      <Link to="/sputnik" className='btn kurumButton'>Kurumu Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
                 {/* card 10 */}
                            <div className='px-2'>
                              <div className='kurumCard h-100'>
                                <img src={SberbankFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                                <div className='photo-dark-overlay'></div>
                                <div className='kurumCard-content'>
                                  <div className='custom-fit p-2 d-inline-block ms-2'>
                                    <p className='d-inline mb-0'>Rusya Bankası</p>
                                  </div>
                                  <div className='kurumCardYazilar p-3'>
                                    <h5>SberBank</h5>
                                    <p>1841’den günümüze finansal güvenin ve teknolojik dönüşümün simgesi: Sberbank, 110 milyonu aşkın müşterisiyle küresel çapta hizmet sunan bir banka ve teknoloji ekosistemi</p>
                                    <Link to="/Sberbank" className='btn kurumButton'>Kurumu Görün!</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                               {/* card 11 */}
                            <div className='px-2'>
                              <div className='kurumCard h-100'>
                                <img src={TassFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                                <div className='photo-dark-overlay'></div>
                                <div className='kurumCard-content'>
                                  <div className='custom-fit p-2 d-inline-block ms-2'>
                                    <p className='d-inline mb-0'>Haber Ajansı</p>
                                  </div>
                                  <div className='kurumCardYazilar p-3'>
                                    <h5>TASS</h5>
                                    <p>120 yıllık habercilik mirasıyla TASS, 6 dilde yayın, 54 ülkede temsilcilik ve dijital çözümleriyle küresel medyanın güvenilir bilgi kaynağı olmaya devam ediyor</p>
                                    <Link to="/tass" className='btn kurumButton'>Kurumu Görün!</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                               {/* card 12 */}
                            <div className='px-2'>
                              <div className='kurumCard h-100'>
                                <img src={RTFoto} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                                <div className='photo-dark-overlay'></div>
                                <div className='kurumCard-content'>
                                  <div className='custom-fit p-2 d-inline-block ms-2'>
                                    <p className='d-inline mb-0'>Haber Ajansı</p>
                                  </div>
                                  <div className='kurumCardYazilar p-3'>
                                    <h5>RT</h5>
                                    <p>Alternatif bakış açıları, çok dilli yayıncılık ve dijital medya projeleriyle küresel haberciliğe yön veren uluslararası televizyon ağı</p>
                                    <Link to="/RT" className='btn kurumButton'>Kurumu Görün!</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
            </Slider>
          </div>
        </div>
      </div>
      <div className='container mt-5 p-5'>
        <div className='d-flex px-3 justify-content-between w-100'>
          <h2 className='makaleBaslik'>Yayınlar</h2>
          <Link to="/Yayinlar" className='makaleButton btn py-3'>Tüm Yayınlar! <i className="fa-solid fa-arrow-right"></i></Link>
        </div>
        <div className="row g-4  mt-1">
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
      </div>
    </div>
  );
}

export default MainPage;