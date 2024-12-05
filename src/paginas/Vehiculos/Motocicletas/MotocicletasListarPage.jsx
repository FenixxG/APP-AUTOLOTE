import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../../components/axios/Axios';
import { MotocicletasEliminar, MotocicletasListar } from '../../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaPregunta } from '../../../components/alertas/sweetAlert';
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

    const eliminarMoto = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${MotocicletasEliminar}?id=${id}`);
                    mostrarAlerta('Motocicleta eliminada exitosamente', 'success');
                    // Actualizar la lista de motos
                    setMotocicletas(motocicletas.filter(motocicletas => motocicletas.id !== id));
                } catch (error) {
                    console.error('Error al eliminar esta moto:', error);
                    mostrarAlerta('Error al eliminar la motocicleta', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar esta motocicleta?');
    };


    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <MotocicletasLista
            motocicletas={motocicletas}
            eliminarMoto={eliminarMoto}
        />
    );
};

export default MotocicletasListarPage;