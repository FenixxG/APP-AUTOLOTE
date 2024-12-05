import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ServiciosBuscar, ServiciosActualizar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk } from '../../components/alertas/sweetAlert';
import ServiciosActualiza from '../../components/plantilla/Servicios/ServiciosActualiza';

const ServiciosActualizarPage = () => {
    const [servicio, setServicio] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        obtenerServicio();
    }, [id]);

    const obtenerServicio = async () => {
        try {
            const response = await AxiosPrivado.get(`${ServiciosBuscar}?id=${id}`);
            if (response.data.tipo === 1 && response.data.datos.length > 0) {
                setServicio(response.data.datos[0]);
            } else {
                mostrarAlerta('No se encontró el servicio', 'error');
                navigate('/app/servicios');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el servicio:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al obtener el servicio',
                'error'
            );
            navigate('/app/servicios');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await AxiosPrivado.put(`${ServiciosActualizar}?id=${id}`, formData);

            if (response.data.tipo === 1) {
                mostrarAlertaOk('Servicio actualizado exitosamente', 'success');
                navigate('/app/servicios');
            } else {
                mostrarAlerta(response.data.msj, 'error');
            }
        } catch (error) {
            console.error('Error al actualizar el servicio:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al actualizar el servicio',
                'error'
            );
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!servicio) {
        return <div>No se encontró el servicio</div>;
    }

    return (
        <ServiciosActualiza
            servicio={servicio}
            onUpdate={handleUpdate}
        />
    );
};

export default ServiciosActualizarPage;