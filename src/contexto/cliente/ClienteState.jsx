import React, { useEffect, useReducer, useState } from "react"
import { ClienteContext } from "./ClienteContext"
import { AxiosPrivado } from "../../components/axios/Axios";


export const ClienteState = (props) => {
    const [cliente, setCliente] = useState(null);
    const [listaProductos, setListaProductos] = useState([]);
    const [listaServicios, setListaServicios] = useState([]);
    const [listaCitas, setListaCitas] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    useEffect(() => {
        Lista();
    }, []);
    const Lista = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ClienteContext.Provider value={{
            cliente: cliente,
            listaProductos: listaProductos,
            listaServicios: listaServicios,
            actualizar,
            setActualizar,
            setCliente,
            setListaProductos,
            setListaServicios,
            Lista
        }}>
            {props.children}
        </ClienteContext.Provider>
    )
}