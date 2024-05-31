import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COMPONENT_TEST_IDS, STACK } from '../../utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles';
import { loginRequest } from '../../utils/FirestoreService';
import FormError from '../../Components/FormError/FormError';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
const androidClientId = "784836866281-bjauv9gmn2olkg0mnjg7b63hmmlgqhv3.apps.googleusercontent.com"
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [showLoginError, setShowLoginError] = useState();
  const navigation = useNavigation();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId,
  });
  useEffect(()=>{
    console.log('SUCCESS: ', response);
    if (response?.type === "success") {
    }
    if (response?.type === "error") {
      console.log('Error: ', response);
    }
  },[response])
  const handleTextInput = (text, tag) =>{
    showLoginError && setShowLoginError(null)
    setLoginData({
      ...loginData,
      [tag]: text
    })
  }
  const handleLogin = async() =>{
    setLoginData({email: '', password: ''})
    const loginStatus = await loginRequest(loginData);
    if(typeof loginStatus === 'boolean'){
      navigation.navigate(STACK.home);
    }else{
      setShowLoginError(loginStatus)
    }
  }
  const handleRegistration = () =>{
    navigation.navigate(STACK.registration);
  }
  const handlePasswordRecover = () =>{
    navigation.navigate(STACK.passwordRecover)
  }

  return (
    <View testID={COMPONENT_TEST_IDS.login} style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput on style={styles.input} onChangeText={(text)=>handleTextInput(text.toLowerCase(), 'email')} placeholder='Email'/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handleTextInput(text, 'password')} placeholder='Password'/>
      </View>
      { showLoginError && <FormError message={showLoginError}/> }
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.loginButton, styles.googleButton]} onPress={()=> promptAsync()}>
        <Ionicons name="logo-google" size={24} color="black" />
        <Text>Iniciar sesión con Google</Text>
      </TouchableOpacity>
      <Text style={styles.textContainer}>Eres nuevo en la app? <Text style={styles.registrationText} onPress={handleRegistration}>REGISTRATE</Text></Text>
      <Text>Olvidaste tu contraseña? <Text style={styles.registrationText} onPress={handlePasswordRecover}>haz click acá</Text></Text>
    </View>
  )
}