import React, { useEffect, useReducer, useState } from "react"
import { EmpleadoContext } from "./EmpleadoContext"
import { AxiosPrivado } from "../../components/axios/Axios";
import { CargosListar, EmpleadosListar } from "../../configuracion/apiUrls";
import { useContextUsuario } from "../usuario/UsuarioContext";

export const EmpleadoState = (props) => {
    const { token } = useContextUsuario();
    const [empleado, setEmpleado] = useState(null);
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [listaCargos, setListaCargos] = useState([]);
    const [listaProductos, setListaProductos] = useState([]);
    const [listaServicios, setListaServicios] = useState([]);
    const [listaCitas, setListaCitas] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    useEffect(() => {
        Lista();
    }, []);
    const Lista = async () => {
        try {
            ActualizarLista(EmpleadosListar, setListaEmpleados);
            ActualizarLista(CargosListar, setListaCargos);
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
        <EmpleadoContext.Provider value={{
            empleado: empleado,
            listaProductos: listaProductos,
            listaServicios: listaServicios,
            listaEmpleados: listaEmpleados,
            listaCargos: listaCargos,
            actualizar,
            setActualizar,
            setEmpleado,
            setListaProductos,
            setListaServicios,
            setListaEmpleados,
            setListaCargos,
            Lista,
            ActualizarLista
        }}>
            {props.children}
        </EmpleadoContext.Provider>
    )
}