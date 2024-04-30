import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function Home(props) {
  const location = useSelector( state => state )
  console.log('STATE: ', location)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            {`Ubicación: 
            Latitude: ${location.general.myLocation.latitude}
            Longitude: ${location.general.myLocation.longitude}`}
          </Text>
      </View>
    );
}