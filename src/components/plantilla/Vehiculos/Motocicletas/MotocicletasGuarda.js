import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { AxiosImagen } from '../../../axios/Axios';
import { MotocicletaImagen } from '../../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../alertas/sweetAlert';

const MotocicletasGuarda = ({ onSave }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formDataImg = new FormData();
            formDataImg.append('imagen', file);
            formDataImg.append('id', formData.id);

            const response = await AxiosImagen.post(MotocicletaImagen, formDataImg);

            if (response.data.success) {
                setFormData(prev => ({
                    ...prev,
                    imagen: response.data.nombreArchivo
                }));
                mostrarAlerta('Imagen actualizada con éxito', 'success');
            }
        } catch (error) {
            console.log('Error al subir la imagen:', error);
            mostrarAlerta('Error al subir la imagen', 'error');
        }
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
                                <Link to="/app/vehiculos/motocicletas" className="text-decoration-none">Vehículos</Link>
                            </li>
                            <MdArrowForwardIos />
                            <li className="breadcrumb-item">Nueva Motocicleta</li>
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
                                                                {formData.imagen ? (
                                                                    <img
                                                                        src={`${process.env.REACT_APP_API_URL}/imagenes/motocicletas/${formData.imagen}`}
                                                                        alt="Motocicleta"
                                                                        className="img-fluid"
                                                                    />
                                                                ) : (
                                                                    <button type="button" className="dz-button">
                                                                        Subir Imagen de la Motocicleta
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
                                                                onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
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

export default MotocicletasGuarda;