import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const userDefaultImage = 'https://placehold.co/400';


const ClientesLista = ({ clientes }) => {
    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/clientes/';
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
                            <li className="breadcrumb-item">Clientes</li>
                        </ol>
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
                                                    <th>Identidad</th>
                                                    <th>RTN</th>
                                                    <th>Correo</th>
                                                    <th>Teléfono</th>
                                                    <th>Dirección</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {clientes && clientes.map((cliente, index) => (
                                                    <tr key={cliente.id}>
                                                        <td>{cliente.id}</td>
                                                        <td>
                                                            <img
                                                                src={cliente.imagen
                                                                    ? `${API_IMAGE_URL}${cliente.imagen}`
                                                                    : userDefaultImage}
                                                                className="me-2 img-3x rounded-3"
                                                                alt={`${cliente.primernombre} ${cliente.primerapellido}`}
                                                                onError={(e) => {
                                                                    console.log('URL de la imagen:', e.target.src);
                                                                    console.log('Error específico:', e.target.error);
                                                                    e.target.onerror = null;
                                                                    e.target.src = userDefaultImage;
                                                                }}
                                                            />
                                                            {`${cliente.nombreCompleto}`}
                                                        </td>
                                                        <td>{cliente.identidad}</td>
                                                        <td>{cliente.rtn}</td>
                                                        <td>{cliente.correo}</td>
                                                        <td>
                                                            {cliente.clientetelefonos && cliente.clientetelefonos.length > 0
                                                                ? cliente.clientetelefonos.map((tel, index) => (
                                                                    <div key={index}>
                                                                        {tel.telefono}
                                                                        {index < cliente.clientetelefonos.length - 1 && <hr className="my-1" />}
                                                                    </div>
                                                                ))
                                                                : 'No disponible'}
                                                        </td>
                                                        <td>
                                                            <div className="text-truncate" style={{ maxWidth: "150px" }}>
                                                                {cliente.clientedireccions && cliente.clientedireccions.length > 0
                                                                    ? (
                                                                        <div className="position-relative"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            title={cliente.clientedireccions.map(dir => dir.direccion).join('\n')}>
                                                                            {cliente.clientedireccions.map((dir, index) => (
                                                                                <div key={index}>
                                                                                    {dir.direccion}
                                                                                    {index < cliente.clientedireccions.length - 1 && <hr className="my-1" />}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )
                                                                    : 'No disponible'}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-custom-class="custom-tooltip-primary"
                                                                data-bs-title="Editar"
                                                                onClick={() => navigate(`/app/clientes/editar/${cliente.id}`)}
                                                            >
                                                                <FiEdit />
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-custom-class="custom-tooltip-danger"
                                                                data-bs-title="Eliminar"
                                                                onClick={() => navigate(`/app/clientes/eliminar/${cliente.id}`)}
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

export default ClientesLista;