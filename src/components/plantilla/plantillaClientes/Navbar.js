import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navbar() {
    // Mobile Submenu Trigger Show after 992
    const [showLink, setShowLink] = useState(false);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 992) {
                setShowLink(true);
            } else {
                setShowLink(false);
            }
        }
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Menu Trigger Add Remove Class
    const [activeItems, setActiveItems] = useState([]);
    const toggleItem = (index) => {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter((item) => item !== index));
        } else {
            setActiveItems([...activeItems, index]);
        }
    };

    return (
        <>
            <ul className="main-navbar">
                {/* Home */}
                <li
                    key="0"
                    className={`has-dropdown ${activeItems.includes(0) ? 'menu-active' : ''}`}
                >
                    <Link to="#">
                        Home
                        {showLink ? (
                            <span onClick={() => toggleItem(0)} className="submenu-trigger">
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                        ) : (
                            <i className="fa-solid fa-angle-down"></i>
                        )}
                    </Link>
                </li>

                {/* Car Listing */}
                <li
                    key="3"
                    className={`has-dropdown ${activeItems.includes(3) ? 'menu-active' : ''
                        }`}
                >
                    <Link to="#">
                        Vehiculos{' '}
                        {showLink ? (
                            <span onClick={() => toggleItem(3)} className="submenu-trigger">
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                        ) : (
                            <i className="fa-solid fa-angle-down"></i>
                        )}
                    </Link>
                    <ul className="submenu">
                        <li key="List-1">
                            <NavLink to="/car-grid">Carros</NavLink>
                        </li>
                        <li key="List-2">
                            <NavLink to="/car-grid">Motocicletas</NavLink>
                        </li>
                    </ul>
                </li>

                {/* Car Details */}
                <li
                    key="4"
                    className={`has-dropdown ${activeItems.includes(4) ? 'menu-active' : ''
                        }`}
                >
                    <Link to="#">
                        Car Details{' '}
                        {showLink ? (
                            <span onClick={() => toggleItem(4)} className="submenu-trigger">
                                <i className="fa-solid fa-angle-down"></i>
                            </span>
                        ) : (
                            <i className="fa-solid fa-angle-down"></i>
                        )}
                    </Link>
                    <ul className="submenu">
                        <li key="Detail-1">
                            <NavLink to="/car-details/1">Details 01</NavLink>
                        </li>
                        <li key="Detail-2">
                            <NavLink to="/car-details-02/1">Details 02</NavLink>
                        </li>
                    </ul>
                </li>

            </ul>
        </>
    );
}

export default Navbar;
