import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado } from '../../components/axios/Axios';
import { CargosBuscar, CargosActualizar } from '../../configuracion/apiUrls';
import { mostrarAlerta, mostrarAlertaOk } from '../../components/alertas/sweetAlert';
import CargosActualiza from '../../components/plantilla/Cargos/CargosActualiza';

const CargosActualizarPage = () => {
    const [cargo, setCargo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        obtenerCargo();
    }, [id]);

    const obtenerCargo = async () => {
        try {
            const response = await AxiosPrivado.get(`${CargosBuscar}?id=${id}`);
            if (response.data.tipo === 1 && response.data.datos.length > 0) {
                setCargo(response.data.datos[0]);
            } else {
                mostrarAlerta('No se encontró el cargo', 'error');
                navigate('/app/cargos');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener el cargo:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al obtener el cargo',
                'error'
            );
            navigate('/app/cargos');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            const response = await AxiosPrivado.put(`${CargosActualizar}?id=${id}`, formData);

            if (response.data.tipo === 1) {
                mostrarAlertaOk('Cargo actualizado exitosamente', 'success');
                navigate('/app/cargos');
            } else {
                mostrarAlerta(response.data.msj, 'error');
            }
        } catch (error) {
            console.error('Error al actualizar el cargo:', error);
            mostrarAlerta(
                error.response?.data?.msj || 'Error al actualizar el cargo',
                'error'
            );
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!cargo) {
        return <div>No se encontró el cargo</div>;
    }

    return (
        <CargosActualiza
            cargo={cargo}
            onUpdate={handleUpdate}
        />
    );
};

export default CargosActualizarPage;