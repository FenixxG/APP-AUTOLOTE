import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const RecuperarContrasena = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            // Aquí iría la lógica real para enviar el correo de recuperación
            // Este es solo un ejemplo
            if (email === 'usuario@ejemplo.com') {
                setMessage('Se ha enviado un correo con instrucciones para recuperar tu contraseña.');
            } else {
                throw new Error('Email no encontrado');
            }
        } catch (err) {
            setError('No se pudo enviar el correo de recuperación. Por favor, verifica tu email.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Recuperar Contraseña</h2>
                <p>Ingresa tu correo electrónico para recuperar tu contraseña</p>
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
                    {error && <p className="error-message">{error}</p>}
                    {message && <p className="success-message">{message}</p>}
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