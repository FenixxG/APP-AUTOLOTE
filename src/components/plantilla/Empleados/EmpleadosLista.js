import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiEdit, FiTrash2 } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const userDefaultImage = 'https://placehold.co/400';


const EmpleadosLista = ({ empleados, cargos }) => {
    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/empleados/';
    const navigate = useNavigate();

    const obtenerNombreCargo = (cargoId) => {
        const cargo = cargos.find(c => c.id === cargoId);
        return cargo ? cargo.nombre : 'No asignado';
    };

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
                            <li className="breadcrumb-item">Empleados</li>
                        </ol>
                    </div>
                </div>

                {/* Botón Nuevo Empleado */}
                <div className="row mb-3">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" type="button" onClick={() => navigate(`/app/empleados/guardar`)}>
                            <b>Nuevo Empleado</b>
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
                                                    <th>Identidad</th>
                                                    <th>RTN</th>
                                                    <th>Sueldo</th>
                                                    <th>Estado</th>
                                                    <th>Cargo</th>
                                                    <th>Correo</th>
                                                    <th>Teléfono</th>
                                                    <th>Dirección</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {empleados && empleados.map((empleado, index) => (
                                                    <tr key={empleado.id}>
                                                        <td>{empleado.id}</td>
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
                                                        <td>{empleado.identidad}</td>
                                                        <td>{empleado.rtn}</td>
                                                        <td>{empleado.sueldo}</td>
                                                        <td>{empleado.estado}</td>
                                                        <td>{obtenerNombreCargo(empleado.cargoId)}</td>
                                                        <td>{empleado.correo}</td>
                                                        <td>
                                                            {empleado.empleadotelefonos && empleado.empleadotelefonos.length > 0
                                                                ? empleado.empleadotelefonos.map((tel, index) => (
                                                                    <div key={index}>
                                                                        {tel.telefono}
                                                                        {index < empleado.empleadotelefonos.length - 1 && <hr className="my-1" />}
                                                                    </div>
                                                                ))
                                                                : 'No disponible'}
                                                        </td>
                                                        <td>
                                                            <div className="text-truncate" style={{ maxWidth: "350px" }}>
                                                                {empleado.empleadodireccions && empleado.empleadodireccions.length > 0
                                                                    ? (
                                                                        <div className="position-relative"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            title={empleado.empleadodireccions.map(dir => dir.direccion).join('\n')}>
                                                                            {empleado.empleadodireccions.map((dir, index) => (
                                                                                <div key={index}>
                                                                                    {dir.direccion}
                                                                                    {index < empleado.empleadodireccions.length - 1 && <hr className="my-1" />}
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
                                                                onClick={() => navigate(`/app/empleados/editar/${empleado.id}`)}
                                                            >
                                                                <FiEdit />
                                                            </button>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                data-bs-toggle="tooltip"
                                                                data-bs-placement="top"
                                                                data-bs-custom-class="custom-tooltip-danger"
                                                                data-bs-title="Eliminar"
                                                                onClick={() => navigate(`/app/empleados/eliminar/${empleado.id}`)}
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

export default EmpleadosLista;