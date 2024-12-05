import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import { mostrarAlertaOk, mostrarAlertaError } from '../../../alertas/sweetAlert';
import { AxiosImagen } from '../../../axios/Axios';
import { MotocicletaImagen, MotocicletaActualizarImagen } from '../../../../configuracion/apiUrls';
const userDefaultImage = 'https://placehold.co/400';

const MotocicletasActualiza = ({ motocicleta, onUpdate }) => {
    const [formData, setFormData] = useState({
        marca: '',
        modelo: '',
        anio: '',
        color: '',
        precio: '0',
        estado: 'Nuevo',
        disponible: true,
        imagen: null
    });

    useEffect(() => {
        if (motocicleta) {
            setFormData({
                marca: motocicleta.marca || '',
                modelo: motocicleta.modelo || '',
                anio: motocicleta.anio || '',
                color: motocicleta.color || '',
                precio: motocicleta.precio || '0',
                estado: motocicleta.estado || 'Nuevo',
                disponible: motocicleta.disponible,
                imagen: null
            });
        }
    }, [motocicleta]);

    const API_IMAGE_URL = 'http://localhost:3001/api/imagenes/motocicletas/';
    const imagen = motocicleta?.imagen ? `${API_IMAGE_URL}${motocicleta.imagen}` : userDefaultImage;
    console.log(imagen);

    const handleFileChange = async event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        else {
            try {
                let formData = new FormData();
                formData.append("imagen", event.target.files[0]);
                await AxiosImagen.put(MotocicletaActualizarImagen + motocicleta.id,
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
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
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
                                <Link to="/app/vehiculos/motocicletas" className="text-decoration-none">Vehículos</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Actualizar Motocicleta</li>
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
                                        {/* Cambiamos el tamaño de la columna de la imagen */}
                                        <div className="col-sm-4 col-12">
                                            <div id="update-profile" className="mb-3">
                                                <div className="text-center">
                                                    <img
                                                        src={imagen}
                                                        className="me-2 img-fluid rounded-3"
                                                        style={{ maxHeight: '300px', width: 'auto' }}
                                                        alt={`${motocicleta.marca} ${motocicleta.modelo}`}
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
                                                <div className="col-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Marca</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="marca"
                                                            value={formData.marca}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Modelo</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="modelo"
                                                            value={formData.modelo}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Color</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="color"
                                                            value={formData.color}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Año</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="anio"
                                                            value={formData.anio}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Precio</label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            name="precio"
                                                            value={formData.precio}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Estado</label>
                                                        <select
                                                            className="form-select"
                                                            name="estado"
                                                            value={formData.estado}
                                                            onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="Nuevo">Nuevo</option>
                                                            <option value="Usado">Usado</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="form-check">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                name="disponible"
                                                                checked={formData.disponible}
                                                                onChange={handleChange}
                                                                id="disponibleCheck"
                                                            />
                                                            <label className="form-check-label" htmlFor="disponibleCheck">
                                                                Disponible
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="d-flex gap-2 justify-content-end mt-3">
                                        <Link to="/app/vehiculos/motocicletas" className="btn btn-outline-secondary">
                                            Cancelar
                                        </Link>
                                        <button type="submit" className="btn btn-primary">
                                            Actualizar
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

export default MotocicletasActualiza;