import { createContext, useContext } from "react";
export const ClienteContext = createContext();

export const useContextCliente = () => {
    return useContext(ClienteContext);
}