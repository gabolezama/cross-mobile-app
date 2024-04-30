import { View, Text } from 'react-native'
import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase-config';

export default function Home(props) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        // Envía la ubicación a Firebase
        if (location) {
          try {
            const docRef = await addDoc(collection(db, "ubicaciones"), {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            })
            console.log("Document written with ID: ", docRef.id);
          } catch (error) {
            console.log("Error in adding a new document tu DB", error);
          }
        }
      })();
    }, []);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {errorMsg && <Text>{errorMsg}</Text>}
        {location && (
          <Text>
            Ubicación: {location.coords.latitude}, {location.coords.longitude}
          </Text>
        )}
      </View>
    );
}