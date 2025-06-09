import React from "react";
import { Link } from "react-router-dom";

const RusIziEkle = () => {
  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">Rus İzi Ekle!</h2>
          <form action="#">
            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="isimForm" className="kayitLabel">
                  İsminiz
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="isimForm"
                  placeholder="İsminizi giriniz"
                  required
                />
              </div>
              <div className="kayitCol">
                <label htmlFor="soyisimForm" className="kayitLabel">
                  Soyisminiz
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="soyisimForm"
                  placeholder="Soyisminizi giriniz"
                  required
                />
              </div>
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="emailForm" className="kayitLabel">
                E-mail Adresiniz
              </label>
              <input
                type="email"
                className="kayitInput"
                id="emailForm"
                placeholder="ornek@mail.com"
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="telefonForm" className="kayitLabel">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                className="kayitInput"
                id="telefonForm"
                placeholder="5XX XXX XX XX"
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <button className="kayitButon">Rus İzi Yeri Ekleyin!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RusIziEkle;