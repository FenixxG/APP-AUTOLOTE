import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { CargosListar, CargosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlertaPregunta, mostrarAlerta } from '../../components/alertas/sweetAlert';
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

    const eliminarCargo = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${CargosEliminar}?id=${id}`);
                    mostrarAlerta('Cargo eliminado exitosamente', 'success');
                    // Actualizar la lista de cargos
                    setCargos(cargos.filter(cargos => cargos.id !== id));
                } catch (error) {
                    console.error('Error al eliminar el cargo:', error);
                    mostrarAlerta('Error al eliminar el cargo', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar este cargo?');
    };



    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <CargosLista
            cargos={cargos}
            eliminarCargo={eliminarCargo}
        />
    );
};

export default CargosListarPage;