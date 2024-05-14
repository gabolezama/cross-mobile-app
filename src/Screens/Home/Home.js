import { View, Text, TouchableOpacity, Button, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getDriversInVisibleRegion, saveUserLocation } from '../../utils/Gateways';
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
  
  const {
    isSearch,
    routeCoordinates, setRouteCoordinates,
    storedLocation, setStoredLocation,
    closerDrivers, setCloserDrivers,
    markerLocations, setMarkerLocations,
    markerNames, setMarkerNames,
    errorMsg, setErrorMsg,
    showBelowModal, setShowBelowModal,
    handleAddTravel,
    onRequestButton,
    onRegionChangeComplete
  } = useHomeHook(userName);

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
    return (
      <View style={styles.container}>
      
      {storedLocation && markerLocations? (
        <>
        <View style={styles.buttonGetRoute}>
          <Button 
            title="Clear Route"
            onPress={() => setRouteCoordinates([])} 
        />
        </View>  
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
      
        <Text style={styles.reqButtonText}>Agenda tu viaje!</Text>
        <TouchableOpacity style={styles.iconContainer} onPress={() => isSearch? onRequestButton() : setShowBelowModal(true)}>
          <Ionicons name={isSearch? "search-outline" : "add"} color="white" style={styles.icon}/>
        </TouchableOpacity>
        <MapModal 
          visible={showBelowModal} 
          onAccept={handleAddTravel}
          onClose={() => setShowBelowModal(false)}
        />
        </>
      ): (
        <>
          <ActivityIndicator size={70} color="#0000ff" />
          <Text>Cargando...</Text>
        </>
      )}
    </View>
    );
}