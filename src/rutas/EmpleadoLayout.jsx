import { Navigate, useOutlet } from "react-router-dom";
import { mostrarAlertaError } from "../components/alertas/sweetAlert";
import { EmpleadoState } from "../contexto/empleado/EmpleadoState";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";

export const EmpleadoLayout = () => {
    const outlet = useOutlet();
    const { usuario } = useContextUsuario();
    if (usuario.tipo != "Empleado") {
        mostrarAlertaError("No tienes pertmitido acceder a este sitio");
        return <Navigate to="/login" />;
    }
    return <EmpleadoState>{outlet}</EmpleadoState>;
};