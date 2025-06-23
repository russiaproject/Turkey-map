import React, { useState, useEffect } from 'react';
import rusIzleriData from '../data/rus_izleri.json'; // Mevcut Rus İzleri veri dosyası

// Demo için sabit kullanıcı adı ve şifre
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'password123';

// Örnek Veriler (Backend bağlantısı kaldırıldı)
const demoTeamApplications = [
  {
    id: '1',
    adSoyad: 'Ali Can',
    email: 'ali.can@example.com',
    egitimDurumu: 'Lisans',
    alan: 'Yazılımcı',
    yazilimUzmanlik: 'React, Node.js',
    telefon: '555-111-2233',
    status: 'pending',
    createdAt: '2023-01-15T10:00:00Z',
    digerAlanDetay: null,
    ceviriDili: null,
    tasarimUzmanlik: null,
    akademisyenUzmanlik: null,
  },
  {
    id: '2',
    adSoyad: 'Ayşe Demir',
    email: 'ayse.demir@example.com',
    egitimDurumu: 'Yüksek Lisans',
    alan: 'Çevirmen',
    ceviriDili: 'Rusça-Türkçe',
    telefon: '555-444-5566',
    status: 'approved',
    createdAt: '2023-01-10T11:30:00Z',
    digerAlanDetay: null,
    yazilimUzmanlik: null,
    tasarimUzmanlik: null,
    akademisyenUzmanlik: null,
  },
  {
    id: '3',
    adSoyad: 'Mehmet Yılmaz',
    email: 'mehmet.yilmaz@example.com',
    egitimDurumu: 'Doktora',
    alan: 'Akademisyen',
    akademisyenUzmanlik: 'Uluslararası İlişkiler',
    telefon: '555-777-8899',
    status: 'rejected',
    createdAt: '2023-01-05T09:00:00Z',
    digerAlanDetay: null,
    ceviriDili: null,
    tasarimUzmanlik: null,
    yazilimUzmanlik: null,
  },
];

const demoPartnershipApplications = [
  {
    id: '101',
    isim: 'Zeynep',
    soyisim: 'Kaya',
    email: 'zeynep.kaya@partner.com',
    isletme: 'Gelecek Holding A.Ş.',
    telefon: '532-123-4567',
    status: 'pending',
    createdAt: '2023-02-20T14:00:00Z',
  },
  {
    id: '102',
    isim: 'Burak',
    soyisim: 'Öztürk',
    email: 'burak.ozturk@firmam.com',
    isletme: 'Yenilikçi Çözümler Ltd. Şti.',
    telefon: '542-987-6543',
    status: 'approved',
    createdAt: '2023-02-18T10:00:00Z',
  },
];

const demoGraduationApplications = [
  {
    id: '201',
    isim: 'Deniz',
    soyisim: 'Demir',
    email: 'deniz.demir@mezun.com',
    babaAdi: 'Mustafa',
    mezunKurum: 'Ankara Üniversitesi',
    mezuniyetYili: '2018',
    calistigiKurum: 'T.C. Dışişleri Bakanlığı',
    akademikGorev: 'Yok',
    telefon: '505-111-2244',
    status: 'pending',
    createdAt: '2023-03-01T09:00:00Z',
  },
  {
    id: '202',
    isim: 'Efe',
    soyisim: 'Yıldız',
    email: 'efe.yildiz@mezun.com',
    babaAdi: 'Ayhan',
    mezunKurum: 'ODTÜ',
    mezuniyetYili: '2015',
    calistigiKurum: 'Özel Sektör',
    akademikGorev: 'Proje Yöneticisi',
    telefon: '533-555-6677',
    status: 'approved',
    createdAt: '2023-02-25T13:00:00Z',
  },
];

const demoInstitutions = [
  {
    id: '301',
    plaka: 'TR06',
    name: 'Rusya Federasyonu Ankara Büyükelçiliği',
    description: 'Türkiye\'deki Rusya Federasyonu\'nun diplomatik temsilciliği.',
    type: 'Büyükelçilik',
    address: 'Andrey Karlov Sk. No:5, Çankaya/Ankara',
    website: 'www.turkey.mid.ru',
    createdAt: '2022-01-01T00:00:00Z',
  },
  {
    id: '302',
    plaka: 'TR34',
    name: 'Rus Bilim ve Kültür Merkezi',
    description: 'Rus kültürü ve dilini tanıtma faaliyetleri yürüten merkez.',
    type: 'Kültür',
    address: 'İstiklal Cad. No:161, Beyoğlu/İstanbul',
    website: 'www.russianculture.org',
    createdAt: '2022-01-10T00:00:00Z',
  },
  {
    id: '303',
    plaka: 'TR07',
    name: 'Rusya Federasyonu Antalya Konsolosluğu',
    description: 'Antalya ve çevresindeki Rus vatandaşlarına konsolosluk hizmetleri.',
    type: 'Konsolosluk',
    address: 'Park Sk. No:30, Konyaaltı/Antalya',
    website: '-',
    createdAt: '2022-02-15T00:00:00Z',
  },
];

const demoPublications = [
  {
    id: '401',
    title: 'Türkiye-Rusya İlişkilerinde Enerji Diplomasisi',
    authors: 'Dr. Cem Yılmaz',
    type: 'Makale',
    shortAbstract: 'Bu makale, Türkiye ve Rusya arasındaki enerji ilişkilerinin diplomatik boyutlarını incelemektedir.',
    description: 'Detaylı bir analizi içeren bu çalışma, iki ülke arasındaki enerji işbirliğinin tarihsel gelişimini ve güncel dinamiklerini ele almaktadır. Özellikle Türk Akımı projesinin bölgesel etkileri üzerinde durulmaktadır.',
    webLink: 'https://example.com/enerji-diplomasisi',
    publisher: 'Uluslararası İlişkiler Dergisi',
    fullAbstract: 'Tam abstract metni buraya gelecek. Makalede kullanılan yöntemler, bulgular ve sonuçlar hakkında daha detaylı bilgi verilecektir. Bu alanda satır sonları ve boşluklar korunur.',
    keywords: 'Türkiye, Rusya, enerji, diplomasi, Türk Akımı',
    pageNumbers: '15-32',
    volume: '10',
    issue: '2',
    isCopyrighted: true,
    createdAt: '2023-04-01T10:00:00Z',
  },
  {
    id: '402',
    title: 'Rus Edebiyatında Toplumsal Eleştiri',
    authors: 'Prof. Dr. Elif Kara',
    type: 'Kitap',
    shortAbstract: 'Dostoyevski, Tolstoy ve Çehov gibi yazarların eserlerinde toplumsal sorunların nasıl ele alındığına dair kapsamlı bir inceleme.',
    description: 'Kitap, 19. yüzyıl Rus edebiyatının önde gelen isimlerinin eserlerinde dönemin toplumsal yapısı, siyasi çalkantılar ve insan psikolojisi üzerindeki etkilerini mercek altına almaktadır.',
    webLink: '',
    publisher: 'Literatür Yayınevi',
    fullAbstract: 'Bu kitap, Rus klasiklerinin toplumsal eleştiriye yaklaşımlarını derinlemesine inceleyerek, günümüz okuyucusuna da ışık tutmaktadır. Analizler, edebiyatın toplumsal değişime etkisini vurgulamaktadır.',
    keywords: 'Rus edebiyatı, toplumsal eleştiri, Dostoyevski, Tolstoy, Çehov',
    pageNumbers: '1-350',
    volume: '',
    issue: '',
    isCopyrighted: false,
    createdAt: '2022-11-15T15:30:00Z',
  },
];

