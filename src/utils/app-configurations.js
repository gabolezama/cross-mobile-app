import { db } from "../../firebase-config";
import * as Location from 'expo-location';
import { setMyLocationAction } from "../Store/actions/generalActions";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";

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
    console.log('EN SERVI: ', drivers);
    return drivers;
  } catch (error) {
    console.log("Error al obtener los drivers cercanos: ", error);
  }
}

export const saveUserLocation = async (location, name) =>{

    if (location) {
      try {
        await setDoc(doc(db, LOCATIONS_COLLECTION, name), {
          latitude: location.latitude,
          longitude: location.longitude
        })
        console.log("Document written with ID: ");
      } catch (error) {
        console.log("Error in adding a new document to DB", error);
      }
    }else{
        return
    }
}