import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthToken = () => localStorage.getItem('adminToken');
const setAuthToken = (token) => localStorage.setItem('adminToken', token);
const removeAuthToken = () => localStorage.removeItem('adminToken');

const ApplicationEvents = {
  ApplicationCreated: "rusevi-application-created",
  ApplicationUpdated: "rusevi-application-updated",
  
  dispatchEvent: (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }
};

/**
 * Admin girişi
 * @param {Object} credentials - Giriş bilgileri
 * @returns {Object} Token ile admin verisi
 */
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    if (response.data && response.data.token) {
      setAuthToken(response.data.token);
      localStorage.setItem('adminAuthenticated', 'true');
      localStorage.setItem('adminUsername', response.data.username);
      return response.data;
    }
    
    throw new Error('Giriş başarısız');
  } catch (error) {
    console.error('Giriş hatası:', error.response?.data?.message || error.message);
    throw error;
  }
};

/**
 * Admin çıkışı
 */
export const adminLogout = () => {
  removeAuthToken();
  localStorage.removeItem('adminAuthenticated');
  localStorage.removeItem('adminUsername');
};

/**
 * Tüm başvuruları getir
 * @returns {Array} Başvuru listesi
 */
export const getAllApplications = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    };
    
    const response = await axios.get(`${API_URL}/applications`, config);
    return response.data;
  } catch (error) {
    console.error('Başvurular yüklenirken hata:', error);
    return [];
  }
};

/**
 * ID'ye göre başvuru getir
 * @param {string} id - Başvuru ID
 * @returns {Object|null} Başvuru verisi veya null
 */
export const getApplicationById = async (id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    };
    
    const response = await axios.get(`${API_URL}/applications/${id}`, config);
    return response.data;
  } catch (error) {
    console.error(`${id} ID'li başvuru yüklenirken hata:`, error);
    return null;
  }
};

/**
 * Yeni başvuru oluştur
 * @param {Object} application - Başvuru verisi
 * @returns {Object} Oluşturulan başvuru
 */
export const createApplication = async (application) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, application);
    
    if (response.data) {
      ApplicationEvents.dispatchEvent(ApplicationEvents.ApplicationCreated, response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('Başvuru oluşturulurken hata:', error);
    throw new Error('Başvuru gönderimi başarısız');
  }
};

/**
 * Başvuru durumunu güncelle
 * @param {string} id - Başvuru ID
 * @param {string} status - Yeni durum
 * @returns {Object|null} Güncellenmiş başvuru veya null
 */
export const updateApplicationStatus = async (id, status) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    };
    
    const response = await axios.patch(
      `${API_URL}/applications/${id}/status`, 
      { status }, 
      config
    );
    
    if (response.data) {
      ApplicationEvents.dispatchEvent(ApplicationEvents.ApplicationUpdated, response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error(`${id} ID'li başvuru güncellenirken hata:`, error);
    return null;
  }
};

/**
 * Başvuruları filtrele
 * @param {Object} filters - Filtre kriterleri
 * @returns {Array} Filtrelenmiş başvurular
 */
export const filterApplications = async (filters = {}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      },
      params: {}
    };
    
    if (filters.status && filters.status !== 'all') {
      config.params.status = filters.status;
    }
    
    if (filters.searchQuery) {
      config.params.searchQuery = filters.searchQuery;
    }
    
    if (filters.category) {
      config.params.category = filters.category;
    }
    
    const response = await axios.get(`${API_URL}/applications/filter`, config);
    return response.data;
  } catch (error) {
    console.error('Başvurular filtrelenirken hata:', error);
    return [];
  }
};

/**
 * Başvuru istatistiklerini getir
 * @returns {Object} Başvuru istatistikleri
 */
export const getApplicationStats = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    };
    
    const response = await axios.get(`${API_URL}/applications/stats`, config);
    return response.data;
  } catch (error) {
    console.error('Başvuru istatistikleri alınırken hata:', error);
    return {
      total: 0,
      pending: 0,
      accepted: 0,
      rejected: 0,
      byCategory: {}
    };
  }
};

/**
 * Başvuruları JSON olarak dışa aktar
 * @returns {string} JSON dizesi
 */
export const exportApplicationsAsJson = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`
      }
    };
    
    const response = await axios.get(`${API_URL}/applications/export`, config);
    return JSON.stringify(response.data, null, 2);
  } catch (error) {
    console.error('Başvurular dışa aktarılırken hata:', error);
    throw new Error('Dışa aktarma başarısız');
  }
};

export default {
  adminLogin,
  adminLogout,
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  filterApplications,
  getApplicationStats,
  exportApplicationsAsJson,
  ApplicationEvents
};