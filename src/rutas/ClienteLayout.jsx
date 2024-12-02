import { Navigate, useOutlet } from "react-router-dom";
import { mostrarAlertaError } from "../components/alertas/sweetAlert";
import { ClienteState } from "../contexto/cliente/ClienteState";
import { useContextUsuario } from "../contexto/usuario/UsuarioContext";

export const ClienteLayout = () => {
    const outlet = useOutlet();
    const { usuario } = useContextUsuario();
    if (usuario.tipo != "Cliente") {
        mostrarAlertaError("No tienes pertmitido acceder a este sitio");
        return <Navigate to="/login" />;
    }
    return <ClienteState>{outlet}</ClienteState>;
};