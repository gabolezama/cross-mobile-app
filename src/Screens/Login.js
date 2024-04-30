import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { COMPONENT_TEST_IDS } from '../Constants'

export default function Login() {
  return (
    <View testID={COMPONENT_TEST_IDS.login}>
      <Text>User</Text>
      <TextInput placeholder='User'/>
      <Text>Password</Text>
      <TextInput placeholder='Password'/>
    </View>
  )
}