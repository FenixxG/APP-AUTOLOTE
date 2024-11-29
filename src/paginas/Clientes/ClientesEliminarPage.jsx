import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ClientesBuscar, ClientesEliminar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaPregunta } from '../../components/alertas/sweetAlert';

const ClientesEliminarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    // OBTIENE EL CLIENTE
    const obtenerCliente = async () => {
        try {
            const response = await AxiosPrivado.get(`${ClientesBuscar}?id=${id}`);

            if (response.data && response.data.datos) {
                setCliente(response.data.datos[0]);
                setLoading(false);
                mostrarConfirmacion(response.data.datos[0]);
            }
        } catch (error) {
            mostrarAlerta('Error al cargar los datos del cliente', 'error');
            navigate('/app/clientes');
        }
    };

    // MUESTRA CONFIRMACIÓN Y ELIMINA EL CLIENTE
    const mostrarConfirmacion = (clienteData) => {
        mostrarAlertaPregunta(
            async (confirmado) => {
                if (confirmado) {
                    await eliminarCliente();
                } else {
                    navigate('/app/clientes');
                }
            },
            `¿Desea eliminar al cliente ${clienteData.nombreCompleto}?`
        );
    };

    // ELIMINA EL CLIENTE
    const eliminarCliente = async () => {
        try {
            const response = await AxiosPrivado.delete(`${ClientesEliminar}?id=${id}`);

            if (response.status === 200) {
                mostrarAlerta('Cliente eliminado con éxito', 'success');
                navigate('/app/clientes');
            }
        } catch (error) {
            console.log('Error al eliminar cliente:', error);
            mostrarAlerta('Error al eliminar el cliente', 'error');
            navigate('/app/clientes');
        }
    };

    useEffect(() => {
        if (id) {
            obtenerCliente();
        }
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return null;
};

export default ClientesEliminarPage;