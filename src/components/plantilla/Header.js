import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSettings, FiMenu } from 'react-icons/fi'; // Importamos los iconos que necesitamos
import '../../styles/Main/main.css';
import imagen from '../../assets/images/empleado.jpg';

// Subcomponente AppBrand
const AppBrand = () => {
    return (
        <div className="app-brand">
            <Link to="/" className="d-lg-block d-none">
                <img src="assets/images/logo.svg" className="logo" alt="Bootstrap Gallery" />
            </Link>
            <Link to="/" className="d-lg-none d-md-block">
                <img src="assets/images/logo-sm.svg" className="logo" alt="Bootstrap Gallery" />
            </Link>
        </div>
    );
};

// Subcomponente UserSettings
const UserSettings = () => {
    return (
        <div className="dropdown ms-3">
            <a
                id="userSettings"
                className="dropdown-toggle d-flex py-2 align-items-center text-decoration-none"
                href="#!"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img src={imagen} className="rounded-2 img-3x" alt="Bootstrap Gallery" />
                <div className="ms-2 text-truncate d-lg-block d-none text-white">
                    <span className="d-flex opacity-50 small">Admin</span>
                    <span>Taylor Franklin</span>
                </div>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
                <div className="header-action-links">
                    <Link className="dropdown-item" to="/profile">
                        <FiUser className="border border-primary text-primary" />
                        Perfil
                    </Link>
                    <Link className="dropdown-item" to="/settings">
                        <FiSettings className="border border-danger text-danger" />
                        Configuración
                    </Link>
                </div>
                <div className="mx-3 mt-2 d-grid">
                    <Link to="/login" className="btn btn-outline-danger">Cerrar sesión</Link>
                </div>
            </div>
        </div>
    );
};

// Componente principal Header
const Header = () => {
    return (
        <div className="app-header d-flex align-items-center">
            <div className="container">
                <div className="row gx-3">
                    <div className="col-md-3 col-2">
                        <AppBrand />
                    </div>

                    <div className="col-md-9 col-10">
                        <div className="header-actions col">
                            {/* Botón de menú móvil */}
                            <button
                                className="btn btn-warning btn-sm ms-3 d-lg-none d-md-block"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#MobileMenu"
                            >
                                <FiMenu />
                            </button>

                            <UserSettings />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;