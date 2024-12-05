import { Navigate, Outlet } from "react-router-dom";
import { mostrarAlertaError } from "../components/alertas/sweetAlert";
import { ClienteState } from "../contexto/cliente/ClienteState";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import HeaderCliente from "../components/plantilla/plantillaClientes/Header";
import Banner from "../components/plantilla/plantillaClientes/Banner";
import Footer from "../components/plantilla/Footer";

export const ClienteLayout = () => {
    const { usuario } = useContextUsuario();

    if (usuario.tipo !== "Cliente") {
        mostrarAlertaError("No tienes permitido acceder a este sitio");
        return <Navigate to="/login" />;
    }

    return (
        <ClienteState>
            <HeaderCliente />
            <Banner />
            <Outlet />
            <Footer />
        </ClienteState>
    );
};