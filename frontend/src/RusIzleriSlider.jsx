import React from 'react'
import { Link } from "react-router-dom";
import Slider from "react-slick";

import fethiyeCamii from "./images/fethiyeCamii.jpeg"
import karsDefterdarligi from "./images/karsDefterdarligi.jpeg"
import karsİlSaglik from "./images/karsİlSaglik.jpeg"


const RusIzleriSlider = () => {
  return (
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
                  <img src={fethiyeCamii} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Mimari</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Kars Fethiye Camii</h5>
                                          <p>19. yüzyılda Rus Ortodoks Kilisesi olarak inşa edilen bu yapı, bugün cami olarak hizmet vermektedir.</p>

                      <Link to="/fethiyeCamii" className='btn kurumButton'>Detayları Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={karsDefterdarligi} className='rounded-4 card-img-top' alt="Rus Evi Ankara Bina" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Tarihi Yapı</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Kars Defterdarlığı</h5>
                      <p>19. yüzyılın sonlarında inşa edilen Kars Defterdarlığı Binası, Rus dönemi Baltık mimarisinin izlerini taşıyan tarihî bir kamu yapısıdır.</p>
                      <Link to="/kars-defterdarligi" className='btn kurumButton'>Detayları Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* Card 3 */}
              <div className='px-2'>
                <div className='kurumCard h-100'>
                  <img src={karsİlSaglik} className='rounded-4 card-img-top' alt="Akkuyu Projesi" />
                  <div className='photo-dark-overlay'></div>
                  <div className='kurumCard-content'>
                    <div className='custom-fit p-2 d-inline-block ms-2'>
                      <p className='d-inline mb-0'>Kültürel</p>
                    </div>
                    <div className='kurumCardYazilar p-3'>
                      <h5>Kars İl Sağlık Müdürlüğü Binası</h5>
                      <p>19. yüzyıl sonlarında inşa edilen İl Sağlık Müdürlüğü Binası, Kars'ta Rus dönemi Baltık mimarisinin sade ve işlevsel izlerini taşıyan özgün bir kamu yapısıdır.</p>
                      <Link to="/kars-il-saglik" className='btn kurumButton'>Detayları Görün!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
  )
}

export default RusIzleriSlider
