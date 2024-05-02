import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { saveUserLocation } from '../../utils/app-configurations';

export default function Home(props) {
  const navigation = useNavigation();
  const storedLocation = useSelector( state => state.general.myLocation);
  const userName = useSelector( state => state.general.userName);

  if(storedLocation){
    const {latitude, longitude} = storedLocation;
    saveUserLocation({latitude, longitude}, userName);
  }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {`Ubicación: 
            Latitude: ${storedLocation.latitude}
            Longitude: ${storedLocation.longitude}`}
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text>Ir a Login</Text>
          </TouchableOpacity>
      </View>
    );
}