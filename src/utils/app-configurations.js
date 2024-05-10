import { db } from "../../firebase-config";
import * as Location from 'expo-location';
import { collection, doc, getDocs, query, setDoc, where, orderBy, collectionGroup } from 'firebase/firestore';

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
        console.log('DATA: ', latitude, longitude);
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
              console.log(doc.id, ' => ', doc.data());
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