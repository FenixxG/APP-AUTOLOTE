import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdArrowForwardIos } from "react-icons/md";
import Dropzone from 'react-dropzone';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import { AxiosImagen } from '../../../components/axios/Axios';
import { EmpleadoImagen } from '../../../configuracion/apiUrls';

const EmpleadosActualiza = ({ empleado, onUpdate }) => {
    const [formData, setFormData] = useState({
        identidad: '',
        rtn: '',
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        sueldo: 0,
        estado: 'AC',
        imagen: null
    });

    const [previewImage, setPreviewImage] = useState(null);

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
                imagen: null
            });

            // Si hay una imagen, establecer la URL de vista previa
            if (empleado.imagen) {
                setPreviewImage(`${process.env.REACT_APP_API_URL}/imagenes/empleados/${empleado.imagen}`);
            }
        }
    }, [empleado]);

    const handleImageUpload = async (acceptedFiles) => {
        try {
            const file = acceptedFiles[0];
            const formData = new FormData();
            formData.append('imagen', file);
            formData.append('id', empleado.id);

            const response = await AxiosImagen.post(EmpleadoImagen, formData);

            if (response.data?.mensaje) {
                // Actualizar el estado local con la nueva imagen
                setFormData(prev => ({
                    ...prev,
                    imagen: response.data.nombreArchivo
                }));
                setPreviewImage(URL.createObjectURL(file));

                // Mostrar mensaje de éxito
                mostrarAlerta(response.data.mensaje, 'success');
            }
        } catch (error) {
            console.log('Error al subir la imagen:', error);
            let mensajeError = 'Error al subir la imagen';

            // Capturamos el mensaje de error de la API
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            } else if (error.message) {
                mensajeError = error.message;
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

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
                                    <div className="row g-3">
                                        {/* Imagen del empleado */}
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
                                                                        alt="Perfil"
                                                                        className="img-fluid"
                                                                        style={{ maxHeight: '200px' }}
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

                                    {/* Botones de acción */}
                                    <div className="d-flex gap-2 justify-content-end mt-3">
                                        <Link to="/app/empleados" className="btn btn-outline-secondary">
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

export default EmpleadosActualiza;