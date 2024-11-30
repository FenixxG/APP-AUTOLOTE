import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { CargosListar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import CargosLista from '../../components/plantilla/Cargos/CargosLista';

const CargosListarPage = () => {
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
            setCargos([]);
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <CargosLista
            cargos={cargos}
            refrescarLista={obtenerCargos}
        />
    );
};

export default CargosListarPage;