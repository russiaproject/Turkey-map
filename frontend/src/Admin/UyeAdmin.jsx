import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const API_URL = 'http://localhost:8080/api'

const IsbirligiAdmin = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  
  const fetchApplications = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        console.error('Token bulunamadı')
        return
      }
      
      const response = await axios.get(
        `${API_URL}/admin/partnership-applications?status=${filter}`, 
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      )
      
      setApplications(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Başvurular alınamadı:', error)
      toast.error('Başvurular yüklenirken bir hata oluştu')
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchApplications()
  }, [filter])
  
  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken')
      
      await axios.put(
        `${API_URL}/admin/partnership-application/${id}`,
        { status },
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      )
      
      // Başarılı işlem bildirimi
      if (status === 'approved') {
        toast.success('Başvuru onaylandı')
      } else if (status === 'rejected') {
        toast.info('Başvuru reddedildi')
      }
      
      // Listeyi güncelle
      fetchApplications()
    } catch (error) {
      console.error('İşlem başarısız:', error)
      toast.error('İşlem sırasında bir hata oluştu')
    }
  }
  
  const handleDelete = async (id) => {
    if (!window.confirm('Bu başvuruyu silmek istediğinizden emin misiniz?')) {
      return
    }
    
    try {
      const token = localStorage.getItem('adminToken')
      
      await axios.delete(
        `${API_URL}/admin/partnership-application/${id}`,
        {
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        }
      )
      
      toast.success('Başvuru silindi')
      
      // Listeyi güncelle
      fetchApplications()
    } catch (error) {
      console.error('Silme işlemi başarısız:', error)
      toast.error('Silme işlemi sırasında bir hata oluştu')
    }
  }
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Beklemede</span>
      case 'approved':
        return <span className="badge bg-success">Onaylandı</span>
      case 'rejected':
        return <span className="badge bg-danger">Reddedildi</span>
      default:
        return <span className="badge bg-secondary">Bilinmiyor</span>
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('tr-TR')
  }

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>İşbirliği Başvuruları</h2>
        <div className="btn-group">
          <button 
            className={`btn ${filter === 'pending' ? 'btn-warning' : 'btn-outline-warning'}`}
            onClick={() => setFilter('pending')}
          >
            Bekleyenler
          </button>
          <button 
            className={`btn ${filter === 'approved' ? 'btn-success' : 'btn-outline-success'}`}
            onClick={() => setFilter('approved')}
          >
            Onaylananlar
          </button>
          <button 
            className={`btn ${filter === 'rejected' ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={() => setFilter('rejected')}
          >
            Reddedilenler
          </button>
          <button 
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setFilter('all')}
          >
            Tümü
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-2">Başvurular yükleniyor...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="alert alert-info">
          {filter === 'all' 
            ? 'Hiç başvuru bulunmuyor.' 
            : `${filter === 'pending' ? 'Bekleyen' : filter === 'approved' ? 'Onaylanan' : 'Reddedilen'} başvuru bulunmuyor.`}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ad Soyad</th>
                <th>İşletme</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Durum</th>
                <th>Tarih</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.ID}>
                  <td>{app.ID}</td>
                  <td>{app.isim} {app.soyisim}</td>
                  <td>{app.isletme}</td>
                  <td>
                    <a href={`mailto:${app.email}`}>
                      {app.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${app.telefon}`}>
                      {app.telefon}
                    </a>
                  </td>
                  <td>{getStatusBadge(app.status)}</td>
                  <td>{formatDate(app.CreatedAt)}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      {app.status !== 'approved' && (
                        <button 
                          className="btn btn-success"
                          onClick={() => handleStatusChange(app.ID, 'approved')}
                          title="Onayla"
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      
                      {app.status !== 'rejected' && (
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleStatusChange(app.ID, 'rejected')}
                          title="Reddet"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      )}
                      
                      <button 
                        className="btn btn-dark"
                        onClick={() => handleDelete(app.ID)}
                        title="Sil"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default IsbirligiAdmin