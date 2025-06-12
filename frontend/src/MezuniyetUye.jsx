import React, { useState } from "react";
import { Link } from "react-router-dom";

const MezuniyetUye = () => {
  const [formData, setFormData] = useState({
    isim: '',
    soyisim: '',
    babaAdi: '',
    mezunKurum: '',
    mezuniyetYili: '',
    akademikUnvan: '',
    calistigiKurum: '',
    gorev: '',
    akademikGorev: '',
    email: '',
    telefon: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    // ID'lerden formData key'lerini türet
    const fieldMap = {
      'isimForm': 'isim',
      'soyisimForm': 'soyisim',
      'babaForm': 'babaAdi',
      'mezunKurumForm': 'mezunKurum',
      'mezunYilForm': 'mezuniyetYili',
      'akademikUnvanForm': 'akademikUnvan',
      'calistiginizKurumForm': 'calistigiKurum',
      'gorevForm': 'gorev',
      'akademikGorevForm': 'akademikGorev',
      'emailForm': 'email',
      'telefonForm': 'telefon'
    };

    const fieldName = fieldMap[id];
    if (fieldName) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/graduation-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Başvuru gönderilemedi');
      }

      const data = await response.json();
      showMessage('✅ Mezuniyet kulübü başvurunuz başarıyla gönderildi! İncelendikten sonra size dönüş yapılacaktır.', 'success');
      
      // Formu temizle
      setFormData({
        isim: '',
        soyisim: '',
        babaAdi: '',
        mezunKurum: '',
        mezuniyetYili: '',
        akademikUnvan: '',
        calistigiKurum: '',
        gorev: '',
        akademikGorev: '',
        email: '',
        telefon: ''
      });

    } catch (error) {
      console.error('Başvuru hatası:', error);
      showMessage(`❌ Başvuru gönderilirken hata oluştu: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kayitContainer">
      <div className="kayitWrapper">
        <div className="kayitForm">
          <h2 className="kayitBaslik">Mezuniyet Kulübüne Kayıt Olun!</h2>
          <p style={{fontSize:"0.8rem"}} className="text-center">
            Rusya Federasyonu'nun Türkiye Cumhuriyeti Temsilciliği ve Rus Evi Ankara bünyesinde faaliyet gösteren
            "Rus ve Sovyet Üniversiteleri Mezunu Türk Mezunlar Kulübü"
            gayriresmî meslekî topluluğunun faaliyetlerine katılım başvurusu
          </p>

          {/* Mesaj Bildirimi */}
          {message && (
            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="isimForm" className="kayitLabel">
                  İsminiz *
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="isimForm"
                  placeholder="İsminizi Giriniz"
                  value={formData.isim}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="kayitCol">
                <label htmlFor="soyisimForm" className="kayitLabel">
                  Soyisminiz *
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="soyisimForm"
                  placeholder="Soyisminizi Giriniz"
                  value={formData.soyisim}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
              
            <div className="kayitTekCol">
              <label htmlFor="babaForm" className="kayitLabel">
                Baba Adı *
              </label>
              <input
                type="text"
                className="kayitInput"
                id="babaForm"
                placeholder="Baba Adınızı Giriniz"
                value={formData.babaAdi}
                onChange={handleChange}
                required
              />
            </div>

            <div className="kayitTekCol">
              <label htmlFor="mezunKurumForm" className="kayitLabel">
                Mezun Olunan Rus veya Sovyet Yükseköğretim Kurumu *
              </label>
              <input
                type="text"
                className="kayitInput"
                id="mezunKurumForm"
                placeholder="Mezun Olduğunuz Kurumu Yazınız"
                value={formData.mezunKurum}
                onChange={handleChange}
                required
              />
            </div>

            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="mezunYilForm" className="kayitLabel">
                  Mezuniyet Yılı *
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="mezunYilForm"
                  placeholder="Mezuniyet Yılınızı Girin"
                  value={formData.mezuniyetYili}
                  onChange={handleChange}
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
                  placeholder="Ünvan Giriniz (varsa)"
                  value={formData.akademikUnvan}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="kayitRow">
              <div className="kayitCol">
                <label htmlFor="calistiginizKurumForm" className="kayitLabel">
                  Çalıştığı kurum *
                </label>
                <input
                  type="text"
                  className="kayitInput"
                  id="calistiginizKurumForm"
                  placeholder="Çalıştığınız Kurumu Giriniz"
                  value={formData.calistigiKurum}
                  onChange={handleChange}
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
                  value={formData.gorev}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="akademikGorevForm" className="kayitLabel">
                Akademik Ünvan *
              </label>
              <input
                type="text"
                className="kayitInput"
                id="akademikGorevForm"
                placeholder="Akademik Ünvan"
                value={formData.akademikGorev}
                onChange={handleChange}
                required
              />
            </div>

            <div className="kayitTekCol">
              <label htmlFor="emailForm" className="kayitLabel">
                E-mail Adresiniz *
              </label>
              <input
                type="email"
                className="kayitInput"
                id="emailForm"
                placeholder="ornek@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <label htmlFor="telefonForm" className="kayitLabel">
                Telefon Numaranız *
              </label>
              <input
                type="tel"
                className="kayitInput"
                id="telefonForm"
                placeholder="5XX XXX XX XX"
                value={formData.telefon}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="kayitTekCol">
              <button 
                type="submit" 
                className="kayitButon"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Başvuru Gönderiliyor...
                  </>
                ) : (
                  'Mezuniyet Kulübüne Kayıt Olun!'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MezuniyetUye;
