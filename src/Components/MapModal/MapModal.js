import { View, Modal, Button, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { getDestinationGeocoding } from '../../utils/Gateways';

export default function MapModal({
  visible,
  onAccept,
  onClose
}) {
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    const handleAddButton = async () => {
        onAccept(await getDestinationGeocoding(inputValue))
        onClose()
    };
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Ingrese la direccion de destino. La direccion debe superar los 10 caracteres.</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              // placeholder="Ingresa la direccion destino"
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <View style={styles.buttonsContainer}>
              <Button title="Viajar!" onPress={handleAddButton} disabled={inputValue.length < 8}/>
              <Button title="Cancelar" onPress={() => onClose()} />
            </View>
          </View>
        </View>
      </Modal>
  )
}