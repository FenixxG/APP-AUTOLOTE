import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { EmpleadosListar, CargosListar, EmpleadosEliminar } from '../../configuracion/apiUrls';
import { mostrarAlertaPregunta, mostrarAlerta } from '../../components/alertas/sweetAlert';
import EmpleadosLista from '../../components/plantilla/Empleados/EmpleadosLista';

const EmpleadosListarPage = () => {
    const [empleados, setEmpleados] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerEmpleados();
    }, []);

    const obtenerEmpleados = async () => {
        try {
            const [empleadosResponse, cargosResponse] = await Promise.all([
                AxiosPrivado.get(EmpleadosListar),
                AxiosPrivado.get(CargosListar)
            ]);

            setEmpleados(empleadosResponse.data);
            setCargos(cargosResponse.data?.datos || []);
            setLoading(false);
            /*const response = await AxiosPrivado.get(EmpleadosListar);
            if (response && response.data) {
                setEmpleados(response.data);
                setLoading(false);
            }*/
        } catch (error) {
            console.error('Error al obtener empleados:', error);
            mostrarAlerta('Error al cargar los empleados', 'error');
            setLoading(false);
        }
    };

    const eliminarEmpleado = (id) => {
        mostrarAlertaPregunta(async (confirmado) => {
            if (confirmado) {
                try {
                    await AxiosPrivado.delete(`${EmpleadosEliminar}?id=${id}`);
                    mostrarAlerta('Empleado eliminado exitosamente', 'success');
                    // Actualizar la lista de empleados
                    setEmpleados(empleados.filter(empleado => empleado.id !== id));
                } catch (error) {
                    console.error('Error al eliminar empleado:', error);
                    mostrarAlerta('Error al eliminar el empleado', 'error');
                }
            }
        }, '¿Está seguro que desea eliminar este empleado?');
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <EmpleadosLista
            empleados={empleados}
            cargos={cargos}
            eliminarEmpleado={eliminarEmpleado}
        />
    );
};

export default EmpleadosListarPage;