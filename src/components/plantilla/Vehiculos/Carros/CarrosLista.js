import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const CarrosLista = ({ carros }) => {
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
                            <li className="breadcrumb-item">Carros</li>
                        </ol>
                    </div>
                </div>

                {/* Botón Nuevo Cargo */}
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={() => navigate(`/app/carros/guardar`)}>
                            <b>Nuevo Carro</b>
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
                                                {carros && carros.map((carro, index) => (
                                                    <tr key={carro.id}>
                                                        <td>{carro.id}</td>
                                                        <td>
                                                            <img
                                                                src={empleado.imagen
                                                                    ? `${API_IMAGE_URL}${empleado.imagen}`
                                                                    : userDefaultImage}
                                                                className="me-2 img-3x rounded-3"
                                                                alt={`${empleado.primernombre} ${empleado.primerapellido}`}
                                                                onError={(e) => {
                                                                    console.log('URL de la imagen:', e.target.src);
                                                                    console.log('Error específico:', e.target.error);
                                                                    e.target.onerror = null;
                                                                    e.target.src = userDefaultImage;
                                                                }}
                                                            />
                                                            {`${empleado.nombreCompleto}`}
                                                        </td>
                                                        <td>{carro.marca}</td>
                                                        <td>{carro.modelo}</td>
                                                        <td>{carro.anio}</td>
                                                        <td>{carro.color}</td>
                                                        <td>{carro.precio}</td>
                                                        <td>{carro.estado}</td>
                                                        <td>
                                                            <span className={`badge ${carro.disponible ? 'bg-success' : 'bg-danger'}`}>
                                                                {carro.disponible ? 'Sí' : 'No'}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-custom-class="custom-tooltip-primary"
                                                                data-bs-title="Editar"
                                                                onClick={() => navigate(`/app/carros/editar/${carro.id}`)}
                                                            >
                                                                <FiEdit />
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-custom-class="custom-tooltip-danger"
                                                                data-bs-title="Eliminar"
                                                                onClick={() => navigate(`/app/carros/eliminar/${carro.id}`)}
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

export default CarrosLista;