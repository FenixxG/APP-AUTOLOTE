import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { AxiosImagen } from '../../axios/Axios';
import { ClienteImagen, ClienteActualizarImagen } from '../../../configuracion/apiUrls';
import { mostrarAlertaOk, mostrarAlertaError } from '../../../components/alertas/sweetAlert';
const userDefaultImage = 'https://placehold.co/400';

const ClientesActualiza = ({ cliente, onUpdate }) => {
    const [activeTab, setActiveTab] = useState('datos');
    const [formData, setFormData] = useState({
        identidad: '',
        rtn: '',
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        imagen: null,
        correo: '',
        clientetelefonos: [{ telefono: '' }],
        clientedireccions: [{ direccion: '' }]
    });
    console.log(formData);

    // Actualizar el formData cuando se reciban los datos del empleado
    useEffect(() => {
        if (cliente) {
            setFormData({
                identidad: cliente.identidad || '',
                rtn: cliente.rtn || '',
                primernombre: cliente.primernombre || '',
                segundonombre: cliente.segundonombre || '',
                primerapellido: cliente.primerapellido || '',
                segundoapellido: cliente.segundoapellido || '',
                imagen: cliente ? cliente.imagen : 'cliente.png',
                correo: cliente.correo || '',
                // Implementar la lógica condicional para teléfonos
                clientetelefonos: cliente.clientetelefonos
                    ? cliente.clientetelefonos
                    : [{ telefono: '' }],
                // Implementar la lógica condicional para direcciones
                clientedireccions: cliente.clientedireccions
                    ? cliente.clientedireccions
                    : [{ direccion: '' }],
            });

        }
    }, [cliente]);

    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/clientes/';
    const imagen = cliente?.imagen ? `${API_IMAGE_URL}${cliente.imagen}` : userDefaultImage;
    console.log(imagen);

    // Funciones para manejar cambios en teléfonos y direcciones
    const handleTelefonoChange = (index, value) => {
        const telefonos = [...formData.clientetelefonos];
        telefonos[index] = { telefono: value };
        setFormData({ ...formData, clientetelefonos: telefonos });
    };

    const addTelefono = () => {
        setFormData({
            ...formData,
            clientetelefonos: [...formData.clientetelefonos, { telefono: '' }]
        });
    };

    const handleDireccionChange = (index, value) => {
        const direcciones = [...formData.clientedireccions];
        direcciones[index] = { direccion: value };
        setFormData({ ...formData, clientedireccions: direcciones });
    };

    const addDireccion = () => {
        setFormData({
            ...formData,
            clientedireccions: [...formData.clientedireccions, { direccion: '' }]
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
                await AxiosImagen.put(ClienteActualizarImagen + cliente.id,
                    formData,
                ).then((respuesta) => {
                    console.log(respuesta);
                    setFormData((prevState) => ({
                        ...prevState,
                        imagen: respuesta.data.imagen,
                    }));
                    //ActualizarLista(ClientesListar, setListaClientes);
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
                                                            <div className="text-center">
                                                                <img
                                                                    src={imagen}
                                                                    className="me-2 img-fluid rounded-3"
                                                                    style={{ maxHeight: '300px', width: 'auto' }}
                                                                    alt={`${cliente.primernombre} ${cliente.primerapellido}`}
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
                                                                accept="image/*"
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
                                                            <div className="col-6">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Identidad</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="identidad"
                                                                        value={formData.identidad}
                                                                        onChange={handleChange}
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
                                                        />
                                                    </div>

                                                    {/* Teléfonos */}
                                                    <div className="col-12">
                                                        <label className="form-label">Teléfonos</label>
                                                        {formData.clientetelefonos.map((tel, index) => (
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
                                                        {formData.clientedireccions.map((dir, index) => (
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