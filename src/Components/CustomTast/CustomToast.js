import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles.js'

export const CustomToast = ({ text1, text2 }) => {
  return (
    <View style={styles.customToast}>
    <Text style={styles.text1}>{text1}</Text>
    <Text style={styles.text2}>{text2}</Text>
  </View>
  )
}