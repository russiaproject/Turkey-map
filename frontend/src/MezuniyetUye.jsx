import React from "react";
import { Link } from "react-router-dom";

const MezuniyetUye = () => {
  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">Mezuniyet Kulübüne Kayıt Olun!</h2>
          <p style={{fontSize:"0.8rem"}} className="text-center">Rusya Federasyonu’nun Türkiye Cumhuriyeti Temsilciliği ve Rus Evi Ankara bünyesinde faaliyet gösteren
“Rus ve Sovyet Üniversiteleri Mezunu Türk Mezunlar Kulübü”
gayriresmî meslekî topluluğunun faaliyetlerine katılım başvurusu
</p>
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
                  placeholder="İsminizi Giriniz"
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
                  placeholder="Soyisminizi Giriniz"
                  required
                />
              </div>
            </div>
              
            <div className="kayitTekCol">
              <label htmlFor="babaForm" className="kayitLabel">
                Baba Adı
              </label>
              <input
                type="text"
                className="kayitInput"
                id="babaForm"
                placeholder="Baba Adınızı Giriniz"
                required
              />
            </div>
            <div className="kayitTekCol">
              <label htmlFor="mezunKurumForm" className="kayitLabel">
                Mezun Olunan Rus veya Sovyet Yükseköğretim Kurumu

              </label>
              <input
                type="text"
                className="kayitInput"
                id="mezunKurumForm"
                placeholder="Mezun Olduğunuz Kurumu Yazınız"
                required
              />
            </div>
            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="mezunYilForm" className="kayitLabel">
                  Mezuniyet Yılı
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="mezunYilForm"
                  placeholder="Mezuniyet Yılınızı Girin"
                  required
                />
              </div>
              <div className="kayitCol">
                <label htmlFor="akademikUnvanForm" className="kayitLabel">
                    Akademik Ünvan/Dereceler
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="akademikUnvanForm"
                  placeholder="Ünvan Giriniz(varsa)"
                />
              </div>
            </div>

            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="calistiginizKurumForm" className="kayitLabel">
                  Çalıştığı kurum
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="calistiginizKurumForm"
                  placeholder="Çalıştığınız Kurumu Giriniz"
                  required
                />
              </div>
              <div className="kayitCol">
                <label htmlFor="gorevForm" className="kayitLabel">
                  Görev
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="gorevForm"
                  placeholder="Çalıştığınız Yerdeki Göreviniz"
                />
              </div>
              
            </div>
            
            
            <div className="kayitTekCol">
              <label htmlFor="akademikGorevForm" className="kayitLabel">
 Akademik Ünvan
              </label>
              <input
                type="text"
                className="kayitInput"
                id="akademikGorevForm"
                placeholder="Akademik Ünvan"
                required
              />
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
              <button className="kayitButon">Mezuniyet Kulübüne Kayıt Olun!</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MezuniyetUye;