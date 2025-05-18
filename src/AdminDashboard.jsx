import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllApplications, 
  updateApplicationStatus as updateStatus,
  filterApplications,
  exportApplicationsAsJson
} from "./ApplicationService";
import ApplicationService from "./ApplicationService";
import ApplicationStats from "./ApplicationStats";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
      return;
    }

    const username = localStorage.getItem("adminUsername") || "Admin";
    setAdminUsername(username);

    loadApplications();
    
    const handleApplicationCreated = () => {
      console.log('Yeni başvuru alındı, liste güncelleniyor...');
      loadApplications();
    };
    
    const handleApplicationUpdated = () => {
      console.log('Başvuru güncellendi, liste güncelleniyor...');
      loadApplications();
    };
    
    window.addEventListener(ApplicationService.ApplicationEvents.ApplicationCreated, handleApplicationCreated);
    window.addEventListener(ApplicationService.ApplicationEvents.ApplicationUpdated, handleApplicationUpdated);
    
    return () => {
      window.removeEventListener(ApplicationService.ApplicationEvents.ApplicationCreated, handleApplicationCreated);
      window.removeEventListener(ApplicationService.ApplicationEvents.ApplicationUpdated, handleApplicationUpdated);
    };
  }, [navigate]);

  // Başvuruları yükle
  const loadApplications = () => {
    try {
      const allApplications = getAllApplications();
      setApplications(allApplications);
    } catch (error) {
      console.error("Başvurular yüklenirken hata oluştu:", error);
      setApplications([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminUsername");
    navigate("/admin");
  };

  const viewApplicationDetails = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const updateApplicationStatus = (id, newStatus) => {
    const updatedApplication = updateStatus(id, newStatus);
    
    if (updatedApplication) {
      const updatedApplications = applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      );
      
      setApplications(updatedApplications);
      
      if (selectedApplication && selectedApplication.id === id) {
        setSelectedApplication({ ...selectedApplication, status: newStatus });
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Kabul Edildi":
        return "bg-success";
      case "Reddedildi":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };

  const filteredApplications = filterApplications({
    status: filter !== "all" ? filter : null,
    searchQuery: searchQuery || null
  });

  const exportApplications = () => {
    try {
      const dataStr = exportApplicationsAsJson();
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `rusevi-basvurular-${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
    } catch (error) {
      console.error("Dışa aktarma hatası:", error);
      alert("Dışa aktarma sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" style={{ minHeight: "100vh" }}>
          <div className="position-sticky pt-3">
            <div className="p-3 mb-3 border-bottom">
              <h5 className="text-primary mb-1">Rus Evi Yönetim</h5>
              <p className="text-muted small mb-0">Merhaba, {adminUsername}</p>
            </div>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fa-solid fa-house me-2"></i>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={(e) => e.preventDefault()}>
                  <i className="fa-solid fa-users me-2"></i>
                  Başvurular
                </a>
              </li>
              <li className="nav-item mt-4">
                <button 
                  className="btn btn-outline-danger w-100" 
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-sign-out-alt me-2"></i>
                  Çıkış Yap
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <button 
                type="button" 
                className="btn btn-sm btn-outline-secondary"
                onClick={exportApplications}
              >
                <i className="fa-solid fa-download me-1"></i> Dışa Aktar
              </button>
            </div>
          </div>

          {/* İstatistikler */}
          <ApplicationStats />

          <h3 className="h4 mb-3">Başvurular</h3>

          {/* Filters */}
          <div className="row mb-4">
            <div className="col-md-4">
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="İsim, E-posta, Kategori ile ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button">
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-md-4">
              <select 
                className="form-select" 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Tüm Başvurular</option>
                <option value="Beklemede">Beklemede</option>
                <option value="Kabul Edildi">Kabul Edilenler</option>
                <option value="Reddedildi">Reddedilenler</option>
              </select>
            </div>
            <div className="col-md-4 text-md-end">
              <span className="text-muted">Toplam {filteredApplications.length} başvuru</span>
            </div>
          </div>

          {/* Applications Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">İsim</th>
                  <th scope="col">E-posta</th>
                  <th scope="col">Telefon</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">Başvuru Tarihi</th>
                  <th scope="col">Durum</th>
                  <th scope="col">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.id.toString().slice(-6)}</td>
                    <td>{application.fullName}</td>
                    <td>{application.email}</td>
                    <td>{application.phone}</td>
                    <td>{application.category}</td>
                    <td>{new Date(application.submitDate).toLocaleDateString('tr-TR')}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => viewApplicationDetails(application)}
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      {application.status === "Beklemede" && (
                        <>
                          <button 
                            className="btn btn-sm btn-outline-success me-1"
                            onClick={() => updateApplicationStatus(application.id, "Kabul Edildi")}
                          >
                            <i className="fa-solid fa-check"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => updateApplicationStatus(application.id, "Reddedildi")}
                          >
                            <i className="fa-solid fa-times"></i>
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <p className="text-muted mb-0">Gösterilecek başvuru bulunamadı</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {isModalOpen && selectedApplication && (
        <div className="modal" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Başvuru Detayları</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="mb-3">Kişisel Bilgiler</h6>
                    <p><strong>İsim:</strong> {selectedApplication.fullName}</p>
                    <p><strong>E-posta:</strong> {selectedApplication.email}</p>
                    <p><strong>Telefon:</strong> {selectedApplication.phone}</p>
                    <p><strong>Doğum Tarihi:</strong> {selectedApplication.birthDate}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="mb-3">Başvuru Bilgileri</h6>
                    <p><strong>Başvuru ID:</strong> {selectedApplication.id}</p>
                    <p><strong>Kategori:</strong> {selectedApplication.category}</p>
                    <p><strong>Başvuru Tarihi:</strong> {new Date(selectedApplication.submitDate).toLocaleString('tr-TR')}</p>
                    <p>
                      <strong>Durum:</strong> 
                      <span className={`badge ${getStatusBadgeClass(selectedApplication.status)} ms-2`}>
                        {selectedApplication.status}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-12">
                    <h6 className="mb-3">Eğitim Bilgileri</h6>
                    <p><strong>Okul:</strong> {selectedApplication.school}</p>
                    <p><strong>Bölüm:</strong> {selectedApplication.department}</p>
                    <p><strong>Mezuniyet Yılı:</strong> {selectedApplication.graduationYear}</p>
                    <p><strong>Bursiyer Durumu:</strong> {selectedApplication.isScholar}</p>
                    {selectedApplication.isScholar === "Evet" && (
                      <p><strong>Burs Yılı:</strong> {selectedApplication.scholarYear}</p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <h6 className="mb-3">Kategori Detayları</h6>
                    {selectedApplication.category === "Yazılım" && (
                      <div>
                        <p><strong>GitHub:</strong> <a href={selectedApplication.githubProfile} target="_blank" rel="noopener noreferrer">{selectedApplication.githubProfile}</a></p>
                        <p><strong>Programlama Dilleri:</strong></p>
                        {selectedApplication.programmingLanguages && selectedApplication.programmingLanguages.length > 0 ? (
                          <div className="d-flex flex-wrap mt-2 mb-3">
                            {selectedApplication.programmingLanguages.map((lang, index) => (
                              <span key={index} className="badge bg-primary me-2 mb-2 p-2">{lang}</span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted">Programlama dili belirtilmemiş</p>
                        )}
                      </div>
                    )}
                    
                    {selectedApplication.category === "Çevirmen" && (
                      <div>
                        <p><strong>Bildiği Diller:</strong></p>
                        {selectedApplication.languages && selectedApplication.languages.length > 0 ? (
                          <div className="d-flex flex-wrap mt-2 mb-3">
                            {selectedApplication.languages.map((lang, index) => (
                              <span key={index} className="badge bg-primary me-2 mb-2 p-2">{lang}</span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted">Dil bilgisi belirtilmemiş</p>
                        )}
                        
                        <p><strong>Çeviri Deneyimi:</strong></p>
                        <p>{selectedApplication.translationExperience || "Belirtilmemiş"}</p>
                      </div>
                    )}
                    
                    {selectedApplication.category === "Tasarımcı" && (
                      <div>
                        <p><strong>Tasarım Araçları:</strong> {selectedApplication.designTools}</p>
                        <p><strong>Portfolyo:</strong> {selectedApplication.portfolioLink ? (
                          <a href={selectedApplication.portfolioLink} target="_blank" rel="noopener noreferrer">{selectedApplication.portfolioLink}</a>
                        ) : "Belirtilmemiş"}</p>
                        
                        <p><strong>Tasarım Deneyimi:</strong></p>
                        <p>{selectedApplication.designExperience || "Belirtilmemiş"}</p>
                      </div>
                    )}
                    
                    {selectedApplication.category === "Canlı Destek" && (
                      <div>
                        <p><strong>Bildiği Diller:</strong></p>
                        {selectedApplication.languages && selectedApplication.languages.length > 0 ? (
                          <div className="d-flex flex-wrap mt-2 mb-3">
                            {selectedApplication.languages.map((lang, index) => (
                              <span key={index} className="badge bg-primary me-2 mb-2 p-2">{lang}</span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted">Dil bilgisi belirtilmemiş</p>
                        )}
                        
                        <p><strong>Müşteri Hizmetleri Deneyimi:</strong></p>
                        <p>{selectedApplication.customerServiceExperience || "Belirtilmemiş"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedApplication.status === "Beklemede" && (
                  <>
                    <button 
                      className="btn btn-success me-2"
                      onClick={() => updateApplicationStatus(selectedApplication.id, "Kabul Edildi")}
                    >
                      <i className="fa-solid fa-check me-1"></i> Kabul Et
                    </button>
                    <button 
                      className="btn btn-danger me-2"
                      onClick={() => updateApplicationStatus(selectedApplication.id, "Reddedildi")}
                    >
                      <i className="fa-solid fa-times me-1"></i> Reddet
                    </button>
                  </>
                )}
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Kapat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;