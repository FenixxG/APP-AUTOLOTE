import React, { useState } from 'react';
import { UsuarioRegistrar } from '../../configuracion/apiUrls';
import { Link, useNavigate } from 'react-router-dom';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import { AxiosPublico } from '../../components/axios/Axios';
import MapaModal from '../Mapa/MapaModal';
// ICONOS Y ESTILOS
import { MdEmail, MdPerson, MdPhone, MdLocationOn } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineIdcard } from 'react-icons/ai';
import '../../styles/Login/RegistroUsuarioCliente.css';
import 'leaflet/dist/leaflet.css';

const RegistroUsuario = () => {
    const TIPO_USUARIO = 'cliente';
    const [identidad, setIdentidad] = useState('');
    const [rtn, setRtn] = useState('');
    const [primernombre, setPrimernombre] = useState('');
    const [segundonombre, setSegundonombre] = useState('');
    const [primerapellido, setPrimerapellido] = useState('');
    const [segundoapellido, setSegundoapellido] = useState('');
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefonos, setTelefonos] = useState([{ telefono: '' }]);
    const [direcciones, setDirecciones] = useState([{ direccion: '' }]);
    const [latitud, setLatitud] = useState(null);
    const [longitud, setLongitud] = useState(null);
    const [isLocationFinal, setIsLocationFinal] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [direccion, setDireccion] = useState('');
    const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

    const handleChangeTelefonos = (index, value) => {
        const newTelefonos = [...telefonos];
        newTelefonos[index].telefono = value;
        setTelefonos(newTelefonos);
    };

    const handleChangeDirecciones = (index, value) => {
        const newDirecciones = [...direcciones];
        newDirecciones[index].direccion = value;
        setDirecciones(newDirecciones);
    };

    const handleCloseMapModal = () => {
        setIsMapModalOpen(false);
    };

    const obtenerUbicacionActual = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    if (!isLocationFinal) {
                        setLatitud(position.coords.latitude);
                        setLongitud(position.coords.longitude);
                    }
                    setIsMapModalOpen(true); // Abre el modal
                },
                (error) => {
                    console.error("Error al obtener la ubicación: ", error);
                    alert("No se pudo obtener la ubicación.");
                }
            );
        } else {
            alert("La geolocalización no es compatible con este navegador.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validaciones específicas para cada campo
            // Si solo se está actualizando la ubicación, no realizar las demás validaciones
            if (isUpdatingLocation) {
                setIsUpdatingLocation(false); // Reinicia el estado
                return; // Salir de la función
            }
            // Verifica si la ubicación está guardada antes de permitir enviar el formulario
            if (!isLocationFinal) {
                mostrarAlerta("Por favor, complete los datos restantes", "warning");
                return;
            }
            if (!identidad?.trim()) {
                mostrarAlerta("El campo Identidad es obligatorio", "warning");
                return;
            }
            if (!rtn?.trim()) {
                mostrarAlerta("El campo RTN es obligatorio", "warning");
                return;
            }
            if (!primernombre?.trim()) {
                mostrarAlerta("El campo Primer Nombre es obligatorio", "warning");
                return;
            }
            if (!segundonombre?.trim()) {
                mostrarAlerta("El campo Segundo Nombre es obligatorio", "warning");
                return;
            }
            if (!primerapellido?.trim()) {
                mostrarAlerta("El campo Primer Apellido es obligatorio", "warning");
                return;
            }
            if (!segundoapellido?.trim()) {
                mostrarAlerta("El campo Segundo Apellido es obligatorio", "warning");
                return;
            }
            if (!email?.trim()) {
                mostrarAlerta("El campo Correo Electrónico es obligatorio", "warning");
                return;
            }
            if (!nombre?.trim()) {
                mostrarAlerta("El campo Nombre de Usuario es obligatorio", "warning");
                return;
            }
            if (!contrasena?.trim()) {
                mostrarAlerta("El campo Contraseña es obligatorio", "warning");
                return;
            }

            // Validación de teléfonos
            if (!telefonos[0]?.telefono?.trim()) {
                mostrarAlerta("Por favor, ingrese al menos un teléfono válido", "warning");
                return;
            }

            // Validación de direcciones
            if (!direccion?.trim()) {
                mostrarAlerta("Por favor, ingrese una dirección válida", "warning");
                return;
            }

            // Validación básica de formato de correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                mostrarAlerta("Por favor, ingrese un correo electrónico válido", "warning");
                return;
            }

            // Validación de longitud mínima para la contraseña
            if (contrasena.trim().length < 6) {
                mostrarAlerta("La contraseña debe tener al menos 6 caracteres", "warning");
                return;
            }

            await AxiosPublico.post(UsuarioRegistrar, {
                identidad: identidad.trim(),
                rtn: rtn.trim(),
                primernombre: primernombre.trim(),
                segundonombre: segundonombre.trim(),
                primerapellido: primerapellido.trim(),
                segundoapellido: segundoapellido.trim(),
                correo: email.trim(),
                nombre: nombre.trim(),
                contrasena: contrasena.trim(),
                telefonos,
                direcciones: [{
                    direccion: direccion.trim(),
                    latitud: latitud,
                    longitud: longitud
                }],
                tipoUsuario: TIPO_USUARIO
            })
                .then((data) => {
                    mostrarAlerta("Registro exitoso", "success");
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const obtenerDireccion = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const data = await response.json();
            if (data && data.display_name) {
                setDireccion(data.display_name);
            }
        } catch (error) {
            console.error("Error al obtener la dirección: ", error);
        }
    };

    const handleSaveLocation = (lat, lng) => {
        setLatitud(lat);
        setLongitud(lng);
        setIsLocationFinal(true); // Marca que las coordenadas son definitivas
        obtenerDireccion(lat, lng);
        setIsUpdatingLocation(true);
    };

    return (
        <div className="login-page">
            <div className="registro-container">
                <div className="registro-card">
                    <div className="registro-header">
                        <h2>Registro de Usuario</h2>
                        <p>Únete a AutoLote</p>
                    </div>
                    <form onSubmit={handleSubmit} className="registro-form">
                        {/* Columna izquierda */}
                        <div className="registro-column">
                            <div className="registro-section">
                                <div className="registro-section-title">Información Personal</div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Identidad"
                                        value={identidad}
                                        onChange={(e) => setIdentidad(e.target.value)}
                                    />
                                    <AiOutlineIdcard className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="RTN"
                                        value={rtn}
                                        onChange={(e) => setRtn(e.target.value)}
                                    />
                                    <AiOutlineIdcard className="registro-input-icon" />
                                </div>
                            </div>

                            <div className="registro-section">
                                <div className="registro-section-title">Nombres</div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Primer Nombre"
                                        value={primernombre}
                                        onChange={(e) => setPrimernombre(e.target.value)}
                                    />
                                    <MdPerson className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Segundo Nombre"
                                        value={segundonombre}
                                        onChange={(e) => setSegundonombre(e.target.value)}
                                    />
                                    <MdPerson className="registro-input-icon" />
                                </div>
                            </div>

                            <div className="registro-section">
                                <div className="registro-section-title">Apellidos</div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Primer Apellido"
                                        value={primerapellido}
                                        onChange={(e) => setPrimerapellido(e.target.value)}
                                    />
                                    <MdPerson className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Segundo Apellido"
                                        value={segundoapellido}
                                        onChange={(e) => setSegundoapellido(e.target.value)}
                                    />
                                    <MdPerson className="registro-input-icon" />
                                </div>
                            </div>

                        </div>

                        {/* Columna derecha */}
                        <div className="registro-column">
                            <div className="registro-section">
                                <div className="registro-section-title">Información de Contacto</div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="email"
                                        placeholder="Correo Electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <MdEmail className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Nombre de Usuario"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                    />
                                    <MdPerson className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Contraseña"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                    />
                                    <div className="password-toggle" onClick={togglePasswordVisibility}>
                                        {showPassword ?
                                            <AiOutlineEyeInvisible className="registro-input-icon" /> :
                                            <AiOutlineEye className="registro-input-icon" />
                                        }
                                    </div>
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="tel"
                                        placeholder="Teléfono"
                                        value={telefonos[0].telefono}
                                        onChange={(e) => handleChangeTelefonos(0, e.target.value)}
                                    />
                                    <MdPhone className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Dirección"
                                        value={direccion}
                                        readOnly
                                    />
                                    <MdLocationOn className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Latitud"
                                        value={latitud || ''}
                                        readOnly
                                    />
                                    <MdLocationOn className="registro-input-icon" />
                                </div>
                                <div className="registro-input-with-icon">
                                    <input
                                        className="registro-input"
                                        type="text"
                                        placeholder="Longitud"
                                        value={longitud || ''}
                                        readOnly
                                    />
                                    <MdLocationOn className="registro-input-icon" />
                                </div>
                            </div>

                        </div>
                        <div className="registro-buttons-container">
                            <button type="submit" className="registro-button">
                                Registrarse
                            </button>
                            <button onClick={obtenerUbicacionActual} className='registro-button'>
                                {isLocationFinal ? "Actualizar Ubicación" : "Obtener Ubicación"}
                            </button>
                        </div>

                        <div className="registro-links">
                            <p>
                                ¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
                            </p>
                        </div>
                    </form>
                </div>

                {isMapModalOpen && (
                    <MapaModal
                        latitud={latitud || 0} // Usar la latitud obtenida
                        longitud={longitud || 0} // Usar la longitud obtenida
                        onClose={handleCloseMapModal}
                        onSave={handleSaveLocation}
                        isUpdate={isLocationFinal}
                    />
                )}
            </div>
        </div>
    );
};

export default RegistroUsuario;