import React, { useState, useEffect } from 'react';

const Login = ({ onLoginSuccess, isAdmin }) => {
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
      const response = await fetch('http://localhost:8080/api/login', {
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
    <div className='w-100 position-relative'>
      <div className='container'>
        <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
          <div className='w-50 p-5 shadow-lg rounded-4'>
            <h3 className='text-center'>Admin Girişi</h3>
            
            {error && (
              <div className="alert alert-danger mt-3">{error}</div>
            )}
            
            <div className='w-75 py-4 mx-auto'>
              <label htmlFor="kullaniciAdi" style={{fontWeight:"500"}}>Kullanıcı Adı</label>
              <input 
                type="text" 
                className='form-control mt-3 p-3 rounded-4' 
                id='kullaniciAdi' 
                placeholder='Kullanıcı Adı'
                onChange={handleChange}
                required
              />
              
              <label htmlFor="sifre" className='mt-4' style={{fontWeight:"500"}}>Şifre</label>
              <input 
                type="password" 
                className='form-control mt-3 p-3 rounded-4' 
                id='sifre' 
                placeholder="Şifre"
                onChange={handleChange}
                required
              />
              
              <div className='mt-4 text-center'>
                <button 
                  type="button" 
                  className='btn btn-primary text-center'
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
  const [activeTab, setActiveTab] = useState('team');
  const [teamApplications, setTeamApplications] = useState([]);
  const [partnershipApplications, setPartnershipApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
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
    website: '',
    image: ''
  });

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
    }
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInstitutions(institutions);
    } else {
      performSearch(searchTerm);
    }
  }, [searchTerm, institutions]);

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

  const fetchInstitutions = async () => {
    console.log('🔍 Kurumlar yükleniyor, token:', token ? 'Var' : 'Yok');
    try {
      const response = await fetch('http://localhost:8080/api/admin/institutions', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Kurumlar API yanıtı:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Hatası:', errorText);
        throw new Error(`Kurumlar alınamadı: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('📋 Yüklenen kurumlar:', data);
      setInstitutions(data || []);
      setFilteredInstitutions(data || []);
      showMessage(`✅ ${data?.length || 0} kurum yüklendi`);
    } catch (error) {
      console.error('❌ Kurumlar yüklenirken hata:', error);
      showMessage(`Kurumlar yüklenirken hata: ${error.message}`, 'error');
    }
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/admin/institutions/search?q=${encodeURIComponent(searchQuery)}`, {
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

  const fetchApplications = async () => {
    setLoading(true);
    console.log('📊 Başvurular yükleniyor...');
    
    try {
      const teamResponse = await fetch('http://localhost:8080/api/admin/team-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!teamResponse.ok) {
        throw new Error('Ekip başvuruları alınamadı');
      }
      
      const teamData = await teamResponse.json();
      setTeamApplications(teamData || []);
      console.log('👥 Ekip başvuruları:', teamData?.length || 0);

      const partnershipResponse = await fetch('http://localhost:8080/api/admin/partnership-applications?status=all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!partnershipResponse.ok) {
        throw new Error('İşbirliği başvuruları alınamadı');
      }
      
      const partnershipData = await partnershipResponse.json();
      setPartnershipApplications(partnershipData || []);
      console.log('🤝 İşbirliği başvuruları:', partnershipData?.length || 0);
      
    } catch (error) {
      console.error('❌ Başvurular yüklenirken hata:', error);
      showMessage('Başvurular yüklenirken hata oluştu: ' + error.message, 'error');
      
      if (error.message.includes('401')) {
        console.log('🔑 Token geçersiz, çıkış yapılıyor...');
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
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

  const handleInstitutionSubmit = async (e) => {
    e.preventDefault();
    
    console.log('➕ Kurum ekleniyor:', newInstitution);
    console.log('🔑 Token:', token ? 'Var' : 'Yok');
    
    if (!newInstitution.plaka || !newInstitution.name || !newInstitution.description || 
        !newInstitution.type || !newInstitution.address) {
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
        website: newInstitution.website || '',
        image: newInstitution.image || ''
      };
      
      const response = await fetch('http://localhost:8080/api/admin/institution', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(institutionData)
      });
      
      console.log('📡 Kurum ekleme API yanıtı:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Hatası:', errorText);
        throw new Error(`Kurum eklenemedi: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('✅ Kurum eklendi:', data);
      showMessage('Kurum başarıyla eklendi!');
      
      setNewInstitution({
        plaka: '',
        name: '',
        description: '',
        type: '',
        address: '',
        website: '',
        image: ''
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
      const response = await fetch(`http://localhost:8080/api/admin/institution/${editingInstitution.ID}`, {
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
      const response = await fetch(`http://localhost:8080/api/admin/institution/${id}`, {
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
      const response = await fetch('http://localhost:8080/api/institutions');
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

  const updateApplicationStatus = async (id, status, type) => {
    try {
      const endpoint = type === 'team' 
        ? `http://localhost:8080/api/admin/team-application/${id}`
        : `http://localhost:8080/api/admin/partnership-application/${id}`;
      
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
        ? `http://localhost:8080/api/admin/team-application/${id}`
        : `http://localhost:8080/api/admin/partnership-application/${id}`;
      
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
    return <Login onLoginSuccess={handleLoginSuccess} isAdmin={true} />;
  }

  return (
    <div className="container py-5">
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
                        <div className="col-12 mb-3">
                          <label className="form-label">🖼️ Resim Linki (Opsiyonel)</label>
                          <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={newInstitution.image}
                            onChange={handleInstitutionChange}
                            placeholder="https://example.com/image.jpg"
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
                  <div className="col-12 mb-3">
                    <label className="form-label">🖼️ Resim Linki</label>
                    <input
                      type="text"
                      className="form-control"
                      name="image"
                      value={editingInstitution.image}
                      onChange={handleEditInstitutionChange}
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
    </div>
  );
};

export default Admin;