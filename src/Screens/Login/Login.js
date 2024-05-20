import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { COMPONENT_TEST_IDS } from '../../utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setMyNameAction } from '../../Store/actions/generalActions';
import { styles } from './styles';
import { loginRequest } from '../../utils/FirestoreService';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleTextInput = (text, tag) =>{
    setLoginData({
      ...loginData,
      [tag]: text
    })
  }
  const handleLogin = async() =>{
    const isAnyFieldEmpty = !['email', 'password'].every(key => Object.keys(loginData).includes(key));
    if(isAnyFieldEmpty){
      Alert.alert('Todos los campos son requeridos!!');
      return;
    }
    const loginStatus = await loginRequest(loginData.email, loginData.password)
    console.log('LOGINSTATUS: ', loginStatus);
    if(loginStatus){
      dispatch(setMyNameAction(loginData?.email));
      navigation.navigate('Home');
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <Text>Eres nuevo en la app? <Text style={styles.registrationText} onPress={handleRegistration}>REGISTRATE</Text></Text>
    </View>
  )
}