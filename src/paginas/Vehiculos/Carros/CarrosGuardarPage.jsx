import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../../components/axios/Axios';
import { CarrosGuardar, CarroImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import CarrosGuarda from '../../../components/plantilla/Vehiculos/Carros/CarrosGuarda';

const CarrosGuardarPage = () => {
    const navigate = useNavigate();

    const handleSave = async (formData) => {
        try {
            // Formateamos los datos según la estructura esperada por la API
            /*const carroData = {
                marca: formData.marca?.trim() || '',
                modelo: formData.modelo?.trim() || '',
                anio: Number(formData.anio) || 0,
                color: formData.color?.trim() || '',
                precio: Number(formData.precio) || 0,
                estado: formData.estado || 'Nuevo',
                disponible: Boolean(formData.disponible)
            };*/

            console.log('Datos a enviar:', formData); // Para debugging

            const response = await AxiosPrivado.post(CarrosGuardar, formData);

            if (response.data.tipo === 1) {
                // Si hay una imagen, la subimos después de guardar el carro
                if (formData.imagen) {
                    const imageFormData = new FormData();
                    imageFormData.append('imagen', formData.imagen);
                    imageFormData.append('id', response.data.id);

                    await AxiosImagen.post(CarroImagen, imageFormData);
                }

                mostrarAlerta('Carro guardado exitosamente', 'success');
                navigate('/app/vehiculos/carros');
            }
        } catch (error) {
            console.log('Error al guardar carro:', error);
            let mensajeError = 'Error al guardar el carro';

            // Manejo específico de errores
            if (error.response) {
                console.log('Respuesta de error:', error.response);
                if (error.response.data?.mensaje) {
                    mensajeError = error.response.data.mensaje;
                } else if (error.response.data?.error) {
                    mensajeError = error.response.data.error;
                }
            }

            mostrarAlerta(mensajeError, 'error');
        }
    };

    return (
        <CarrosGuarda
            onSave={handleSave}
        />
    );
};

export default CarrosGuardarPage;