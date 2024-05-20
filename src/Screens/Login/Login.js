import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { COMPONENT_TEST_IDS } from '../../utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setMyNameAction } from '../../Store/actions/generalActions';
import { styles } from './styles';
import { loginRequest } from '../../utils/FirestoreService';
import Toast from 'react-native-toast-message';
import FormError from '../../Components/FormError/FormError';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [showLoginError, setShowLoginError] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleTextInput = (text, tag) =>{
    showLoginError && setShowLoginError(null)
    setLoginData({
      ...loginData,
      [tag]: text
    })
  }
  const handleLogin = async() =>{
    const loginStatus = await loginRequest(loginData.email, loginData.password);
    if(typeof loginStatus === 'boolean'){
      dispatch(setMyNameAction(loginData?.email));
      navigation.navigate('Home');
    }else{
      setShowLoginError(loginStatus)
    }
  }
  const handleRegistration = () =>{
    navigation.navigate('Registration');
  }
  return (
    <View testID={COMPONENT_TEST_IDS.login} style={styles.container}>
      {/* <Image style={styles.image} source={require("../../../assets/vehicle-logo.jpg")}/> */}
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