import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { mostrarAlerta } from '../../../alertas/sweetAlert';
import { AxiosImagen } from '../../../axios/Axios';
import { CarroImagen } from '../../../../configuracion/apiUrls';

const CarrosActualiza = ({ carro, onUpdate }) => {
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

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (carro) {
            setFormData({
                marca: carro.marca || '',
                modelo: carro.modelo || '',
                anio: carro.anio || '',
                color: carro.color || '',
                precio: carro.precio || '0',
                estado: carro.estado || 'Nuevo',
                disponible: carro.disponible,
                imagen: null
            });

            if (carro.imagen) {
                setPreviewImage(`${process.env.REACT_APP_API_URL}/imagenes/carros/${carro.imagen}`);
            }
        }
    }, [carro]);

    const handleImageUpload = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formDataImg = new FormData();
            formDataImg.append('imagen', file);
            formDataImg.append('id', carro.id);

            const response = await AxiosImagen.post(CarroImagen, formDataImg);

            if (response.data?.mensaje) {
                setFormData(prev => ({
                    ...prev,
                    imagen: response.data.nombreArchivo
                }));
                setPreviewImage(URL.createObjectURL(file));
                mostrarAlerta('Imagen actualizada con éxito', 'success');
            }
        } catch (error) {
            console.log('Error al subir la imagen:', error);
            let mensajeError = 'Error al subir la imagen';

            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

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
                                <Link to="/app/vehiculos/carros" className="text-decoration-none">Vehículos</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Actualizar Carro</li>
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
                                                                {previewImage ? (
                                                                    <img
                                                                        src={previewImage}
                                                                        alt="Carro"
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
                                        <Link to="/app/vehiculos/carros" className="btn btn-outline-secondary">
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

export default CarrosActualiza;