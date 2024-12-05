import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../../components/axios/Axios';
import { CarrosListar, CarrosEliminar } from '../../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaPregunta } from '../../../components/alertas/sweetAlert';
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

    const eliminarCarro = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${CarrosEliminar}?id=${id}`);
                    mostrarAlerta('Motocicleta eliminado exitosamente', 'success');
                    // Actualizar la lista de carros
                    setCarros(carros.filter(carros => carros.id !== id));
                } catch (error) {
                    console.error('Error al eliminar el carro:', error);
                    mostrarAlerta('Error al eliminar el carro', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar este carro?');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <CarrosLista
            carros={carros}
            eliminarCarro = {eliminarCarro}
        />
    );
};

export default CarrosListarPage;