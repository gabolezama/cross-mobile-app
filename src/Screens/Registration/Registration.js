import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import {newUserRegistration} from "../../utils/FirestoreService"
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function Registration() {
    const [registrationData, setRegistrationData] = useState({});
    const navigation = useNavigation();
    const handleTextInput = (text, tag) =>{
        setRegistrationData({
          ...registrationData,
          [tag]: text
        })
    }
    const formFields = ['name', 'email', 'phone', 'document', 'password'];
    const formFieldLabels = ['Nombre Completo', 'Email', 'Numero de Telefono', 'Numero de Documento', 'Contraseña'];
    const handleRegistration = async() =>{
        const isAnyFieldEmpty = !formFields.every(key => Object.keys(registrationData).includes(key));
        if(isAnyFieldEmpty){
            Toast.show({type: 'info', text1: 'Registro:', text2: 'Todos los campos son requeridos!'});
            return;
        }
        const registrationStatus = await newUserRegistration(registrationData, navigation)
        if(typeof registrationStatus === 'boolean'){
            Toast.show({type: 'success', text1: 'Registro:', text2: 'Usuario registrado exitosamente.'});
            navigation.navigate('Login')
        }else{
            Toast.show({type: 'error',text1: 'Registro:', text2: `${registrationStatus}`});
        }
    }
  return (
    <View style={styles.container}>
      {
        formFields.map((field, index)=>(
            <View key={field} style={styles.inputContainer}>
                <Text style={styles.text}>{formFieldLabels[index]}</Text>
                <TextInput
                    style={styles.input} 
                    onChangeText={(text)=>handleTextInput(text, `${field}`)} 
                />
            </View>
        ))
      }
      <TouchableOpacity style={styles.loginButton} onPress={handleRegistration}>
        <Text>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text>Cancelar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  )
}