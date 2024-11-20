import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className="offcanvas offcanvas-end" id="MobileMenu">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title semibold">Navigation</h5>
                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="offcanvas">
                            <i className="icon-clear"></i>
                        </button>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Dashboard Menu */}
                        <li className="nav-item dropdown active-link">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="icon-stacked_line_chart"></i> Dashboards
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item current-page" href="index.html">Analytics</a></li>
                                <li><a className="dropdown-item" href="reports.html">Reports</a></li>
                            </ul>
                        </li>

                        {/* Apps Menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="icon-apps"></i> Apps
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="chat.html">Chat</a></li>
                                <li><a className="dropdown-item" href="calendar.html">Calendar</a></li>
                                <li><a className="dropdown-item" href="email.html">Email</a></li>
                            </ul>
                        </li>

                        {/* Pages Menu */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="icon-layers"></i> Pages
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="profile.html">Profile</a></li>
                                <li><a className="dropdown-item" href="settings.html">Settings</a></li>
                                <li><a className="dropdown-item" href="login.html">Login</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;