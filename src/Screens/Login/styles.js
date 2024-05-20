import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    inputContainer:{
        width: '50%',
        margin: 10
    },
    text:{
        alignSelf: 'center'
    },
    input:{
        padding: 2,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center'
    },
    loginButton:{
        width: '25%',
        height: 50,
        margin: 10,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'cover', // Puedes cambiarlo a 'contain', 'stretch', etc. según necesites
    },
    registrationText:{
        color: 'blue',
        textDecorationLine: 'underline'
    }
})