import React, { useEffect, useReducer, useState } from "react"
import { EmpleadoContext } from "./EmpleadoContext"
import { AxiosPrivado } from "../../components/axios/Axios";
import { CargosListar, EmpleadosListar, CarrosListar, MotocicletasListar, ClientesListar } from "../../configuracion/apiUrls";
import { useContextUsuario } from "../usuario/UsuarioContext";

export const EmpleadoState = (props) => {
    const { token } = useContextUsuario();
    const [empleado, setEmpleado] = useState(null);
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [listaCargos, setListaCargos] = useState([]);
    const [listaServicios, setListaServicios] = useState([]);
    const [listaCarros, setListaCarros] = useState([]);
    const [listaMotocicletas, setListaMotocicletas] = useState([]);
    const [actualizar, setActualizar] = useState(false);
    useEffect(() => {
        Lista();
    }, []);
    const Lista = async () => {
        try {
            ActualizarLista(EmpleadosListar, setListaEmpleados);
            ActualizarLista(ClientesListar, setListaClientes);
            ActualizarLista(CargosListar, setListaCargos);
            //ActualizarLista(ServiciosListar, setListaServicios);
            ActualizarLista(CarrosListar, setListaCarros);
            ActualizarLista(MotocicletasListar, setListaMotocicletas);
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
            listaServicios: listaServicios,
            listaEmpleados: listaEmpleados,
            listaClientes: listaClientes,
            listaCargos: listaCargos,
            listaCarros: listaCarros,
            listaMotocicletas: listaMotocicletas,
            actualizar,
            setActualizar,
            setEmpleado,
            setListaServicios,
            setListaEmpleados,
            setListaClientes,
            setListaCargos,
            setListaCarros,
            setListaMotocicletas,
            Lista,
            ActualizarLista
        }}>
            {props.children}
        </EmpleadoContext.Provider>
    )
}