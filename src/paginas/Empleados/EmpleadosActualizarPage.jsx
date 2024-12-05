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
            // Validaciones básicas
            if (!formData.identidad?.trim() || !formData.rtn?.trim() || !formData.correo?.trim()) {
                mostrarAlerta('Todos los campos obligatorios deben estar llenos', 'error');
                return;
            }

            // Formateamos los datos según la estructura esperada por la API
            const empleadoData = {
                identidad: formData.identidad.trim(),
                rtn: formData.rtn.trim(),
                primernombre: formData.primernombre.trim(),
                segundonombre: formData.segundonombre.trim(),
                primerapellido: formData.primerapellido.trim(),
                segundoapellido: formData.segundoapellido.trim(),
                sueldo: parseFloat(formData.sueldo) || 0,
                estado: formData.estado,
                correo: formData.correo.trim(),
                telefonos: formData.empleadotelefonos
                    .filter(t => t.telefono?.trim())
                    .map(t => ({
                        telefono: t.telefono.trim()
                    })),
                direcciones: formData.empleadodireccions
                    .filter(d => d.direccion?.trim())
                    .map(d => ({
                        direccion: d.direccion.trim()
                    }))
            };

            // Aseguramos que haya al menos un teléfono y una dirección
            if (empleadoData.telefonos.length === 0) {
                empleadoData.telefonos = [{ telefono: '' }];
            }
            if (empleadoData.direcciones.length === 0) {
                empleadoData.direcciones = [{ direccion: '' }];
            }

            console.log('Datos a enviar:', empleadoData);

            const response = await AxiosPrivado.put(`${EmpleadosActualizar}?id=${id}`, empleadoData);

            if (response.data) {
                mostrarAlerta('Empleado actualizado exitosamente', 'success');
                navigate('/app/empleados');
            }
        } catch (error) {
            console.error('Error completo:', error);

            let mensajeError = 'Error al actualizar el empleado';

            if (error.response?.data?.mensaje) {
                mensajeError = Array.isArray(error.response.data.mensaje)
                    ? error.response.data.mensaje[0].msg
                    : error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
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