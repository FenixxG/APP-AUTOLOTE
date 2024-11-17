import React, { useState } from 'react';
import { UsuarioActualizarContrasena } from '../configuracion/apiUrls';
import { Link } from 'react-router-dom';
import { mostrarAlerta } from '../components/alertas/sweetAlert';
import { AxiosPublico } from '../components/axios/Axios';
import { useNavigate } from 'react-router-dom';
// ICONOS
import { MdEmail, MdLock, MdPin } from 'react-icons/md';
// ESTILOS
import '../styles/Login/ActualizarContrasena.css';

const ActualizarContrasena = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pin, setPin] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email === "" || password === "" || pin === "") {
                mostrarAlerta("Por favor, complete todos los campos", "warning");
                return;
            }
            await AxiosPublico.post(UsuarioActualizarContrasena, {
                correo: email,
                contrasena: password,
                pin: pin
            })
                .then((data) => {
                    mostrarAlerta('Contraseña actualizada exitosamente', "success");
                    navigate('/login');
                })
                .catch((error) => {
                    if (Array.isArray(error.response.data)) {
                        error.response.data.msj.forEach(f => {
                            mostrarAlerta("Campo: " + f.campo + " " + f.msj, "warning");
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

    return (
        <div className="actualizar-container">
            <div className="actualizar-card">
                <h2>AutoLote</h2>
                <p>Actualizar Contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className="actualizar-input-group">
                        <label className="actualizar-label" htmlFor="email">Correo Electrónico</label>
                        <div className="actualizar-input-with-icon">
                            <input
                                className="actualizar-input"
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdEmail className="actualizar-input-icon" />
                        </div>
                    </div>
                    <div className="actualizar-input-group">
                        <label className="actualizar-label" htmlFor="password">Nueva Contraseña</label>
                        <div className="actualizar-input-with-icon">
                            <input
                                className="actualizar-input"
                                type="password"
                                id="password"
                                placeholder="Ingresa tu nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <MdLock className="actualizar-input-icon" />
                        </div>
                    </div>
                    <div className="actualizar-input-group">
                        <label className="actualizar-label" htmlFor="pin">PIN de verificación</label>
                        <div className="actualizar-input-with-icon">
                            <input
                                className="actualizar-input"
                                type="text"
                                id="pin"
                                placeholder="Ingresa el PIN recibido"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <MdPin className="actualizar-input-icon" />
                        </div>
                    </div>
                    <button type="submit" className="actualizar-button">
                        Actualizar Contraseña
                    </button>
                </form>
                <div className="actualizar-links">
                    <Link to="/" className="volver-login">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActualizarContrasena;