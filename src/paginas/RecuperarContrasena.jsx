import React, { useState } from 'react';
import { UsuarioRecuperarContrasena } from '../configuracion/apiUrls';
import { Link } from 'react-router-dom';
import { mostrarAlerta } from '../components/alertas/sweetAlert';
import { AxiosPublico } from '../components/axios/Axios';
// ICONOS
import { MdEmail } from 'react-icons/md';
// ESTILOS
import '../styles/Login/Login.css';

const RecuperarContrasena = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email === "") {
                mostrarAlerta("Por favor, ingrese su correo electrónico", "warning");
                return;
            }
            await AxiosPublico.post(UsuarioRecuperarContrasena, {
                correo: email
            })
                .then((data) => {
                    mostrarAlerta('Se han enviado las instrucciones a su correo electrónico', "success");
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
                <p>Recuperación de contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <div className="input-with-icon">
                            <input
                                type="email"
                                id="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdEmail className="input-icon" />
                        </div>
                    </div>
                    <button type="submit" className="login-button">
                        Enviar Instrucciones
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

export default RecuperarContrasena;