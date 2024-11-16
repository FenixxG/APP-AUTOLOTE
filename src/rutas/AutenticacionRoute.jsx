import { Navigate, Outlet } from "react-router-dom";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";
import { mostrarAlerta } from "../components/alertas/sweetAlert";

export const AutenticacionRoute = ({ children }) => {
    const { token } = useContextUsuario();
    if (!token) {
        mostrarAlerta("Token invalido");
        return <Navigate to="/login" />;
    }
    return <Outlet></Outlet>;
};