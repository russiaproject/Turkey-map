import React, { useState } from "react";
import axios from "axios"; 
import ornekFoto from "./images/ruseviBina.jpg";
import emir from "./images/emir.jpg";
import mustafa from "./images/mustafa.jpg";
import yelkanat from "./images/yelkanat.jpg";
import turkeyFlag from "./images/Turkey_flag_300.png";
import russiaFlag from "./images/RussiaFlag.svg";
import LudmilaKralice from "./images/ludmila_kralice.jpg"

const Credit = () => {
  const [formData, setFormData] = useState({
    adSoyad: "",
    email: "",
    egitimDurumu: "",
    alan: "",
    ceviriDili: "",
    yazilimUzmanlik: "",
    tasarimUzmanlik: "",
    akademisyenUzmanlik: "",
    digerAlanDetay: "",
    ruseviBursiyeri: "",
    telefon: "",
    mesaj: "",
  });

  const [phoneNumberPrefix, setPhoneNumberPrefix] = useState("+90");
  const [isPhonePrefixSelectOpen, setIsPhonePrefixSelectOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Yükleme durumu için

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlanChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ceviriDili: "",
      yazilimUzmanlik: "",
      tasarimUzmanlik: "",
      akademisyenUzmanlik: "",
      digerAlanDetay: "",
    }));
  };

  const handlePhonePrefixChange = (newPrefix) => {
    const currentNumberWithoutOldPrefix = formData.telefon.replace(
      phoneNumberPrefix,
      ""
    );
    setPhoneNumberPrefix(newPrefix);
    setFormData((prev) => ({
      ...prev,
      telefon: newPrefix + currentNumberWithoutOldPrefix,
    }));
    setIsPhonePrefixSelectOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    const numberPart = e.target.value.replace(/[^0-9]/g, "");
    setFormData((prev) => ({
      ...prev,
      telefon: phoneNumberPrefix + numberPart,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("🚀 Form submit edildi!");
  console.log("📋 Form verileri:", formData);
  
  if (!formData.adSoyad || !formData.email) {
    alert("⚠️ Lütfen Ad Soyad ve Email alanlarını doldurun!");
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    console.log("📡 Backend'e gönderiliyor...");
    
    const response = await fetch('http://localhost:8080/api/team-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    const responseData = await response.json();
    console.log("✅ Backend yanıtı:", responseData);
    
    if (response.status === 201) {
      alert("🎉 Ekibimize katılım başvurunuz başarıyla alındı!");
      
      setFormData({
        adSoyad: "",
        email: "",
        egitimDurumu: "",
        alan: "",
        ceviriDili: "",
        yazilimUzmanlik: "",
        tasarimUzmanlik: "",
        akademisyenUzmanlik: "",
        digerAlanDetay: "",
        ruseviBursiyeri: "",
        telefon: "",
        mesaj: "",
      });
      setPhoneNumberPrefix("+90");
    } else {
      throw new Error(responseData.error || 'Başvuru gönderilemedi');
    }
  } catch (error) {
    console.error("❌ HATA DETAYI:", error);
    alert(`Hata oluştu: ${error.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const egitimDurumlari = [
    "Lise",
    "Önlisans",
    "Lisans",
    "Yüksek Lisans",
    "Doktora",
    "Diğer",
  ];

  const alanlar = [
    "Çevirmen",
    "Yazılımcı",
    "Tasarımcı",
    "Akademisyen",
    "Öğrenci",
    "Pazarlama ve Satış",
    "Yönetim ve Organizasyon",
    "Sağlık Hizmetleri",
    "Mühendislik (Yazılım Hariç)",
    "Sanat ve Kültür",
    "Medya ve İletişim",
    "Diğer",
  ];

  const ceviriDilleri = [
    "İngilizce",
    "Rusça",
    "Arapça",
    "Çince",
    "İtalyanca",
    "Almanca",
    "Fransızca",
    "İspanyolca",
    "Japonca",
    "Korece",
    "Diğer",
  ];

  const yazilimUzmanliklari = [
    "Frontend Geliştirme",
    "Backend Geliştirme",
    "Full Stack Geliştirme",
    "Mobil Uygulama Geliştirme (iOS/Android)",
    "Oyun Geliştirme",
    "Veri Bilimi / Makine Öğrenmesi",
    "Yapay Zeka Mühendisliği",
    "Siber Güvenlik Uzmanlığı",
    "DevOps Mühendisliği",
    "Bulut Bilişim (AWS, Azure, GCP)",
    "Blokzincir Geliştirme",
    "Diğer",
  ];

  const tasarimUzmanliklari = [
    "Grafik Tasarım",
    "UI/UX Tasarım (Web & Mobil)",
    "Endüstriyel Ürün Tasarımı",
    "Moda Tasarımı",
    "İç Mimarlık / Mekan Tasarımı",
    "Animasyon ve Motion Graphics",
    "İllüstrasyon",
    "Video Kurgu ve Prodüksiyon",
    "Diğer",
  ];

  const akademisyenAlanlari = [
    "Sosyal Bilimler (Psikoloji, Sosyoloji, Tarih vb.)",
    "Fen Bilimleri (Fizik, Kimya, Biyoloji vb.)",
    "Mühendislik Bilimleri (Makine, Elektrik, İnşaat vb.)",
    "Sağlık Bilimleri (Tıp, Diş Hekimliği, Eczacılık vb.)",
    "Sanat ve Beşeri Bilimler (Edebiyat, Felsefe, Güzel Sanatlar vb.)",
    "Eğitim Bilimleri",
    "Hukuk",
    "İktisadi ve İdari Bilimler",
    "Diğer",
  ];

  const phonePrefixOptions = [
    { value: "+90", flag: turkeyFlag },
    { value: "+7", flag: russiaFlag },
  ];

  return (
    <div className="container p-5">
      <div className="row creditRow gap-4">
        {/* Ekip üyeleri bölümü aynı kalıyor */}
        <div className="col-12 ludmilaBlur position-relative creditHoverHepsi rounded-5 p-5 shadowCredit">
          <div className="katedralLudmila position-absolute"></div>
          <div className="row g-5">
            <div className="col-lg-4">
              <img src={LudmilaKralice} className="ludmilaFoto" alt="Ludmila Çalışkan" />
            </div>
            <div className="col-lg-8">
              <h2 className="">Ludmila Çalışkan</h2>
              <p className="meslekCredit mb-4">Projenin Kurucu Vizyoneri</p>
              <p>
                Ludmila Çalışkan, birkaç yıldır Rus Evi Ankara de çalışmakta ve Rusya bursları  yürütülmesiyle ilgilenmektedir. Hem katılmak isteyen adaylarla hem de burs hakkı kazanmış kişilerle yakından iletişim kurarak sürecin her aşamasında destek sağlamaktadır.

              </p>
              <p>
               Kurucusu olduğu bu proje, yıllar süren adaylar ve burs sahipleriyle yapılan çalışmaların bir sonucudur. Ludmila Çalışkan, onların ihtiyaçlarını dikkatle dinleyerek, sorunlarına çözüm bulmaya çalışarak ve hepsini tek bir ekip halinde birleştirmeyi amaçlayarak onlarla sürekli iletişim halinde olmaktadır. Bu nedenle, ortak hedeflerin gerçekleştirilmesi ve etkili bir iş birliği için bu platformu oluşturmuştur.

              </p>
              <p>
               Eğer siz de bu iş birliğine katılmak, ekibimizin bir parçası olmak ve projeye katkı sağlamak istiyorsanız bizimle iletişime geçin. Sizi ekibimizde görmekten memnuniyet duyarız!

              </p>
              <br />
<a href="https://t.me/ankara_rusevi" target="_blank" className="p-2 px-3 creditRussianDom">Русский Дом <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg text-center creditHoverHepsi shadowCredit rounded-5 p-5">
          <div>
            <img src={emir} alt="Emir Kesimoğlu" className="creditFoto" />
          </div>
          <div>
            <p className="meslekCredit mt-3">
              Front-End Developer
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
        <div className="col-lg text-center creditHoverHepsi shadowCredit rounded-5 p-5">
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
        <div className="col-lg text-center creditHoverHepsi shadowCredit rounded-5 p-5">
          <div>
            <img src={yelkanat} alt="Berkay Yelkanat" className="creditFoto" />
          </div>
          <div>
            <p className="meslekCredit mt-3">Full Stack Developer</p>
            <p className="isimCredit">Berkay Yelkanat</p>
            <div className="gap-2 d-flex ikonKredit">
              <a
                href="https://www.linkedin.com/in/berkay-yelkanat-3b1a64316/"
                className="credit-icon-link"
                aria-label="Linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/xberkayio"
                className="credit-icon-link"
                aria-label="Github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* EKIP FORMU BÖLÜMÜ - Burada düzeltme yaptık */}
      <div className="ekipContainer shadowCredit rounded-5 p-5 mt-5">
        <div className="text-center">
          <h2 className="ekipFormuBaslik mb-4">Ekibimize Katılmayı İster Misiniz?</h2>
          
          {/* Form başlangıcı - onSubmit eklendi */}
          <form onSubmit={handleSubmit} className="ekipFormu">
            <div className="row g-3">
              <div className="col-lg-6 ekipFormuGrup">
                <input
                  type="text"
                  name="adSoyad"
                  className="form-control ekipFormuInput"
                  placeholder="Adınız ve Soyadınız"
                  onChange={handleChange}
                  value={formData.adSoyad}
                  required
                />
              </div>
              <div className="col-lg-6 ekipFormuGrup">
                <input
                  type="email"
                  name="email"
                  className="form-control ekipFormuInput"
                  placeholder="E-Mail Adresiniz"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div className="col-lg-6 ekipFormuGrup">
                <select
                  name="egitimDurumu"
                  className="form-select ekipFormuSelect"
                  onChange={handleChange}
                  value={formData.egitimDurumu}
                  required
                >
                  <option value="">Eğitim Durumu Seçiniz</option>
                  {egitimDurumlari.map((durum) => (
                    <option key={durum} value={durum}>
                      {durum}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-lg-6 ekipFormuGrup">
                <select
                  name="alan"
                  className="form-select ekipFormuSelect"
                  onChange={handleAlanChange}
                  value={formData.alan}
                  required
                >
                  <option value="">Yaptığınız İş & Hobi Nedir?</option>
                  {alanlar.map((alanItem) => (
                    <option key={alanItem} value={alanItem}>
                      {alanItem}
                    </option>
                  ))}
                </select>
              </div>

              {formData.alan === "Çevirmen" && (
                <div className="col-lg-6 ekipFormuGrup">
                  <select
                    name="ceviriDili"
                    className="form-select ekipFormuSelect"
                    onChange={handleChange}
                    value={formData.ceviriDili}
                    required
                  >
                    <option value="">Çeviri Yaptığınız Dil</option>
                    {ceviriDilleri.map((dil) => (
                      <option key={dil} value={dil}>
                        {dil}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.alan === "Yazılımcı" && (
                <div className="col-lg-6 ekipFormuGrup">
                  <select
                    name="yazilimUzmanlik"
                    className="form-select ekipFormuSelect"
                    onChange={handleChange}
                    value={formData.yazilimUzmanlik}
                    required
                  >
                    <option value="">Yazılım Uzmanlık Alanınız</option>
                    {yazilimUzmanliklari.map((uzmanlik) => (
                      <option key={uzmanlik} value={uzmanlik}>
                        {uzmanlik}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.alan === "Tasarımcı" && (
                <div className="col-lg-6 ekipFormuGrup">
                  <select
                    name="tasarimUzmanlik"
                    className="form-select ekipFormuSelect"
                    onChange={handleChange}
                    value={formData.tasarimUzmanlik}
                    required
                  >
                    <option value="">Tasarım Uzmanlık Alanınız</option>
                    {tasarimUzmanliklari.map((uzmanlik) => (
                      <option key={uzmanlik} value={uzmanlik}>
                        {uzmanlik}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {formData.alan === "Akademisyen" && (
                <div className="col-lg-6 ekipFormuGrup">
                  <select
                    name="akademisyenUzmanlik"
                    className="form-select ekipFormuSelect"
                    onChange={handleChange}
                    value={formData.akademisyenUzmanlik}
                    required
                  >
                    <option value="">Akademik Alanınız</option>
                    {akademisyenAlanlari.map((alan) => (
                      <option key={alan} value={alan}>
                        {alan}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {formData.alan === "Diğer" && (
                <div className="col-lg-6 ekipFormuGrup">
                  <input
                    type="text"
                    name="digerAlanDetay"
                    className="form-control ekipFormuInput"
                    placeholder="Lütfen Alanınızı Belirtiniz"
                    onChange={handleChange}
                    value={formData.digerAlanDetay}
                    required
                  />
                </div>
              )}
              
              <div className="col-lg-6 ekipFormuGrup">
                <select
                  name="ruseviBursiyeri"
                  className="form-select ekipFormuSelect"
                  onChange={handleChange}
                  value={formData.ruseviBursiyeri}
                  required
                >
                  <option value="">Rusevi Bursiyerlerinden misiniz?</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
              </div>

              <div className="col-lg-6 ekipFormuGrup">
                <div className="input-group ekipFormuTelefonAlan">
                  <div className="ekipFormuTelefonKodSecimAlani">
                    <button
                      type="button"
                      className="btn ekipFormuTelefonKodSecimButonu"
                      onClick={() => setIsPhonePrefixSelectOpen(!isPhonePrefixSelectOpen)}
                    >
                      <img
                        src={phonePrefixOptions.find(opt => opt.value === phoneNumberPrefix)?.flag}
                        alt={phonePrefixOptions.find(opt => opt.value === phoneNumberPrefix)?.label}
                        className="ekipFormuBayrak"
                      />
                      {phoneNumberPrefix}
                      <i className={`fas fa-chevron-down ekipFormuKodIcon ${isPhonePrefixSelectOpen ? 'open' : ''}`}></i>
                    </button>
                    {isPhonePrefixSelectOpen && (
                      <ul className="ekipFormuTelefonKodListesi">
                        {phonePrefixOptions.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => handlePhonePrefixChange(option.value)}
                            className="ekipFormuTelefonKodListesiEleman"
                          >
                            <img src={option.flag} alt={option.label} className="ekipFormuBayrak" />
                            {option.label} ({option.value})
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <input
                    type="tel"
                    name="telefonNumarasiSadece"
                    className="form-control ekipFormuTelefonNumara"
                    placeholder="Telefon Numaranızı Yazınız"
                    value={formData.telefon.replace(phoneNumberPrefix, "")}
                    onChange={handlePhoneNumberChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-12 ekipFormuGrup">
                <textarea
                  name="mesaj"
                  cols="30"
                  rows="5"
                  className="form-control ekipFormuInput ekipFormuAciklama"
                  placeholder="Mesajınız veya Ek Bilgiler"
                  onChange={handleChange}
                  value={formData.mesaj}
                ></textarea>
              </div>

              <div className="col-lg-12 mt-4 text-center">
                <button 
                  type="submit" 
                  className="btn gap-2 ekipFormuButon"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Başvuruyu Gönder
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Credit;