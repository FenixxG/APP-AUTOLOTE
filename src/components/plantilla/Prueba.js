import React from 'react';

function Prueba() {
  return (
    <div className="page-wrapper">
      <div className="app-container">
        {/* App header starts */}
        <div className="app-header d-flex align-items-center">
          <div className="container">
            <div className="row gx-3">
              <div className="col-md-3 col-2">
                <div className="app-brand">
                  <a href="index.html" className="d-lg-block d-none">
                    <img src="assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
                  </a>
                  <a href="index.html" className="d-lg-none d-md-block">
                    <img src="assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
                  </a>
                </div>
              </div>

              <div className="col-md-9 col-10">
                <div className="header-actions col">
                  <div className="search-container d-none d-lg-block">
                    <input type="text" id="search" className="form-control" placeholder="Search" />
                    <i className="icon-search"></i>
                  </div>

                  {/* Notifications dropdown */}
                  <div className="d-sm-flex d-none align-items-center gap-2">
                    <div className="dropdown">
                      <a className="dropdown-toggle header-action-icon" href="#!" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i className="icon-warning fs-4 lh-1 text-white"></i>
                        <span className="count">7</span>
                      </a>
                      {/* Dropdown menu content */}
                    </div>
                    
                    {/* Messages dropdown */}
                    <div className="dropdown">
                      {/* Similar structure to notifications dropdown */}
                    </div>
                  </div>

                  {/* User settings dropdown */}
                  <div className="dropdown ms-3">
                    <a id="userSettings" className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none"
                      href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src="assets/images/user2.png" className="rounded-2 img-3x" alt="Bootstrap Gallery" />
                      <div className="ms-2 text-truncate d-lg-block d-none text-white">
                        <span className="d-flex opacity-50 small">Admin</span>
                        <span>Taylor Franklin</span>
                      </div>
                    </a>
                    {/* Dropdown menu content */}
                  </div>

                  {/* Mobile menu toggle */}
                  <button className="btn btn-warning btn-sm ms-3 d-lg-none d-md-block" type="button"
                    data-bs-toggle="offcanvas" data-bs-target="#MobileMenu">
                    <i className="icon-menu"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App navbar */}
        <nav className="navbar navbar-expand-lg">
          {/* Navbar content */}
        </nav>

        {/* App body */}
        <div className="app-body">
          <div className="container">
            {/* Content sections */}
          </div>
        </div>

        {/* App footer */}
        <div className="app-footer">
          <div className="container">
            <span>© Bootstrap Gallery 2024</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Prueba;
