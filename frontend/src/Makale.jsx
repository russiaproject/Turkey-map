import React from 'react'

import akkuyuFoto from "./images/akkuyuFoto.jpg";
import konsolosluk from "./images/konsolosluk.jpg";
import ruseviYatay from "./images/ruseviYatay.jpg";

const Makale = () => {
  return (
    <div className='container mt-5 px-5 '>  
    <h1>Makaleler</h1>
          <div className="row g-4 mt-1">
      <a href="" className='col-lg-7 text-decoration-none'>
      <div className="">
        <div className="featured-post">
          <div className="featured-image-wrapper">
            <img src={ruseviYatay} className="featured-image" alt="Featured blog post" />
            <div className="category-badge">
              <p className="m-0">IT Alanı</p>
            </div>
          </div>
          
          <div className="featured-content">
            <div className="post-meta mb-3">16 Haziran 2006</div>
            <h2 className="post-title">How Tech Shapes the Future of Work in 2024</h2>
            <p className="post-excerpt">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh, eu condimentum erat varius non varius non...
            </p>
          </div>
        </div>
      </div>
      </a>
      
      {/* Right Side Posts */}
      <div className="col-lg-5">
        {/* First Right Post */}
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={akkuyuFoto} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={konsolosluk} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
        <a href="" className='text-decoration-none'>
        <div className="side-post mb-3">
          <div className="row g-0">
            <div className="col-7">
              <div className="side-post-content">
                <div className="post-meta mb-1">16 Haziran 2006</div>
                <h3 className="side-post-title">How Tech Shapes the Future of Work in 2024</h3>
                <p className="side-post-excerpt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere enim nibh...
                </p>
                <div className="category-badge-small">
                  <p className="m-0">IT Alanı</p>
                </div>
              </div>
            </div>
            <div className="col-5">
              <div className="side-image-wrapper">
                <img src={ruseviYatay} className="side-image" alt="Blog post" />
              </div>
            </div>
          </div>
        </div>
        </a>
      </div>
    </div>
        </div>
  )
}

export default Makale
