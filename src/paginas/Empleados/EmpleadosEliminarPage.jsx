import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { EmpleadosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlertaPregunta, mostrarAlerta, mostrarAlertaError } from '../../components/alertas/sweetAlert';

const EmpleadosEliminarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (confirmado) => {
        if (!confirmado) {
            navigate('/app/empleados');
            return;
        }

        try {
            const response = await AxiosPrivado.delete(`${EmpleadosEliminar}?id=${id}`);

            if (response.data?.mensaje) {
                mostrarAlerta(response.data.mensaje, 'success');
            } else {
                mostrarAlerta('Empleado eliminado exitosamente', 'success');
            }

            navigate('/app/empleados');
        } catch (error) {
            console.error('Error al eliminar empleado:', error);

            let mensajeError = 'Error al eliminar el empleado';

            // Capturamos el mensaje de error de la API
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            }

            mostrarAlertaError(mensajeError);
            navigate('/app/empleados');
        }
    };

    // Mostrar la alerta de confirmación al cargar el componente
    React.useEffect(() => {
        mostrarAlertaPregunta(
            handleDelete,
            '¿Está seguro que desea eliminar este empleado?'
        );
    }, []);

    // Este componente no necesita renderizar nada visible
    return null;
};

export default EmpleadosEliminarPage;