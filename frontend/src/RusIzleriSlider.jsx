import React from 'react';
import { Link } from "react-router-dom";
import Slider from "react-slick";

import fethiyeCamii from "./images/fethiyeCamii.jpeg";
import karsDefterdarligi from "./images/karsDefterdarligi.jpeg";
import karsİlSaglik from "./images/karsİlSaglik.jpeg";
import geliboluFotoDikey from "./images/geliboluFotoDikey.jpg";
import rusAskeriAnit from "./images/rusAskeriAnit.jpg";
import andreyKarlovAnit from "./images/andreyKarlovAnit.jpg";

import rusizleriJson from "./data/rus_izleri.json";

const RusIzleriSlider = () => {
  const imageMap = {
    "./images/fethiyeCamii.jpeg": fethiyeCamii,
    "./images/karsDefterdarligi.jpeg": karsDefterdarligi,
    "./images/karsİlSaglik.jpeg": karsİlSaglik,
    "./images/geliboluFotoDikey.jpg": geliboluFotoDikey,
    "./images/rusAskeriAnit.jpg": rusAskeriAnit,
    "./images/andreyKarlovAnit.jpg": andreyKarlovAnit,
  };

  const allItems = Object.values(rusizleriJson).flat();

  return (
    <div className='mt-5 mb-5'>
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
      {allItems.map((item, index) => (
        <div className='px-2' key={index}>
          <div className='kurumCard h-100'>
            <img src={imageMap[item.image]} className='rounded-4 card-img-top' alt={item.name} />
            <div className='photo-dark-overlay'></div>
            <div className='kurumCard-content'>
              <div className='custom-fit p-2 d-inline-block ms-2'>
                <p className='d-inline mb-0'>{item.type}</p>
              </div>
              <div className='kurumCardYazilar p-3'>
                <h5>{item.name}</h5>
                <p>{item.description}</p>
                <Link to={item.RusLink} className='btn kurumButton'>Detayları Görün!</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    </div>
  );
}

export default RusIzleriSlider;