import React, { useState, useEffect } from 'react';
import { UsuarioIniciarSesion } from '../../configuracion/apiUrls';
import { Link } from 'react-router-dom';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import { useContextUsuario } from '../../contexto/usuario/UsuarioContext';
import { useNavigate } from "react-router-dom";
import { AxiosPublico } from '../../components/axios/Axios';

// ICONOS
import { MdEmail } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../../styles/Login/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setLogin, setCerrarSesion } = useContextUsuario();

    useEffect(() => {
        setCerrarSesion();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username === "" || password === "") {
                mostrarAlerta("Por favor, complete los campos", "warning");
                return
            }
            await AxiosPublico.post(UsuarioIniciarSesion, {
                login: username,
                contrasena: password
            })
                .then(async (data) => {
                    const json = data.data;
                    console.log(data.data);
                    try {
                        var usuario = json.Usuario;
                        var token = json.Token;
                        mostrarAlerta('Bienvenido(a) ' + usuario.datoPersonales.nombreCompleto, "success");
                        await setLogin({ usuario: usuario, token: token });
                        if (usuario.tipo == "cliente") {
                            navigate('/app/clientes');
                        } else if (usuario.tipo == "empleado") {
                            navigate('/app/empleados');
                        }
                        else {
                            navigate('/app/home');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    if (Array.isArray(error.response.data)) {
                        error.response.data.msj.forEach(f => {
                            mostrarAlerta("Campo: " + f.campo + " " + f.msj, "warning");
                        });
                    }
                    else {
                        mostrarAlerta(error.response.data.error, "warning");
                    }
                });
        } catch (error) {
            console.log("Error: ", error);
            mostrarAlerta("Error en la peticion", "error");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h2>AutoLote</h2>
                    <p>Tu camino hacia el auto perfecto</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <div className="input-with-icon">
                                <input
                                    type="text"
                                    placeholder="Usuario o correo electrónico"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <MdEmail className="input-icon" /> {/* Icono de correo electrónico */}
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input-with-icon">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                />
                                <div
                                    className="password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ?
                                        <AiOutlineEyeInvisible className="input-icon" /> :
                                        <AiOutlineEye className="input-icon" />
                                    }
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="login-button">
                            Iniciar Sesión
                        </button>
                    </form>
                    <div className="links">
                        <Link to="/recuperar-contrasena" className="forgot-password">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <p>
                            ¿No tienes una cuenta? <Link to="/registro-usuario">Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;