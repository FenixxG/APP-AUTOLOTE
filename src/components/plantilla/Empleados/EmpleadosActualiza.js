import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { mostrarAlertaOk, mostrarAlertaError } from '../../../components/alertas/sweetAlert';
import { AxiosImagen } from '../../../components/axios/Axios';
import { EmpleadoImagen, EmpleadoActualizarImagen } from '../../../configuracion/apiUrls';
const userDefaultImage = 'https://placehold.co/400';

const EmpleadosActualiza = ({ empleado, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('datos');
    const [formData, setFormData] = useState({
        identidad: '',
        rtn: '',
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        sueldo: 0,
        estado: 'AC',
        imagen: null,
        correo: '',
        empleadotelefonos: [{ telefono: '' }],
        empleadodireccions: [{ direccion: '' }]
    });
    console.log(formData);

    // Actualizar el formData cuando se reciban los datos del empleado
    useEffect(() => {
        if (empleado) {
            setFormData({
                identidad: empleado.identidad || '',
                rtn: empleado.rtn || '',
                primernombre: empleado.primernombre || '',
                segundonombre: empleado.segundonombre || '',
                primerapellido: empleado.primerapellido || '',
                segundoapellido: empleado.segundoapellido || '',
                sueldo: empleado.sueldo || 0,
                estado: empleado.estado || 'AC',
                imagen: empleado ? empleado.imagen : 'empleado.png',
                correo: empleado.correo || '',
                // Implementar la lógica condicional para teléfonos
                empleadotelefonos: empleado.empleadotelefonos
                    ? empleado.empleadotelefonos
                    : [{ telefono: '' }],
                // Implementar la lógica condicional para direcciones
                empleadodireccions: empleado.empleadodireccions
                    ? empleado.empleadodireccions
                    : [{ direccion: '' }],
            });

        }
    }, [empleado]);

    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/empleados/';
    const imagen = empleado?.imagen ? `${API_IMAGE_URL}${empleado.imagen}` : userDefaultImage;
    console.log(imagen);

    // Funciones para manejar cambios en teléfonos y direcciones
    const handleTelefonoChange = (index, value) => {
        const telefonos = [...formData.empleadotelefonos];
        telefonos[index] = { telefono: value };
        setFormData({ ...formData, empleadotelefonos: telefonos });
    };

    const addTelefono = () => {
        setFormData({
            ...formData,
            empleadotelefonos: [...formData.empleadotelefonos, { telefono: '' }]
        });
    };

    const handleDireccionChange = (index, value) => {
        const direcciones = [...formData.empleadodireccions];
        direcciones[index] = { direccion: value };
        setFormData({ ...formData, empleadodireccions: direcciones });
    };

    const addDireccion = () => {
        setFormData({
            ...formData,
            empleadodireccions: [...formData.empleadodireccions, { direccion: '' }]
        });
    };

    const handleFileChange = async event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        else {
            try {
                let formData = new FormData();
                formData.append("imagen", event.target.files[0]);
                await AxiosImagen.put(EmpleadoActualizarImagen + empleado.id,
                    formData,
                ).then((respuesta) => {
                    console.log(respuesta);
                    setFormData((prevState) => ({
                        ...prevState,
                        imagen: respuesta.data.imagen,
                    }));
                    //ActualizarLista(EmpleadosListar, setListaEmpleados);
                    mostrarAlertaOk("Imagen actualizada correctamente");
                }).catch((er) => {
                    console.log(er);
                    var msjError = "";
                    switch (er.response.status) {
                        case 400:
                            if (er.response.data.error && Array.isArray(er.response.data.error)) {
                                er.response.data.map(f => {
                                    msjError += f.msg + '. '
                                })
                            }
                            break;
                        case 400:
                            msjError = er.response.data.error;
                            break;
                        case 500:
                            msjError = er.response.data.error;
                            break;
                        default:
                            msjError = "Ocurrió un error desconocido.";
                            break;
                    }
                    mostrarAlertaError(msjError, "error");
                });
            } catch (error) {
                console.log(error);
                mostrarAlertaError("Error al actualizar la imagen");
            }
        }
    };

    const SeleccionarImagen = () => {
        console.log("Haciendo clic en SeleccionarImagen");
        if (inputRef.current) {
            inputRef.current.click();
        }

    };
    const inputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    }

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
                            <li className="breadcrumb-item">Actualizar Empleado</li>
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
                                                    {/* Cambiamos el tamaño de la columna de la imagen */}
                                                    <div className="col-sm-4 col-12">
                                                        <div id="update-profile" className="mb-3">
                                                            <div className="text-center">
                                                                <img
                                                                    src={imagen}
                                                                    className="me-2 img-fluid rounded-3"
                                                                    style={{ maxHeight: '300px', width: 'auto' }}
                                                                    alt={`${empleado.primernombre} ${empleado.primerapellido}`}
                                                                    crossOrigin="anonymous"
                                                                    onError={(e) => {
                                                                        e.target.onerror = null;
                                                                        e.target.src = userDefaultImage;
                                                                    }}
                                                                />
                                                            </div>
                                                            <input
                                                                type="file"
                                                                style={{ display: 'none' }}
                                                                ref={inputRef}
                                                                onChange={handleFileChange}
                                                            />
                                                            <div className="text-center mt-3">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-info"
                                                                    onClick={SeleccionarImagen}
                                                                >
                                                                    Actualizar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-8 col-12">
                                                        <div className="row gx-3">
                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Primer Nombre</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="primernombre"
                                                                    value={formData.primernombre}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Segundo Nombre</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="segundonombre"
                                                                    value={formData.segundonombre}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Primer Apellido</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="primerapellido"
                                                                    value={formData.primerapellido}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Segundo Apellido</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="segundoapellido"
                                                                    value={formData.segundoapellido}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Identidad</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="identidad"
                                                                    value={formData.identidad}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">RTN</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="rtn"
                                                                    value={formData.rtn}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Sueldo</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="sueldo"
                                                                    value={formData.sueldo}
                                                                    onChange={handleChange}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="col-md-6 mb-3">
                                                                <label className="form-label">Estado</label>
                                                                <select
                                                                    className="form-select"
                                                                    name="estado"
                                                                    value={formData.estado}
                                                                    onChange={handleChange}
                                                                    required
                                                                >
                                                                    <option value="AC">Activo</option>
                                                                    <option value="IN">Inactivo</option>
                                                                    <option value="BL">Bloqueado</option>
                                                                </select>
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

export default EmpleadosActualiza;