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
    /*
    // Si estamos en la ruta raíz de la app, redirigir según el tipo de usuario
    if (location.pathname === '/app') {
        return <Navigate to="/app/home" replace />;
    }

    // Renderizado condicional basado en el tipo de usuario
    if (usuario?.tipo === "Cliente") {
        return (
            <div className="page-wrapper">
                <HeaderCliente />
                <Banner />
                <Outlet />
            </div>
        );
    }

    if (usuario?.tipo === "Empleado") {
        return (
            <div className="page-wrapper">
                <Header />
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        );
    }

    // Si no tiene un tipo válido
    mostrarAlerta("Tipo de usuario no válido");
    return <Navigate to="/login" />;*/
};