import React, { useState } from 'react';
import { UsuarioRegistrar } from '../configuracion/apiUrls';
import { Link, useNavigate } from 'react-router-dom';
import { mostrarAlerta } from '../components/alertas/sweetAlert';
import { AxiosPublico } from '../components/axios/Axios';
// ICONOS
import { MdEmail, MdPerson, MdPhone, MdLocationOn } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineIdcard } from 'react-icons/ai';
import '../styles/Login/Login.css';

const RegistroUsuario = () => {
    const [formData, setFormData] = useState({
        identidad: '',
        rtn: '',
        primernombre: '',
        segundonombre: '',
        primerapellido: '',
        segundoapellido: '',
        correo: '',
        nombre: '',
        contrasena: '',
        telefono: '',
        direccion: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validación básica
            const camposRequeridos = ['identidad', 'rtn', 'primernombre', 'segundonombre', 'primerapellido', 'segundoapellido', 'correo', 'nombre', 'contrasena', 'telefono', 'direccion'];
            for (let campo of camposRequeridos) {
                if (!formData[campo]) {
                    mostrarAlerta(`Por favor, complete el campo ${campo}`, "warning");
                    return;
                }
            }

            await AxiosPublico.post(UsuarioRegistrar, formData)
                .then((response) => {
                    mostrarAlerta("Registro exitoso", "success");
                    navigate('/login');
                })
                .catch((error) => {
                    if (Array.isArray(error.response.data)) {
                        error.response.data.msj.forEach(f => {
                            mostrarAlerta(`Campo: ${f.campo} ${f.msj}`, "warning");
                        });
                    } else {
                        mostrarAlerta(error.response.data.error, "warning");
                    }
                });
        } catch (error) {
            console.log("Error: ", error);
            mostrarAlerta("Error en la petición", "error");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Registro de Usuario</h2>
                <p>Únete a AutoLote</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Información Personal</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="identidad"
                                placeholder="Identidad"
                                value={formData.identidad}
                                onChange={handleChange}
                            />
                            <AiOutlineIdcard className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="rtn"
                                placeholder="RTN"
                                value={formData.rtn}
                                onChange={handleChange}
                            />
                            <AiOutlineIdcard className="input-icon" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Nombres</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="primernombre"
                                placeholder="Primer Nombre"
                                value={formData.primernombre}
                                onChange={handleChange}
                            />
                            <MdPerson className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="segundonombre"
                                placeholder="Segundo Nombre"
                                value={formData.segundonombre}
                                onChange={handleChange}
                            />
                            <MdPerson className="input-icon" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Apellidos</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="primerapellido"
                                placeholder="Primer Apellido"
                                value={formData.primerapellido}
                                onChange={handleChange}
                            />
                            <MdPerson className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="segundoapellido"
                                placeholder="Segundo Apellido"
                                value={formData.segundoapellido}
                                onChange={handleChange}
                            />
                            <MdPerson className="input-icon" />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Información de Contacto</label>
                        <div className="input-with-icon">
                            <input
                                type="email"
                                name="correo"
                                placeholder="Correo Electrónico"
                                value={formData.correo}
                                onChange={handleChange}
                            />
                            <MdEmail className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre de Usuario"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            <MdPerson className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="contrasena"
                                placeholder="Contraseña"
                                value={formData.contrasena}
                                onChange={handleChange}
                            />
                            <div className="password-toggle" onClick={togglePasswordVisibility}>
                                {showPassword ?
                                    <AiOutlineEyeInvisible className="input-icon" /> :
                                    <AiOutlineEye className="input-icon" />
                                }
                            </div>
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                            <MdPhone className="input-icon" />
                        </div>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                name="direccion"
                                placeholder="Dirección"
                                value={formData.direccion}
                                onChange={handleChange}
                            />
                            <MdLocationOn className="input-icon" />
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Registrarse
                    </button>
                </form>
                <div className="links">
                    <p>
                        ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistroUsuario;