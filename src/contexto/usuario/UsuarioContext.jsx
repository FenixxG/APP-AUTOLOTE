// CONTEXTO CREADO PARA ALMACENAR EL ESTADO DEL USUARIO Y SU TOKEN
import { createContext, useContext } from "react";
export const UsuarioContext = createContext();

export const useContextUsuario = () => {
    return useContext(UsuarioContext);
}