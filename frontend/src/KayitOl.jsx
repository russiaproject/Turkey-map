import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const KayitOl = () => {
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    isletme: "",
    sifre: "",
    telefon: "",
  });
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Form field id'leri ile API field'larını eşleştir
    const fieldMap = {
      isimForm: "isim",
      soyisimForm: "soyisim",
      emailForm: "email",
      isletmeForm: "isletme", 
      sifreForm: "sifre",
      telefonForm: "telefon"
    };
    
    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Form verilerini API'ye gönder
    const response = await fetch('http://localhost:8080/api/partnership-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const responseData = await response.json();
    
    if (response.status === 201) {
      document.getElementById('isimForm').value = '';
      document.getElementById('soyisimForm').value = '';
      document.getElementById('emailForm').value = '';
      document.getElementById('isletmeForm').value = '';
      document.getElementById('sifreForm').value = '';
      document.getElementById('telefonForm').value = '';
      
      setFormData({
        isim: "",
        soyisim: "",
        email: "",
        isletme: "",
        sifre: "",
        telefon: "",
      });
      
      alert("İşbirliği başvurunuz başarıyla alındı! İncelendikten sonra sizinle iletişime geçeceğiz.");
    } else {
      throw new Error(responseData.error || 'Başvuru gönderilemedi');
    }
  } catch (error) {
    console.error("Başvuru gönderilirken hata oluştu:", error);
    alert("Başvuru gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
  }
};

  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">İşletmeniz İle İş Birliği Yapalım!</h2>
          
          {/* onSubmit ekleyin */}
          <form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>

            <div className="kayitTekCol">
              <label htmlFor="isletmeForm" className="kayitLabel">
                İşletme/Kurum Adı
              </label>
              <input
                type="text"
                className="kayitInput"
                id="isletmeForm"
                placeholder="İşletme Adı"
                onChange={handleChange}
                required
              />
            </div>

            <div className="kayitTekCol">
              <label htmlFor="sifreForm" className="kayitLabel">
                Şifre Seçiniz
              </label>
              <input
                type="password" 
                className="kayitInput"
                id="sifreForm"
                placeholder="Şifre Seçiniz"
                onChange={handleChange}
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
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <button type="submit" className="kayitButon">
                Hemen İŞBİRLİĞİ Yapın!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default KayitOl;