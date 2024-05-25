import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { sendMailToRecoverPassword } from '../../utils/FirestoreService'

export default function PasswordRecover() {
  const [email, setEmail] = useState(null)
  const handlePasswordRecover = async () =>{
      await sendMailToRecoverPassword(email)
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>Para recuperar tu contraseña introduce el email con el cual te registraste:</Text>
        <Text style={styles.text}>Email</Text>
        <TextInput on style={styles.input} onChangeText={(text)=>setEmail(text.toLowerCase())} placeholder='Email'/>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handlePasswordRecover}>
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  )
}