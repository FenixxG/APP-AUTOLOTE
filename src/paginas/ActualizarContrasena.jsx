import React, { useState } from 'react';
import { UsuarioActualizarContrasena } from '../configuracion/apiUrls';
import { Link } from 'react-router-dom';
import { mostrarAlerta } from '../components/alertas/sweetAlert';
import { AxiosPublico } from '../components/axios/Axios';
import { useNavigate } from 'react-router-dom';
// ICONOS
import { MdEmail, MdLock, MdPin } from 'react-icons/md';
// ESTILOS
import '../styles/Login/Login.css';

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
        <div className="login-container">
            <div className="login-card">
                <h2>AutoLote</h2>
                <p>Actualizar Contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className="input-with-icon">
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdEmail className="input-icon" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <div className="input-with-icon">
                            <input
                                type="password"
                                id="password"
                                placeholder="Ingresa tu nueva contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <MdLock className="input-icon" />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="pin">PIN de verificación</label>
                        <div className="input-with-icon">
                            <input
                                type="text"
                                id="pin"
                                placeholder="Ingresa el PIN recibido"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <MdPin className="input-icon" />
                        </div>
                    </div>
                    <button type="submit" className="login-button">
                        Actualizar Contraseña
                    </button>
                </form>
                <div className="links">
                    <Link to="/" className="back-to-login">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActualizarContrasena;