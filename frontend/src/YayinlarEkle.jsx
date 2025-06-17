import React from "react";
import { Link } from "react-router-dom";

const YayinlarEkle = () => {
  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">Yayın Ekleyin!</h2>
          <form action="#">
            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="isimYayinlarForm" className="kayitLabel">
                  İsminiz
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="isimYayinlarForm"
                  placeholder="İsminizi Giriniz"
                  required
                />
              </div>
              <div className="kayitCol">
                <label htmlFor="soyisimYayinlarForm" className="kayitLabel">
                  Soyisminiz
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="soyisimYayinlarForm"
                  placeholder="Soyisminizi Giriniz"
                  required
                />
              </div>
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="emailYayinlarForm" className="kayitLabel">
                Yayın Dosyanızız(PDF, DOCX, TXT)
              </label>
             
  <input className="form-control kayitInput" type="file" id="formFileMultiple" multiple />

            </div>

            <div className="kayitTekCol">
              <label htmlFor="emailYayinlarForm" className="kayitLabel">
                E-mail Adresiniz
              </label>
              <input
                type="email"
                className="kayitInput"
                id="emailYayinlarForm"
                placeholder="ornek@mail.com"
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="telefonYayinlarForm" className="kayitLabel">
                Telefon Numaranız
              </label>
              <input
                type="tel"
                className="kayitInput"
                id="telefonYayinlarForm"
                placeholder="5XX XXX XX XX"
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <button className="kayitButon">Yayınınızı Yayınlayın!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YayinlarEkle;