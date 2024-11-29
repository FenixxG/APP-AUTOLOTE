import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';

const ClientesActualiza = ({ cliente, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('datos');
    const [formData, setFormData] = useState(cliente);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const telefonos = cliente?.clientetelefonos || [];
    const direcciones = cliente?.clientedireccions || [];

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
                                <Link to="/app/clientes" className="text-decoration-none">Clientes</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Actualizar Cliente</li>
                        </ol>
                    </div>
                </div>

                {/* Formulario */}
                <div className="row gx-3">
                    <div className="col-xxl-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="custom-tabs-container">
                                        <ul className="nav nav-tabs" id="customTab2" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === 'datos' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('datos')}
                                                    type="button"
                                                >
                                                    Datos Generales
                                                </button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button
                                                    className={`nav-link ${activeTab === 'contacto' ? 'active' : ''}`}
                                                    onClick={() => setActiveTab('contacto')}
                                                    type="button"
                                                >
                                                    Información de Contacto
                                                </button>
                                            </li>
                                        </ul>

                                        <div className="tab-content">
                                            {/* Primera pestaña: Datos Generales */}
                                            <div className={`tab-pane fade ${activeTab === 'datos' ? 'show active' : ''}`}>
                                                <div className="row gx-3">
                                                    <div className="col-sm-4 col-12">
                                                        <div id="update-profile" className="mb-3">
                                                            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                                                                {({ getRootProps, getInputProps }) => (
                                                                    <div {...getRootProps()} className="dropzone sm needsclick dz-clickable">
                                                                        <input {...getInputProps()} />
                                                                        <div className="dz-message needsclick">
                                                                            {cliente.imagen ? (
                                                                                <img
                                                                                    src={`${process.env.REACT_APP_API_URL}/imagenes/clientes/${cliente.imagen}`}
                                                                                    alt="Perfil"
                                                                                    className="img-fluid"
                                                                                />
                                                                            ) : (
                                                                                <button type="button" className="dz-button">
                                                                                    Actualizar Imagen
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-12">
                                                        <div className="row gx-3">
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Identidad</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="identidad"
                                                                        value={formData.identidad || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">RTN</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="rtn"
                                                                        value={formData.rtn || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Primer Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="primernombre"
                                                                        value={formData.primernombre || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Segundo Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="segundonombre"
                                                                        value={formData.segundonombre || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Primer Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="primerapellido"
                                                                        value={formData.primerapellido || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Segundo Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="segundoapellido"
                                                                        value={formData.segundoapellido || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Segunda pestaña: Información de Contacto */}
                                            <div className={`tab-pane fade ${activeTab === 'contacto' ? 'show active' : ''}`}>
                                                <div className="row g-3 mt-3">
                                                    <div className="col-12">
                                                        <label className="form-label">Correo Electrónico</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            name="correo"
                                                            value={formData.correo || ''}
                                                            onChange={handleChange}
                                                        />
                                                    </div>

                                                    {/* Teléfonos */}
                                                    <div className="col-12">
                                                        <label className="form-label">Teléfonos</label>
                                                        {telefonos.length > 0
                                                            ? telefonos.map((tel, index) => (
                                                                <div key={index} className="mb-2 d-flex gap-2">
                                                                    <input
                                                                        type="tel"
                                                                        className="form-control"
                                                                        value={tel.telefono || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            ))
                                                            : 'No disponible'}
                                                    </div>

                                                    {/* Direcciones */}
                                                    <div className="col-12">
                                                        <label className="form-label">Direcciones</label>
                                                        {direcciones.length > 0 ? (
                                                            direcciones.map((dir, index) => (
                                                                <div key={index} className="mb-2 d-flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={dir.direccion || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>No hay direcciones registradas</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="d-flex gap-2 justify-content-end mt-3">
                                            <Link to="/app/clientes" className="btn btn-outline-secondary">
                                                Cancelar
                                            </Link>
                                            <button type="submit" className="btn btn-primary">
                                                Actualizar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientesActualiza;