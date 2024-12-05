import { Navigate, Outlet } from "react-router-dom";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import { mostrarAlerta } from "../components/alertas/sweetAlert";
import Header from "../components/plantilla/Header";
import Navbar from "../components/plantilla/Navbar";
import Footer from "../components/plantilla/Footer";
import HeaderCliente from "../components/plantilla/plantillaClientes/Header";
import Banner from "../components/plantilla/plantillaClientes/Banner";

export const AutenticacionRoute = ({ children }) => {
    const { token, usuario } = useContextUsuario();
    if (!token) {
        mostrarAlerta("Token invalido");
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};