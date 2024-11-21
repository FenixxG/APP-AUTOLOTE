import React, { useState, useEffect } from 'react';
import { AxiosPublico } from '../../components/axios/Axios';
import { ClientesListar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import ClientesLista from '../../components/plantilla/Clientes/ClientesLista';

const ClientesListarPage = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = async () => {
        try {
            const response = await AxiosPublico.get(ClientesListar);
            if (response && response.data) {
                setClientes(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener clientes:', error);
            mostrarAlerta('Error al cargar los clientes', 'error');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <ClientesLista
            clientes={clientes}
        />
    );
};

export default ClientesListarPage;