import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../../components/axios/Axios';
import { MotocicletasListar } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import MotocicletasLista from '../../../components/plantilla/Vehiculos/Motocicletas/MotocicletasLista';

const MotocicletasListarPage = () => {
    const [motocicletas, setMotocicletas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerMotocicletas();
    }, []);

    const obtenerMotocicletas = async () => {
        try {
            const response = await AxiosPrivado.get(MotocicletasListar);
            if (response && response.data) {
                setMotocicletas(response.data.datos);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener motocicletas:', error);
            mostrarAlerta('Error al cargar las motocicletas', 'error');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <MotocicletasLista
            motocicletas={motocicletas}
        />
    );
};

export default MotocicletasListarPage;