import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export const newUserRegistration = async (data, navigation) =>{
    try {
        if(!data || !navigation){
            throw new Error(!data? 'Data for registration process is missing' : 'Navigation reference is missing');
        }
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        await saveNewUserOnFirebase(data)
        return true;
    } catch (error) {         
        console.log(`(newUserRegistration): Error in registration: ${error.message}`);
        const errorType = ['credential', 'email', 'password'].find(item =>{
            return error.message.includes(item)
        }) 
        switch(errorType){
            case 'email':
                return 'El email ya ha sido registrado anteriormente';
            case 'password':
                return 'La contraseña es débil';
            default:
                return 'No se pudo registrar el usuario';
        }
    }
}

export const loginRequest = async(email, password) =>{
    try {
        const login = await signInWithEmailAndPassword(auth, email, password)
        return true
    } catch (error) {
        console.log(`(loginRequest ): Error attepting to login: ${error.message}`);
        const errorType = ['credential', 'email', 'password'].find(item =>{
            return error.message.includes(item)
        })
        switch(errorType){
            case 'credential':
                return 'Credenciales Iválidas!';
            case 'email':
                return 'Email está vacío';
            case 'password':
                return 'Contraseña está vacío';
        }
    }
}

const saveNewUserOnFirebase = async (data) =>{

}