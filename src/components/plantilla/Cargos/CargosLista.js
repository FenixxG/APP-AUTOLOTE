import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const CargosLista = ({ cargos, eliminarCargo }) => {
    const navigate = useNavigate();

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
                            <li className="breadcrumb-item">Cargos</li>
                        </ol>
                    </div>
                </div>

                {/* Botón Nuevo Cargo */}
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={() => navigate(`/app/cargos/guardar`)}>
                            <b>Nuevo Cargo</b>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="row gx-3">
                    <div className="col-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="table-outer">
                                    <div className="table-responsive">
                                        <table className="table table-striped align-middle m-0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Nombre</th>
                                                    <th>Descripcion</th>
                                                    <th>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cargos && cargos.map((cargo, index) => (
                                                    <tr key={cargo.id}>
                                                        <td>{cargo.id}</td>
                                                        <td>{cargo.nombre}</td>
                                                        <td>{cargo.descripcion}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <i className={`icon-circle1 me-2 fs-5 ${cargo.activo ? 'text-success' : 'text-danger'}`}></i>
                                                                <span>{cargo.activo ? 'Activo' : 'Inactivo'}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                                onClick={() => navigate(`/app/cargos/editar/${cargo.id}`)}
                                                            >
                                                                <FiEdit />
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => eliminarCargo(cargo.id)}
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default CargosLista;