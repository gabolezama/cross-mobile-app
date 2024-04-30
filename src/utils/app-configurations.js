import { db } from "../../firebase-config";
import * as Location from 'expo-location';
import { setMyLocationAction } from "../Store/actions/generalActions";
import store from "../Store";

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
        store.dispatch(setMyLocationAction({latitude, longitude}))
    } catch (error) {
        store.dispatch(setMyLocationAction({latitude: 0, longitude: 0}))
    } 
}

export const saveUserLocation = async (location) =>{

    if (location) {
      try {
        const docRef = await addDoc(collection(db, LOCATIONS_COLLECTION), {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        })
        console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.log("Error in adding a new document to DB", error);
      }
    }else{
        return
    }
}