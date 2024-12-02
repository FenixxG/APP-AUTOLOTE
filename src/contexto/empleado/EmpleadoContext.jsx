import { createContext, useContext } from "react";
export const EmpleadoContext = createContext();

export const useContextEmpleado = () => {
    return useContext(EmpleadoContext);
}