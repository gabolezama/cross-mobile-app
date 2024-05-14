import { db } from "../../firebase-config";
import * as Location from 'expo-location';
import { collection, doc, getDocs, query, setDoc, where, orderBy } from 'firebase/firestore';
import { decode } from '@mapbox/polyline';

export const LOCATIONS_COLLECTION = "ubicaiones";

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
        console.log("Documento creado/modificado: ", name);
      } catch (error) {
        console.log("Error in adding a new document to DB", error);
      }
    }else{
        return
    }
}

export const getRoute = async (origin, destination) => {
  const originCoords = `${origin.latitude},${origin.longitude}`;
  const destinationCoords = `${destination.latitude},${destination.longitude}`;
  const apiUrl = `https://routes.googleapis.com/directions/v2:computeRoutes`;
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
    const route = data.routes[0].polyline;
    const decodedRoute = decode(route.encodedPolyline);
    return decodedRoute.map(([latitude, longitude])=>{
      return {
        latitude,
        longitude
      }
    });
  } catch (error) {
    console.error('Error in function (getRoute):', error);
  }
};

export const getDestinationGeocoding = async (direction) =>{
try {
    if(!direction){
      console.log('Error al intentar geocoding: Campo destino está vacío')
      return
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(direction)}&key=AIzaSyAm444c0u_NouSz5nNe1pQO8Rd2uuTrJzw`;
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