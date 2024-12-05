import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// Component
import Navbar from './Navbar';
//import OffCanvasMenu from './OffcanvasMenu';
import LogoDark from '../../../assets/images/logo-dark.png';
import LogoLight from '../../../assets/images/logo-light.png';

// SCSS
import '../../../styles/Header/style.scss';

// Funcion para hacer el header sticky
const useHeaderSticky = () => {
    const [isSticky, setSticky] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 125) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    useEffect(() => {
        // Evento Scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar el evento scroll
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Array vacio para que se ejecute solo una vez

    return [isSticky];
};

const Header = (props) => {
    const [isSticky] = useHeaderSticky();

    return (
        <>
            <header
                className={`site-header header-default ${isSticky ? 'header-sticky' : ''
                    } ${props.className || ''}`}
            >
                <div className="header-wrapper">
                    <div className={`${props.containerSize || 'container-fluid'}`}>
                        <div className="header-inner">
                            <div className="site-logo">
                                <NavLink className="logo-link" to="/">
                                    {props?.siteLogo ? <img className="img-fluid desktop-logo" src={props.siteLogo} alt="logo" /> : <img className="img-fluid desktop-logo" src={LogoDark} alt="logo" />}
                                    {props?.mobileLogo ? <img className="img-fluid mobile-logo" src={props.mobileLogo} alt="logo" /> : <img className="img-fluid mobile-logo" src={LogoLight} alt="logo" />}
                                </NavLink>
                            </div>
                            <div className="menu-links">
                                <div className="main-menu d-none d-lg-block">
                                    <Navbar />
                                </div>
                                <div className="header-action">
                                    <div className="header-button d-none d-lg-block">
                                        <NavLink className="button flat" to="/add-car">Cerrar sesión</NavLink>
                                    </div>
                                    {/* <div className="mobile-menu-btn d-lg-none">
                                        <OffCanvasMenu position="end" />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
