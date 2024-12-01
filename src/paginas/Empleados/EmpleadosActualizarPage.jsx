import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../components/axios/Axios';
import { EmpleadosActualizar, EmpleadosBuscar, EmpleadoImagen } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import EmpleadosActualiza from '../../components/plantilla/Empleados/EmpleadosActualiza';

const EmpleadosActualizarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [empleado, setEmpleado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerEmpleado();
    }, [id]);

    const obtenerEmpleado = async () => {
        try {
            const response = await AxiosPrivado.get(`${EmpleadosBuscar}?id=${id}`);
            if (response.data?.datos?.[0]) { // Accedemos al primer elemento del array datos
                console.log('Datos del empleado:', response.data); // Para debugging
                setEmpleado(response.data.datos[0]); // Guardamos el primer empleado del array
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener empleado:', error);
            mostrarAlerta('Error al cargar los datos del empleado', 'error');
            setLoading(false);
            navigate('/app/empleados');
        }
    };

    const handleUpdate = async (formData) => {
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
                estado: formData.estado || 'AC'
            };

            // Si hay una imagen nueva, la actualizamos
            if (formData.imagen) {
                const imageFormData = new FormData();
                imageFormData.append('imagen', formData.imagen);
                imageFormData.append('id', id);

                await AxiosImagen.post(EmpleadoImagen, imageFormData);
            }

            console.log('Datos a actualizar:', empleadoData);

            const response = await AxiosPrivado.put(`${EmpleadosActualizar}?id=${id}`, empleadoData);

            if (response.data) {
                mostrarAlerta('Empleado actualizado exitosamente', 'success');
                navigate('/app/empleados');
            }
        } catch (error) {
            console.error('Error completo:', error);

            let mensajeError = 'Error al actualizar el empleado';

            // Capturamos el mensaje de error de la API
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            } else if (error.message) {
                mensajeError = error.message;
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!empleado) {
        return <div>No se encontró el empleado</div>;
    }

    return (
        <EmpleadosActualiza
            empleado={empleado}
            onUpdate={handleUpdate}
        />
    );
};

export default EmpleadosActualizarPage;