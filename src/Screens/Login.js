import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COMPONENT_TEST_IDS } from '../utils/Constants'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const navigation = useNavigation();
  return (
    <View testID={COMPONENT_TEST_IDS.login}>
      <Text>User</Text>
      <TextInput placeholder='User'/>
      <Text>Password</Text>
      <TextInput placeholder='Password'/>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Ir a Home</Text>
      </TouchableOpacity>
    </View>
  )
}