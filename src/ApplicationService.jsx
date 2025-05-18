const APPLICATIONS_KEY = "rusevi_applications";
const LAST_APPLICATION_ID_KEY = "rusevi_last_application_id";

const ApplicationEvents = {
  ApplicationCreated: "rusevi-application-created",
  
  ApplicationUpdated: "rusevi-application-updated",
  
  dispatchEvent: (eventName, data) => {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  }
};

/**
 * Tüm başvuruları getir
 * @returns {Array} Başvuru nesnelerinin dizisi
 */
export const getAllApplications = () => {
  try {
    const applications = localStorage.getItem(APPLICATIONS_KEY);
    return applications ? JSON.parse(applications) : [];
  } catch (error) {
    console.error("Başvurular yüklenirken hata:", error);
    return [];
  }
};

/**
 * ID'ye göre başvuru getir
 * @param {number} id Başvuru ID
 * @returns {Object|null} Başvuru nesnesi veya null
 */
export const getApplicationById = (id) => {
  try {
    const applications = getAllApplications();
    return applications.find(app => app.id === id) || null;
  } catch (error) {
    console.error(`${id} ID'li başvuru yüklenirken hata:`, error);
    return null;
  }
};

/**
 * Yeni başvuru ekle
 * @param {Object} application Başvuru verisi
 * @returns {Object} Eklenen başvuru (ID ile)
 */
export const createApplication = (application) => {
  try {
    let lastId = parseInt(localStorage.getItem(LAST_APPLICATION_ID_KEY) || "0");
    lastId++;
    
    const applications = getAllApplications();
    
    const newApplication = {
      ...application,
      id: lastId,
      submitDate: new Date().toISOString(),
      status: "Beklemede"
    };
    
    applications.push(newApplication);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    localStorage.setItem(LAST_APPLICATION_ID_KEY, lastId.toString());
    
    ApplicationEvents.dispatchEvent(ApplicationEvents.ApplicationCreated, newApplication);
    
    return newApplication;
  } catch (error) {
    console.error("Başvuru eklenirken hata:", error);
    throw new Error("Başvuru kaydedilemedi");
  }
};

/**
 * Başvuru durumunu güncelle
 * @param {number} id Başvuru ID
 * @param {string} status Yeni durum
 * @returns {Object|null} Güncellenen başvuru veya null
 */
export const updateApplicationStatus = (id, status) => {
  try {
    const applications = getAllApplications();
    const index = applications.findIndex(app => app.id === id);
    
    if (index === -1) return null;
    
    applications[index] = {
      ...applications[index],
      status
    };
    
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
    
    ApplicationEvents.dispatchEvent(ApplicationEvents.ApplicationUpdated, applications[index]);
    
    return applications[index];
  } catch (error) {
    console.error(`${id} ID'li başvuru güncellenirken hata:`, error);
    return null;
  }
};

/**
 * Tüm başvuruları filtrele
 * @param {Object} filters Filtre kriterleri
 * @returns {Array} Filtrelenmiş başvurular
 */
export const filterApplications = (filters = {}) => {
  try {
    let applications = getAllApplications();
    
    if (filters.status && filters.status !== "all") {
      applications = applications.filter(app => app.status === filters.status);
    }
    
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      applications = applications.filter(app => 
        app.fullName?.toLowerCase().includes(query) ||
        app.email?.toLowerCase().includes(query) ||
        app.category?.toLowerCase().includes(query)
      );
    }
    
    if (filters.category) {
      applications = applications.filter(app => app.category === filters.category);
    }
    
    return applications;
  } catch (error) {
    console.error("Başvurular filtrelenirken hata:", error);
    return [];
  }
};

/**
 * Başvuruları JSON olarak dışa aktar
 * @returns {string}
 */
export const exportApplicationsAsJson = () => {
  const applications = getAllApplications();
  return JSON.stringify(applications, null, 2);
};

export default {
  getAllApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  filterApplications,
  exportApplicationsAsJson,
  ApplicationEvents
};