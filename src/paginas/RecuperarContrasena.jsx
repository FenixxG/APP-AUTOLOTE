import React, { useState } from 'react';
import { UsuarioRecuperarContrasena } from '../configuracion/apiUrls';
import { Link } from 'react-router-dom';
import { mostrarAlerta } from '../components/alertas/sweetAlert';
import { AxiosPublico } from '../components/axios/Axios';
import { useNavigate } from 'react-router-dom';
// ICONOS
import { MdEmail } from 'react-icons/md';
// ESTILOS
import '../styles/Login/RecuperarContrasena.css';

const RecuperarContrasena = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

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
                    navigate('/actualizar-contrasena');
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
        <div className="recuperar-container">
            <div className="recuperar-card">
                <h2>AutoLote</h2>
                <p>Recuperación de contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className="recuperar-input-group">
                        <label className="recuperar-label" htmlFor="email">Correo Electrónico</label>
                        <div className="recuperar-input-with-icon">
                            <input
                                className="recuperar-input"
                                type="email"
                                id="email"
                                placeholder="Ingresa tu correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdEmail className="recuperar-input-icon" />
                        </div>
                    </div>
                    <button type="submit" className="recuperar-button">
                        Enviar Instrucciones
                    </button>
                </form>
                <div className="recuperar-links">
                    <Link to="/" className="volver-login">
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecuperarContrasena;