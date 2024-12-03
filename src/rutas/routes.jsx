import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { AutenticacionRoute } from './AutenticacionRoute';
import PageHome from '../components/plantilla/PageHome';
import PageHomeClientes from '../components/plantilla/plantillaClientes/PageHome';
/* Rutas de autenticación */
import Login from '../paginas/Login/Login';
import RecuperarContrasena from '../paginas/Login/RecuperarContrasena';
import ActualizarContrasena from '../paginas/Login/ActualizarContrasena';
import RegistroUsuario from '../paginas/Login/RegistroUsuario';
/* RUTAS MOSTRADAS PARA LOS EMPLEADOS */
/* clientes */
import ClientesListarPage from '../paginas/Clientes/ClientesListarPage';
import ClientesActualizarPage from '../paginas/Clientes/ClientesActualizarPage';
import ClientesEliminarPage from '../paginas/Clientes/ClientesEliminarPage';
/* cargos */
import CargosListarPage from '../paginas/Cargos/CargosListarPage';
import CargosGuardarPage from '../paginas/Cargos/CargosGuardarPage';
import CargosActualizarPage from '../paginas/Cargos/CargosActualizarPage';
import CargosEliminarPage from '../paginas/Cargos/CargosEliminarPage';
/* empleados */
import EmpleadosListarPage from '../paginas/Empleados/EmpleadosListarPage';
import EmpleadosGuardarPage from '../paginas/Empleados/EmpleadosGuardarPage';
import EmpleadosActualizarPage from '../paginas/Empleados/EmpleadosActualizarPage';
import EmpleadosEliminarPage from '../paginas/Empleados/EmpleadosEliminarPage';
/* vehiculos */
import CarrosListarPage from '../paginas/Vehiculos/Carros/CarrosListarPage';
import CarrosGuardarPage from '../paginas/Vehiculos/Carros/CarrosGuardarPage';
import CarrosActualizarPage from '../paginas/Vehiculos/Carros/CarrosActualizarPage';
import CarrosEliminarPage from '../paginas/Vehiculos/Carros/CarrosEliminarPage';
import MotocicletasListarPage from '../paginas/Vehiculos/Motocicletas/MotocicletasListarPage';
import MotocicletasGuardarPage from '../paginas/Vehiculos/Motocicletas/MotocicletasGuardarPage';
import MotocicletasActualizarPage from '../paginas/Vehiculos/Motocicletas/MotocicletasActualizarPage';
import MotocicletasEliminarPage from '../paginas/Vehiculos/Motocicletas/MotocicletasEliminarPage';
/* RUTAS MOSTRADAS PARA LOS CLIENTES */
/* LAYOUTS */
import { ClienteLayout } from '../rutas/ClienteLayout';
import { EmpleadoLayout } from '../rutas/EmpleadoLayout';

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/actualizar-contrasena" element={<ActualizarContrasena />} />
            <Route path="/registro-usuario" element={<RegistroUsuario />} />

            {/* Rutas protegidas */}
            <Route path="app" element={<AutenticacionRoute />}>
                <Route path="home" element={<PageHome />} />

                {/* Rutas de Empleados con su layout */}
                <Route element={<EmpleadoLayout />}>
                    {/* Rutas de Empleados */}
                    <Route path="empleados">
                        <Route index element={<EmpleadosListarPage />} />
                        <Route path="guardar" element={<EmpleadosGuardarPage />} />
                        <Route path="editar/:id" element={<EmpleadosActualizarPage />} />
                        <Route path="eliminar/:id" element={<EmpleadosEliminarPage />} />
                    </Route>

                    {/* Rutas de Cargos */}
                    <Route path="cargos">
                        <Route index element={<CargosListarPage />} />
                        <Route path="guardar" element={<CargosGuardarPage />} />
                        <Route path="editar/:id" element={<CargosActualizarPage />} />
                        <Route path="eliminar/:id" element={<CargosEliminarPage />} />
                    </Route>

                    {/* Rutas de Clientes */}
                    <Route path="clientes">
                        <Route index element={<ClientesListarPage />} />
                        <Route path="editar/:id" element={<ClientesActualizarPage />} />
                        <Route path="eliminar/:id" element={<ClientesEliminarPage />} />
                    </Route>

                    {/* Rutas de Vehiculos */}
                    <Route path="vehiculos">
                        {/* Rutas de Carros */}
                        <Route path="carros">
                            <Route index element={<CarrosListarPage />} />
                            <Route path="guardar" element={<CarrosGuardarPage />} />
                            <Route path="editar/:id" element={<CarrosActualizarPage />} />
                            <Route path="eliminar/:id" element={<CarrosEliminarPage />} />
                        </Route>

                        {/* Rutas de Motocicletas */}
                        <Route path="motocicletas">
                            <Route index element={<MotocicletasListarPage />} />
                            <Route path="guardar" element={<MotocicletasGuardarPage />} />
                            <Route path="editar/:id" element={<MotocicletasActualizarPage />} />
                            <Route path="eliminar/:id" element={<MotocicletasEliminarPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* Rutas de Clientes con su layout */}
                <Route element={<ClienteLayout />}>
                    <Route path="home" element={<PageHomeClientes />} />
                </Route>
            </Route>


            <Route path="*" element={<Navigate to="/login" />} />
        </Route>
    ),
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);
