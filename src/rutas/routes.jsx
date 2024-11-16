import React from 'react';
import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { AutenticacionRoute } from './AutenticacionRoute';
import PageHome from '../components/plantilla/PageHome';
import Login from '../paginas/Login';
import RecuperarContrasena from '../paginas/RecuperarContrasena';
import ActualizarContrasena from '../paginas/ActualizarContrasena';
import RegistroUsuario from '../paginas/RegistroUsuario';

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
            <Route path="/actualizar-contrasena" element={<ActualizarContrasena />} />
            <Route path="/registro-usuario" element={<RegistroUsuario />} />
            <Route path="app/" element={<AutenticacionRoute />}>
                <Route path="home" element={<PageHome />} />
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