const demoUserPublicationApplications = [
  {
    id: '501',
    submitterName: 'Canan Genç',
    submitterEmail: 'canan.genc@mail.com',
    title: 'Rusya ve Karadeniz Güvenliği',
    authors: 'Dr. Canan Genç',
    type: 'Makale',
    shortAbstract: 'Karadeniz bölgesinin jeopolitik önemi ve Rusya\'nın buradaki güvenlik stratejileri üzerine bir çalışma.',
    description: 'Karadeniz, Rusya için stratejik bir bölgedir ve bu makale, Rusya\'nın Karadeniz\'deki askeri varlığını ve güvenlik politikalarını analiz etmektedir.',
    webLink: '',
    publisher: 'Bölgesel Araştırmalar Dergisi',
    fullAbstract: 'Makalede Karadeniz\'deki güncel gelişmeler, Rusya\'nın deniz gücü ve NATO\'nun bölgedeki rolü ele alınmaktadır. Güvenlik paradigmaları incelenmiştir.',
    keywords: 'Karadeniz, Rusya, güvenlik, jeopolitik, NATO',
    pageNumbers: '88-105',
    volume: '7',
    issue: '1',
    isCopyrighted: false,
    status: 'pending',
    createdAt: '2023-05-10T08:00:00Z',
  },
  {
    id: '502',
    submitterName: 'Selim Aktaş',
    submitterEmail: 'selim.aktas@email.com',
    title: 'Rus Müzik Tarihi: Çarlık Döneminden Günümüze',
    authors: 'Prof. Selim Aktaş',
    type: 'Kitap',
    shortAbstract: 'Rus müziğinin kökenlerinden günümüze uzanan zengin tarihsel yolculuğu.',
    description: 'Kitap, Glinka\'dan Şostakoviç\'e, Çaykovski\'den Rahmaninov\'a uzanan bestecilerin eserleri üzerinden Rus müziğinin gelişimini inceliyor.',
    webLink: '',
    publisher: 'Sanat Yayınları',
    fullAbstract: 'Rus müzik tarihinde dönüm noktaları, önemli besteciler ve eserleri kronolojik olarak detaylı bir şekilde sunulmaktadır. Kitap, müzikoloji öğrencileri ve Rus kültürü meraklıları için önemli bir kaynak niteliğindedir.',
    keywords: 'Rus müzik, klasik müzik, Çaykovski, Şostakoviç, opera',
    pageNumbers: '1-280',
    volume: '',
    issue: '',
    isCopyrighted: true,
    status: 'rejected',
    createdAt: '2023-04-20T11:00:00Z',
  },
];

const demoUserRusIziApplications = [
  {
    id: '601',
    isim: 'Hande',
    soyisim: 'Demirci',
    email: 'hande.demirci@gmail.com',
    telefon: '530-123-4567',
    konum: 'Bursa',
    aciklama: 'Bursa\'da bir Rus tüccarın yaptırdığı eski bir çeşme buldum. Yerel halk arasında "Rus Çeşmesi" olarak biliniyor ve üzerinde Kiril alfabesiyle bir yazı var.',
    dosyalar: [
      { name: 'cesme1.jpg', data: 'https://placehold.co/100x100/000000/FFFFFF?text=Çeşme1' },
      { name: 'cesme2.jpg', data: 'https://placehold.co/100x100/000000/FFFFFF?text=Çeşme2' },
    ],
    status: 'pending',
    createdAt: '2023-06-01T14:00:00Z',
  },
  {
    id: '602',
    isim: 'Kaan',
    soyisim: 'Yıldırım',
    email: 'kaan.yildirim@hotmail.com',
    telefon: '541-987-6543',
    konum: 'Trabzon',
    aciklama: 'Trabzon\'daki eski bir Rum Ortodoks kilisesinin bahçesinde, Rus askerlerine ait olduğu düşünülen birkaç mezar taşı keşfettim. Tarihi araştırmalarla desteklenmesi gerekiyor.',
    dosyalar: [
      { name: 'mezar1.jpg', data: 'https://placehold.co/100x100/000000/FFFFFF?text=Mezar1' },
      { name: 'mezar2.jpg', data: 'https://placehold.co/100x100/000000/FFFFFF?text=Mezar2' },
      { name: 'mezar3.jpg', data: 'https://placehold.co/100x100/000000/FFFFFF?text=Mezar3' },
    ],
    status: 'approved',
    createdAt: '2023-05-25T10:30:00Z',
  },
  {
    id: '603',
    isim: 'Selin',
    soyisim: 'Tunç',
    email: 'selin.tunc@outlook.com',
    telefon: '506-345-6789',
    konum: 'Kayseri',
    aciklama: 'Kayseri merkezde eski bir handa, Rus tüccarların konakladığına dair izler taşıyan bir bölüm olduğunu duydum. Bilgi teyidi için araştırılması gerek.',
    dosyalar: [],
    status: 'rejected',
    createdAt: '2023-05-18T09:00:00Z',
  },
];


