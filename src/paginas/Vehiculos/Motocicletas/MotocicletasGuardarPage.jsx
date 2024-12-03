import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosPrivado, AxiosImagen } from '../../../components/axios/Axios';
import { MotocicletasGuardar, MotocicletaImagen } from '../../../configuracion/apiUrls';
import { mostrarAlerta } from '../../../components/alertas/sweetAlert';
import MotocicletasGuarda from '../../../components/plantilla/Vehiculos/Motocicletas/MotocicletasGuarda';

const MotocicletasGuardarPage = () => {
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

            const response = await AxiosPrivado.post(MotocicletasGuardar, formData);

            if (response.data.tipo === 1) {
                // Si hay una imagen, la subimos después de guardar el carro
                if (formData.imagen) {
                    const imageFormData = new FormData();
                    imageFormData.append('imagen', formData.imagen);
                    imageFormData.append('id', response.data.id);

                    await AxiosImagen.post(MotocicletaImagen, imageFormData);
                }

                mostrarAlerta('Motocicleta guardada exitosamente', 'success');
                navigate('/app/vehiculos/motocicletas');
            }
        } catch (error) {
            console.log('Error al guardar motocicleta:', error);
            let mensajeError = 'Error al guardar la motocicleta';

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
        <MotocicletasGuarda
            onSave={handleSave}
        />
    );
};

export default MotocicletasGuardarPage;