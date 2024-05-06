import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getCloserDrivers, saveUserLocation } from '../../utils/app-configurations';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import CarMarket from '../../Icons/CarMarket';
import useHomeHook from './useHomeHook';

export default function Home(props) {
  const navigation = useNavigation();
  const userName = useSelector( state => state.general.userName);
  const {
    storedLocation, setStoredLocation,
    closerDrivers, setCloserDrivers,
    markerLocations, setMarkerLocations,
    markerNames, setMarkerNames,
    errorMsg, setErrorMsg,
    onRegionChangeComplete
  } = useHomeHook();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación no concedido');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setStoredLocation(location.coords);
    })();
  }, []);

  useEffect(()=>{
    if(storedLocation){
      const {latitude, longitude} = storedLocation;
      saveUserLocation({latitude, longitude}, userName);
      getCloserDrivers(storedLocation.latitude)
      .then(res => setCloserDrivers(res));
    }
  },[storedLocation])
  
  useEffect(()=>{
    if(storedLocation && closerDrivers){
      
      const allMarkers = [
        ...closerDrivers, 
        {
          user:{
            latitude: storedLocation.latitude,
            longitude: storedLocation.longitude
          }
        }
      ];
      let markerLocations = [], markerNames = [];
        allMarkers.forEach( mkObj =>{
            markerLocations = [...markerLocations, ...Object.entries(mkObj).map(([key, value]) => value)];
            markerNames = [... markerNames, ...Object.entries(mkObj).map(([key, value]) => key)]
        })
      setMarkerLocations(markerLocations);
      setMarkerNames(markerNames);
    }
  }, [closerDrivers])
  
    return (
      <View style={styles.container}>
      {storedLocation && markerLocations? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: storedLocation.latitude,
            longitude: storedLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={onRegionChangeComplete}
        >
        {
          markerLocations.map((mk, index)=>{
            return(
              <Marker
                key={markerNames[index]}
                coordinate={{
                  latitude: mk.latitude,
                  longitude: mk.longitude,
                }}
                title={markerNames[index]}
              >
                <CarMarket/>
              </Marker>
          )})
        }
        </MapView>
      ) : (
        <Text>Cargando datos...</Text>
      )}

    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});