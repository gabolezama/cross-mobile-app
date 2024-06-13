import 'react-native-get-random-values';
import { db } from "../../firebase-config";
import * as Location from 'expo-location';
import { collection, doc, getDocs, query, setDoc, where, orderBy, deleteDoc, getDoc} from 'firebase/firestore';
import { decode } from '@mapbox/polyline';
import { v4 as uuidv4 } from 'uuid';
import { Alert } from 'react-native';

export const LOCATIONS_COLLECTION = "ubicaiones";
export const USERS_COLLECTION = "usersInfo";
export const TRAVELS_COLLECTION = "travels";
export const SETTINGS_COLLECTION = "appSettings";
export const SESSIONS_COLLECTION = "sessions";

export const getAppSettings = async () =>{
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, "travels");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log('Error on getting appSettings: ', error.message);
  }
}

export const requestLocationPermission = async () => {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        return status
    } catch (error) {
        console.log('Error: request for location permissions');
        return error
    }
}

export const getUserLocation = async () =>{
    try {
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({});
        return {latitude, longitude}
        // store.dispatch(setMyLocationAction({latitude, longitude}))
    } catch (error) {
      return null
        // store.dispatch(setMyLocationAction({latitude: 0, longitude: 0}))
    }
}

export const getCloserDrivers = async(lat) =>{
  try {
    const radius = 5;
    const drivers = [];
    const q = query(collection(db, "drivers"), where('latitude', '<=', lat));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      drivers.push({ [doc.id]: doc.data()})
    });
    return drivers;
  } catch (error) {
    console.log("Error al obtener los drivers cercanos: ", error);
  }
}

export const getDriversInVisibleRegion = async (region) => {
  try {
      if (region) {
          const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
          const north = latitude + latitudeDelta / 2;
          const south = latitude - latitudeDelta / 2;
          const east = longitude + longitudeDelta / 2;
          const west = longitude - longitudeDelta / 2;

          let foundInWindow = [];
          const q = query(
            collection(db, "drivers"),
                where('latitude', '>=', south),
                where('latitude', '<=', north),
                where('longitude', '>=', west),
                where('longitude', '<=', east),
                orderBy('latitude'),
                orderBy('longitude')
            );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach(doc => {
              foundInWindow.push({
                  [doc.id]:{
                      ...doc.data()
                  }
              })
          });
          return foundInWindow;
        }
  } catch (error) {
      console.log("Error al encontrar driver en el cambio de ventana: ", error);
  }

};

export const saveUserLocation = async (location, name) =>{
    if (location) {
      try {
        await setDoc(doc(db, LOCATIONS_COLLECTION, name), {
          latitude: location.latitude,
          longitude: location.longitude
        })
        console.log(`saveUserLocation: Documento creado/modificado --> ${name}`)
      } catch (error) {
        console.log(`Error in adding a new document to DB: ${LOCATIONS_COLLECTION}`, error);
      }
    }else{
      console.log(`saveUserLocation: data location is missing`)
    }
  }

export const saveTravelPolyline = async (polyline, storedLocation, destinationName, userName) =>{
    if (polyline) {
      try {
        const travelId = uuidv4();
        const origin = await Location.reverseGeocodeAsync({
          latitude: storedLocation.latitude,
          longitude: storedLocation.longitude
        });
        const {street, streetNumber} = origin[0];
        await setDoc(doc(db, TRAVELS_COLLECTION, travelId), {
          polyline,
          isActive: false,
          origin: `${street} ${streetNumber}`,
          destination: destinationName,
          userName
        })
        console.log(`saveTravelPolyline: Documento creado/modificado --> ${destinationName}`);
      } catch (error) {
        console.log(`Error in adding a new document to DB: ${TRAVELS_COLLECTION}`, error);
      }
    }else{
      console.log(`saveTravelPolyline: data polyline is missing`)
    }
}

export const getRoute = async (origin, destination) => {
  const apiUrl = `https://routes.googleapis.com/directions/v2:computeRoutes`;
  if(!origin || !destination){
    Alert.alert('No se encontró el sitio indicado. Por favor, si puede, aporte mas información.');
    console.log('(getRoute): destination/origin data is missing');
    return
  }
  try {
    const response = await fetch(apiUrl,{
      method: 'POST',
      headers:{
        'Content-Type': 'aplication/json',
        'X-Goog-Api-Key': 'AIzaSyAm444c0u_NouSz5nNe1pQO8Rd2uuTrJzw',
        'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline'
      },
      body:JSON.stringify({
        "origin":{
          "location":{
            "latLng":{
              "latitude": origin.latitude,
              "longitude": origin.longitude
            }
          }
        },
        "destination":{
          "location":{
            "latLng":{
              "latitude": destination.latitude,
              "longitude": destination.longitude
            }
          }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "departureTime": "2024-10-15T15:01:23.045123456Z",
        "computeAlternativeRoutes": false,
        "routeModifiers": {
          "avoidTolls": false,
          "avoidHighways": false,
          "avoidFerries": false
        },
        "languageCode": "en-US",
        "units": "IMPERIAL"
      })
    });
    const data = await response.json();
    const {polyline, distanceMeters, duration} = data.routes[0];
    const decodedRoute = decode(polyline.encodedPolyline);
    const polylineCoords = 
      decodedRoute.map(([latitude, longitude])=>{
        return {
          latitude,
          longitude
        }
      });
    return {
      distanceMeters,
      duration,
      polylineCoords
    }
  } catch (error) {
    console.error('Error in function (getRoute):', error);
  }
};

export const clearPolylineOnDB = async (userName) =>{
  try {
    const q = query(collection(db, TRAVELS_COLLECTION), where("userName", "==", userName));
    const querySnapshot = await getDocs(q);
    const docIds = [];
    querySnapshot.forEach((doc) => {
      docIds.push(doc.id);
    });
    
    if(docIds.length > 0){
      await deleteDoc(doc(db, TRAVELS_COLLECTION, docIds[0]))
      console.log(`clearPolylineOnDB: Polylines for user ${userName} were succesfully erased`);
    }
    else
      console.log(`clearPolylineOnDB: There aren't polylines for user: ${userName}`);
  } catch (error) {
    console.log(`clearPolylineOnDB: Error ${error}`);
  }

}

// Geocoding con EXPO
export const getCoordinates = async (address) => {
  if (!address) {
    console.log('(getCoordinates): address data is missing');
    return null;
  }
  try {
    const geocode = await Location.geocodeAsync(address);
    if (geocode.length > 0) {
      const {latitude, longitude} = geocode[0];
      return {
        latitude,
        longitude
      }
    } else {
      console.log('Not results found for this address');
    }
  } catch (error) {
    console.log('Error on getting coodinates', error.message);
  }
};
// Geocoding con API de google maps
export const getDestinationGeocoding = async (direction) =>{
try {
    if(!direction){
      console.log('Error al intentar geocoding: Campo destino está vacío')
      return
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direction)}&key=${process.env.EXPO_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK') {
      // Extraer las coordenadas de la respuesta
      const latitude = data.results[0].geometry.location.lat;
      const longitude = data.results[0].geometry.location.lng;
      console.log(`Coordenadas de la dirección "${direction}":`);
      console.log(`Latitud: ${latitude}`);
      console.log(`Longitud: ${longitude}`);
      return {
        latitude,
        longitude
      }
    }
  } catch (error) {
    throw new Error('Error al intentar geocoding: ', error)
  }
}