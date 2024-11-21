import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import userDefaultImage from '../../../assets/images/empleado.jpg'; // Asegúrate de tener una imagen por defecto


const ClientesLista = ({ clientes }) => {
    return (
        <div className="container">
            {/* Breadcrumb */}
            <div className="row gx-3">
                <div className="col-12 col-xl-6">
                    <ol className="breadcrumb mb-3">
                        <li className="breadcrumb-item">
                            <FiHome className="lh-1" />
                            <Link to="/app/home" className="text-decoration-none">Inicio</Link>
                        </li>
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
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <img
                                                            src={cliente.imagen || userDefaultImage}
                                                            className="me-2 img-3x rounded-3"
                                                            alt={`${cliente.primernombre} ${cliente.primerapellido}`}
                                                        />
                                                        {`${cliente.primernombre} ${cliente.primerapellido}`}
                                                    </td>
                                                    <td>{cliente.identidad}</td>
                                                    <td>{cliente.rtn}</td>
                                                    <td>{cliente.correo}</td>
                                                    <td>{cliente.telefono}</td>
                                                    <td>
                                                        <div className="text-truncate" style={{ maxWidth: "150px" }}>
                                                            {cliente.direccion}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm me-2"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip-primary"
                                                            data-bs-title="Editar"
                                                        >
                                                            <FiEdit />
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            data-bs-toggle="tooltip"
                                                            data-bs-placement="top"
                                                            data-bs-custom-class="custom-tooltip-danger"
                                                            data-bs-title="Eliminar"
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
    );
};

export default ClientesLista;