import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiX } from 'react-icons/fi';
import { GrUserWorker } from "react-icons/gr";
import { GoGraph } from "react-icons/go";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <div className="offcanvas offcanvas-end" id="MobileMenu">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title semibold">Navigation</h5>
                        <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="offcanvas">
                            <FiX />
                        </button>
                    </div>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Dashboard Dropdown */}
                        <li className="nav-item dropdown active-link">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <GoGraph /> Dashboards
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item current-page" to="/home">
                                        <span>Analytics</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/reports">
                                        <span>Reports</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        {/* Clientes Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/app/clientes">
                                <FiUsers /> Clientes
                            </Link>
                        </li>

                        {/* Empleados Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/app/empleados">
                                <GrUserWorker /> Empleados
                            </Link>
                        </li>

                        {/* Cargos Link */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/app/cargos">
                                <GrUserWorker /> Cargos
                            </Link>
                        </li>

                        {/* Facturas Dropdown */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <LiaFileInvoiceDollarSolid /> Facturas
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/form-inputs">
                                        <span>Crear Factura</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/form-inputs">
                                        <span>Ver Facturas</span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;