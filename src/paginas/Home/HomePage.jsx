import React, { useState, useEffect } from 'react';
import { AxiosPrivado } from '../../components/axios/Axios';
import { ClientesListar, EmpleadosListar, CarrosListar, MotocicletasListar } from '../../configuracion/apiUrls';
import { mostrarAlerta } from '../../components/alertas/sweetAlert';
import Home from '../../components/plantilla/Home';
//import ReactApexChart from 'react-apexcharts';

const HomePage = () => {
    const [totales, setTotales] = useState({
        clientes: 0,
        empleados: 0,
        carros: 0,
        motocicletas: 0
    });

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['Clientes', 'Empleados', 'Carros', 'Motocicletas'],
        }
    };

    const series = [{
        name: 'Cantidad',
        data: [totales.clientes, totales.empleados, totales.carros, totales.motocicletas]
    }];

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerTotales();
    }, []);

    const obtenerTotales = async () => {
        try {
            const [clientesRes, empleadosRes, carrosRes, motocicletasRes] = await Promise.all([
                AxiosPrivado.get(ClientesListar),
                AxiosPrivado.get(EmpleadosListar),
                AxiosPrivado.get(CarrosListar),
                AxiosPrivado.get(MotocicletasListar)
            ]);

            console.log('Datos recibidos:', {
                clientes: clientesRes.data,
                empleados: empleadosRes.data,
                carros: carrosRes.data,
                motocicletas: motocicletasRes.data
            });

            setTotales({
                clientes: Array.isArray(clientesRes.data) ? clientesRes.data.length : 0,
                empleados: Array.isArray(empleadosRes.data) ? empleadosRes.data.length : 0,
                carros: carrosRes.data?.datos?.length || 0,
                motocicletas: motocicletasRes.data?.datos?.length || 0
            });
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener totales:', error);
            mostrarAlerta('Error al cargar los datos del dashboard', 'error');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    return <Home totales={totales} />;
};

export default HomePage;