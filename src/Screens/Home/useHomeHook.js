import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../../firebase-config';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export default function useHomeHook() {
    const [storedLocation, setStoredLocation] = useState(null);
    const [closerDrivers, setCloserDrivers] = useState(null);
    const [markerLocations, setMarkerLocations] = useState(null);
    const [markerNames, setMarkerNames] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [visibleRegion, setVisibleRegion] = useState(null);

    const onRegionChangeComplete = region => {
        setVisibleRegion(region);
        // Llamar a la función para obtener y filtrar conductores
        getDriversInVisibleRegion(region);
      };
    
      const getDriversInVisibleRegion = async (region) => {
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
                setCloserDrivers(foundInWindow);
              }
        } catch (error) {
            console.log("Error al encontrar driver en el cambio de ventana: ", error);
        }
        
      };

    return {
        storedLocation, setStoredLocation,
        closerDrivers, setCloserDrivers,
        markerLocations, setMarkerLocations,
        markerNames, setMarkerNames,
        errorMsg, setErrorMsg,
        onRegionChangeComplete
    }
}