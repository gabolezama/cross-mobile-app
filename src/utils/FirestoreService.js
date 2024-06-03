import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { SESSIONS_COLLECTION, USERS_COLLECTION } from "./Gateways";
import store from "../Store/index"
import {setUserInfo} from "../Store/actions/generalActions"
import { LOGIN_ERROR_VALIDATIONS } from "./Constants";
import { loginErrorHandler } from "./ErrorHandler";

export const newUserRegistration = async (data, navigation) =>{
    try {
        if(!data || !navigation){
            throw new Error(!data? 'Data for registration process is missing' : 'Navigation reference is missing');
        }
        if(await validateNewUserOnFirebase(data)){
            await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db, USERS_COLLECTION, data.document), {
                ...data
            }) 
            return true;
        }
    } catch (error) {         
        console.log(`(newUserRegistration): Error in registration: ${error.message}`);
        const errorType = ['credential', 'email', 'password', 'document'].find(item =>{
            return error.message.includes(item)
        }) 
        switch(errorType){
            case 'email':
                return 'Este email ya ha sido registrado anteriormente';
            case 'password':
                return 'La contraseña es débil';
            case 'document':
                return 'Este número de documento ya ha sido registrado antes.';
            default:
                return 'No se pudo registrar el usuario';
        }
    }
}

export const loginRequest = async(data) =>{
    try {
        if(!data){
            throw new Error('data-required')
        }
        const users = await getDocumentFromFirebase(USERS_COLLECTION, 'email', data.email)
        if(users){
            store.dispatch(setUserInfo(users[0]));
            const login = await signInWithEmailAndPassword(auth, data.email, data.password)
            const sessions = await getDocumentFromFirebase(SESSIONS_COLLECTION, 'email', data.email)
            if(sessions.length > 0){
                throw new Error('user-has-an-active-session')
            }else{
                await saveToFirebaseCollection(SESSIONS_COLLECTION, data.email,{
                        email: data.email,
                        token: login._tokenResponse.idToken})
                return true
            }
        }
    } catch (error) {
        console.log(`(loginRequest): Error attepting to login: ${error.message}`);
        return loginErrorHandler(error)
    }
}
export const googleLogin = async (token) =>{
    try {
        const googleData = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await googleData.json()
        const users = await getDocumentFromFirebase(USERS_COLLECTION, 'email', data.email)
        if(users){
            store.dispatch(setUserInfo(users[0]));
            const sessions = await getDocumentFromFirebase(SESSIONS_COLLECTION, 'email', data.email)
            if(sessions.length > 0){
                throw new Error('user-has-an-active-session')
            }else{
                await saveToFirebaseCollection(SESSIONS_COLLECTION, data.email,{
                        email: data.email,
                        token})
                return true
            }
        }else{
            throw new Error('user-doesnt-exist')
        }
    } catch (error) {
        console.log(`(googleLogin): Error attepting to login: ${error.message}`);
        return loginErrorHandler(error);
    }
}

export const logoutRequest = async () =>{
    try {
        const email = store.getState().general.userInfo.email
        await deleteDoc(doc(db, SESSIONS_COLLECTION, email))
        const logout = await signOut(auth);
        console.log(`Logout successful!`);
    } catch (error) {
        console.log(`(logoutRequest): Error attempting to logout ${error.message}`);
    }
}

export const sendMailToRecoverPassword = async (email) =>{
    try {
        await sendPasswordResetEmail(auth, email)
    } catch (error) {
        console.log(`Error on attempting to send mail to recover password: ${error.message}`);
    }
}

const validateNewUserOnFirebase = async (data) =>{
        const users = await getDocumentFromFirebase(USERS_COLLECTION, 'document', data.document)
        if(users.length === 0){
            console.log(`(saveNewUserOnFirebase): User created/modified in collection: ${USERS_COLLECTION} --> ${data.name}`)
            return true;
        }else{
            console.log(`(saveNewUserOnFirebase): User document already registered in collection: ${USERS_COLLECTION}`)
            throw new Error('document-already-exists')
        }
}

const getDocumentFromFirebase = async (searchCollection, criteria, data) =>{
    const response = [];
    const q = query(collection(db, searchCollection), where(criteria, '==', data));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        response.push({...doc.data()})
    });
    return response
}

const saveToFirebaseCollection = async(collection, name, data) =>{
    try {
        await setDoc(doc(db, collection, name), {
            ...data
        })
    } catch (error) {
        console.log(`Error on saving data to collection ${collection}`);
    }
}