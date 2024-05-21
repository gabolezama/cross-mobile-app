import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COMPONENT_TEST_IDS, STACK } from '../../utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { styles } from './styles';
import { loginRequest } from '../../utils/FirestoreService';
import FormError from '../../Components/FormError/FormError';
import { auth } from '../../../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [showLoginError, setShowLoginError] = useState();
  const navigation = useNavigation();
  const handleTextInput = (text, tag) =>{
    showLoginError && setShowLoginError(null)
    setLoginData({
      ...loginData,
      [tag]: text
    })
  }
  const handleLogin = async() =>{
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
  return (
    <View testID={COMPONENT_TEST_IDS.login} style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handleTextInput(text, 'email')} placeholder='Email'/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Contraseña</Text>
        <TextInput style={styles.input} onChangeText={(text)=>handleTextInput(text, 'password')} placeholder='Password'/>
      </View>
      { showLoginError && <FormError message={showLoginError}/> }
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <Text>Eres nuevo en la app? <Text style={styles.registrationText} onPress={handleRegistration}>REGISTRATE</Text></Text>
    </View>
  )
}