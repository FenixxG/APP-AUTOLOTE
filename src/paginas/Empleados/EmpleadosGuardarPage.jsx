import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../components/axios/Axios';
import { EmpleadosGuardar, EmpleadoImagen, CargosListar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import EmpleadosGuarda from '../../components/plantilla/Empleados/EmpleadosGuarda';

const EmpleadosGuardarPage = () => {
    const navigate = useNavigate();
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerCargos();
    }, []);

    const obtenerCargos = async () => {
        try {
            const response = await AxiosPrivado.get(CargosListar);
            const cargosList = response.data?.datos || [];
            setCargos(cargosList);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener cargos:', error);
            mostrarAlerta('Error al cargar los cargos', 'error');
            setLoading(false);
        }
    };

    const handleSave = async (formData) => {
        try {
            // Formateamos los datos según la estructura esperada por la API
            const empleadoData = {
                identidad: formData.identidad?.trim() || '',
                rtn: formData.rtn?.trim() || '',
                primernombre: formData.primernombre?.trim() || '',
                segundonombre: formData.segundonombre?.trim() || '',
                primerapellido: formData.primerapellido?.trim() || '',
                segundoapellido: formData.segundoapellido?.trim() || '',
                sueldo: Number(formData.sueldo) || 0,
                estado: 'AC',
                nombre: formData.nombre?.trim() || '',
                contrasena: formData.contrasena?.trim() || '',
                correo: formData.correo?.trim() || '',
                tipoUsuario: 'empleado',
                telefonos: formData.empleadotelefonos
                    .filter(tel => tel.telefono.trim() !== '')
                    .map(tel => ({
                        telefono: tel.telefono.trim()
                    })),
                direcciones: formData.empleadodireccions
                    .filter(dir => dir.direccion.trim() !== '')
                    .map(dir => ({
                        direccion: dir.direccion.trim()
                    })),
                cargoId: Number(formData.cargoId) || 0
            };

            console.log('Datos a enviar:', empleadoData); // Para debugging

            const response = await AxiosPrivado.post(EmpleadosGuardar, empleadoData);

            if (response.data?.id) {
                // Si hay una imagen, la subimos después de guardar el empleado
                if (formData.imagen) {
                    const imageFormData = new FormData();
                    imageFormData.append('imagen', formData.imagen);
                    imageFormData.append('id', response.data.id);

                    await AxiosImagen.post(EmpleadoImagen, imageFormData);
                }

                mostrarAlerta('Empleado guardado exitosamente', 'success');
                navigate('/app/empleados');
            }
        } catch (error) {
            console.log('Error al guardar empleado:', error);
            let mensajeError = 'Error al guardar el empleado';

            // Manejo específico de errores
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <EmpleadosGuarda
            onSave={handleSave}
            cargos={cargos}
        />
    );
};

export default EmpleadosGuardarPage;