import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const userDefaultImage = 'https://placehold.co/400';


const MotocicletasLista = ({ motocicletas, eliminarMoto }) => {
    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/motocicletas/';
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
                            <li className="breadcrumb-item">Vehiculos</li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Motocicletas</li>
                        </ol>
                    </div>
                </div>

                {/* Botón Nuevo Cargo */}
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={() => navigate(`/app/vehiculos/motocicletas/guardar`)}>
                            <b>Nueva Motocicleta</b>
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
                                                    <th>Marca</th>
                                                    <th>Modelo</th>
                                                    <th>Año</th>
                                                    <th>Color</th>
                                                    <th>Precio</th>
                                                    <th>Estado</th>
                                                    <th>Disponible</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {motocicletas && motocicletas.map((motocicleta, index) => (
                                                    <tr key={motocicleta.id}>
                                                        <td>{motocicleta.id}</td>
                                                        <td>
                                                            <img
                                                                src={motocicleta.imagen
                                                                    ? `${API_IMAGE_URL}${motocicleta.imagen}`
                                                                    : userDefaultImage}
                                                                className="me-2 img-3x rounded-3"
                                                                alt={`${motocicleta.marca} ${motocicleta.modelo}`}
                                                                onError={(e) => {
                                                                    console.log('URL de la imagen:', e.target.src);
                                                                    console.log('Error específico:', e.target.error);
                                                                    e.target.onerror = null;
                                                                    e.target.src = userDefaultImage;
                                                                }}
                                                            />
                                                            {`${motocicleta.marca}`}
                                                        </td>
                                                        <td>{motocicleta.modelo}</td>
                                                        <td>{motocicleta.anio}</td>
                                                        <td>{motocicleta.color}</td>
                                                        <td>{motocicleta.precio}</td>
                                                        <td>{motocicleta.estado}</td>
                                                        <td>
                                                            <span className={`badge ${motocicleta.disponible ? 'bg-success' : 'bg-danger'}`}>
                                                                {motocicleta.disponible ? 'Sí' : 'No'}
                                                            </span>
                                                            {/*
                                                            <div className="d-flex align-items-center">
                                                                <i className={`icon-circle1 me-2 fs-5 ${carro.disponible ? 'text-success' : 'text-danger'}`}></i>
                                                                <span>{carro.disponible ? 'Sí' : 'No'}</span>
                                                            </div>*/}
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                                onClick={() => navigate(`/app/vehiculos/motocicletas/editar/${motocicleta.id}`)}
                                                            >
                                                                <FiEdit />
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => eliminarMoto(motocicleta.id)}
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

export default MotocicletasLista;