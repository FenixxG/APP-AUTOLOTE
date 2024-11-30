import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { CargosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk, mostrarAlertaPregunta } from '../../components/alertas/sweetAlert';

const CargosEliminarPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const eliminarCargo = async () => {
        try {
            // Modificamos cómo usamos mostrarAlertaPregunta
            mostrarAlertaPregunta(
                async (confirmado) => {
                    if (confirmado) {
                        console.log('Eliminando cargo con ID:', id);

                        const response = await AxiosPrivado.delete(`${CargosEliminar}?id=${id}`);

                        if (response.data.tipo === 1) {
                            mostrarAlertaOk('Cargo eliminado exitosamente', 'success');
                            navigate('/app/cargos');
                        } else {
                            mostrarAlerta(response.data.msj, 'error');
                            navigate('/app/cargos');
                        }
                    } else {
                        navigate('/app/cargos');
                    }
                },
                '¿Deseas eliminar este cargo?'
            );
        } catch (error) {
            console.error('Error al eliminar el cargo:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al eliminar el cargo',
                'error'
            );
            navigate('/app/cargos');
        }
    };

    // Ejecutar la eliminación cuando el componente se monta
    React.useEffect(() => {
        eliminarCargo();
    }, []);

    // Mostrar spinner mientras se procesa la eliminación
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Eliminando cargo...</span>
            </div>
        </div>
    );
};

export default CargosEliminarPage;