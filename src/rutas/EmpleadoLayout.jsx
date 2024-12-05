import { Navigate, Outlet } from "react-router-dom";
import { mostrarAlertaError } from "../components/alertas/sweetAlert";
import { EmpleadoState } from "../contexto/empleado/EmpleadoState";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import Header from "../components/plantilla/Header";
import Navbar from "../components/plantilla/Navbar";
import Footer from "../components/plantilla/Footer";

export const EmpleadoLayout = () => {
    const { usuario } = useContextUsuario();
    if (usuario.tipo != "Empleado") {
        mostrarAlertaError("No tienes pertmitido acceder a este sitio");
        return <Navigate to="/login" />;
    }
    return (
        <EmpleadoState>
            <div className="page-wrapper">
                <Header />
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </EmpleadoState>
    );
};