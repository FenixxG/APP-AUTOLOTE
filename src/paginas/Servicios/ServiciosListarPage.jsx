import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ServiciosListar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
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

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <ServiciosLista
            servicios={servicios}
            refrescarLista={obtenerServicios}
        />
    );
};

export default ServiciosListarPage;