import React, { useState, useEffect } from 'react';
import { getAllApplications } from './ApplicationService';

const ApplicationStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
    byCategory: {}
  });
  
  useEffect(() => {
    const calculateStats = () => {
      const applications = getAllApplications();
      
      const pending = applications.filter(app => app.status === 'Beklemede').length;
      const accepted = applications.filter(app => app.status === 'Kabul Edildi').length;
      const rejected = applications.filter(app => app.status === 'Reddedildi').length;
      
      const byCategory = applications.reduce((acc, app) => {
        const category = app.category || 'Belirtilmemiş';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      
      setStats({
        total: applications.length,
        pending,
        accepted,
        rejected,
        byCategory
      });
    };
    
    calculateStats();
  }, []);
  
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title mb-4">Başvuru İstatistikleri</h5>
            
            <div className="row">
              <div className="col-md-3 mb-3 mb-md-0">
                <div className="card bg-light h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-primary">{stats.total}</h3>
                    <p className="text-muted mb-0">Toplam Başvuru</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3 mb-md-0">
                <div className="card bg-light h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-warning">{stats.pending}</h3>
                    <p className="text-muted mb-0">Beklemede</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3 mb-md-0">
                <div className="card bg-light h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-success">{stats.accepted}</h3>
                    <p className="text-muted mb-0">Kabul Edildi</p>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="card bg-light h-100">
                  <div className="card-body text-center">
                    <h3 className="display-4 fw-bold text-danger">{stats.rejected}</h3>
                    <p className="text-muted mb-0">Reddedildi</p>
                  </div>
                </div>
              </div>
            </div>
            
            {Object.keys(stats.byCategory).length > 0 && (
              <div className="mt-4">
                <h6 className="mb-3">Kategoriye Göre Dağılım</h6>
                <div className="progress" style={{ height: '2rem' }}>
                  {Object.entries(stats.byCategory).map(([category, count], index) => {
                    const categoryColors = {
                      'Yazılım': 'bg-primary',
                      'Çevirmen': 'bg-success',
                      'Tasarımcı': 'bg-info',
                      'Canlı Destek': 'bg-warning',
                      'Belirtilmemiş': 'bg-secondary'
                    };
                    
                    const percentage = (count / stats.total) * 100;
                    
                    return (
                      <div 
                        key={index}
                        className={`progress-bar ${categoryColors[category] || 'bg-secondary'}`} 
                        role="progressbar" 
                        style={{ width: `${percentage}%` }}
                        aria-valuenow={percentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                        title={`${category}: ${count} başvuru (${percentage.toFixed(1)}%)`}
                      >
                        {percentage > 5 && `${category} (${count})`}
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex flex-wrap mt-2">
                  {Object.entries(stats.byCategory).map(([category, count], index) => {
                    const categoryColors = {
                      'Yazılım': 'text-primary',
                      'Çevirmen': 'text-success',
                      'Tasarımcı': 'text-info',
                      'Canlı Destek': 'text-warning',
                      'Belirtilmemiş': 'text-secondary'
                    };
                    
                    return (
                      <div key={index} className="me-3 mb-1">
                        <small className={`${categoryColors[category] || 'text-secondary'} fw-bold`}>
                          {category}: {count} ({((count / stats.total) * 100).toFixed(1)}%)
                        </small>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStats;