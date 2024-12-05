import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";

const ServiciosGuarda = ({ onSave }) => {
    const [formData, setFormData] = useState({
        descripcion: '',
        costo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
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
                            <li className="breadcrumb-item">
                                <Link to="/app/servicios" className="text-decoration-none">Servicios</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Nuevo Servicio</li>
                        </ol>
                    </div>
                </div>

                {/* Formulario */}
                <div className="row gx-3">
                    <div className="col-xxl-12">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="row gx-3">
                                        <div className="col-12">
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Descripción</label>
                                                    <textarea
                                                        className="form-control"
                                                        name="descripcion"
                                                        value={formData.descripcion}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Costo</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="costo"
                                                        value={formData.costo}
                                                        onChange={handleChange}
                                                        required
                                                        tabIndex={7}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="d-flex gap-2 justify-content-end mt-3">
                                        <Link to="/app/servicios" className="btn btn-outline-secondary">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn btn-primary">
                                            Guardar
                                        </button>
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

export default ServiciosGuarda;