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
            
            <form onSubmit={handleSubmit} className='w-75 py-4 mx-auto'>
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
                  type="submit" 
                  className='btn btn-primary text-center'
                  disabled={loading}
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
            </form>
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
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');

  // Login kontrolü
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    const savedUsername = localStorage.getItem('adminUsername');
    if (savedToken) {
      setToken(savedToken);
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  // Başvuruları yükle
  useEffect(() => {
    if (isLoggedIn && token) {
      fetchApplications();
    }
  }, [isLoggedIn, token]);

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

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Ekip başvurularını al
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

      // İşbirliği başvurularını al
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
      
    } catch (error) {
      console.error('Başvurular yüklenirken hata:', error);
      setError('Başvurular yüklenirken hata oluştu');
      
      // Token geçersizse çıkış yap
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
      
      // Başvuruları yeniden yükle
      fetchApplications();
      alert('Başvuru durumu güncellendi!');
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      alert('Durum güncellenirken hata oluştu');
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
      
      // Başvuruları yeniden yükle
      fetchApplications();
      alert('Başvuru silindi!');
    } catch (error) {
      console.error('Silme işlemi sırasında hata:', error);
      alert('Silme işlemi sırasında hata oluştu');
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
            <h1>Admin Paneli</h1>
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
          
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
                onClick={() => setActiveTab('team')}
              >
                Ekip Üyeliği Başvuruları ({teamApplications.length})
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'partnership' ? 'active' : ''}`}
                onClick={() => setActiveTab('partnership')}
              >
                İşbirliği Başvuruları ({partnershipApplications.length})
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
              {/* Ekip Başvuruları */}
              {activeTab === 'team' && (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
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
                                >
                                  Onayla
                                </button>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.ID, 'rejected', 'team')}
                                  disabled={app.status === 'rejected'}
                                >
                                  Reddet
                                </button>
                                <button 
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.ID, 'pending', 'team')}
                                  disabled={app.status === 'pending'}
                                >
                                  Beklet
                                </button>
                                <button 
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.ID, 'team')}
                                >
                                  Sil
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
                    <thead>
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
                                >
                                  Onayla
                                </button>
                                <button 
                                  className="btn btn-danger"
                                  onClick={() => updateApplicationStatus(app.ID, 'rejected', 'partnership')}
                                  disabled={app.status === 'rejected'}
                                >
                                  Reddet
                                </button>
                                <button 
                                  className="btn btn-warning"
                                  onClick={() => updateApplicationStatus(app.ID, 'pending', 'partnership')}
                                  disabled={app.status === 'pending'}
                                >
                                  Beklet
                                </button>
                                <button 
                                  className="btn btn-dark"
                                  onClick={() => deleteApplication(app.ID, 'partnership')}
                                >
                                  Sil
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;