import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { AutenticacionRoute } from './AutenticacionRoute';
import PageHome from '../components/plantilla/PageHome';
import Login from '../paginas/Login/Login';
import RecuperarContrasena from '../paginas/Login/RecuperarContrasena';
import ActualizarContrasena from '../paginas/Login/ActualizarContrasena';
import RegistroUsuario from '../paginas/Login/RegistroUsuario';
import ClientesListarPage from '../paginas/Clientes/ClientesListarPage';
import ClientesActualizarPage from '../paginas/Clientes/ClientesActualizarPage';
import ClientesEliminarPage from '../paginas/Clientes/ClientesEliminarPage';
import CargosListarPage from '../paginas/Cargos/CargosListarPage';
import CargosGuardarPage from '../paginas/Cargos/CargosGuardarPage';
import CargosActualizarPage from '../paginas/Cargos/CargosActualizarPage';
import CargosEliminarPage from '../paginas/Cargos/CargosEliminarPage';
import EmpleadosListarPage from '../paginas/Empleados/EmpleadosListarPage';
import EmpleadosGuardarPage from '../paginas/Empleados/EmpleadosGuardarPage';
import EmpleadosActualizarPage from '../paginas/Empleados/EmpleadosActualizarPage';
import EmpleadosEliminarPage from '../paginas/Empleados/EmpleadosEliminarPage';
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


                    {/* Rutas de Clientes con su layout */}
                    <Route path="clientes">
                        <Route index element={<ClientesListarPage />} />
                        <Route path="editar/:id" element={<ClientesActualizarPage />} />
                        <Route path="eliminar/:id" element={<ClientesEliminarPage />} />
                    </Route>
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
