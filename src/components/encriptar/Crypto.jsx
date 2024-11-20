import CryptoJS from 'crypto-js';
const clave = 'MyClaveSegura';
export const Encriptar = (datos) => {
    const encrypt = CryptoJS.AES.encrypt(
        JSON.stringify(datos),
        clave
    ).toString();
    return encrypt;
}

export const DesEncriptar = (datos) => {
    const decrypt = CryptoJS.AES.decrypt(datos, clave).toString(
        CryptoJS.enc.Utf8
    );
    return decrypt;
}