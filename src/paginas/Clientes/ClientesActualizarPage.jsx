import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ClientesBuscar, ClientesActualizar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import ClientesActualiza from '../../components/plantilla/Clientes/ClientesActualiza';

const ClientesActualizarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [cliente, setCliente] = useState(null);

    // OBTIENE EL CLIENTE
    const obtenerCliente = async () => {
        try {
            console.log('Obteniendo cliente con ID:', id);
            const response = await AxiosPrivado.get(`${ClientesBuscar}?id=${id}`);
            console.log('Respuesta del servidor:', response.data);

            if (response.data && response.data.datos) {
                setCliente(response.data.datos[0]);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error al obtener cliente:', error);
            mostrarAlerta('Error al cargar los datos del cliente', 'error');
            setLoading(false);
        }
    };

    // ENVIA LOS DATOS ACTUALIZADOS
    const actualizarCliente = async (datosActualizados) => {
        try {
            const response = await AxiosPrivado.put(`${ClientesActualizar}?id=${id}`, datosActualizados);
            mostrarAlerta('Cliente actualizado con éxito', 'success');
            navigate('/app/clientes'); // Redirige a la lista de clientes
        } catch (error) {
            console.log('Error al actualizar cliente:', error);
            mostrarAlerta('Error al actualizar los datos del cliente', 'error');
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

    return (
        <ClientesActualiza
            cliente={cliente}
            onUpdate={actualizarCliente}
        />
    );
};

export default ClientesActualizarPage;