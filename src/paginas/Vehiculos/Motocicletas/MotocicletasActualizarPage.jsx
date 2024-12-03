import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../../components/axios/Axios';
import { MotocicletasActualizar, MotocicletasBuscar, MotocicletaImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import MotocicletasActualiza from '../../../components/plantilla/Vehiculos/Motocicletas/MotocicletasActualiza';

const MotocicletasActualizarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [motocicleta, setMotocicleta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerMotocicleta();
    }, [id]);

    const obtenerMotocicleta = async () => {
        try {
            const response = await AxiosPrivado.get(`${MotocicletasBuscar}?id=${id}`);
            if (response.data?.datos?.[0]) {
                console.log('Datos de la motocicleta:', response.data);
                setMotocicleta(response.data.datos[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener motocicleta:', error);
            mostrarAlerta('Error al cargar los datos de la motocicleta', 'error');
            setLoading(false);
            navigate('/app/vehiculos/motocicletas');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            // Formateamos los datos según la estructura esperada por la API
            const motocicletaData = {
                marca: formData.marca?.trim() || '',
                modelo: formData.modelo?.trim() || '',
                anio: Number(formData.anio) || 0,
                color: formData.color?.trim() || '',
                precio: Number(formData.precio) || 0,
                estado: formData.estado || 'Nuevo',
                disponible: Boolean(formData.disponible)
            };

            // Si hay una imagen nueva, la actualizamos
            if (formData.imagen) {
                const imageFormData = new FormData();
                imageFormData.append('imagen', formData.imagen);
                imageFormData.append('id', id);

                await AxiosImagen.post(MotocicletaImagen, imageFormData);
            }

            console.log('Datos a actualizar:', motocicletaData);

            const response = await AxiosPrivado.put(`${MotocicletasActualizar}?id=${id}`, motocicletaData);

            if (response.data) {
                mostrarAlerta('Motocicleta actualizada exitosamente', 'success');
                navigate('/app/vehiculos/motocicletas');
            }
        } catch (error) {
            console.error('Error completo:', error);

            let mensajeError = 'Error al actualizar la motocicleta';

            // Capturamos el mensaje de error de la API
            if (error.response?.data?.mensaje) {
                mensajeError = error.response.data.mensaje;
            } else if (error.response?.data?.error) {
                mensajeError = error.response.data.error;
            } else if (error.message) {
                mensajeError = error.message;
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!motocicleta) {
        return <div>No se encontró la motocicleta</div>;
    }

    return (
        <MotocicletasActualiza
            motocicleta={motocicleta}
            onUpdate={handleUpdate}
        />
    );
};

export default MotocicletasActualizarPage;