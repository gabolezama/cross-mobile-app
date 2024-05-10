import { View, Modal, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';

export default function MapModal(props) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    const handleButtonPress = () => {
        // Aquí puedes realizar alguna acción con el valor del input
        console.log('Input value:', inputValue);
        props.onClose()
    };
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa algo"
              onChangeText={handleInputChange}
            />
            <Button title="Guardar" onPress={handleButtonPress} />
          </View>
        </View>
      </Modal>
  )
}