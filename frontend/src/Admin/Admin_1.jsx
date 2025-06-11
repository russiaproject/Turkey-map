import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeTab, setActiveTab] = useState('team');
  const [teamApplications, setTeamApplications] = useState([]);
  const [partnershipApplications, setPartnershipApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('dummy-token'); 
  const [username, setUsername] = useState('Admin'); 
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
  
  // Rus İzleri state'leri
  const [rusIzleri, setRusIzleri] = useState([]);
  const [filteredRusIzleri, setFilteredRusIzleri] = useState([]);
  const [searchRusIzleri, setSearchRusIzleri] = useState('');
  const [editingRusIzi, setEditingRusIzi] = useState(null);
  const [showEditRusIziModal, setShowEditRusIziModal] = useState(false);
  const [newRusIzi, setNewRusIzi] = useState({
    plaka: '',
    name: '',
    description: '',
    type: '',
    address: '',
    website: ''
  });

  const mockTeamApplications = [
    {
      ID: 1,
      adSoyad: "Berkay Yelkanat",
      email: "berkay@example.com",
      egitimDurumu: "Lisans",
      alan: "Yazılımcı",
      yazilimUzmanlik: "React, Node.js",
      telefon: "5555555555",
      status: "pending",
      CreatedAt: "2024-01-15T10:30:00Z"
    },
    {
      ID: 2,
      adSoyad: "Berkay Yelkanat",
      email: "berkay@example.com",
      egitimDurumu: "Yüksek Lisans",
      alan: "Çevirmen",
      ceviriDili: "Rusça-Türkçe",
      telefon: "5555555556",
      status: "approved",
      CreatedAt: "2024-01-14T14:20:00Z"
    },
    {
      ID: 3,
      adSoyad: "Berkay Yelkanat",
      email: "berkay@example.com",
      egitimDurumu: "Doktora",
      alan: "Akademisyen",
      akademisyenUzmanlik: "Rusya Tarihi",
      telefon: "5555555557",
      status: "rejected",
      CreatedAt: "2024-01-13T16:45:00Z"
    }
  ];

  const mockPartnershipApplications = [
    {
      ID: 1,
      isim: "Berkay",
      soyisim: "Yelkanat",
      email: "berkay@company.com",
      isletme: "Sirket",
      telefon: "5555555555",
      status: "pending",
      CreatedAt: "2024-01-16T09:15:00Z"
    }
  ];

  const mockInstitutions = [
    {
      ID: 1,
      plaka: "TR06",
      name: "Rusya Federasyonu Büyükelçiliği",
      description: "Ankara'daki Rusya Büyükelçiliği",
      type: "Büyükelçilik",
      address: "Karyağdı Sokak No:5, Çankaya/Ankara",
      website: "turkey.mid.ru",
      CreatedAt: "2024-01-10T12:00:00Z"
    },
    {
      ID: 2,
      plaka: "TR34",
      name: "Rusya Federasyonu İstanbul Başkonsolosluğu",
      description: "İstanbul'daki Rusya Başkonsolosluğu",
      type: "Konsolosluk",
      address: "İstiklal Caddesi, Beyoğlu/İstanbul",
      website: "istanbul.mid.ru",
      CreatedAt: "2024-01-11T15:30:00Z"
    },
    {
      ID: 3,
      plaka: "TR35",
      name: "Rus Kültür Merkezi",
      description: "İzmir'deki Rus kültür merkezi",
      type: "Kültür",
      address: "Alsancak, İzmir",
      website: "ruskultur-izmir.com",
      CreatedAt: "2024-01-12T10:15:00Z"
    }
  ];

  const mockRusIzleri = [
    {
      "plaka": "TR36",
      "name": "Kars Fethiye Camii",
      "description": "19. yüzyılda Rus Ortodoks Kilisesi olarak inşa edilen bu yapı, bugün cami olarak hizmet vermektedir.",
      "type": "Dini ve Mezhepsel İzler",
      "address": "Fethiye, Kars",
      "website": "https://tr.wikipedia.org/wiki/Fethiye_Camii_(Kars)"
    },
    {
      "plaka": "TR36",
      "name": "Kars Defterdarlığı",
      "description": "19. yüzyılın sonlarında inşa edilen Kars Defterdarlığı Binası, Rus dönemi Baltık mimarisinin izlerini taşıyan tarihî bir kamu yapısıdır.",
      "type": "Mimari ve Tarihi Yapılar",
      "address": "Kars",
      "website": "https://kars.gib.gov.tr/"
    },
    {
      "plaka": "TR36",
      "name": "Kars İl Sağlık Müdürlüğü Binası",
      "description": "19. yüzyıl sonlarında inşa edilen İl Sağlık Müdürlüğü Binası, Kars'ta Rus dönemi Baltık mimarisinin sade ve işlevsel izlerini taşıyan özgün bir kamu yapısıdır.",
      "type": "Mimari ve Tarihi Yapılar",
      "address": "Kars",
      "website": "https://karsism.saglik.gov.tr/"
    }
  ];

  useEffect(() => {
    setTeamApplications(mockTeamApplications);
    setPartnershipApplications(mockPartnershipApplications);
    setInstitutions(mockInstitutions);
    setFilteredInstitutions(mockInstitutions);
    setRusIzleri(mockRusIzleri);
    setFilteredRusIzleri(mockRusIzleri);
    showMessage('Demo modunda çalışıyorsunuz - Backend bağlantısı yok');
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInstitutions(institutions);
    } else {
      const filtered = institutions.filter(inst => 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.plaka.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstitutions(filtered);
    }
  }, [searchTerm, institutions]);

  useEffect(() => {
    if (searchRusIzleri === '') {
      setFilteredRusIzleri(rusIzleri);
    } else {
      const filtered = rusIzleri.filter(iz => 
        iz.name.toLowerCase().includes(searchRusIzleri.toLowerCase()) ||
        iz.plaka.toLowerCase().includes(searchRusIzleri.toLowerCase()) ||
        iz.type.toLowerCase().includes(searchRusIzleri.toLowerCase()) ||
        iz.address.toLowerCase().includes(searchRusIzleri.toLowerCase())
      );
      setFilteredRusIzleri(filtered);
    }
  }, [searchRusIzleri, rusIzleri]);

  const handleLogout = () => {
    showMessage('Demo modunda çıkış yapılamaz', 'error');
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

  // Kurum işlemleri
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

  const handleInstitutionSubmit = async (e) => {
    e.preventDefault();
    
    if (!newInstitution.plaka || !newInstitution.name || !newInstitution.description || 
        !newInstitution.type || !newInstitution.address) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }
    
    const newInst = {
      ID: institutions.length + 1,
      ...newInstitution,
      CreatedAt: new Date().toISOString()
    };
    
    setInstitutions(prev => [...prev, newInst]);
    setFilteredInstitutions(prev => [...prev, newInst]);
    
    showMessage('Kurum başarıyla eklendi! (Demo modu)');
    
    setNewInstitution({
      plaka: '',
      name: '',
      description: '',
      type: '',
      address: '',
      website: ''
    });
  };

  const handleEditInstitution = (institution) => {
    setEditingInstitution({ ...institution });
    setShowEditModal(true);
  };

  const handleUpdateInstitution = async (e) => {
    e.preventDefault();
    
    setInstitutions(prev => 
      prev.map(inst => inst.ID === editingInstitution.ID ? editingInstitution : inst)
    );
    setFilteredInstitutions(prev => 
      prev.map(inst => inst.ID === editingInstitution.ID ? editingInstitution : inst)
    );
    
    showMessage('Kurum bilgileri güncellendi! (Demo modu)');
    setShowEditModal(false);
    setEditingInstitution(null);
  };

  const deleteInstitution = async (id) => {
    if (!window.confirm('Bu kurumu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setInstitutions(prev => prev.filter(inst => inst.ID !== id));
    setFilteredInstitutions(prev => prev.filter(inst => inst.ID !== id));
    
    showMessage('Kurum silindi! (Demo modu)');
  };

  const downloadJsonFile = async () => {
    const dataStr = JSON.stringify(institutions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'russian_institutions.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('JSON dosyası indirildi! (Demo modu)');
  };

  // Rus İzleri işlemleri
  const handleRusIziChange = (e) => {
    const { name, value } = e.target;
    setNewRusIzi(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditRusIziChange = (e) => {
    const { name, value } = e.target;
    setEditingRusIzi(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRusIziSubmit = async (e) => {
    e.preventDefault();
    
    if (!newRusIzi.plaka || !newRusIzi.name || !newRusIzi.description || 
        !newRusIzi.type || !newRusIzi.address) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }
    
    const newRusIziItem = {
      ID: rusIzleri.length + 1,
      ...newRusIzi,
      CreatedAt: new Date().toISOString()
    };
    
    setRusIzleri(prev => [...prev, newRusIziItem]);
    setFilteredRusIzleri(prev => [...prev, newRusIziItem]);
    
    showMessage('Rus İzi başarıyla eklendi! (Demo modu)');
    
    setNewRusIzi({
      plaka: '',
      name: '',
      description: '',
      type: '',
      address: '',
      website: ''
    });
  };

  const handleEditRusIzi = (rusIzi) => {
    setEditingRusIzi({ ...rusIzi });
    setShowEditRusIziModal(true);
  };

  const handleUpdateRusIzi = async (e) => {
    e.preventDefault();
    
    setRusIzleri(prev => 
      prev.map(iz => iz.ID === editingRusIzi.ID ? editingRusIzi : iz)
    );
    setFilteredRusIzleri(prev => 
      prev.map(iz => iz.ID === editingRusIzi.ID ? editingRusIzi : iz)
    );
    
    showMessage('Rus İzi bilgileri güncellendi! (Demo modu)');
    setShowEditRusIziModal(false);
    setEditingRusIzi(null);
  };

  const deleteRusIzi = async (id) => {
    if (!window.confirm('Bu Rus İzini silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setRusIzleri(prev => prev.filter(iz => iz.ID !== id));
    setFilteredRusIzleri(prev => prev.filter(iz => iz.ID !== id));
    
    showMessage('Rus İzi silindi! (Demo modu)');
  };

  const downloadRusIzleriJsonFile = async () => {
    const dataStr = JSON.stringify(rusIzleri, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'rus_izleri.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Rus İzleri JSON dosyası indirildi! (Demo modu)');
  };

  // Başvuru işlemleri
  const updateApplicationStatus = async (id, status, type) => {
    if (type === 'team') {
      setTeamApplications(prev => 
        prev.map(app => app.ID === id ? {...app, status} : app)
      );
    } else {
      setPartnershipApplications(prev => 
        prev.map(app => app.ID === id ? {...app, status} : app)
      );
    }
    
    showMessage('Başvuru durumu güncellendi! (Demo modu)');
  };

  const deleteApplication = async (id, type) => {
    if (!window.confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    if (type === 'team') {
      setTeamApplications(prev => prev.filter(app => app.ID !== id));
    } else {
      setPartnershipApplications(prev => prev.filter(app => app.ID !== id));
    }
    
    showMessage('Başvuru silindi! (Demo modu)');
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

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>🇷🇺 Rusevi Admin Paneli <span className="badge bg-warning text-dark">DEMO MODU</span></h1>
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
                className={`nav-link ${activeTab === 'institutions' ? 'active' : ''}`}
                onClick={() => setActiveTab('institutions')}
              >
                🏛️ Kurum Yönetimi ({institutions.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'rusizleri' ? 'active' : ''}`}
                onClick={() => setActiveTab('rusizleri')}
              >
                🏰 Rus İzleri ({rusIzleri.length})
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
                          <tr key={app.ID}>
                            <td>{app.ID}</td>
                            <td>{app.isim}</td>
                            <td>{app.soyisim}</td>
                            <td>{app.email}</td>
                            <td>{app.isletme}</td>
                            <td>{app.telefon}</td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{new Date(app.CreatedAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-success"
                                  onClick={() => updateApplicationStatus(app.ID, 'approved', 'partnership')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla"
                                >
                                  ✅
                                </button>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.ID, 'rejected', 'partnership')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button 
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.ID, 'pending', 'partnership')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button 
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.ID, 'partnership')}
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
                          <tr key={app.ID}>
                            <td>{app.ID}</td>
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
                            <td>{new Date(app.CreatedAt).toLocaleDateString('tr-TR')}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                  className="btn btn-success"
                                  onClick={() => updateApplicationStatus(app.ID, 'approved', 'team')}
                                  disabled={app.status === 'approved'}
                                  title="Onayla"
                                >
                                  ✅
                                </button>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.ID, 'rejected', 'team')}
                                  disabled={app.status === 'rejected'}
                                  title="Reddet"
                                >
                                  ❌
                                </button>
                                <button 
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.ID, 'pending', 'team')}
                                  disabled={app.status === 'pending'}
                                  title="Beklet"
                                >
                                  ⏸️
                                </button>
                                <button 
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.ID, 'team')}
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
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🗺️ Plaka Kodu</label>
                          <input
                            type="text"
                            className="form-control"
                            name="plaka"
                            value={newInstitution.plaka}
                            onChange={handleInstitutionChange}
                            placeholder="Örn: TR06"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🏛️ Kurum Adı</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={newInstitution.name}
                            onChange={handleInstitutionChange}
                            required
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">📝 Açıklama</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={newInstitution.description}
                            onChange={handleInstitutionChange}
                            rows="3"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🏷️ Tür</label>
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
                            className="form-control"
                            name="website"
                            value={newInstitution.website}
                            onChange={handleInstitutionChange}
                            placeholder="www.example.com veya -"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">📍 Adres</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={newInstitution.address}
                            onChange={handleInstitutionChange}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={handleInstitutionSubmit}
                          >
                            ➕ Kurum Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Kurum Arama ve Listeleme */}
                  <div className="card">
                    <div className="card-header bg-success text-white">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="mb-0">📋 Kurumlar ({institutions.length})</h5>
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
                                <tr key={inst.ID}>
                                  <td>{inst.ID}</td>
                                  <td><span className="badge bg-secondary">{inst.plaka}</span></td>
                                  <td>{inst.name}</td>
                                  <td><span className="badge bg-info">{inst.type}</span></td>
                                  <td>{inst.address}</td>
                                  <td>
                                    {inst.website && inst.website !== '-' ? (
                                      <a href={`http://${inst.website}`} target="_blank" rel="noopener noreferrer">
                                        {inst.website}
                                      </a>
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                  <td>{new Date(inst.CreatedAt).toLocaleDateString('tr-TR')}</td>
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
                                        onClick={() => deleteInstitution(inst.ID)}
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
              
              {/* Rus İzleri Yönetimi */}
              {activeTab === 'rusizleri' && (
                <div>
                  {/* Rus İzi Ekleme Formu */}
                  <div className="card mb-4">
                    <div className="card-header d-flex justify-content-between align-items-center bg-warning text-dark">
                      <h5 className="mb-0">🏰 Rus İzi Ekleme</h5>
                      <button 
                        className="btn btn-dark btn-sm"
                        onClick={downloadRusIzleriJsonFile}
                        title="Rus İzleri JSON dosyasını indir"
                      >
                        📥 JSON İndir
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🗺️ Plaka Kodu</label>
                          <input
                            type="text"
                            className="form-control"
                            name="plaka"
                            value={newRusIzi.plaka}
                            onChange={handleRusIziChange}
                            placeholder="Örn: TR06"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🏰 Rus İzi Adı</label>
                          <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={newRusIzi.name}
                            onChange={handleRusIziChange}
                            required
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">📝 Açıklama</label>
                          <textarea
                            className="form-control"
                            name="description"
                            value={newRusIzi.description}
                            onChange={handleRusIziChange}
                            rows="3"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🏷️ Tür</label>
                          <select
                            className="form-select"
                            name="type"
                            value={newRusIzi.type}
                            onChange={handleRusIziChange}
                            required
                          >
                            <option value="">Seçiniz</option>
                            <option value="Mimari ve Tarihi Yapılar">Mimari ve Tarihi Yapılar</option>
                            <option value="Kültürel ve Ticari İzler">Kültürel ve Ticari İzler</option>
                            <option value="Dini ve Mezhepsel İzler">Dini ve Mezhepsel İzler</option>
                            <option value="Eğitim ve Akademik İzler">Eğitim ve Akademik İzler</option>
                            <option value="Tarihi Olaylar ve Diplomatik İzler">Tarihi Olaylar ve Diplomatik İzler</option>
                            <option value="Göç ve Yerleşim">Göç ve Yerleşim</option>
                            <option value="Diğer">Diğer</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">🌐 Web Sitesi</label>
                          <input
                            type="text"
                            className="form-control"
                            name="website"
                            value={newRusIzi.website}
                            onChange={handleRusIziChange}
                            placeholder="www.example.com veya -"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">📍 Adres</label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={newRusIzi.address}
                            onChange={handleRusIziChange}
                            required
                          />
                        </div>
                        <div className="col-12">
                          <button 
                            type="button" 
                            className="btn btn-warning"
                            onClick={handleRusIziSubmit}
                          >
                            🏰 Rus İzi Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rus İzi Arama ve Listeleme */}
                  <div className="card">
                    <div className="card-header bg-dark text-white">
                      <div className="row align-items-center">
                        <div className="col-md-6">
                          <h5 className="mb-0">🏰 Rus İzleri ({rusIzleri.length})</h5>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Rus İzi ara... (ad, plaka, tür, adres)"
                            value={searchRusIzleri}
                            onChange={(e) => setSearchRusIzleri(e.target.value)}
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
                              <th>Rus İzi Adı</th>
                              <th>Tür</th>
                              <th>Adres</th>
                              <th>Web Sitesi</th>
                              <th>Tarih</th>
                              <th>İşlemler</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRusIzleri.length === 0 ? (
                              <tr>
                                <td colSpan="8" className="text-center">
                                  {searchRusIzleri ? '🔍 Arama sonucunda Rus İzi bulunamadı' : '🏰 Rus İzi bulunamadı'}
                                </td>
                              </tr>
                            ) : (
                              filteredRusIzleri.map((iz) => (
                                <tr key={iz.ID}>
                                  <td>{iz.ID}</td>
                                  <td><span className="badge bg-secondary">{iz.plaka}</span></td>
                                  <td>{iz.name}</td>
                                  <td><span className="badge bg-warning text-dark">{iz.type}</span></td>
                                  <td>{iz.address}</td>
                                  <td>
                                    {iz.website && iz.website !== '-' ? (
                                      <a href={`http://${iz.website}`} target="_blank" rel="noopener noreferrer">
                                        {iz.website}
                                      </a>
                                    ) : (
                                      '-'
                                    )}
                                  </td>
                                  <td>{new Date(iz.CreatedAt).toLocaleDateString('tr-TR')}</td>
                                  <td>
                                    <div className="btn-group btn-group-sm">
                                      <button 
                                        className="btn btn-warning"
                                        onClick={() => handleEditRusIzi(iz)}
                                        title="Düzenle"
                                      >
                                        ✏️
                                      </button>
                                      <button 
                                        className="btn btn-danger"
                                        onClick={() => deleteRusIzi(iz.ID)}
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
            </>
          )}
        </div>
      </div>

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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🗺️ Plaka Kodu</label>
                    <input
                      type="text"
                      className="form-control"
                      name="plaka"
                      value={editingInstitution.plaka}
                      onChange={handleEditInstitutionChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🏛️ Kurum Adı</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editingInstitution.name}
                      onChange={handleEditInstitutionChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">📝 Açıklama</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editingInstitution.description}
                      onChange={handleEditInstitutionChange}
                      rows="3"
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
                      className="form-control"
                      name="website"
                      value={editingInstitution.website}
                      onChange={handleEditInstitutionChange}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">📍 Adres</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={editingInstitution.address}
                      onChange={handleEditInstitutionChange}
                      required
                    />
                  </div>
                </div>
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

      {/* Rus İzi Düzenleme Modalı */}
      {showEditRusIziModal && editingRusIzi && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">🏰 Rus İzi Düzenle</h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => {setShowEditRusIziModal(false); setEditingRusIzi(null);}}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🗺️ Plaka Kodu</label>
                    <input
                      type="text"
                      className="form-control"
                      name="plaka"
                      value={editingRusIzi.plaka}
                      onChange={handleEditRusIziChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🏰 Rus İzi Adı</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editingRusIzi.name}
                      onChange={handleEditRusIziChange}
                      required
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">📝 Açıklama</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={editingRusIzi.description}
                      onChange={handleEditRusIziChange}
                      rows="3"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🏷️ Tür</label>
                    <select
                      className="form-select"
                      name="type"
                      value={editingRusIzi.type}
                      onChange={handleEditRusIziChange}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="Mimari ve Tarihi Yapılar">Mimari ve Tarihi Yapılar</option>
                      <option value="Kültürel ve Ticari İzler">Kültürel ve Ticari İzler</option>
                      <option value="Dini ve Mezhepsel İzler">Dini ve Mezhepsel İzler</option>
                      <option value="Eğitim ve Akademik İzler">Eğitim ve Akademik İzler</option>
                      <option value="Tarihi Olaylar ve Diplomatik İzler">Tarihi Olaylar ve Diplomatik İzler</option>
                      <option value="Göç ve Yerleşim">Göç ve Yerleşim</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">🌐 Web Sitesi</label>
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      value={editingRusIzi.website}
                      onChange={handleEditRusIziChange}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">📍 Adres</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={editingRusIzi.address}
                      onChange={handleEditRusIziChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => {setShowEditRusIziModal(false); setEditingRusIzi(null);}}
                >
                  ❌ İptal
                </button>
                <button 
                  type="button" 
                  className="btn btn-dark"
                  onClick={handleUpdateRusIzi}
                >
                  💾 Güncelle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
