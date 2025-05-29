import React from 'react';

const AdminSidebar = () => {
  return (
    <>
      <button
        className="btn btn-link d-md-none position-fixed top-0 start-0 m-2 p-1 shadow-none mobile-sidebar-toggle"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebar"
        aria-controls="adminSidebar"
        aria-label="Navigasyonu aç/kapat"
      >
        <i className="fas fa-bars fa-lg text-secondary"></i>
      </button>

      <div
        className="offcanvas-md offcanvas-start admin-sidebar-fixed bg-light border-end d-flex flex-column p-0"
        tabIndex="-1"
        id="adminSidebar"
        aria-labelledby="adminSidebarLabel"
      >
        <div className="offcanvas-header d-md-none pt-3 px-3 pb-2">
          <h5 className="offcanvas-title" id="adminSidebarLabel">
            Admin Paneli
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#adminSidebar"
            aria-label="Kapat"
          ></button>
        </div>

        <div className="flex-grow-1 p-3 sidebar-content-scrollable">
          <h4 className='mb-4 d-none d-md-block'>Admin Paneli</h4>
          <ul className='nav flex-column'>
            <li className='nav-item mb-2'>
              <a className='nav-link active p-2 rounded-3 bg-primary text-white' aria-current='page' href='#'>
                <i className="fas fa-tachometer-alt me-2"></i>
                Dashboard
              </a>
            </li>
            <li className='nav-item mb-2'>
              <a className='nav-link p-2 rounded-3 text-dark' href='#'>
                <i className="fas fa-file-alt me-2"></i>
                Siparişler
              </a>
            </li>
            <li className='nav-item mb-2'>
              <a className='nav-link p-2 rounded-3 text-dark' href='#'>
                <i className="fas fa-box me-2"></i>
                Ürünler
              </a>
            </li>
            <li className='nav-item mb-2'>
              <a className='nav-link p-2 rounded-3 text-dark' href='#'>
                <i className="fas fa-users me-2"></i>
                Müşteriler
              </a>
            </li>
            <li className='nav-item mb-2'>
              <a className='nav-link p-2 rounded-3 text-dark' href='#'>
                <i className="fas fa-chart-bar me-2"></i>
                Raporlar
              </a>
            </li>
          </ul>
        </div>

        <div className="p-3 border-top sidebar-user-profile">
          <div className="dropup">
            <a href="#" className="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://placehold.co/32x32/E0E0E0/B0B0B0?text=User" alt="Kullanıcı" width="32" height="32" className="rounded-circle me-2" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/32x32/E0E0E0/B0B0B0?text=U'; }} />
              <strong>Admin Kullanıcısı</strong>
            </a>
            <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
              <li><a className="dropdown-item" href="#">Yeni proje...</a></li>
              <li><a className="dropdown-item" href="#">Ayarlar</a></li>
              <li><a className="dropdown-item" href="#">Profil</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Çıkış yap</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className='main-content-area p-md-4 p-3'>
        <div className='container-fluid p-0'>
          <div className='row m-0'>
            <div className='col-12'>
              <h2>Ana İçerik Alanı</h2>
              <p>
                Bu, ana uygulama içeriğinizin yer alacağı alandır. Burayı kendi bileşenleriniz ve verilerinizle değiştirebilirsiniz.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vero est vitae ab asperiores dolores nam laborum officiis. Quaerat tempore cum corrupti magni ullam blanditiis placeat! Deserunt unde laborum aut.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolores quod sit magni expedita assumenda porro. Debitis quia fuga, sequi modi, quaerat ab velit cum molestias sunt, aliquam vero voluptatem?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad vero est vitae ab asperiores dolores nam laborum officiis. Quaerat tempore cum corrupti magni ullam blanditiis placeat! Deserunt unde laborum aut.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, dolores quod sit magni expedita assumenda porro. Debitis quia fuga, sequi modi, quaerat ab velit cum molestias sunt, aliquam vero voluptatem?
              </p>
              <div className="card mt-4 rounded-3 shadow-sm">
                <div className="card-header py-3 rounded-top-3">
                  <h5 className="my-0 fw-normal">Örnek Kart</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Bu, bir kart içindeki örnek içeriktir. Kullanıcı arayüzünüzü oluşturmak için bunun gibi Bootstrap bileşenlerini kullanabilirsiniz.</p>
                  <button type="button" className="btn btn-primary rounded-pill">Birincil düğme</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
