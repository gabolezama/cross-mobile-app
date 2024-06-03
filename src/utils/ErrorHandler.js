import { LOGIN_ERROR_VALIDATIONS } from "./Constants";

export const loginErrorHandler = (error) =>{
    const errorType = LOGIN_ERROR_VALIDATIONS
    .find(item =>{
        return error.message.includes(item)
    })
    console.log('ERROR-HANDLER: ', errorType);
    switch(errorType){
        case 'data':
            return 'Los campos son requeridos.';
        case 'credential':
            return 'Credenciales Iválidas!';
        case 'email':
            return 'Email está vacío';
        case 'invalid':
            return 'Email inválido';
        case 'password':
            return 'Contraseña está vacío';
        case 'wrong':
            return 'Contraseña inválida';
        case 'session':
            return 'El usuario ya tiene una sesion activa';
        case 'network':
            return 'No hay conexión de red';
        case 'user':
            return 'El usuario no existe';
        default:
            return 'No se pudo procesar login';
    }
}