import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../Styles/Login/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Aquí iría la lógica de autenticación real
            if (email === 'usuario@ejemplo.com' && password === 'contraseña123') {
                // Login exitoso
                console.log('Login exitoso');
                // Aquí podrías redirigir al usuario o actualizar el estado de la aplicación
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (err) {
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>AutoLote</h2>
                <p>Tu camino hacia el auto perfecto</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">
                        Iniciar Sesión
                    </button>
                </form>
                <div className="links">
                    <Link to="/recuperar-contrasena" className="forgot-password">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <p>
                        ¿No tienes una cuenta? <Link to="/registro">Regístrate</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;