import React from "react";
import { Link } from "react-router-dom";

const KayitOl = () => {
  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">İşletmeniz İle İş Birliği Yapalım!</h2>
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
              <label htmlFor="isletmeForm" className="kayitLabel">
                İşletme/Kurum Adın
              </label>
              <input
                type="text"
                className="kayitInput"
                id="isletmeForm"
                placeholder="İşletme Adı"
                required
              />
            </div>

            <div className="kayitTekCol">
              <label htmlFor="sifreForm" className="kayitLabel">
                Şifre Seçiniz
              </label>
              <input
                type="text"
                className="kayitInput"
                id="sifreForm"
                placeholder="Şifre Seçiniz"
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
              <button className="kayitButon">Hemen İŞBİRLİĞİ Yapın!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KayitOl;