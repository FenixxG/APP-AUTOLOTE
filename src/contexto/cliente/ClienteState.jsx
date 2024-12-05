import React, { useEffect, useReducer, useState } from "react"
import { ClienteContext } from "./ClienteContext"
import { AxiosPrivado } from "../../components/axios/Axios";
import { CarrosListar, MotocicletasListar, ClientesListar } from "../../configuracion/apiUrls";
import { useContextUsuario } from "../usuario/UsuarioContext";


export const ClienteState = (props) => {
    const { token } = useContextUsuario();
    const [cliente, setCliente] = useState(null);
    const [listaCarros, setListaCarros] = useState([]);
    const [listaMotocicletas, setListaMotocicletas] = useState([]);
    const [listaCitas, setListaCitas] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    useEffect(() => {
        Lista();
    }, []);
    const Lista = async () => {
        try {
            ActualizarLista(CarrosListar, setListaCarros);
            ActualizarLista(MotocicletasListar, setListaMotocicletas);
            ActualizarLista(ClientesListar, setListaCitas);
        } catch (error) {
            console.log(error);
        }
    };
    const ActualizarLista = async (url, setDatos) => {
        AxiosPrivado.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            await AxiosPrivado.get(url)
                .then((respuesta) => {
                    setDatos(respuesta.data);
                });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ClienteContext.Provider value={{
            cliente: cliente,
            listaCarros: listaCarros,
            listaMotocicletas: listaMotocicletas,
            listaCitas: listaCitas,
            actualizar,
            setActualizar,
            setCliente,
            setListaCarros,
            setListaMotocicletas,
            Lista
        }}>
            {props.children}
        </ClienteContext.Provider>
    )
}