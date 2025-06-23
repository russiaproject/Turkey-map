import React, { useState, useEffect } from 'react';
import rusIzleriData from '../data/rus_izleri.json';

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
    
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      
      if (!response.ok) {
        throw new Error('Giriş başarısız');
      }
      
      const data = await response.json();
      
      if (data && data.token) {
        onLoginSuccess(data.token, data.username);
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      setError('Kullanıcı adı veya şifre hatalı');
    } finally {
      setLoading(false);
    }
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
  const [teamApplications, setTeamApplications] = useState([]);
  const [partnershipApplications, setPartnershipApplications] = useState([]);
  const [graduationApplications, setGraduationApplications] = useState([]);
  const [userRusIziApplications, setUserRusIziApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  
  // Kurum yönetimi state'leri
  const [institutions, setInstitutions] = useState([]);
  const [filteredInstitutions, setFilteredInstitutions] = useState([]);
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

  // Rus İzi yönetimi state'leri
  const [currentRusIzleri, setCurrentRusIzleri] = useState(rusIzleriData);
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

  // Yayın yönetimi state'leri
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [publicationSearchTerm, setPublicationSearchTerm] = useState('');
  const [userPublicationApplications, setUserPublicationApplications] = useState([]);
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

  // Türkiye plaka kodları ve şehirler
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

  // CSS stilleri - Boşluk sorununu çözmek için
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

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchApplications();
      fetchInstitutions();
      fetchGraduationApplications();
      fetchUserRusIziApplications();
      fetchCurrentRusIzleri(); 
      fetchPublications();
      fetchUserPublicationApplications();
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInstitutions(institutions);
    } else {
      performSearch(searchTerm);
    }
  }, [searchTerm, institutions]);

  // Yayın arama filtreleme
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

  // Yayın yönetimi fonksiyonları
  const fetchPublications = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/publications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      setPublications(data || []);
      setFilteredPublications(data || []);
      
    } catch (error) {
      console.error('❌ Yayınlar API hatası:', error);
      showMessage('Yayınlar yüklenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const fetchUserPublicationApplications = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/user-publication-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setUserPublicationApplications([]);
          return;
        }
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      setUserPublicationApplications(data || []);
      
    } catch (error) {
      console.error('❌ Kullanıcı yayın başvuruları hatası:', error);
      setUserPublicationApplications([]);
    }
  };

  // DÜZELTME: Boşluk korunması için özel handlePublicationChange
  const handlePublicationChange = (e) => {
    const { name, value } = e.target;
    // Değeri olduğu gibi koruyoruz, trim() yapmıyoruz
    setNewPublication(prev => ({
      ...prev,
      [name]: value // Boşlukları koruyoruz
    }));
  };

  const handlePublicationSubmit = async (e) => {
    e.preventDefault();
    
    // Validation yaparken trim kullanıyoruz ama state'i değiştirmiyoruz
    if (!newPublication.title?.trim() || !newPublication.authors?.trim() || !newPublication.type || 
        !newPublication.shortAbstract?.trim() || !newPublication.description?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }

    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/publication', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPublication) // Boşlukları koruyarak gönderiyoruz
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      const result = await response.json();
      showMessage('✅ Yayın başarıyla eklendi!');

      // Formu temizle
      setNewPublication({
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

      // Verileri yenile
      fetchPublications();
      
    } catch (error) {
      console.error('❌ Yayın ekleme hatası:', error);
      showMessage('Yayın eklenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const handleEditPublication = (publication) => {
    setEditingPublication({ ...publication });
    setShowPublicationEditModal(true);
  };

  const handleUpdatePublication = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/publication/${editingPublication.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingPublication)
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      showMessage('✅ Yayın başarıyla güncellendi!');
      
      setShowPublicationEditModal(false);
      setEditingPublication(null);

      fetchPublications();
      
    } catch (error) {
      console.error('❌ Yayın güncelleme hatası:', error);
      showMessage('Yayın güncellenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const deletePublication = async (id) => {
    if (!window.confirm('Bu yayını silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/publication/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      showMessage('✅ Yayın başarıyla silindi!');
      fetchPublications();
      
    } catch (error) {
      console.error('❌ Yayın silme hatası:', error);
      showMessage('Yayın silinirken hata oluştu: ' + error.message, 'error');
    }
  };

  const updateUserPublicationApplicationStatus = async (id, status, adminNote = '') => {
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/user-publication-application/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, adminNote })
      });
      
      if (!response.ok) {
        throw new Error(`Durum güncellenemedi: ${response.status}`);
      }
      
      // Eğer başvuru onaylandıysa, otomatik olarak yayın listesine ekle
      if (status === 'approved') {
        const application = userPublicationApplications.find(app => app.id === id);
        if (application) {
          try {
            const addResponse = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/publication-from-application', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
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
                isCopyrighted: application.isCopyrighted
              })
            });

            if (!addResponse.ok) {
              throw new Error(`Yayın ekleme hatası: ${addResponse.status}`);
            }

            fetchPublications(); // Yayın listesini yenile
          } catch (error) {
            console.error('❌ Yayın ekleme hatası:', error);
            showMessage('Başvuru onaylandı ama yayın eklenirken hata oluştu', 'error');
          }
        }
      }
      
      fetchUserPublicationApplications();
      
      if (status === 'approved') {
        showMessage('✅ Başvuru onaylandı ve yayın listesine eklendi!');
      } else {
        showMessage('Kullanıcı yayın başvuru durumu güncellendi!');
      }
      
    } catch (error) {
      console.error('❌ Durum güncelleme hatası:', error);
      showMessage('Durum güncellenirken hata oluştu', 'error');
    }
  };

  const deleteUserPublicationApplication = async (id) => {
    if (!window.confirm('Bu kullanıcı yayın başvurusunu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/user-publication-application/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Silme işlemi başarısız: ${response.status}`);
      }
      
      fetchUserPublicationApplications();
      showMessage('Kullanıcı yayın başvurusu silindi!');
      
    } catch (error) {
      console.error('❌ Silme hatası:', error);
      showMessage('Silme işlemi sırasında hata oluştu', 'error');
    }
  };

  // Rus İzi fonksiyonları (devam ediyor...)
  const fetchCurrentRusIzleri = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/rus-izleri', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Database formatından JSON formatına dönüştür
      const groupedData = {};
      data.forEach(rusIzi => {
        const plaka = rusIzi.plaka;
        if (!groupedData[plaka]) {
          groupedData[plaka] = [];
        }
        groupedData[plaka].push({
          ...rusIzi,
          id: rusIzi.id // Database ID'sini koru
        });
      });
      
      setCurrentRusIzleri(groupedData);
      
      return groupedData;
    } catch (error) {
      console.error('❌ Rus İzleri API hatası:', error);
      showMessage('Rus İzleri yüklenirken hata oluştu: ' + error.message, 'error');
      return {};
    }
  };

  // DÜZELTME: Boşluk korunması için özel handleRusIziChange
  const handleRusIziChange = (e) => {
    const { name, value } = e.target;
    setNewRusIzi(prev => ({
      ...prev,
      [name]: value // Boşlukları koruyoruz
    }));
  };

  const handleRusIziSubmit = async (e) => {
    e.preventDefault();
    
    if (!newRusIzi.plaka?.trim() || !newRusIzi.name?.trim() || !newRusIzi.description?.trim() || 
        !newRusIzi.type || !newRusIzi.address?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }

    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/rus-izi', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plaka: newRusIzi.plaka,
          name: newRusIzi.name,
          description: newRusIzi.description,
          type: newRusIzi.type,
          address: newRusIzi.address,
          website: newRusIzi.website || ''
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      const result = await response.json();
      showMessage('✅ Rus İzi başarıyla eklendi ve JSON dosyası güncellendi!');

      // Formu temizle
      setNewRusIzi({
        plaka: '',
        name: '',
        description: '',
        type: '',
        address: '',
        website: ''
      });

      // Verileri yenile
      fetchCurrentRusIzleri();
      
    } catch (error) {
      console.error('❌ Rus İzi ekleme hatası:', error);
      showMessage('Rus İzi eklenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const handleEditRusIzi = (rusIzi, plakaCode, index) => {
    setEditingRusIzi({ ...rusIzi, plakaCode, index });
    setShowRusIziEditModal(true);
  };

  const handleUpdateRusIzi = async (e) => {
    e.preventDefault();
    
    try {
      const rusIziId = editingRusIzi.id; // Database ID kullan
      
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/rus-izi/${rusIziId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plaka: editingRusIzi.plaka,
          name: editingRusIzi.name,
          description: editingRusIzi.description,
          type: editingRusIzi.type,
          address: editingRusIzi.address,
          website: editingRusIzi.website || ''
        })
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      showMessage('✅ Rus İzi başarıyla güncellendi!');
      
      setShowRusIziEditModal(false);
      setEditingRusIzi(null);

      fetchCurrentRusIzleri();
      
    } catch (error) {
      console.error('❌ Rus İzi güncelleme hatası:', error);
      showMessage('Rus İzi güncellenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const deleteRusIzi = async (rusIzi, plakaCode, index) => {
    if (!window.confirm('Bu Rus İzi\'ni silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const rusIziId = rusIzi.id; // Database ID kullan
      
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/rus-izi/${rusIziId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }

      showMessage('✅ Rus İzi başarıyla silindi!');

      // Verileri yenile
      fetchCurrentRusIzleri();
      
    } catch (error) {
      console.error('❌ Rus İzi silme hatası:', error);
      showMessage('Rus İzi silinirken hata oluştu: ' + error.message, 'error');
    }
  };

  // Rus İzlerini listele
  const getAllRusIzleri = () => {
    const allRusIzleri = [];
    Object.keys(currentRusIzleri).forEach(plakaCode => {
      currentRusIzleri[plakaCode].forEach((rusIzi, index) => {
        allRusIzleri.push({
          ...rusIzi,
          plakaCode,
          index,
          cityName: plakaKodlari[plakaCode.replace('TR', '')] || plakaCode
        });
      });
    });
    return allRusIzleri;
  };

  // Mezuniyet kulübü fonksiyonları
  const fetchGraduationApplications = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/graduation-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Mezuniyet başvuruları alınamadı');
      }
      
      const data = await response.json();
      setGraduationApplications(data || []);
      
    } catch (error) {
      console.error('❌ Mezuniyet başvuruları yüklenirken hata:', error);
      showMessage('Mezuniyet başvuruları yüklenirken hata oluştu: ' + error.message, 'error');
    }
  };

  const updateGraduationApplicationStatus = async (id, status) => {
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/graduation-application/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Durum güncellenemedi');
      }
      
      fetchGraduationApplications();
      showMessage('Mezuniyet başvuru durumu güncellendi!');
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      showMessage('Durum güncellenirken hata oluştu', 'error');
    }
  };

  const deleteGraduationApplication = async (id) => {
    if (!window.confirm('Bu mezuniyet başvurusunu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/graduation-application/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Silme işlemi başarısız');
      }
      
      fetchGraduationApplications();
      showMessage('Mezuniyet başvurusu silindi!');
    } catch (error) {
      console.error('Silme işlemi sırasında hata:', error);
      showMessage('Silme işlemi sırasında hata oluştu', 'error');
    }
  };

  // Kullanıcı Rus İzi fonksiyonları
  const fetchUserRusIziApplications = async () => {
    try {
      const url = 'https://turkey-map-wh2i.onrender.com/api/admin/user-rusizi-applications?status=all';
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setUserRusIziApplications([]);
          return;
        }
        
        const errorText = await response.text();
        throw new Error(`Kullanıcı Rus İzi başvuruları alınamadı: ${response.status}`);
      }
      
      const data = await response.json();
      setUserRusIziApplications(data || []);
      
    } catch (error) {
      console.error('❌ fetchUserRusIziApplications hatası:', error);
      
      if (error.message.includes('404')) {
        setUserRusIziApplications([]);
        showMessage('Kullanıcı Rus İzi modülü henüz backend\'de aktif değil', 'error');
      } else {
        showMessage('Kullanıcı Rus İzi başvuruları yüklenirken hata oluştu: ' + error.message, 'error');
      }
    }
  };

  const updateUserRusIziApplicationStatus = async (id, status, adminNot = '') => {
    try {
      const url = `https://turkey-map-wh2i.onrender.com/api/admin/user-rusizi-application/${id}`;
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, adminNot })
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Durum güncellenemedi: ${response.status}`);
      }

      // Eğer başvuru onaylandıysa JSON'a ekle
      if (status === 'approved') {
        const application = userRusIziApplications.find(app => app.id === id);
        if (application) {
          try {
            const addResponse = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/rus-izi-from-application', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                isim: application.isim,
                soyisim: application.soyisim,
                konum: application.konum,
                aciklama: application.aciklama
              })
            });

            if (!addResponse.ok) {
              throw new Error(`Rus İzi ekleme hatası: ${addResponse.status}`);
            }
          } catch (error) {
            console.error('❌ Kullanıcı katkısı ekleme hatası:', error);
            showMessage('Başvuru onaylandı ama Rus İzi eklenirken hata oluştu', 'error');
          }
        }
      }
      
      fetchUserRusIziApplications();
      
      if (status === 'approved') {
        showMessage('✅ Başvuru onaylandı ve haritaya eklendi!');
      } else {
        showMessage('Kullanıcı Rus İzi başvuru durumu güncellendi!');
      }
      
    } catch (error) {
      console.error('❌ updateUserRusIziApplicationStatus hatası:', error);
      showMessage('Durum güncellenirken hata oluştu', 'error');
    }
  };

  const deleteUserRusIziApplication = async (id) => {
    if (!window.confirm('Bu kullanıcı başvurusunu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const url = `https://turkey-map-wh2i.onrender.com/api/admin/user-rusizi-application/${id}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Silme işlemi başarısız: ${response.status}`);
      }
      
      fetchUserRusIziApplications();
      showMessage('Kullanıcı başvurusu silindi!');
      
    } catch (error) {
      console.error('❌ deleteUserRusIziApplication hatası:', error);
      showMessage('Silme işlemi sırasında hata oluştu', 'error');
    }
  };

  // Kurum fonksiyonları
  const fetchInstitutions = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/institutions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kurumlar alınamadı: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      setInstitutions(data || []);
      setFilteredInstitutions(data || []);
    } catch (error) {
      console.error('❌ Kurumlar yüklenirken hata:', error);
      showMessage(`Kurumlar yüklenirken hata: ${error.message}`, 'error');
    }
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery) return;
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/institutions/search?q=${encodeURIComponent(searchQuery)}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Arama başarısız');
      }
      
      const data = await response.json();
      setFilteredInstitutions(data.results || []);
    } catch (error) {
      console.error('Arama hatası:', error);
      const filtered = institutions.filter(inst => 
        inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.plaka.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inst.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInstitutions(filtered);
    }
  };

  // DÜZELTME: Boşluk korunması için özel handleInstitutionChange
  const handleInstitutionChange = (e) => {
    const { name, value } = e.target;
    setNewInstitution(prev => ({
      ...prev,
      [name]: value // Boşlukları koruyoruz
    }));
  };

  const handleEditInstitutionChange = (e) => {
    const { name, value } = e.target;
    setEditingInstitution(prev => ({
      ...prev,
      [name]: value // Boşlukları koruyoruz
    }));
  };

  const handleInstitutionSubmit = async (e) => {
    e.preventDefault();
    
    if (!newInstitution.plaka?.trim() || !newInstitution.name?.trim() || !newInstitution.description?.trim() || 
        !newInstitution.type || !newInstitution.address?.trim()) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }
    
    try {
      const institutionData = {
        plaka: newInstitution.plaka,
        name: newInstitution.name,
        description: newInstitution.description,
        type: newInstitution.type,
        address: newInstitution.address,
        website: newInstitution.website || ''
      };
      
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/institution', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(institutionData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kurum eklenemedi: ${response.status} - ${errorText}`);
      }
      
      showMessage('Kurum başarıyla eklendi!');
      
      setNewInstitution({
        plaka: '',
        name: '',
        description: '',
        type: '',
        address: '',
        website: ''
      });
      
      fetchInstitutions();
      
    } catch (error) {
      console.error('❌ Kurum eklenirken hata:', error);
      showMessage(`Kurum eklenirken hata: ${error.message}`, 'error');
    }
  };

  const handleEditInstitution = (institution) => {
    setEditingInstitution({ ...institution });
    setShowEditModal(true);
  };

  const handleUpdateInstitution = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/institution/${editingInstitution.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingInstitution)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kurum güncellenemedi: ${response.status} - ${errorText}`);
      }
      
      showMessage('Kurum bilgileri güncellendi!');
      setShowEditModal(false);
      setEditingInstitution(null);
      
      fetchInstitutions();
      
    } catch (error) {
      console.error('Kurum güncellenirken hata:', error);
      showMessage(`Kurum güncellenirken hata: ${error.message}`, 'error');
    }
  };

  const deleteInstitution = async (id) => {
    if (!window.confirm('Bu kurumu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const response = await fetch(`https://turkey-map-wh2i.onrender.com/api/admin/institution/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Kurum silinemedi');
      }
      
      showMessage('Kurum silindi!');
      fetchInstitutions();
    } catch (error) {
      console.error('Kurum silinirken hata:', error);
      showMessage('Kurum silinirken hata oluştu', 'error');
    }
  };

  const downloadJsonFile = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/institutions');
      if (!response.ok) {
        throw new Error('JSON indirilemedi');
      }
      
      const data = await response.json();
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'russian_institutions.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      showMessage('JSON dosyası indirildi!');
    } catch (error) {
      console.error('JSON indirme hatası:', error);
      showMessage('JSON dosyası indirilemedi', 'error');
    }
  };

  // Rus İzleri JSON'ını indir (güncel dosyadan)
  const downloadRusIzleriJson = async () => {
    try {
      const response = await fetch('https://turkey-map-wh2i.onrender.com/api/rus-izleri');
      
      if (!response.ok) {
        throw new Error(`API Hatası: ${response.status}`);
      }
      
      const data = await response.json();
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', 'rus_izleri.json');
      linkElement.click();
      
      showMessage('📥 Güncel Rus İzleri JSON dosyası indirildi!');
    } catch (error) {
      console.error('JSON indirme hatası:', error);
      showMessage('JSON dosyası indirilemedi: ' + error.message, 'error');
    }
  };

  // Genel başvuru fonksiyonları
  const fetchApplications = async () => {
    setLoading(true);
    
    try {
      const teamResponse = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/team-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!teamResponse.ok) {
        throw new Error('Ekip başvuruları alınamadı');
      }
      
      const teamData = await teamResponse.json();
      setTeamApplications(teamData || []);

      const partnershipResponse = await fetch('https://turkey-map-wh2i.onrender.com/api/admin/partnership-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!partnershipResponse.ok) {
        throw new Error('İşbirliği başvuruları alınamadı');
      }
      
      const partnershipData = await partnershipResponse.json();
      setPartnershipApplications(partnershipData || []);
      
    } catch (error) {
      console.error('❌ Başvurular yüklenirken hata:', error);
      showMessage('Başvurular yüklenirken hata oluştu: ' + error.message, 'error');
      
      if (error.message.includes('401')) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (id, status, type) => {
    try {
      const endpoint = type === 'team' 
        ? `https://turkey-map-wh2i.onrender.com/api/admin/team-application/${id}`
        : `https://turkey-map-wh2i.onrender.com/api/admin/partnership-application/${id}`;
      
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      if (!response.ok) {
        throw new Error('Durum güncellenemedi');
      }
      
      fetchApplications();
      showMessage('Başvuru durumu güncellendi!');
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      showMessage('Durum güncellenirken hata oluştu', 'error');
    }
  };

  const deleteApplication = async (id, type) => {
    if (!window.confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    try {
      const endpoint = type === 'team' 
        ? `https://turkey-map-wh2i.onrender.com/api/admin/team-application/${id}`
        : `https://turkey-map-wh2i.onrender.com/api/admin/partnership-application/${id}`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Silme işlemi başarısız');
      }
      
      fetchApplications();
      showMessage('Başvuru silindi!');
    } catch (error) {
      console.error('Silme işlemi sırasında hata:', error);
      showMessage('Silme işlemi sırasında hata oluştu', 'error');
    }
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
      {/* DÜZELTME: CSS stillerini head'e ekleme */}
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
        
        /* Textarea'da satır sonlarını koruma */
        textarea.form-control {
          white-space: pre-wrap !important;
          word-break: break-word !important;
        }
        
        /* Input'larda normal yazı akışı */
        input.form-control {
          white-space: normal !important;
        }
      `}</style>
      
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>🇷🇺 Rusevi Admin Paneli</h1>
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
              {/* Yayın Yönetimi Tab */}
              {activeTab === 'publications' && (
                <div>
                  {/* Yayın Ekleme Formu */}
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
                        
                        {/* Detay Bilgileri */}
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

                  {/* Mevcut Yayınlar */}
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

              {/* DİĞER TAB'LAR DEVAM EDİYOR... */}
              {/* Kullanıcı Yayın Başvuruları */}
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

              {/* İşbirliği Başvuruları */}
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

              {/* Ekip Başvuruları */}
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

              {/* Mezuniyet Kulübü Başvuruları */}
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

              {/* Rus İzi Yönetimi Tab'ı */}
              {activeTab === 'rusizleri' && (
                <div>
                  {/* Rus İzi Ekleme Formu */}
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

                  {/* Mevcut Rus İzleri Listesi */}
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

              {/* Kullanıcı Rus İzi Başvuruları */}
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
              
              {/* Kurum Yönetimi */}
              {activeTab === 'institutions' && (
                <div>
                  {/* Kurum Ekleme Formu */}
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

                  {/* Kurum Arama ve Listeleme */}
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

      {/* Modal'lar */}

      {/* Yayın Düzenleme Modalı */}
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

      {/* Rus İzi Düzenleme Modalı */}
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

      {/* Kurum Düzenleme Modalı */}
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
