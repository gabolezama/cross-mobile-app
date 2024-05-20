import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

export const newUserRegistration = async (email, password) =>{
    try {
        const creation = await createUserWithEmailAndPassword(auth, email, password)
        return true
    } catch (error) {
        console.log(`(newUserRegistration): Error in registration: ${error.message}`);
        return false
    }
}

export const loginRequest = async(email, password) =>{
    try {
        const login = await signInWithEmailAndPassword(auth, email, password)
        console.log('REQ: ', login);
        return true
    } catch (error) {
        console.log(`(loginRequest ): Error attepting to login: ${error.message}`);
        return false
    }
}