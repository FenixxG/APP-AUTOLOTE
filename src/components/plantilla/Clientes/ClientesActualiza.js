import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { AxiosImagen } from '../../axios/Axios';
import { ClienteImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';

const ClientesActualiza = ({ cliente, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('datos');
    const [formData, setFormData] = useState({
        ...cliente,
        telefonos: cliente?.clientetelefonos || [],
        direcciones: cliente?.clientedireccions || []
    });

    // Agregar manejadores para teléfonos y direcciones
    const handleChangeTelefonos = (index, value) => {
        const newTelefonos = [...formData.telefonos];
        newTelefonos[index] = { ...newTelefonos[index], telefono: value };
        setFormData({ ...formData, telefonos: newTelefonos });
    };

    const handleChangeDirecciones = (index, value) => {
        const newDirecciones = [...formData.direcciones];
        newDirecciones[index] = { ...newDirecciones[index], direccion: value };
        setFormData({ ...formData, direcciones: newDirecciones });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    const handleImageUpload = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('id', cliente.id);

            const response = await AxiosImagen.post(ClienteImagen, formData);

            if (response.data.success) {
                // Actualizar el estado local con la nueva imagen
                setFormData(prev => ({
                    ...prev,
                    imagen: response.data.nombreArchivo
                }));

                // Mostrar mensaje de éxito
                mostrarAlerta('Imagen actualizada con éxito', 'success');
            }
        } catch (error) {
            console.log('Error al subir la imagen:', error);
            mostrarAlerta('Error al subir la imagen', 'error');
        }
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
                                                            <Dropzone
                                                                onDrop={handleImageUpload}
                                                                accept={{
                                                                    'image/*': ['.jpeg', '.jpg', '.png']
                                                                }}
                                                                maxFiles={1}
                                                            >
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
                                                                    <label className="form-label">Primer Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="primerapellido"
                                                                        value={formData.primerapellido || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                {/*<div className="mb-3">
                                                                    <label className="form-label">Nombre de Usuario</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="nombre"
                                                                        value={formData.nombre || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                <input
                                                                    type="hidden"
                                                                    name="tipoUsuario"
                                                                    value={TIPO_USUARIO}
                                                                />*/}
                                                            </div>
                                                            <div className="col-6">
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
                                                                    <label className="form-label">Segundo Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="segundoapellido"
                                                                        value={formData.segundoapellido || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                </div>
                                                                {/*<div className="mb-3">
                                                                    <label className="form-label">Contraseña</label>
                                                                    <input
                                                                        type={showPassword ? "text" : "password"}
                                                                        className="form-control"
                                                                        name="contrasena"
                                                                        value={formData.contrasena || ''}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <div className="password-toggle" onClick={togglePasswordVisibility}>
                                                                        {showPassword ?
                                                                            <AiOutlineEyeInvisible className="registro-input-icon" /> :
                                                                            <AiOutlineEye className="registro-input-icon" />
                                                                        }
                                                                    </div>
                                                                </div>*/}
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
                                                                        onChange={(e) => handleChangeTelefonos(index, e.target.value)}
                                                                    />
                                                                </div>
                                                            ))
                                                            : 'No disponible'}
                                                    </div>

                                                    {/* Direcciones */}
                                                    <div className="col-12">
                                                        <label className="form-label">Direcciones</label>
                                                        {direcciones.length > 0
                                                            ? direcciones.map((dir, index) => (
                                                                <div key={index} className="mb-2 d-flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        value={dir.direccion || ''}
                                                                        onChange={(e) => handleChangeDirecciones(index, e.target.value)}
                                                                    />
                                                                </div>
                                                            ))
                                                            : 'No disponible'}
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