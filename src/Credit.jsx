import React from "react";
import ornekFoto from "./images/ruseviBina.jpg";
import emir from "./images/emir.jpg";
import mustafa from "./images/mustafa.jpg";
import yelkanat from "./images/yelkanat.jpg";
import ludmila from "./images/RussiaFlag.svg"; // Buraya resim gelecek

const Credit = () => {
  return (
    <div className="container p-5">
      <div className="row creditRow">
        <div className="col-lg-3 shadowCredit rounded-5 p-5">
          <div>
            <img src={emir} alt="Emir Kesimoğlu" className="creditFoto" />
          </div>
          <div>
            <p className="meslekCredit mt-3">
              Full-Stack Developer & Development Team
            </p>
            <p className="isimCredit">Emir Kesimoğlu</p>
            <div className="gap-2 d-flex ikonKredit">
             <a
                href="https://www.instagram.com/emirk_oglu/"
                className="credit-icon-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/emirkesimoglu/"
                className="credit-icon-link"
                aria-label="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
             <a
                href="https://github.com/emxis"
                className="credit-icon-link"
                aria-label="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="mailto:emirkesimoglu.923@gmail.com"
                className="credit-icon-link"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 shadowCredit rounded-5 p-5">
          <div>
            <img src={mustafa} alt="Mustafa Türkmen" className="creditFoto" />
          </div>
          <div>
            <p className="meslekCredit mt-3">Proje Takım Lideri</p>
            <p className="isimCredit">Mustafa Türkmen</p>
            <div className="gap-2 d-flex ikonKredit">
             <a
                href="https://vk.com/mustafa0002312"
                className="credit-icon-link"
                aria-label="VK"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-vk"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/mustafa-t-334890296/"
                className="credit-icon-link"
                aria-label="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
             <a
                href="https://github.com/MustafaTurkmen06"
                className="credit-icon-link"
                aria-label="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href="mailto:turkmen.mustafa@yandex.com"
                className="credit-icon-link"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="col-lg-3 shadowCredit rounded-5 p-5">
          <div>
            <img src={ludmila} alt="Ludmila Hanım" className="creditFoto" />
          </div>
          <div>
            <p className="meslekCredit mt-3">Proje Fikir Sahibi</p>
            <p className="isimCredit">Ludmila Çalışkan</p>
            <div className="gap-2 d-flex ikonKredit">
              <a
                href=""
                className="credit-icon-link"
                aria-label="Email"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a
                href="https://www.instagram.com/rusevi_ankara/"
                className="credit-icon-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credit;
