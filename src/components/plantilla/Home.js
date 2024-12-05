import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { FiUsers } from 'react-icons/fi';
import { GrUserWorker } from "react-icons/gr";
import { PiMotorcycleFill } from "react-icons/pi";
import { IoCarSport } from "react-icons/io5";
import { useContextUsuario } from '../../contexto/usuario/UsuarioContext';

const Home = ({ totales }) => {
    const { usuario } = useContextUsuario();

    return (
        <div className="app-body">
            <div className="container">
                {/* Breadcrumb */}
                <div className="row gx-3">
                    <div className="col-12 col-xl-6">
                        <ol className="breadcrumb mb-3">
                            <li className="breadcrumb-item">
                                <FiHome className="lh-1" />
                                <Link to="/app/home" className="text-decoration-none">Inicio</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">
                                <Link to="/app/home" className="text-decoration-none">Dashboard</Link>
                            </li>
                        </ol>
                    </div>
                </div>

                <div className="row gx-3">
                    {/* Tarjeta de bienvenida */}
                    <div className="col-xl-6 col-sm-12 col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h3 className="mb-3">¡Bienvenido {usuario.datoPersonales.primernombre || ''} {usuario.datoPersonales.primerapellido || ''}!</h3>
                                        <p>Panel de control del sistema</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas de estadísticas */}
                    <div className="col-xl-6 col-sm-12 col-12">
                        <div className="row">
                            {/* Tarjeta de Clientes */}
                            <div className="col-sm-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="border border-primary rounded-4 icons-box md">
                                                <FiUsers />
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="m-0">{totales?.clientes || 0}</h3>
                                                <p className="m-0 text-secondary">Clientes</p>
                                            </div>
                                            <div className="ms-auto">
                                                <div id="sparkline1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Empleados */}
                            <div className="col-sm-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="border border-success rounded-4 icons-box md">
                                                <GrUserWorker />
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="m-0">{totales?.empleados || 0}</h3>
                                                <p className="m-0 text-secondary">Empleados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Carros */}
                            <div className="col-sm-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="border border-info rounded-4 icons-box md">
                                                <IoCarSport />
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="m-0">{totales?.carros || 0}</h3>
                                                <p className="m-0 text-secondary">Carros</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta de Motocicletas */}
                            <div className="col-sm-4">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="border border-info rounded-4 icons-box md">
                                                <PiMotorcycleFill />
                                            </div>
                                            <div className="ms-3">
                                                <h3 className="m-0">{totales?.motocicletas || 0}</h3>
                                                <p className="m-0 text-secondary">Motocicletas</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;