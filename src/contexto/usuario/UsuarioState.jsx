import React, { useEffect, useReducer, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { useSessionStorage } from "../storage/useSessionStorage";

const UsuarioState = (props) => {
    const [usuario, setUsuario] = useSessionStorage('usuario_almacenado', null);
    const [token, setToken] = useSessionStorage('token_almacenado', null);
    const setCerrarSesion = () => {
        setUsuario(null);
        setToken(null);
    }

    const setLogin = async (data) => {
        try {
            setUsuario(data.usuario);
            setToken(data.token);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UsuarioContext.Provider value={{
            usuario: usuario,
            token: token,
            setLogin,
            setCerrarSesion,
        }}>
            {props.children}
        </UsuarioContext.Provider>
    )
}
export default UsuarioState;