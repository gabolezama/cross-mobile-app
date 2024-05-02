import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { COMPONENT_TEST_IDS } from '../utils/Constants'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setMyNameAction } from '../Store/actions/generalActions';

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
  const handleLogin = () =>{
    const isAnyFieldEmpty = !['name', 'password'].every(key => Object.keys(loginData).includes(key));
    if(isAnyFieldEmpty){
      Alert.alert('Todos los campos son requeridos!!');
      return;
    }
    dispatch(setMyNameAction(loginData?.name));
    navigation.navigate('Home');
  }
  return (
    <View testID={COMPONENT_TEST_IDS.login}>
      <Text>User</Text>
      <TextInput onChangeText={(text)=>handleTextInput(text, 'name')} placeholder='User'/>
      <Text>Password</Text>
      <TextInput onChangeText={(text)=>handleTextInput(text, 'password')} placeholder='Password'/>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Ir a Home</Text>
      </TouchableOpacity>
    </View>
  )
}