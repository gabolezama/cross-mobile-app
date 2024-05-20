import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function FormError({message}) {
  return (
    <View style={styles.continer}>
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    continer:{
        backgroundColor: '#edabab',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#f76a6a',
        padding: 10,
        width: '50%'
    },
    text:{
        textAlign: 'center'
    }
})