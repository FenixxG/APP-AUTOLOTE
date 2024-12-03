import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../../components/axios/Axios';
import { CarrosEliminar } from '../../../configuracion/apiUrls';
import { mostrarAlertaPregunta, mostrarAlerta, mostrarAlertaError } from '../../../components/alertas/sweetAlert';

const CarrosEliminarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (confirmado) => {
        if (!confirmado) {
            navigate('/app/vehiculos/carros');
            return;
        }

        try {
            const response = await AxiosPrivado.delete(`${CarrosEliminar}?id=${id}`);

            if (response.data?.mensaje) {
                mostrarAlerta(response.data.mensaje, 'success');
            } else {
                mostrarAlerta('Carro eliminado exitosamente', 'success');
            }

            navigate('/app/vehiculos/carros');
        } catch (error) {
            console.error('Error al eliminar carro:', error);

            let mensajeError = 'Error al eliminar el carro';

            // Capturamos el mensaje de error de la API
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            }

            mostrarAlertaError(mensajeError);
            navigate('/app/vehiculos/carros');
        }
    };

    // Mostrar la alerta de confirmación al cargar el componente
    React.useEffect(() => {
        mostrarAlertaPregunta(
            handleDelete,
            '¿Está seguro que desea eliminar este carro?'
        );
    }, []);

    // Este componente no necesita renderizar nada visible
    return null;
};

export default CarrosEliminarPage;