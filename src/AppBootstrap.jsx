const initializeAppData = () => {
  if (!localStorage.getItem('rusevi_applications')) {
    localStorage.setItem('rusevi_applications', JSON.stringify([]));
  }

  if (!localStorage.getItem('rusevi_last_application_id')) {
    localStorage.setItem('rusevi_last_application_id', '0');
  }

  console.log('Application data initialized');
};

export default initializeAppData;