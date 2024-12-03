import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../../components/axios/Axios';
import { CarrosActualizar, CarrosBuscar, CarroImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import CarrosActualiza from '../../../components/plantilla/Vehiculos/Carros/CarrosActualiza';

const CarrosActualizarPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carro, setCarro] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerCarro();
    }, [id]);

    const obtenerCarro = async () => {
        try {
            const response = await AxiosPrivado.get(`${CarrosBuscar}?id=${id}`);
            if (response.data?.datos?.[0]) {
                console.log('Datos del carro:', response.data);
                setCarro(response.data.datos[0]);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener carro:', error);
            mostrarAlerta('Error al cargar los datos del carro', 'error');
            setLoading(false);
            navigate('/app/vehiculos/carros');
        }
    };

    const handleUpdate = async (formData) => {
        try {
            // Formateamos los datos según la estructura esperada por la API
            const carroData = {
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

                await AxiosImagen.post(CarroImagen, imageFormData);
            }

            console.log('Datos a actualizar:', carroData);

            const response = await AxiosPrivado.put(`${CarrosActualizar}?id=${id}`, carroData);

            if (response.data) {
                mostrarAlerta('Carro actualizado exitosamente', 'success');
                navigate('/app/vehiculos/carros');
            }
        } catch (error) {
            console.error('Error completo:', error);

            let mensajeError = 'Error al actualizar el carro';

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

    if (!carro) {
        return <div>No se encontró el carro</div>;
    }

    return (
        <CarrosActualiza
            carro={carro}
            onUpdate={handleUpdate}
        />
    );
};

export default CarrosActualizarPage;