const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id === 'kullaniciAdi' ? 'username' : 'password']: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (formData.username === DEMO_USERNAME && formData.password === DEMO_PASSWORD) {
      onLoginSuccess('demo_token', DEMO_USERNAME);
    } else {
      setError('Kullanıcı adı veya şifre hatalı');
    }
    setLoading(false);
  };

  return (
    <div className="w-100 position-relative">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
          <div className="w-50 p-5 shadow-lg rounded-4">
            <h3 className="text-center">Admin Girişi</h3>

            {error && (
              <div className="alert alert-danger mt-3">{error}</div>
            )}

            <div className="w-75 py-4 mx-auto">
              <label htmlFor="kullaniciAdi" style={{fontWeight:"500"}}>Kullanıcı Adı</label>
              <input
                type="text"
                className="form-control mt-3 p-3 rounded-4"
                id="kullaniciAdi"
                placeholder="Kullanıcı Adı"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label htmlFor="sifre" className="mt-4" style={{fontWeight:"500"}}>Şifre</label>
              <input
                type="password"
                className="form-control mt-3 p-3 rounded-4"
                id="sifre"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="btn btn-primary text-center"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Giriş Yapılıyor...
                    </>
                  ) : (
                    'Giriş Yap'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('partnership');
  const [teamApplications, setTeamApplications] = useState(demoTeamApplications);
  const [partnershipApplications, setPartnershipApplications] = useState(demoPartnershipApplications);
  const [graduationApplications, setGraduationApplications] = useState(demoGraduationApplications);
  const [userRusIziApplications, setUserRusIziApplications] = useState(demoUserRusIziApplications);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  // Institution management states
  const [institutions, setInstitutions] = useState(demoInstitutions);
  const [filteredInstitutions, setFilteredInstitutions] = useState(demoInstitutions);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newInstitution, setNewInstitution] = useState({
    plaka: '',
    name: '',
    description: '',
    type: '',
    address: '',
    website: ''
  });

  // Russian Trace management states
  const [currentRusIzleri, setCurrentRusIzleri] = useState(() => {
    const groupedData = {};
    rusIzleriData.forEach(rusIzi => {
      const plaka = rusIzi.plaka;
      if (!groupedData[plaka]) {
        groupedData[plaka] = [];
      }
      groupedData[plaka].push({
        ...rusIzi,
        id: rusIzi.id || Math.random().toString(36).substring(2, 9) // Add a dummy ID if not present
      });
    });
    return groupedData;
  });
  const [newRusIzi, setNewRusIzi] = useState({
    plaka: '',
    name: '',
    description: '',
    type: '',
    address: '',
    website: ''
  });
  const [selectedPlaka, setSelectedPlaka] = useState('');
  const [editingRusIzi, setEditingRusIzi] = useState(null);
  const [showRusIziEditModal, setShowRusIziEditModal] = useState(false);

  // Publication management states
  const [publications, setPublications] = useState(demoPublications);
  const [filteredPublications, setFilteredPublications] = useState(demoPublications);
  const [publicationSearchTerm, setPublicationSearchTerm] = useState('');
  const [userPublicationApplications, setUserPublicationApplications] = useState(demoUserPublicationApplications);
  const [editingPublication, setEditingPublication] = useState(null);
  const [showPublicationEditModal, setShowPublicationEditModal] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: '',
    authors: '',
    type: '',
    shortAbstract: '',
    description: '',
    webLink: '',
    publisher: '',
    fullAbstract: '',
    keywords: '',
    pageNumbers: '',
    volume: '',
    issue: '',
    isCopyrighted: false
  });

  // Turkish license plates and cities
  const plakaKodlari = {
    '01': 'Adana', '02': 'Adıyaman', '03': 'Afyonkarahisar', '04': 'Ağrı', '05': 'Amasya',
    '06': 'Ankara', '07': 'Antalya', '08': 'Artvin', '09': 'Aydın', '10': 'Balıkesir',
    '11': 'Bilecik', '12': 'Bingöl', '13': 'Bitlis', '14': 'Bolu', '15': 'Burdur',
    '16': 'Bursa', '17': 'Çanakkale', '18': 'Çankırı', '19': 'Çorum', '20': 'Denizli',
    '21': 'Diyarbakır', '22': 'Edirne', '23': 'Elazığ', '24': 'Erzincan', '25': 'Erzurum',
    '26': 'Eskişehir', '27': 'Gaziantep', '28': 'Giresun', '29': 'Gümüşhane', '30': 'Hakkari',
    '31': 'Hatay', '32': 'Isparta', '33': 'Mersin', '34': 'İstanbul', '35': 'İzmir',
    '36': 'Kars', '37': 'Kastamonu', '38': 'Kayseri', '39': 'Kırklareli', '40': 'Kırşehir',
    '41': 'Kocaeli', '42': 'Konya', '43': 'Kütahya', '44': 'Malatya', '45': 'Manisa',
    '46': 'Kahramanmaraş', '47': 'Mardin', '48': 'Muğla', '49': 'Muş', '50': 'Nevşehir',
    '51': 'Niğde', '52': 'Ordu', '53': 'Rize', '54': 'Sakarya', '55': 'Samsun',
    '56': 'Siirt', '57': 'Sinop', '58': 'Sivas', '59': 'Tekirdağ', '60': 'Tokat',
    '61': 'Trabzon', '62': 'Tunceli', '63': 'Şanlıurfa', '64': 'Uşak', '65': 'Van',
    '66': 'Yozgat', '67': 'Zonguldak', '68': 'Aksaray', '69': 'Bayburt', '70': 'Karaman',
    '71': 'Kırıkkale', '72': 'Batman', '73': 'Şırnak', '74': 'Bartın', '75': 'Ardahan',
    '76': 'Iğdır', '77': 'Yalova', '78': 'Karabük', '79': 'Kilis', '80': 'Osmaniye',
    '81': 'Düzce'
  };

  // CSS styles - To fix spacing issue
  const textAreaStyle = {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    resize: 'vertical',
    minHeight: '120px'
  };

  const inputStyle = {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedUsername = localStorage.getItem('adminUsername');
    if (savedToken) {
      setToken(savedToken);
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // No backend fetch, so remove dependency on token/isLoggedIn for initial data load
  // Data is now loaded from static demo arrays.
  useEffect(() => {
    // Initial filtering for institutions and publications
    setFilteredInstitutions(institutions);
    setFilteredPublications(publications);
  }, [institutions, publications]); // Only re-filter if base data changes (not expected often in demo)


  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInstitutions(institutions);
    } else {
      // Simulate search logic locally
      const filtered = institutions.filter(inst =>
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.plaka.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstitutions(filtered);
    }
  }, [searchTerm, institutions]);

  // Publication search filtering
  useEffect(() => {
    if (publicationSearchTerm === '') {
      setFilteredPublications(publications);
    } else {
      const filtered = publications.filter(pub =>
        pub.title.toLowerCase().includes(publicationSearchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(publicationSearchTerm.toLowerCase()) ||
        pub.type.toLowerCase().includes(publicationSearchTerm.toLowerCase()) ||
        pub.keywords.toLowerCase().includes(publicationSearchTerm.toLowerCase())
      );
      setFilteredPublications(filtered);
    }
  }, [publicationSearchTerm, publications]);

  const handleLoginSuccess = (userToken, userUsername) => {
    setToken(userToken);
    setUsername(userUsername);
    setIsLoggedIn(true);
    localStorage.setItem('adminToken', userToken);
    localStorage.setItem('adminUsername', userUsername);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    setUsername('');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
  };

  const showMessage = (message, type = 'success') => {
    if (type === 'success') {
      setSuccess(message);
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(message);
      setSuccess('');
      setTimeout(() => setError(''), 5000);
    }
  };

  // Publication management functions (now local state updates)
  // No fetchPublications - data from demoPublications
  // No fetchUserPublicationApplications - data from demoUserPublicationApplications

  // CORRECTION: Special handlePublicationChange for preserving spaces
  const handlePublicationChange = (e) => {
    const { name, value } = e.target;
    setNewPublication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePublicationSubmit = (e) => {
    e.preventDefault();

    if (!newPublication.title?.trim() || !newPublication.authors?.trim() || !newPublication.type ||
        !newPublication.shortAbstract?.trim() || !newPublication.description?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }

    const newPub = {
      ...newPublication,
      id: Math.random().toString(36).substring(2, 9), // Dummy ID
      createdAt: new Date().toISOString(),
    };
    setPublications(prev => [...prev, newPub]);
    setFilteredPublications(prev => [...prev, newPub]); // Update filtered list immediately
    showMessage('✅ Yayın başarıyla eklendi! (Demo: Veriler kaydedilmez)');

    setNewPublication({
      title: '', authors: '', type: '', shortAbstract: '', description: '',
      webLink: '', publisher: '', fullAbstract: '', keywords: '',
      pageNumbers: '', volume: '', issue: '', isCopyrighted: false
    });
  };

  const handleEditPublication = (publication) => {
    setEditingPublication({ ...publication });
    setShowPublicationEditModal(true);
  };

  const handleUpdatePublication = (e) => {
    e.preventDefault();
    setPublications(prev => prev.map(pub =>
      pub.id === editingPublication.id ? editingPublication : pub
    ));
    setFilteredPublications(prev => prev.map(pub =>
      pub.id === editingPublication.id ? editingPublication : pub
    )); // Update filtered list immediately
    showMessage('✅ Yayın başarıyla güncellendi! (Demo: Veriler kaydedilmez)');
    setShowPublicationEditModal(false);
    setEditingPublication(null);
  };

  const deletePublication = (id) => {
    // No window.confirm for demo
    setPublications(prev => prev.filter(pub => pub.id !== id));
    setFilteredPublications(prev => prev.filter(pub => pub.id !== id)); // Update filtered list immediately
    showMessage('✅ Yayın başarıyla silindi! (Demo: Veriler kaydedilmez)');
  };

  const updateUserPublicationApplicationStatus = (id, status, adminNote = '') => {
    setUserPublicationApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status, adminNote } : app
    ));

    if (status === 'approved') {
      const application = userPublicationApplications.find(app => app.id === id);
      if (application) {
        const newPubFromApp = {
          id: Math.random().toString(36).substring(2, 9), // Dummy ID
          title: application.title,
          authors: application.authors,
          type: application.type,
          shortAbstract: application.shortAbstract,
          description: application.description,
          webLink: application.webLink,
          publisher: application.publisher,
          fullAbstract: application.fullAbstract,
          keywords: application.keywords,
          pageNumbers: application.pageNumbers,
          volume: application.volume,
          issue: application.issue,
          isCopyrighted: application.isCopyrighted,
          createdAt: new Date().toISOString(),
        };
        setPublications(prev => [...prev, newPubFromApp]);
        setFilteredPublications(prev => [...prev, newPubFromApp]); // Update filtered list immediately
        showMessage('✅ Başvuru onaylandı ve yayın listesine eklendi! (Demo: Veriler kaydedilmez)');
      }
    } else {
      showMessage('Kullanıcı yayın başvuru durumu güncellendi! (Demo: Veriler kaydedilmez)');
    }
  };

  const deleteUserPublicationApplication = (id) => {
    // No window.confirm for demo
    setUserPublicationApplications(prev => prev.filter(app => app.id !== id));
    showMessage('Kullanıcı yayın başvurusu silindi! (Demo: Veriler kaydedilmez)');
  };

  // Russian Trace functions (now local state updates)
  // No fetchCurrentRusIzleri - data from rusIzleriData via useState initializer

  const handleRusIziChange = (e) => {
    const { name, value } = e.target;
    setNewRusIzi(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRusIziSubmit = (e) => {
    e.preventDefault();

    if (!newRusIzi.plaka?.trim() || !newRusIzi.name?.trim() || !newRusIzi.description?.trim() ||
        !newRusIzi.type || !newRusIzi.address?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }

    const newIzi = {
      ...newRusIzi,
      id: Math.random().toString(36).substring(2, 9), // Dummy ID
    };

    setCurrentRusIzleri(prev => {
      const updated = { ...prev };
      const plakaCode = newIzi.plaka;
      if (!updated[plakaCode]) {
        updated[plakaCode] = [];
      }
      updated[plakaCode].push(newIzi);
      return updated;
    });

    showMessage('✅ Rus İzi başarıyla eklendi! (Demo: Veriler kaydedilmez)');

    setNewRusIzi({
      plaka: '', name: '', description: '', type: '', address: '', website: ''
    });
  };

  const handleEditRusIzi = (rusIzi) => {
    setEditingRusIzi({ ...rusIzi });
    setShowRusIziEditModal(true);
  };

  const handleUpdateRusIzi = (e) => {
    e.preventDefault();

    setCurrentRusIzleri(prev => {
      const updated = { ...prev };
      const plakaCode = editingRusIzi.plaka; // Ensure correct plaka for update
      if (updated[plakaCode]) {
        updated[plakaCode] = updated[plakaCode].map(izi =>
          izi.id === editingRusIzi.id ? editingRusIzi : izi
        );
      }
      return updated;
    });

    showMessage('✅ Rus İzi başarıyla güncellendi! (Demo: Veriler kaydedilmez)');
    setShowRusIziEditModal(false);
    setEditingRusIzi(null);
  };

  const deleteRusIzi = (rusIziToDelete) => {
    // No window.confirm for demo
    setCurrentRusIzleri(prev => {
      const updated = { ...prev };
      const plakaCode = rusIziToDelete.plaka;
      if (updated[plakaCode]) {
        updated[plakaCode] = updated[plakaCode].filter(izi => izi.id !== rusIziToDelete.id);
      }
      return updated;
    });
    showMessage('✅ Rus İzi başarıyla silindi! (Demo: Veriler kaydedilmez)');
  };

  // List all Russian Traces
  const getAllRusIzleri = () => {
    const allRusIzleri = [];
    Object.keys(currentRusIzleri).forEach(plakaCode => {
      currentRusIzleri[plakaCode].forEach((rusIzi, index) => {
        allRusIzleri.push({
          ...rusIzi,
          plakaCode,
          index, // This index is now local to the filtered list, not original
          cityName: plakaKodlari[plakaCode.replace('TR', '')] || plakaCode
        });
      });
    });
    return allRusIzleri;
  };

  // Graduation club functions (now local state updates)
  // No fetchGraduationApplications - data from demoGraduationApplications

  const updateGraduationApplicationStatus = (id, status) => {
    setGraduationApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status } : app
    ));
    showMessage('Mezuniyet başvuru durumu güncellendi! (Demo: Veriler kaydedilmez)');
  };

  const deleteGraduationApplication = (id) => {
    // No window.confirm for demo
    setGraduationApplications(prev => prev.filter(app => app.id !== id));
    showMessage('Mezuniyet başvurusu silindi! (Demo: Veriler kaydedilmez)');
  };

  // User Russian Trace functions (now local state updates)
  // No fetchUserRusIziApplications - data from demoUserRusIziApplications

  const updateUserRusIziApplicationStatus = (id, status, adminNot = '') => {
    setUserRusIziApplications(prev => prev.map(app =>
      app.id === id ? { ...app, status, adminNot } : app
    ));

    if (status === 'approved') {
      const application = userRusIziApplications.find(app => app.id === id);
      if (application) {
        // Simulate adding to rus izleri list (locally)
        const newRusIziFromApp = {
          id: Math.random().toString(36).substring(2, 9),
          plaka: application.konum, // Assuming konum is like plaka, adjust if needed
          name: `${application.isim} ${application.soyisim} Katkısı`,
          description: application.aciklama,
          type: 'Kullanıcı Katkısı',
          address: application.konum,
          website: '', // No website from user contribution
        };

        setCurrentRusIzleri(prev => {
          const updated = { ...prev };
          const plakaCode = newRusIziFromApp.plaka;
          if (!updated[plakaCode]) {
            updated[plakaCode] = [];
          }
          updated[plakaCode].push(newRusIziFromApp);
          return updated;
        });
        showMessage('✅ Başvuru onaylandı ve haritaya eklendi! (Demo: Veriler kaydedilmez)');
      }
    } else {
      showMessage('Kullanıcı Rus İzi başvuru durumu güncellendi! (Demo: Veriler kaydedilmez)');
    }
  };

  const deleteUserRusIziApplication = (id) => {
    // No window.confirm for demo
    setUserRusIziApplications(prev => prev.filter(app => app.id !== id));
    showMessage('Kullanıcı başvurusu silindi! (Demo: Veriler kaydedilmez)');
  };

  // Institution functions (now local state updates)
  // No fetchInstitutions - data from demoInstitutions

  const performSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredInstitutions(institutions);
      return;
    }

    const filtered = institutions.filter(inst =>
      inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.plaka.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inst.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInstitutions(filtered);
  };

  const handleInstitutionChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInstitutionChange = (e) => {
    const { name, value } = e.target;
    setEditingInstitution(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInstitutionSubmit = (e) => {
    e.preventDefault();

    if (!newInstitution.plaka?.trim() || !newInstitution.name?.trim() || !newInstitution.description?.trim() ||
        !newInstitution.type || !newInstitution.address?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }

    const newInst = {
      ...newInstitution,
      id: Math.random().toString(36).substring(2, 9), // Dummy ID
      createdAt: new Date().toISOString(),
    };
    setInstitutions(prev => [...prev, newInst]);
    setFilteredInstitutions(prev => [...prev, newInst]); // Update filtered list immediately
    showMessage('Kurum başarıyla eklendi! (Demo: Veriler kaydedilmez)');

    setNewInstitution({
      plaka: '', name: '', description: '', type: '', address: '', website: ''
    });
  };

  const handleEditInstitution = (institution) => {
    setEditingInstitution({ ...institution });
    setShowEditModal(true);
  };

  const handleUpdateInstitution = (e) => {
    e.preventDefault();
    setInstitutions(prev => prev.map(inst =>
      inst.id === editingInstitution.id ? editingInstitution : inst
    ));
    setFilteredInstitutions(prev => prev.map(inst =>
      inst.id === editingInstitution.id ? editingInstitution : inst
    )); // Update filtered list immediately
    showMessage('Kurum bilgileri güncellendi! (Demo: Veriler kaydedilmez)');
    setShowEditModal(false);
    setEditingInstitution(null);
  };

  const deleteInstitution = (id) => {
    // No window.confirm for demo
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
    setFilteredInstitutions(prev => prev.filter(inst => inst.id !== id)); // Update filtered list immediately
    showMessage('Kurum silindi! (Demo: Veriler kaydedilmez)');
  };

  const downloadJsonFile = () => {
    // Simulate JSON download
    const dataStr = JSON.stringify(institutions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'russian_institutions_demo.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement); // Required for Firefox
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up

    showMessage('JSON dosyası indirildi! (Demo: Sadece mevcut veriler)');
  };

  const downloadRusIzleriJson = () => {
    // Convert currentRusIzleri back to a flat array for download
    const flatRusIzleri = getAllRusIzleri().map(item => ({
      id: item.id,
      plaka: item.plaka,
      name: item.name,
      description: item.description,
      type: item.type,
      address: item.address,
      website: item.website,
    }));

    const dataStr = JSON.stringify(flatRusIzleri, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'rus_izleri_demo.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    document.body.appendChild(linkElement); // Required for Firefox
    linkElement.click();
    document.body.removeChild(linkElement); // Clean up

    showMessage('📥 Güncel Rus İzleri JSON dosyası indirildi! (Demo: Sadece mevcut veriler)');
  };


  // General application functions (now local state updates)
  // No fetchApplications - data from demoTeamApplications and demoPartnershipApplications

  const updateApplicationStatus = (id, status, type) => {
    if (type === 'team') {
      setTeamApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ));
    } else if (type === 'partnership') {
      setPartnershipApplications(prev => prev.map(app =>
        app.id === id ? { ...app, status } : app
      ));
    }
    showMessage('Başvuru durumu güncellendi! (Demo: Veriler kaydedilmez)');
  };

  const deleteApplication = (id, type) => {
    // No window.confirm for demo
    if (type === 'team') {
      setTeamApplications(prev => prev.filter(app => app.id !== id));
    } else if (type === 'partnership') {
      setPartnershipApplications(prev => prev.filter(app => app.id !== id));
    }
    showMessage('Başvuru silindi! (Demo: Veriler kaydedilmez)');
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'bg-warning text-dark',
      'approved': 'bg-success',
      'rejected': 'bg-danger'
    };
    const labels = {
      'pending': 'Beklemede',
      'approved': 'Onaylandı',
      'rejected': 'Reddedildi'
    };

    return <span className={`badge ${badges[status]}`}>{labels[status]}</span>;
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="container py-5">
      {/* CORRECTION: Add CSS styles to head */}
      <style jsx>{`
        .form-control.text-area-custom {
          white-space: pre-wrap !important;
          line-height: 1.5 !important;
          resize: vertical !important;
          min-height: 120px !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }

        .form-control.input-custom {
          white-space: normal !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }

        /* Preserve line breaks in textarea */
        textarea.form-control {
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }

        /* Normal text flow in inputs */
        input.form-control {
          white-space: normal !important;
        }
      `}</style>

      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>🇷🇺 Rusevi Admin Paneli (DEMO)</h1>
            <div>
              <span className="me-3">Hoşgeldin, {username}</span>
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Çıkış Yap
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button type="button" className="btn-close" onClick={() => setError('')}></button>
            </div>
          )}

          {success && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {success}
              <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
            </div>
          )}

          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'partnership' ? 'active' : ''}`}
                onClick={() => setActiveTab('partnership')}
              >
                🤝 İşbirliği Başvuruları ({partnershipApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                👥 Ekip Üyeliği Başvuruları ({teamApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'graduation' ? 'active' : ''}`}
                onClick={() => setActiveTab('graduation')}
              >
                🎓 Mezuniyet Kulübü ({graduationApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'rusizleri' ? 'active' : ''}`}
                onClick={() => setActiveTab('rusizleri')}
              >
                🏛️ Rus İzi Yönetimi ({getAllRusIzleri().length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'user-rusizi' ? 'active' : ''}`}
                onClick={() => setActiveTab('user-rusizi')}
              >
                📍 Kullanıcı Rus İzi Başvuruları ({userRusIziApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'publications' ? 'active' : ''}`}
                onClick={() => setActiveTab('publications')}
              >
                📚 Yayın Yönetimi ({publications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'user-publications' ? 'active' : ''}`}
                onClick={() => setActiveTab('user-publications')}
              >
                📝 Kullanıcı Yayın Başvuruları ({userPublicationApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'institutions' ? 'active' : ''}`}
                onClick={() => setActiveTab('institutions')}
              >
                🏛️ Kurum Yönetimi ({institutions.length})
              </button>
            </li>
          </ul>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Yükleniyor...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Publication Management Tab */}
              {activeTab === 'publications' && (
                <div>
                  {/* Publication Add Form */}
                  <div className="card mb-4">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0">📚 Manuel Yayın Ekleme</h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handlePublicationSubmit}>
                        <div className="row">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">📖 Yayın Başlığı *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="title"
                              value={newPublication.title}
                              onChange={handlePublicationChange}
                              placeholder="Örn: Türkiye-Rusya İlişkilerinde Enerji Faktörü"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">👥 Yazarlar *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="authors"
                              value={newPublication.authors}
                              onChange={handlePublicationChange}
                              placeholder="Örn: Ahmet Yılmaz, Mehmet Demir"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏷️ Yayın Türü *</label>
                            <select
                              className="form-select"
                              name="type"
                              value={newPublication.type}
                              onChange={handlePublicationChange}
                              required
                            >
                              <option value="">Tür Seçiniz</option>
                              <option value="Makale">Makale</option>
                              <option value="Bildiri">Bildiri</option>
                              <option value="Kitap">Kitap</option>
                              <option value="Tez">Tez</option>
                            </select>
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">📝 Kısa Özet *</label>
                            <textarea
                              className="form-control text-area-custom"
                              name="shortAbstract"
                              value={newPublication.shortAbstract}
                              onChange={handlePublicationChange}
                              rows="3"
                              style={textAreaStyle}
                              placeholder="Kart görünümünde gösterilecek kısa özet...

Bu alanda satır sonları ve boşluklar korunur."
                              required
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">📄 Ana Açıklama *</label>
                            <textarea
                              className="form-control text-area-custom"
                              name="description"
                              value={newPublication.description}
                              onChange={handlePublicationChange}
                              rows="4"
                              style={textAreaStyle}
                              placeholder="Yayın hakkında detaylı açıklama...

Bu alanda:
- Satır sonları korunur
- Boşluklar korunur
- Paragraf yapısı korunur"
                              required
                            />
                          </div>
                        </div>

                        {/* Detail Information */}
                        <h6 className="text-muted mb-3">📋 Detay Bilgileri (Opsiyonel)</h6>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏢 Yayıncı/Dergi</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="publisher"
                              value={newPublication.publisher}
                              onChange={handlePublicationChange}
                              placeholder="Örn: Uluslararası İlişkiler Dergisi"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🔗 Web Linki</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="webLink"
                              value={newPublication.webLink}
                              onChange={handlePublicationChange}
                              placeholder="https://example.com/yayin"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">📄 Sayfa Numaraları</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="pageNumbers"
                              value={newPublication.pageNumbers}
                              onChange={handlePublicationChange}
                              placeholder="Örn: 15-32"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">📚 Cilt</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="volume"
                              value={newPublication.volume}
                              onChange={handlePublicationChange}
                              placeholder="Örn: 5"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-4 mb-3">
                            <label className="form-label">🔢 Sayı</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="issue"
                              value={newPublication.issue}
                              onChange={handlePublicationChange}
                              placeholder="Örn: 2"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">🔍 Anahtar Kelimeler</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="keywords"
                              value={newPublication.keywords}
                              onChange={handlePublicationChange}
                              placeholder="Örn: Türkiye, Rusya, enerji, diplomasi"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label">📋 Tam Abstract</label>
                            <textarea
                              className="form-control text-area-custom"
                              name="fullAbstract"
                              value={newPublication.fullAbstract}
                              onChange={handlePublicationChange}
                              rows="5"
                              style={textAreaStyle}
                              placeholder="Detay sayfasında gösterilecek tam abstract...

Bu alanda da satır sonları ve boşluklar korunur."
                            />
                          </div>
                          <div className="col-md-12 mb-3">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="isCopyrighted"
                                id="isCopyrighted"
                                checked={newPublication.isCopyrighted}
                                onChange={(e) => setNewPublication(prev => ({
                                  ...prev,
                                  isCopyrighted: e.target.checked
                                }))}
                              />
                              <label className="form-check-label" htmlFor="isCopyrighted">
                                📄 Bu yayın teliflidir
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              📚 Yayın Ekle
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Existing Publications */}
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="mb-0">📋 Mevcut Yayınlar ({filteredPublications.length}/{publications.length})</h5>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Yayın ara... (başlık, yazar, tür, anahtar kelime)"
                            value={publicationSearchTerm}
                            onChange={(e) => setPublicationSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>ID</th>
                              <th>Başlık</th>
                              <th>Yazarlar</th>
                              <th>Tür</th>
                              <th>Telifli</th>
                              <th>Paylaşım Tarihi</th>
                              <th>Yayıncı</th>
                              <th>İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredPublications.length === 0 ? (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  {publicationSearchTerm ? '🔍 Arama sonucunda yayın bulunamadı' : '📚 Henüz yayın eklenmemiş'}
                                </td>
                              </tr>
                            ) : (
                              filteredPublications.map((pub) => (
                                <tr key={pub.id}>
                                  <td>{pub.id}</td>
                                  <td>
                                    <strong>{pub.title}</strong>
                                    <br />
                                    <small className="text-muted" style={{whiteSpace: 'pre-wrap'}}>
                                      {pub.shortAbstract.length > 50 ?
                                        `${pub.shortAbstract.substring(0, 50)}...` :
                                        pub.shortAbstract
                                      }
                                    </small>
                                  </td>
                                  <td><small>{pub.authors}</small></td>
                                  <td><span className="badge bg-info">{pub.type}</span></td>
                                  <td>
                                    {pub.isCopyrighted ?
                                      <span className="badge bg-warning text-dark">Telifli</span> :
                                      <span className="badge bg-success">Telifsiz</span>
                                    }
                                  </td>
                                  <td>
                                    <small>
                                      {new Date(pub.createdAt).toLocaleDateString('tr-TR')}
                                    </small>
                                  </td>
                                  <td><small>{pub.publisher || '-'}</small></td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditPublication(pub)}
                                        title="Düzenle"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deletePublication(pub.id)}
                                        title="Sil"
                                      >
                                        🗑️
                                      </button>
                                      {pub.webLink && (
                                        <a
                                          href={pub.webLink}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-primary"
                                          title="Link'e Git"
                                        >
                                          🔗
                                        </a>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OTHER TABS CONTINUED... */}
              {/* User Publication Applications */}
              {activeTab === 'user-publications' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>Email</th>
                        <th>Başlık</th>
                        <th>Yazarlar</th>
                        <th>Tür</th>
                        <th>Yayıncı</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPublicationApplications.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">Kullanıcı yayın başvurusu bulunamadı</td>
                        </tr>
                      ) : (
                        userPublicationApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.submitterName}</td>
                            <td>
                              <a href={`mailto:${app.submitterEmail}`} className="text-decoration-none">
                                {app.submitterEmail}
                              </a>
                            </td>
                            <td>
                              <strong>{app.title}</strong>
                              <br />
                              <small className="text-muted" style={{whiteSpace: 'pre-wrap'}}>
                                {app.shortAbstract && app.shortAbstract.length > 50 ?
                                  `${app.shortAbstract.substring(0, 50)}...` :
                                  app.shortAbstract
                                }
                              </small>
                            </td>
                            <td><small>{app.authors}</small></td>
                            <td><span className="badge bg-info">{app.type}</span></td>
                            <td><small>{app.publisher || '-'}</small></td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-success"
                                  onClick={() => updateUserPublicationApplicationStatus(app.id, 'approved')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla ve Yayın Listesine Ekle"
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => updateUserPublicationApplicationStatus(app.id, 'rejected')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => updateUserPublicationApplicationStatus(app.id, 'pending')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button
                                  className="btn btn-info"
                                  onClick={() => window.open(`data:text/plain;charset=utf-8,${encodeURIComponent(
                                    `YAYIN BİLGİLERİ:\n` +
                                    `Başlık: ${app.title}\n` +
                                    `Yazarlar: ${app.authors}\n` +
                                    `Tür: ${app.type}\n` +
                                    `Yayıncı: ${app.publisher || 'Belirtilmemiş'}\n` +
                                    `Web Link: ${app.webLink || 'Belirtilmemiş'}\n` +
                                    `Telifli: ${app.isCopyrighted ? 'Evet' : 'Hayır'}\n\n` +
                                    `KISA ÖZET:\n${app.shortAbstract || 'Belirtilmemiş'}\n\n` +
                                    `AÇIKLAMA:\n${app.description || 'Belirtilmemiş'}\n\n` +
                                    `TAM ABSTRACT:\n${app.fullAbstract || 'Belirtilmemiş'}\n\n` +
                                    `ANAHTAR KELİMELER: ${app.keywords || 'Belirtilmemiş'}\n\n` +
                                    `BAŞVURAN:\n${app.submitterName} (${app.submitterEmail})\n` +
                                    `Başvuru Tarihi: ${new Date(app.createdAt).toLocaleString('tr-TR')}`
                                  )}`, '_blank')}
                                  title="Detayları Görüntüle"
                                >
                                  👁️
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => deleteUserPublicationApplication(app.id)}
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Partnership Applications */}
              {activeTab === 'partnership' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>İsim</th>
                        <th>Soyisim</th>
                        <th>Email</th>
                        <th>İşletme</th>
                        <th>Telefon</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partnershipApplications.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">Başvuru bulunamadı</td>
                        </tr>
                      ) : (
                        partnershipApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.isim}</td>
                            <td>{app.soyisim}</td>
                            <td>{app.email}</td>
                            <td>{app.isletme}</td>
                            <td>{app.telefon}</td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-success"
                                  onClick={() => updateApplicationStatus(app.id, 'approved', 'partnership')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla"
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.id, 'rejected', 'partnership')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.id, 'pending', 'partnership')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.id, 'partnership')}
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Team Applications */}
              {activeTab === 'team' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>Email</th>
                        <th>Eğitim</th>
                        <th>Alan</th>
                        <th>Detay</th>
                        <th>Telefon</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamApplications.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">Başvuru bulunamadı</td>
                        </tr>
                      ) : (
                        teamApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.adSoyad}</td>
                            <td>{app.email}</td>
                            <td>{app.egitimDurumu}</td>
                            <td>{app.alan}</td>
                            <td>
                              {app.alan === 'Çevirmen' && app.ceviriDili}
                              {app.alan === 'Yazılımcı' && app.yazilimUzmanlik}
                              {app.alan === 'Tasarımcı' && app.tasarimUzmanlik}
                              {app.alan === 'Akademisyen' && app.akademisyenUzmanlik}
                              {app.alan === 'Diğer' && app.digerAlanDetay}
                            </td>
                            <td>{app.telefon}</td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-success"
                                  onClick={() => updateApplicationStatus(app.id, 'approved', 'team')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla"
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.id, 'rejected', 'team')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.id, 'pending', 'team')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.id, 'team')}
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Graduation Club Applications */}
              {activeTab === 'graduation' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>Email</th>
                        <th>Baba Adı</th>
                        <th>Mezun Kurum</th>
                        <th>Mezuniyet Yılı</th>
                        <th>Çalıştığı Kurum</th>
                        <th>Akademik Ünvan</th>
                        <th>Telefon</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {graduationApplications.length === 0 ? (
                        <tr>
                          <td colSpan="12" className="text-center">Mezuniyet kulübü başvurusu bulunamadı</td>
                        </tr>
                      ) : (
                        graduationApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.isim} {app.soyisim}</td>
                            <td>{app.email}</td>
                            <td>{app.babaAdi}</td>
                            <td>
                              <small className="text-muted">{app.mezunKurum}</small>
                            </td>
                            <td>
                              <span className="badge bg-info">{app.mezuniyetYili}</span>
                            </td>
                            <td>
                              <small className="text-muted">{app.calistigiKurum}</small>
                            </td>
                            <td>{app.akademikGorev}</td>
                            <td>{app.telefon}</td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-success"
                                  onClick={() => updateGraduationApplicationStatus(app.id, 'approved')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla"
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => updateGraduationApplicationStatus(app.id, 'rejected')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => updateGraduationApplicationStatus(app.id, 'pending')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => deleteGraduationApplication(app.id)}
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Russian Traces Management Tab */}
              {activeTab === 'rusizleri' && (
                <div>
                  {/* Russian Trace Add Form */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                      <h5 className="mb-0">🏛️ Manuel Rus İzi Ekleme</h5>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={downloadRusIzleriJson}
                        title="Rus İzleri JSON dosyasını indir"
                      >
                        📥 JSON İndir
                      </button>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleRusIziSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🗺️ Plaka Kodu *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="plaka"
                              value={newRusIzi.plaka}
                              onChange={handleRusIziChange}
                              placeholder="Örn: TR06, 06, 34, TR34"
                              style={inputStyle}
                              required
                            />
                            <small className="form-text text-muted">
                              TR06, 06, 34, TR34 formatlarında yazabilirsiniz
                            </small>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏛️ Rus İzi Adı *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="name"
                              value={newRusIzi.name}
                              onChange={handleRusIziChange}
                              placeholder="Örn: Kars Fethiye Camii"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">📝 Açıklama *</label>
                            <textarea
                              className="form-control text-area-custom"
                              name="description"
                              value={newRusIzi.description}
                              onChange={handleRusIziChange}
                              rows="4"
                              style={textAreaStyle}
                              placeholder="Rus İzi hakkında detaylı açıklama...

Bu alanda:
- Satır sonları korunur
- Boşluklar korunur
- Paragraf yapısı korunur"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏷️ Tür *</label>
                            <select
                              className="form-select"
                              name="type"
                              value={newRusIzi.type}
                              onChange={handleRusIziChange}
                              required
                            >
                              <option value="">Kategori Seçiniz</option>
                              <option value="Mimari ve Tarihi Yapılar">Mimari ve Tarihi Yapılar</option>
                              <option value="Kültürel ve Ticari İzler">Kültürel ve Ticari İzler</option>
                              <option value="Dini ve Mezhepsel İzler">Dini ve Mezhepsel İzler</option>
                              <option value="Eğitim ve Akademik İzler">Eğitim ve Akademik İzler</option>
                              <option value="Tarihi Olaylar ve Diplomatik İzler">Tarihi Olaylar ve Diplomatik İzler</option>
                              <option value="Göç ve Yerleşim">Göç ve Yerleşim</option>
                              <option value="Kullanıcı Katkısı">Kullanıcı Katkısı</option>
                              <option value="Diğer">Diğer</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🌐 Web Sitesi</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="website"
                              value={newRusIzi.website}
                              onChange={handleRusIziChange}
                              placeholder="https://example.com"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">📍 Adres *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="address"
                              value={newRusIzi.address}
                              onChange={handleRusIziChange}
                              placeholder="Örn: Fethiye, Kars"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              🏛️ Rus İzi Ekle
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* List of Existing Russian Traces */}
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0">📋 Mevcut Rus İzleri ({getAllRusIzleri().length})</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>Şehir</th>
                              <th>Adı</th>
                              <th>Kategori</th>
                              <th>Adres</th>
                              <th>Web Sitesi</th>
                              <th>İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getAllRusIzleri().length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  🏛️ Henüz Rus İzi eklenmemiş
                                </td>
                              </tr>
                            ) : (
                              getAllRusIzleri().map((rusIzi, idx) => (
                                <tr key={`${rusIzi.plakaCode}-${idx}`}>
                                  <td>
                                    <span className="badge bg-secondary">
                                      {rusIzi.plakaCode.replace('TR', '')} - {rusIzi.cityName}
                                    </span>
                                  </td>
                                  <td>
                                    <strong>{rusIzi.name}</strong>
                                    <br />
                                    <small className="text-muted" style={{whiteSpace: 'pre-wrap'}}>
                                      {rusIzi.description.length > 50 ?
                                        `${rusIzi.description.substring(0, 50)}...` :
                                        rusIzi.description
                                      }
                                    </small>
                                  </td>
                                  <td><span className="badge bg-info">{rusIzi.type}</span></td>
                                  <td><small>{rusIzi.address}</small></td>
                                  <td>
                                    {rusIzi.website && rusIzi.website !== '-' ? (
                                      <a href={rusIzi.website} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                        🔗
                                      </a>
                                    ) : (
                                      <span className="text-muted">-</span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditRusIzi(rusIzi, rusIzi.plakaCode, rusIzi.index)}
                                        title="Düzenle"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deleteRusIzi(rusIzi, rusIzi.plakaCode, rusIzi.index)}
                                        title="Sil"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* User Russian Trace Applications */}
              {activeTab === 'user-rusizi' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Ad Soyad</th>
                        <th>Email</th>
                        <th>Telefon</th>
                        <th>Konum</th>
                        <th>Açıklama</th>
                        <th>Fotoğraflar</th>
                        <th>Durum</th>
                        <th>Tarih</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRusIziApplications.length === 0 ? (
                        <tr>
                          <td colSpan="10" className="text-center">Kullanıcı Rus İzi başvurusu bulunamadı</td>
                        </tr>
                      ) : (
                        userRusIziApplications.map((app) => (
                          <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.isim} {app.soyisim}</td>
                            <td>
                              <a href={`mailto:${app.email}`} className="text-decoration-none">
                                {app.email}
                              </a>
                            </td>
                            <td>
                              <a href={`tel:${app.telefon}`} className="text-decoration-none">
                                {app.telefon}
                              </a>
                            </td>
                            <td>
                              <span className="badge bg-secondary">{app.konum}</span>
                            </td>
                            <td>
                              <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'pre-wrap' }}>
                                {app.aciklama && app.aciklama.length > 100 ?
                                  `${app.aciklama.substring(0, 100)}...` :
                                  app.aciklama
                                }
                              </div>
                            </td>
                            <td>
                              {app.dosyalar && app.dosyalar.length > 0 ? (
                                <div className="d-flex flex-wrap gap-1">
                                  {app.dosyalar.slice(0, 2).map((dosya, index) => (
                                    <img
                                      key={index}
                                      src={dosya.data}
                                      alt={dosya.name}
                                      className="rounded border"
                                      style={{
                                        width: '40px',
                                        height: '40px',
                                        objectFit: 'cover',
                                        cursor: 'pointer'
                                      }}
                                      title={dosya.name}
                                      onClick={() => window.open(dosya.data, '_blank')}
                                    />
                                  ))}
                                  {app.dosyalar.length > 2 && (
                                    <div className="d-flex align-items-center justify-content-center bg-light border rounded"
                                         style={{ width: '40px', height: '40px', fontSize: '12px' }}>
                                      +{app.dosyalar.length - 2}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <span className="text-muted">-</span>
                              )}
                            </td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.createdAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button
                                  className="btn btn-success"
                                  onClick={() => updateUserRusIziApplicationStatus(app.id, 'approved')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla ve Haritaya Ekle"
                                >
                                  ✅
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => updateUserRusIziApplicationStatus(app.id, 'rejected')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => updateUserRusIziApplicationStatus(app.id, 'pending')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button
                                  className="btn btn-info"
                                  onClick={() => window.open(`data:text/plain;charset=utf-8,${encodeURIComponent(
                                    `KULLANICI BİLGİLERİ:\n` +
                                    `Ad Soyad: ${app.isim} ${app.soyisim}\n` +
                                    `Email: ${app.email}\n` +
                                    `Telefon: ${app.telefon}\n` +
                                    `Konum: ${app.konum}\n\n` +
                                    `AÇIKLAMA:\n${app.aciklama}\n\n` +
                                    `Başvuru Tarihi: ${new Date(app.createdAt).toLocaleString('tr-TR')}`
                                  )}`, '_blank')}
                                  title="Detayları Görüntüle"
                                >
                                  👁️
                                </button>
                                <button
                                  className="btn btn-dark"
                                  onClick={() => deleteUserRusIziApplication(app.id)}
                                  title="Sil"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Institution Management */}
              {activeTab === 'institutions' && (
                <div>
                  {/* Institution Add Form */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                      <h5 className="mb-0">➕ Kurum Ekleme</h5>
                      <button
                        className="btn btn-light btn-sm"
                        onClick={downloadJsonFile}
                        title="JSON dosyasını indir"
                      >
                        📥 JSON İndir
                      </button>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleInstitutionSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🗺️ Plaka Kodu *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="plaka"
                              value={newInstitution.plaka}
                              onChange={handleInstitutionChange}
                              placeholder="Örn: TR06"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏛️ Kurum Adı *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="name"
                              value={newInstitution.name}
                              onChange={handleInstitutionChange}
                              placeholder="Kurum adını girin"
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">📝 Açıklama *</label>
                            <textarea
                              className="form-control text-area-custom"
                              name="description"
                              value={newInstitution.description}
                              onChange={handleInstitutionChange}
                              rows="4"
                              style={textAreaStyle}
                              placeholder="Kurum hakkında detaylı açıklama...

Bu alanda:
- Satır sonları korunur
- Boşluklar korunur
- Paragraf yapısı korunur"
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🏷️ Tür *</label>
                            <select
                              className="form-select"
                              name="type"
                              value={newInstitution.type}
                              onChange={handleInstitutionChange}
                              required
                            >
                              <option value="">Seçiniz</option>
                              <option value="Büyükelçilik">Büyükelçilik</option>
                              <option value="Konsolosluk">Konsolosluk</option>
                              <option value="Ticaret">Ticaret</option>
                              <option value="Üniversite">Üniversite</option>
                              <option value="Okul/Kreş">Okul/Kreş</option>
                              <option value="Kurslar">Kurslar</option>
                              <option value="Dernekler">Dernekler</option>
                              <option value="Diğer">Diğer</option>
                            </select>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">🌐 Web Sitesi</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="website"
                              value={newInstitution.website}
                              onChange={handleInstitutionChange}
                              placeholder="www.example.com"
                              style={inputStyle}
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">📍 Adres *</label>
                            <input
                              type="text"
                              className="form-control input-custom"
                              name="address"
                              value={newInstitution.address}
                              onChange={handleInstitutionChange}
                              placeholder="Tam adres bilgisi..."
                              style={inputStyle}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <button
                              type="submit"
                              className="btn btn-primary"
                            >
                              ➕ Kurum Ekle
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Institution Search and Listing */}
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="mb-0">📋 Kurumlar ({filteredInstitutions.length}/{institutions.length})</h5>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Kurum ara... (ad, plaka, tür, adres)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead className="table-dark">
                            <tr>
                              <th>ID</th>
                              <th>Plaka</th>
                              <th>Kurum Adı</th>
                              <th>Tür</th>
                              <th>Adres</th>
                              <th>Web Sitesi</th>
                              <th>Tarih</th>
                              <th>İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredInstitutions.length === 0 ? (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  {searchTerm ? '🔍 Arama sonucunda kurum bulunamadı' : '📋 Kurum bulunamadı'}
                                </td>
                              </tr>
                            ) : (
                              filteredInstitutions.map((inst) => (
                                <tr key={inst.id}>
                                  <td>{inst.id}</td>
                                  <td><span className="badge bg-secondary">{inst.plaka}</span></td>
                                  <td>
                                    <strong>{inst.name}</strong>
                                    <br />
                                    <small className="text-muted" style={{whiteSpace: 'pre-wrap'}}>
                                      {inst.description.length > 50 ?
                                        `${inst.description.substring(0, 50)}...` :
                                        inst.description
                                      }
                                    </small>
                                  </td>
                                  <td><span className="badge bg-info">{inst.type}</span></td>
                                  <td>
                                    <small>{inst.address}</small>
                                  </td>
                                  <td>
                                    {inst.website && inst.website !== '-' ? (
                                      <a href={`http://${inst.website.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                        🔗
                                      </a>
                                    ) : (
                                      <span className="text-muted">-</span>
                                    )}
                                  </td>
                                  <td><small>{new Date(inst.createdAt).toLocaleDateString('tr-TR')}</small></td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        className="btn btn-warning"
                                        onClick={() => handleEditInstitution(inst)}
                                        title="Düzenle"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        className="btn btn-danger"
                                        onClick={() => deleteInstitution(inst.id)}
                                        title="Sil"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

      {/* Modals */}

      {/* Publication Edit Modal */}
      {showPublicationEditModal && editingPublication && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">✏️ Yayın Düzenle</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {setShowPublicationEditModal(false); setEditingPublication(null);}}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdatePublication}>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">📖 Yayın Başlığı</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="title"
                        value={editingPublication.title || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          title: e.target.value
                        }))}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">👥 Yazarlar</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="authors"
                        value={editingPublication.authors || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          authors: e.target.value
                        }))}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏷️ Yayın Türü</label>
                      <select
                        className="form-select"
                        name="type"
                        value={editingPublication.type || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          type: e.target.value
                        }))}
                        required
                      >
                        <option value="">Tür Seçiniz</option>
                        <option value="Makale">Makale</option>
                        <option value="Bildiri">Bildiri</option>
                        <option value="Kitap">Kitap</option>
                        <option value="Tez">Tez</option>
                      </select>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">📝 Kısa Özet</label>
                      <textarea
                        className="form-control text-area-custom"
                        name="shortAbstract"
                        value={editingPublication.shortAbstract || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          shortAbstract: e.target.value
                        }))}
                        rows="3"
                        style={textAreaStyle}
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">📄 Ana Açıklama</label>
                      <textarea
                        className="form-control text-area-custom"
                        name="description"
                        value={editingPublication.description || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          description: e.target.value
                        }))}
                        rows="4"
                        style={textAreaStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏢 Yayıncı/Dergi</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="publisher"
                        value={editingPublication.publisher || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          publisher: e.target.value
                        }))}
                        style={inputStyle}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🔗 Web Linki</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="webLink"
                        value={editingPublication.webLink || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          webLink: e.target.value
                        }))}
                        style={inputStyle}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🔍 Anahtar Kelimeler</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="keywords"
                        value={editingPublication.keywords || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          keywords: e.target.value
                        }))}
                        style={inputStyle}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">📋 Tam Abstract</label>
                      <textarea
                        className="form-control text-area-custom"
                        name="fullAbstract"
                        value={editingPublication.fullAbstract || ''}
                        onChange={(e) => setEditingPublication(prev => ({
                          ...prev,
                          fullAbstract: e.target.value
                        }))}
                        rows="4"
                        style={textAreaStyle}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isCopyrighted"
                          id="editIsCopyrighted"
                          checked={editingPublication.isCopyrighted || false}
                          onChange={(e) => setEditingPublication(prev => ({
                            ...prev,
                            isCopyrighted: e.target.checked
                          }))}
                        />
                        <label className="form-check-label" htmlFor="editIsCopyrighted">
                          📄 Bu yayın teliflidir
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {setShowPublicationEditModal(false); setEditingPublication(null);}}
                >
                  ❌ İptal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdatePublication}
                >
                  💾 Güncelle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Russian Trace Edit Modal */}
      {showRusIziEditModal && editingRusIzi && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">✏️ Rus İzi Düzenle</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {setShowRusIziEditModal(false); setEditingRusIzi(null);}}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateRusIzi}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🗺️ Plaka Kodu</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="plaka"
                        value={editingRusIzi.plaka?.replace('TR', '') || ''}
                        onChange={(e) => {
                          let value = e.target.value.trim().toUpperCase();
                          if (!value.startsWith('TR') && value) {
                            value = `TR${value}`;
                          }
                          setEditingRusIzi(prev => ({
                            ...prev,
                            plaka: value
                          }));
                        }}
                        placeholder="Örn: TR06, 06, 34"
                        style={inputStyle}
                        required
                      />
                      <small className="form-text text-muted">
                        TR06, 06, 34 formatlarında yazabilirsiniz
                      </small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏛️ Rus İzi Adı</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="name"
                        value={editingRusIzi.name || ''}
                        onChange={(e) => setEditingRusIzi(prev => ({
                          ...prev,
                          name: e.target.value
                        }))}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">📝 Açıklama</label>
                      <textarea
                        className="form-control text-area-custom"
                        name="description"
                        value={editingRusIzi.description || ''}
                        onChange={(e) => setEditingRusIzi(prev => ({
                          ...prev,
                          description: e.target.value
                        }))}
                        rows="4"
                        style={textAreaStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏷️ Tür</label>
                      <select
                        className="form-select"
                        name="type"
                        value={editingRusIzi.type || ''}
                        onChange={(e) => setEditingRusIzi(prev => ({
                          ...prev,
                          type: e.target.value
                        }))}
                        required
                      >
                        <option value="">Kategori Seçiniz</option>
                        <option value="Mimari ve Tarihi Yapılar">Mimari ve Tarihi Yapılar</option>
                        <option value="Kültürel ve Ticari İzler">Kültürel ve Ticari İzler</option>
                        <option value="Dini ve Mezhepsel İzler">Dini ve Mezhepsel İzler</option>
                        <option value="Eğitim ve Akademik İzler">Eğitim ve Akademik İzler</option>
                        <option value="Tarihi Olaylar ve Diplomatik İzler">Tarihi Olaylar ve Diplomatik İzler</option>
                        <option value="Göç ve Yerleşim">Göç ve Yerleşim</option>
                        <option value="Kullanıcı Katkısı">Kullanıcı Katkısı</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🌐 Web Sitesi</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="website"
                        value={editingRusIzi.website || ''}
                        onChange={(e) => setEditingRusIzi(prev => ({
                          ...prev,
                          website: e.target.value
                        }))}
                        style={inputStyle}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">📍 Adres</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="address"
                        value={editingRusIzi.address || ''}
                        onChange={(e) => setEditingRusIzi(prev => ({
                          ...prev,
                          address: e.target.value
                        }))}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {setShowRusIziEditModal(false); setEditingRusIzi(null);}}
                >
                  ❌ İptal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateRusIzi}
                >
                  💾 Güncelle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institution Edit Modal */}
      {showEditModal && editingInstitution && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">✏️ Kurum Düzenle</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {setShowEditModal(false); setEditingInstitution(null);}}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdateInstitution}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🗺️ Plaka Kodu</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="plaka"
                        value={editingInstitution.plaka}
                        onChange={handleEditInstitutionChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏛️ Kurum Adı</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="name"
                        value={editingInstitution.name}
                        onChange={handleEditInstitutionChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">📝 Açıklama</label>
                      <textarea
                        className="form-control text-area-custom"
                        name="description"
                        value={editingInstitution.description}
                        onChange={handleEditInstitutionChange}
                        rows="4"
                        style={textAreaStyle}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🏷️ Tür</label>
                      <select
                        className="form-select"
                        name="type"
                        value={editingInstitution.type}
                        onChange={handleEditInstitutionChange}
                        required
                      >
                        <option value="">Seçiniz</option>
                        <option value="Büyükelçilik">Büyükelçilik</option>
                        <option value="Konsolosluk">Konsolosluk</option>
                        <option value="Kültür">Kültür</option>
                        <option value="Ticaret">Ticaret</option>
                        <option value="Üniversite">Üniversite</option>
                        <option value="Okul/Kreş">Okul/Kreş</option>
                        <option value="Kurslar">Kurslar</option>
                        <option value="Dernekler">Dernekler</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">🌐 Web Sitesi</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="website"
                        value={editingInstitution.website || ''}
                        onChange={handleEditInstitutionChange}
                        style={inputStyle}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label">📍 Adres</label>
                      <input
                        type="text"
                        className="form-control input-custom"
                        name="address"
                        value={editingInstitution.address}
                        onChange={handleEditInstitutionChange}
                        style={inputStyle}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {setShowEditModal(false); setEditingInstitution(null);}}
                >
                  ❌ İptal
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateInstitution}
                >
                  💾 Güncelle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
