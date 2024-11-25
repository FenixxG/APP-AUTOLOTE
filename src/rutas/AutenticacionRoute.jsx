import { Navigate, Outlet } from "react-router-dom";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import { mostrarAlerta } from "../components/alertas/sweetAlert";
import Header from "../components/plantilla/Header";
import Navbar from "../components/plantilla/Navbar";
import Footer from "../components/plantilla/Footer";

export const AutenticacionRoute = ({ children }) => {
    const { token } = useContextUsuario();
    if (!token) {
        mostrarAlerta("Token invalido");
        return <Navigate to="/login" />;
    }
    return (
        <div className="page-wrapper">
            <Header />
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};