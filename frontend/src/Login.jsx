import React, { useState } from 'react'
import matrushka from "./images/matrushka.png"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLoginSuccess, isAdmin = false }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id === 'kullaniciAdi' ? 'username' : 'password']: value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        username: formData.username,
        password: formData.password
      })
      
      if (response.data && response.data.token) {
        if (isAdmin) {
          onLoginSuccess(response.data.token, response.data.username)
        } else {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('username', response.data.username)
          navigate('/')
        }
      }
    } catch (error) {
      console.error('Giriş hatası:', error)
      setError('Kullanıcı adı veya şifre hatalı')
    } finally {
      setLoading(false)
    }
  }
  
  return (
   <div className='w-100 position-relative'>
     <div className='container'>
        <div className='d-flex justify-content-center align-items-center w-100 vh-100'>
        <div className='w-50 p-5 shadow-lg rounded-4'>
                <h3 className='text-center'>{isAdmin ? 'Admin Girişi' : 'Kullanıcı Girişi'}</h3>
                
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
                      
                      <button 
                        type="button" 
                        className='btn btn-outline-dark text-center ms-3'
                        onClick={() => navigate('/')}
                      >
                        Geri Dön
                      </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div className="position-absolute bottom-0 start-25 ms-5">
            <img src={matrushka} alt="" style={{width:"15%"}}/>
    </div>
    <div className="position-absolute top-0 end-0 me-5 rotateMat">
            <img src={matrushka} alt="" style={{width:"15%"}}/>
    </div>
   </div>
  )
}

export default Login