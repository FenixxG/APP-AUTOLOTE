import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { CargosGuardar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk } from '../../components/alertas/sweetAlert';
import CargosGuarda from '../../components/plantilla/Cargos/CargosGuarda';

const CargosGuardarPage = () => {
    const navigate = useNavigate();

    const handleSave = async (formData) => {
        try {
            const response = await AxiosPrivado.post(CargosGuardar, formData);

            if (response.data.tipo === 1) {
                mostrarAlertaOk('Cargo guardado exitosamente', 'success');
                // Redirigir a la lista de cargos después de guardar
                navigate('/app/cargos');
            } else {
                mostrarAlerta(response.data.msj, 'error');
            }
        } catch (error) {
            console.error('Error al guardar el cargo:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al guardar el cargo',
                'error'
            );
        }
    };

    return (
        <CargosGuarda onSave={handleSave} />
    );
};

export default CargosGuardarPage;