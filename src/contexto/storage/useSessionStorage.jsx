import { useState } from "react";
import { DesEncriptar, Encriptar } from "../../components/encriptar/Crypto";

export const useSessionStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = DesEncriptar(window.sessionStorage.getItem(keyName));
            if (value) {
                return JSON.parse(value);
            } else {
                window.sessionStorage.setItem(keyName, Encriptar(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.sessionStorage.setItem(keyName, Encriptar(newValue));

        } catch (err) {}
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
}