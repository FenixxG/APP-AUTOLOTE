import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ServiciosGuardar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk } from '../../components/alertas/sweetAlert';
import ServiciosGuarda from '../../components/plantilla/Servicios/ServiciosGuarda';

const ServiciosGuardarPage = () => {
    const navigate = useNavigate();

    const handleSave = async (formData) => {
        try {
            const response = await AxiosPrivado.post(ServiciosGuardar, formData);

            if (response.data.tipo === 1) {
                mostrarAlertaOk('Servicio guardado exitosamente', 'success');
                // Redirigir a la lista de cargos después de guardar
                navigate('/app/servicios');
            } else {
                mostrarAlerta(response.data.msj, 'error');
            }
        } catch (error) {
            console.error('Error al guardar el servicio:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al guardar el servicio',
                'error'
            );
        }
    };

    return (
        <ServiciosGuarda onSave={handleSave} />
    );
};

export default ServiciosGuardarPage;