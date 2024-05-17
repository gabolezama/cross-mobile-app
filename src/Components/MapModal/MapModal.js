import { View, Modal, Button, TextInput, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles';
import { getCoordinates } from '../../utils/Gateways';
import { useSelector } from 'react-redux';

export default function MapModal({
  travelData,
  visible,
  onAccept,
  onClose,
  clearRoute
}) {
    const travelPrice = useSelector(state => state.general.settings.price)
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (text) => {
        setInputValue(text);
    };
    const handleAddButton = async () => {
        onAccept(await getCoordinates(inputValue), inputValue)
    };
  const isGetRouteOk = inputValue.length < 8 || !!travelData;
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
            { travelData &&
              <View>
                <Text>Información de tu viaje:</Text>
                <Text>Distancia: {travelData.distanceMeters}m</Text>
                <Text>Duracion: {travelData.duration}</Text>
                <Text>Precio: {(travelData.distanceMeters*travelPrice)/500}</Text>
                <Text>NOTA: Si deseas un nuevo viaje, debes cancelar este primero.</Text>
              </View>
            }
            <View style={styles.buttonsContainer}>
              <Button title="Viajar!" onPress={handleAddButton} disabled={isGetRouteOk}/>
              <Button title="Ir al Mapa" onPress={() => onClose()} />
              <Button title="Cancelar" onPress={clearRoute} disabled={!travelData}/>
            </View>
          </View>
        </View>
      </Modal>
  )
}