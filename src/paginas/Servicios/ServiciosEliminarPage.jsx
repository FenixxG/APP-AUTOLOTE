import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ServiciosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk, mostrarAlertaPregunta } from '../../components/alertas/sweetAlert';

const ServiciosEliminarPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const eliminarServicio = async () => {
        try {
            // Modificamos cómo usamos mostrarAlertaPregunta
            mostrarAlertaPregunta(
                async (confirmado) => {
                    if (confirmado) {
                        console.log('Eliminando servicio con ID:', id);

                        const response = await AxiosPrivado.delete(`${ServiciosEliminar}?id=${id}`);

                        if (response.data.tipo === 1) {
                            mostrarAlertaOk('Servicio eliminado exitosamente', 'success');
                            navigate('/app/servicios');
                        } else {
                            mostrarAlerta(response.data.msj, 'error');
                            navigate('/app/servicios');
                        }
                    } else {
                        navigate('/app/servicios');
                    }
                },
                '¿Deseas eliminar este Servicio?'
            );
        } catch (error) {
            console.error('Error al eliminar el Servicio:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al eliminar el servicios',
                'error'
            );
            navigate('/app/servicios');
        }
    };

    // Ejecutar la eliminación cuando el componente se monta
    React.useEffect(() => {
        eliminarServicio();
    }, []);

    // Mostrar spinner mientras se procesa la eliminación
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Eliminando servicio...</span>
            </div>
        </div>
    );
};

export default ServiciosEliminarPage;