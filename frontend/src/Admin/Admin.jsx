import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('partnership');
  const [teamApplications, setTeamApplications] = useState([]);
  const [partnershipApplications, setPartnershipApplications] = useState([]);
  const [graduationApplications, setGraduationApplications] = useState([]);
  const [userRusIziApplications, setUserRusIziApplications] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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

  // Demo verileri
  useEffect(() => {
    initializeDemoData();
  }, []);

  const initializeDemoData = () => {
    // Partnership başvuruları
    setPartnershipApplications([
      {
        id: 1,
        isim: 'Berkay',
        soyisim: 'Yelkanat',
        email: 'berkay@gmail.com',
        isletme: 'Kaspersky',
        telefon: '+90 555 555 55 55',
        status: 'approved',
        createdAt: new Date('2024-01-12')
      }
    ]);

    // Team başvuruları
    setTeamApplications([
      {
        id: 1,
        adSoyad: 'Berkay Yelkanat',
        email: 'berkay.yelkanat@example.com',
        egitimDurumu: 'Lisans',
        alan: 'Yazılımcı',
        yazilimUzmanlik: 'Python, Go, Nodejs',
        telefon: '+90 555 555 55 55',
        status: 'approved',
        createdAt: new Date('2024-01-20')
      }
    ]);

    // Mezuniyet kulübü başvuruları
    setGraduationApplications([
      {
        id: 1,
        isim: 'Berkay',
        soyisim: 'Yelkanat',
        email: 'berkay.yelkanat@university.edu',
        babaAdi: 'baba adı',
        mezunKurum: 'Kurum ismi',
        mezuniyetYili: '2024',
        calistigiKurum: 'Kaspersky',
        akademikGorev: 'Yazılım Geliştirici',
        telefon: '+90 555 555 55 55',
        status: 'approved',
        createdAt: new Date('2024-01-25')
      }
    ]);

    // Kullanıcı Rus İzi başvuruları
    setUserRusIziApplications([
      {
        id: 1,
        isim: 'Berkay',
        soyisim: 'Yelkanat',
        email: 'berkay.yelkanat@example.com',
        telefon: '+90 555 123 45 67',
        konum: 'İstanbul',
        aciklama: 'Beyoğlu\'nda eski Rus konsolosluğu binası. 19. yüzyıldan kalma mimari özellikler taşıyor. Bina cephesinde Rus imparatorluk arması hala görülebiliyor.',
        dosyalar: [
          { name: 'foto1.jpg', data: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAzMEwyMCAxME0yMCAzMEwxNSAyNU0yMCAzMEwyNSAyNSIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K' }
        ],
        status: 'pending',
        createdAt: new Date('2024-01-22')
      },
      {
        id: 2,
        isim: 'Berkay',
        soyisim: 'Yelkanat',
        email: 'berkay@researcher.com',
        telefon: '+90 555 999 88 77',
        konum: 'Ankara',
        aciklama: 'Ankara Ulus\'ta bulunan eski Rus ticaret evi. 1900\'lü yılların başında Rus tüccarlar tarafından kullanılmış.',
        dosyalar: [],
        status: 'approved',
        createdAt: new Date('2024-01-20')
      }
    ]);

    // Kurumlar
    setInstitutions([
      {
        id: 1,
        plaka: 'TR34',
        name: 'Rusya Federasyonu İstanbul Başkonsolosluğu',
        description: 'İstanbul\'daki Rus konsolosluğu, diplomatik ilişkilerin yürütüldüğü resmi kurum',
        type: 'Konsolosluk',
        address: 'Beyoğlu, İstanbul',
        website: 'www.ruskonsolos.com',
        createdAt: new Date('2024-01-01')
      },
      {
        id: 2,
        plaka: 'TR06',
        name: 'Ankara Rus Kültür Merkezi',
        description: 'Ankara\'daki Rus kültür merkezi, kültürel etkinliklerin düzenlendiği merkez',
        type: 'Kültür',
        address: 'Çankaya, Ankara',
        website: 'www.ruskultur.org',
        createdAt: new Date('2024-01-02')
      },
      {
        id: 3,
        plaka: 'TR35',
        name: 'İzmir Rus Ticaret Odası',
        description: 'Berkay Yelkanat tarafından araştırılmış İzmir\'deki Rus ticaret merkezi',
        type: 'Ticaret',
        address: 'Konak, İzmir',
        website: '-',
        createdAt: new Date('2024-01-03')
      }
    ]);

    // Rus İzleri
    setRusIzleri([
      {
        id: 1,
        plaka: 'TR34',
        name: 'Galata Kulesi Rus İzleri',
        description: 'Galata Kulesi\'nin Rus mimarları tarafından restore edilmiş bölümleri ve tarihi önemi',
        type: 'Mimari ve Tarihi Yapılar',
        address: 'Galata, Beyoğlu, İstanbul',
        website: 'www.galatakulesi.com',
        createdAt: new Date('2024-01-03')
      },
      {
        id: 2,
        plaka: 'TR34',
        name: 'Beyoğlu Rus Kilisesi',
        description: 'Berkay Yelkanat tarafından keşfedilen tarihi Rus kilisesi, 19. yüzyıl mimarisi',
        type: 'Dini ve Mezhepsel İzler',
        address: 'İstiklal Caddesi, Beyoğlu, İstanbul',
        website: '-',
        createdAt: new Date('2024-01-04')
      },
      {
        id: 3,
        plaka: 'TR06',
        name: 'Ankara Rus Diplomat Konutları',
        description: 'Berkay Yelkanat\'ın araştırmasıyla ortaya çıkan eski Rus diplomat konutları',
        type: 'Tarihi Olaylar ve Diplomatik İzler',
        address: 'Çankaya, Ankara',
        website: '-',
        createdAt: new Date('2024-01-05')
      }
    ]);

    setFilteredInstitutions(institutions);
    setFilteredRusIzleri(rusIzleri);
  };

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

  const updateGraduationApplicationStatus = (id, status) => {
    setGraduationApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
    showMessage('Mezuniyet başvuru durumu güncellendi!');
  };

  const deleteGraduationApplication = (id) => {
    if (!window.confirm('Bu mezuniyet başvurusunu silmek istediğinize emin misiniz?')) {
      return;
    }
    setGraduationApplications(prev => prev.filter(app => app.id !== id));
    showMessage('Mezuniyet başvurusu silindi!');
  };

  const updateUserRusIziApplicationStatus = (id, status) => {
    setUserRusIziApplications(prev => 
      prev.map(app => app.id === id ? { ...app, status } : app)
    );
    if (status === 'approved') {
      const approvedApp = userRusIziApplications.find(app => app.id === id);
      if (approvedApp) {
        const newRusIzi = {
          id: rusIzleri.length + 1,
          plaka: approvedApp.konum === 'İstanbul' ? 'TR34' : 'TR06',
          name: `${approvedApp.isim} ${approvedApp.soyisim} Keşfi`,
          description: approvedApp.aciklama,
          type: 'Kullanıcı Katkısı',
          address: approvedApp.konum,
          website: '-',
          createdAt: new Date()
        };
        setRusIzleri(prev => [...prev, newRusIzi]);
      }
      showMessage('✅ Başvuru onaylandı ve Rus İzleri listesine eklendi!');
    } else {
      showMessage('Kullanıcı Rus İzi başvuru durumu güncellendi!');
    }
  };

  const deleteUserRusIziApplication = (id) => {
    if (!window.confirm('Bu kullanıcı başvurusunu silmek istediğinize emin misiniz?')) {
      return;
    }
    setUserRusIziApplications(prev => prev.filter(app => app.id !== id));
    showMessage('Kullanıcı başvurusu silindi!');
  };

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

  const handleRusIziSubmit = () => {
    if (!newRusIzi.plaka || !newRusIzi.name || !newRusIzi.description || 
        !newRusIzi.type || !newRusIzi.address) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }
    
    const rusIziData = {
      id: rusIzleri.length + 1,
      ...newRusIzi,
      createdAt: new Date()
    };
    
    setRusIzleri(prev => [...prev, rusIziData]);
    showMessage('Rus İzi başarıyla eklendi!');
    
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

  const handleUpdateRusIzi = () => {
    setRusIzleri(prev => 
      prev.map(iz => iz.id === editingRusIzi.id ? editingRusIzi : iz)
    );
    
    showMessage('Rus İzi bilgileri güncellendi!');
    setShowEditRusIziModal(false);
    setEditingRusIzi(null);
  };

  const deleteRusIzi = (id) => {
    if (!window.confirm('Bu Rus İzini silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setRusIzleri(prev => prev.filter(iz => iz.id !== id));
    showMessage('Rus İzi silindi!');
  };

  const downloadRusIzleriJsonFile = () => {
    const dataStr = JSON.stringify(rusIzleri, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'rus_izleri_demo.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('Rus İzleri JSON dosyası indirildi!');
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

  const handleInstitutionSubmit = () => {
    if (!newInstitution.plaka || !newInstitution.name || !newInstitution.description || 
        !newInstitution.type || !newInstitution.address) {
      showMessage('Lütfen tüm zorunlu alanları doldurun', 'error');
      return;
    }
    
    const institutionData = {
      id: institutions.length + 1,
      ...newInstitution,
      createdAt: new Date()
    };
    
    setInstitutions(prev => [...prev, institutionData]);
    showMessage('Kurum başarıyla eklendi!');
    
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

  const handleUpdateInstitution = () => {
    setInstitutions(prev => 
      prev.map(inst => inst.id === editingInstitution.id ? editingInstitution : inst)
    );
    
    showMessage('Kurum bilgileri güncellendi!');
    setShowEditModal(false);
    setEditingInstitution(null);
  };

  const deleteInstitution = (id) => {
    if (!window.confirm('Bu kurumu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
    showMessage('Kurum silindi!');
  };

  const downloadJsonFile = () => {
    const dataStr = JSON.stringify(institutions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'russian_institutions_demo.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showMessage('JSON dosyası indirildi!');
  };

  const updateApplicationStatus = (id, status, type) => {
    if (type === 'team') {
      setTeamApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
    } else {
      setPartnershipApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      );
    }
    showMessage('Başvuru durumu güncellendi!');
  };

  const deleteApplication = (id, type) => {
    if (!window.confirm('Bu başvuruyu silmek istediğinize emin misiniz?')) {
      return;
    }
    
    if (type === 'team') {
      setTeamApplications(prev => prev.filter(app => app.id !== id));
    } else {
      setPartnershipApplications(prev => prev.filter(app => app.id !== id));
    }
    showMessage('Başvuru silindi!');
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
            <div>
              <h1>🇷🇺 Rusevi Admin Paneli</h1>
              <div className="mt-2">
                <span className="badge bg-info fs-6">📋 DEMO VERSİYON</span>
                <span className="badge bg-secondary ms-2">Tüm veriler örnek içindir</span>
              </div>
            </div>
            <div className="text-end">
              <div className="text-muted small">Demo Admin Paneli</div>
              <div className="text-muted small">Berkay Yelkanat Örnek Verileri</div>
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
                className={`nav-link ${activeTab === 'user-rusizi' ? 'active' : ''}`}
                onClick={() => setActiveTab('user-rusizi')}
              >
                📍 Kullanıcı Rus İzi Başvuruları ({userRusIziApplications.length})
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
          
          {/* İşbirliği Başvuruları */}
          {activeTab === 'partnership' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>📋 Demo Bilgi:</strong> Bu bölümde Berkay Yelkanat ve diğer kullanıcıların işbirliği başvuruları görüntülenmektedir.
              </div>
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
                    {partnershipApplications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.isim}</td>
                        <td>{app.soyisim}</td>
                        <td>
                          <a href={`mailto:${app.email}`} className="text-decoration-none">
                            {app.email}
                          </a>
                        </td>
                        <td>{app.isletme}</td>
                        <td>
                          <a href={`tel:${app.telefon}`} className="text-decoration-none">
                            {app.telefon}
                          </a>
                        </td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Ekip Başvuruları */}
          {activeTab === 'team' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>👥 Demo Bilgi:</strong> Bu bölümde Berkay Yelkanat'ın yazılımcı ve akademisyen başvuruları ile diğer ekip üyeliği başvuruları bulunmaktadır.
              </div>
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
                    {teamApplications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.adSoyad}</td>
                        <td>
                          <a href={`mailto:${app.email}`} className="text-decoration-none">
                            {app.email}
                          </a>
                        </td>
                        <td>{app.egitimDurumu}</td>
                        <td><span className="badge bg-info">{app.alan}</span></td>
                        <td>
                          {app.alan === 'Çevirmen' && app.ceviriDili}
                          {app.alan === 'Yazılımcı' && app.yazilimUzmanlik}
                          {app.alan === 'Tasarımcı' && app.tasarimUzmanlik}
                          {app.alan === 'Akademisyen' && app.akademisyenUzmanlik}
                          {app.alan === 'Diğer' && app.digerAlanDetay}
                        </td>
                        <td>
                          <a href={`tel:${app.telefon}`} className="text-decoration-none">
                            {app.telefon}
                          </a>
                        </td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mezuniyet Kulübü Başvuruları */}
          {activeTab === 'graduation' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>🎓 Demo Bilgi:</strong> Bu bölümde Berkay Yelkanat'ın mezuniyet klubü başvurusu yer almaktadır
              </div>
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
                    {graduationApplications.map((app) => (
                      <tr key={app.id}>
                        <td>{app.id}</td>
                        <td>{app.isim} {app.soyisim}</td>
                        <td>
                          <a href={`mailto:${app.email}`} className="text-decoration-none">
                            {app.email}
                          </a>
                        </td>
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
                        <td>
                          <a href={`tel:${app.telefon}`} className="text-decoration-none">
                            {app.telefon}
                          </a>
                        </td>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Kullanıcı Rus İzi Başvuruları */}
          {activeTab === 'user-rusizi' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>📍 Demo Bilgi:</strong> Bu bölümde Berkay Yelkanat'ın keşfettiği İstanbul Beyoğlu'ndaki eski Rus konsolosluğu ve Ankara'daki Rus ticaret evi başvuruları bulunmaktadır.
              </div>
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
                    {userRusIziApplications.map((app) => (
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
                          <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {app.aciklama.length > 100 ? 
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
                              title="Onayla ve Rus İzleri listesine ekle"
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Kurum Yönetimi */}
          {activeTab === 'institutions' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>🏛️ Demo Bilgi:</strong> Bu bölümde kurum ekleme, silme, düzenleme yapabilirsiniz.
              </div>
              
              {/* Kurum Ekleme Formu */}
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
                  <h5 className="mb-0">➕ Kurum Ekleme (Demo)</h5>
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
                            <tr key={inst.id}>
                              <td>{inst.id}</td>
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
                              <td>{new Date(inst.createdAt).toLocaleDateString('tr-TR')}</td>
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
          
          {/* Rus İzleri Yönetimi */}
          {activeTab === 'rusizleri' && (
            <div>
              <div className="alert alert-info mb-4">
                <strong>🏰 Demo Bilgi:</strong> Bu bölümde rus izi ekleyebilir, silebilir, yönetebilirsiniz.
              </div>
              
              {/* Rus İzi Ekleme Formu */}
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center bg-warning text-dark">
                  <h5 className="mb-0">🏰 Rus İzi Ekleme (Demo)</h5>
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
                        <option value="Kullanıcı Katkısı">Kullanıcı Katkısı</option>
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
                            <tr key={iz.id}>
                              <td>{iz.id}</td>
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
                              <td>{new Date(iz.createdAt).toLocaleDateString('tr-TR')}</td>
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
                                    onClick={() => deleteRusIzi(iz.id)}
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
        </div>
      </div>

      {/* Kurum Düzenleme Modalı */}
      {showEditModal && editingInstitution && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title">✏️ Kurum Düzenle (Demo)</h5>
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
        </div>
      )}

      {/* Rus İzi Düzenleme Modalı */}
      {showEditRusIziModal && editingRusIzi && (
        <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">🏰 Rus İzi Düzenle (Demo)</h5>
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
                      <option value="Kullanıcı Katkısı">Kullanıcı Katkısı</option>
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
        </div>
      )}
    </div>
  );
};

export default Admin;
