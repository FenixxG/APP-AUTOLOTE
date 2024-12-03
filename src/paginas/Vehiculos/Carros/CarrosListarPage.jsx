import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../../components/axios/Axios';
import { CarrosListar } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import CarrosLista from '../../../components/plantilla/Vehiculos/Carros/CarrosLista';

const CarrosListarPage = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerCarros();
    }, []);

    const obtenerCarros = async () => {
        try {
            const response = await AxiosPrivado.get(CarrosListar);
            if (response && response.data) {
                setCarros(response.data.datos);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener carros:', error);
            mostrarAlerta('Error al cargar los carros', 'error');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <CarrosLista
            carros={carros}
        />
    );
};

export default CarrosListarPage;