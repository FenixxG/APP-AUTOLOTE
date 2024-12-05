import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ServiciosListar, ServiciosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaPregunta } from '../../components/alertas/sweetAlert';
import ServiciosLista from '../../components/plantilla/Servicios/ServiciosLista';

const ServiciosListarPage = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerServicios();
    }, []);

    const obtenerServicios = async () => {
        try {
            const response = await AxiosPrivado.get(ServiciosListar);
            const serviciosList = response.data?.datos || [];
            setServicios(serviciosList);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener servicios:', error);
            mostrarAlerta('Error al cargar los servicios', 'error');
            setServicios([]);
            setLoading(false);
        }
    };

    const eliminarServicio = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${ServiciosEliminar}?id=${id}`);
                    mostrarAlerta('Empleado eliminado exitosamente', 'success');
                    // Actualizar la lista de servicios
                    setServicios(servicios.filter(servicios => servicios.id !== id));
                } catch (error) {
                    console.error('Error al eliminar el servicio:', error);
                    mostrarAlerta('Error al eliminar el servicio', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar este servicio?');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <ServiciosLista
            servicios={servicios}
            eliminarServicio={eliminarServicio}
        />
    );
};

export default ServiciosListarPage;