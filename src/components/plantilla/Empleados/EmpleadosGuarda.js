import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { AxiosImagen } from '../../axios/Axios';
import { EmpleadoImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';

const EmpleadosGuarda = ({ onSave, cargos }) => {
    const [activeTab, setActiveTab] = useState('datos');
    const [formData, setFormData] = useState({
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        identidad: '',
        rtn: '',
        sueldo: '0',
        estado: 'AC',
        cargoId: '',
        nombre: '',
        contrasena: '',
        correo: '',
        imagen: null,
        empleadotelefonos: [{ telefono: '' }],
        empleadodireccions: [{ direccion: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('id', formData.id);

            const response = await AxiosImagen.post(EmpleadoImagen, formData);

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

    const handleTelefonoChange = (index, value) => {
        const telefonos = [...formData.empleadotelefonos];
        telefonos[index] = { telefono: value };
        setFormData({ ...formData, empleadotelefonos: telefonos });
    };

    const handleDireccionChange = (index, value) => {
        const direcciones = [...formData.empleadodireccions];
        direcciones[index] = { direccion: value };
        setFormData({ ...formData, empleadodireccions: direcciones });
    };

    const addTelefono = () => {
        setFormData({
            ...formData,
            empleadotelefonos: [...formData.empleadotelefonos, { telefono: '' }]
        });
    };

    const addDireccion = () => {
        setFormData({
            ...formData,
            empleadodireccions: [...formData.empleadodireccions, { direccion: '' }]
        });
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
                                <Link to="/app/empleados" className="text-decoration-none">Empleados</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Nuevo Empleado</li>
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
                                                    <div className="col-12">
                                                        <div className="row gx-3">
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Identidad</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="identidad"
                                                                        value={formData.identidad}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={1}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Primer Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="primernombre"
                                                                        value={formData.primernombre}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={3}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Primer Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="primerapellido"
                                                                        value={formData.primerapellido}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={5}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Sueldo</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        name="sueldo"
                                                                        value={formData.sueldo}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={7}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Nombre de Usuario</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="nombre"
                                                                        value={formData.nombre}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={9}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">RTN</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="rtn"
                                                                        value={formData.rtn}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={2}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Segundo Nombre</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="segundonombre"
                                                                        value={formData.segundonombre}
                                                                        onChange={handleChange}
                                                                        tabIndex={4}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Segundo Apellido</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="segundoapellido"
                                                                        value={formData.segundoapellido}
                                                                        onChange={handleChange}
                                                                        tabIndex={6}
                                                                    />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Cargo</label>
                                                                    <select
                                                                        className="form-select"
                                                                        name="cargoId"
                                                                        value={formData.cargoId}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={8}
                                                                    >
                                                                        <option value="">Seleccione un cargo</option>
                                                                        {cargos.map(cargo => (
                                                                            <option key={cargo.id} value={cargo.id}>
                                                                                {cargo.nombre}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label className="form-label">Contraseña</label>
                                                                    <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        name="contrasena"
                                                                        value={formData.contrasena}
                                                                        onChange={handleChange}
                                                                        required
                                                                        tabIndex={10}
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
                                                            value={formData.correo}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>

                                                    {/* Teléfonos */}
                                                    <div className="col-12">
                                                        <label className="form-label">Teléfonos</label>
                                                        {formData.empleadotelefonos.map((tel, index) => (
                                                            <div key={index} className="mb-2 d-flex gap-2">
                                                                <input
                                                                    type="tel"
                                                                    className="form-control"
                                                                    value={tel.telefono}
                                                                    onChange={(e) => handleTelefonoChange(index, e.target.value)}
                                                                    placeholder="Número de teléfono"
                                                                />
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={addTelefono}
                                                        >
                                                            Agregar teléfono
                                                        </button>
                                                    </div>

                                                    {/* Direcciones */}
                                                    <div className="col-12">
                                                        <label className="form-label">Direcciones</label>
                                                        {formData.empleadodireccions.map((dir, index) => (
                                                            <div key={index} className="mb-2 d-flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={dir.direccion}
                                                                    onChange={(e) => handleDireccionChange(index, e.target.value)}
                                                                    placeholder="Dirección"
                                                                />
                                                            </div>
                                                        ))}
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={addDireccion}
                                                        >
                                                            Agregar dirección
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Botones de acción */}
                                        <div className="d-flex gap-2 justify-content-end mt-3">
                                            <Link to="/app/empleados" className="btn btn-outline-secondary">
                                                Cancelar
                                            </Link>
                                            <button type="submit" className="btn btn-primary">
                                                Guardar
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

export default EmpleadosGuarda;