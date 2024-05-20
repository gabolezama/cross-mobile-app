import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import {newUserRegistration} from "../../utils/FirestoreService"
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Registration() {
    const [loginData, setLoginData] = useState({});
    const navigation = useNavigation();
    const handleTextInput = (text, tag) =>{
        setLoginData({
          ...loginData,
          [tag]: text
        })
    }
    const formFields = ['name', 'phone', 'document', 'password'];
    const formFieldLabels = ['Nombre Completo', 'Numero de Telefono', 'Numero de Documento', 'Contraseña'];
    const handleRegistration = () =>{
        const isAnyFieldEmpty = !formFields.every(key => Object.keys(loginData).includes(key));
        if(isAnyFieldEmpty){
            Alert.alert('Todos los campos son requeridos!!');
            return;
        }
        const registrationStatus = newUserRegistration(loginData.name, loginData.password)
        if(registrationStatus){
            Alert.alert('Usuario Registrado Exitosamente!');
            navigation.navigate('Login')
        }else{

        }
    }
  return (
    <View style={styles.container}>
      {
        formFields.map((field, index)=>(
            <View key={field} style={styles.inputContainer}>
                <Text style={styles.text}>{formFieldLabels[index]}</Text>
                <TextInput 
                    value={loginData[field]} 
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
    </View>
  )
}