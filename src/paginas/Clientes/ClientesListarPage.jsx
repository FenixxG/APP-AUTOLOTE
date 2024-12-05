import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ClientesListar, ClientesEliminar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaPregunta } from '../../components/alertas/sweetAlert';
import ClientesLista from '../../components/plantilla/Clientes/ClientesLista';

const ClientesListarPage = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerClientes();
    }, []);

    const obtenerClientes = async () => {
        try {
            const response = await AxiosPrivado.get(ClientesListar);
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

    const eliminarCliente = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${ClientesEliminar}?id=${id}`);
                    mostrarAlerta('Cliente eliminado exitosamente', 'success');
                    // Actualizar la lista de clientes
                    setClientes(clientes.filter(clientes => clientes.id !== id));
                } catch (error) {
                    console.error('Error al eliminar cliente:', error);
                    mostrarAlerta('Error al eliminar el cliente', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar este cliente?');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <ClientesLista
            clientes={clientes}
            eliminarCliente={eliminarCliente}
        />
    );
};

export default ClientesListarPage;