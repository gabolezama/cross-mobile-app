import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getDriversInVisibleRegion, getRoute, saveUserLocation } from '../../utils/Gateways';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, } from 'react-native-maps';
import CarMarket from '../../Icons/CarMarket';
import useHomeHook from './useHomeHook';
import PersonMarker from '../../Icons/PersonMarker';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import MapModal from '../../Components/MapModal/MapModal';

export default function Home(props) {
  const navigation = useNavigation();
  const userName = useSelector( state => state.general.userName);
  const [routeCoordinates, setRouteCoordinates] = useState(null)
  const [showBelowModal, setShowBelowModal] = useState(false)
  const {
    storedLocation, setStoredLocation,
    closerDrivers, setCloserDrivers,
    markerLocations, setMarkerLocations,
    markerNames, setMarkerNames,
    errorMsg, setErrorMsg,
    requestButton, onRequestButton,
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
      setStoredLocation({
        [userName]: location.coords
      });
    })();
  }, []);

  useEffect(()=>{
    if(storedLocation){
      const {latitude, longitude} = storedLocation[userName];
      saveUserLocation({latitude, longitude}, userName);
      getDriversInVisibleRegion({
        latitude: storedLocation[userName].latitude,
        longitude: storedLocation[userName].longitude,
        latitudeDelta: 0.00222,
        longitudeDelta: 0.00321,
      })
      .then(res => setCloserDrivers(res));
    }
  },[storedLocation])
  
  useEffect(()=>{
    if(storedLocation && closerDrivers){
      
      const allMarkers = [
        ...closerDrivers, 
        storedLocation
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
  const destination = {latitude: -34.5909087, longitude: -58.4352522}
    return (
      <View style={styles.container}>
      <View style={styles.buttonGetRoute}>
        <Button 
        title="Get Route"
        onPress={async() => setRouteCoordinates(await getRoute(storedLocation[userName], destination))} 
        />
      </View>  
      {storedLocation && markerLocations? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: storedLocation[userName].latitude,
            longitude: storedLocation[userName].longitude,
            latitudeDelta: 0.00222,
            longitudeDelta: 0.00321,
          }}
          onRegionChangeComplete={onRegionChangeComplete}
        >
        {routeCoordinates !== null && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={5}
            strokeColor="blue"
          />
        )}
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
                {markerNames[index] === 'user' ? <PersonMarker/> : <CarMarket/>}
              </Marker>
          )})
        }
        </MapView>
      ) : (
        <Text>Cargando datos...</Text>
      )}
      {requestButton && 
        <>
          <Text style={styles.reqButtonText}>Agenda tu viaje!</Text>
          <TouchableOpacity style={styles.iconContainer} onPress={() =>{ setShowBelowModal(true); onRequestButton();}}>
            <Ionicons name="add" color="white" style={styles.icon}/>
          </TouchableOpacity>
        </>
      }
      {showBelowModal&& <MapModal visible={showBelowModal} onClose={() => setShowBelowModal(false)}/>}
    </View>
    );
}