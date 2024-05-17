
import { useState } from 'react'
import { saveTravelPolyline, getDriversInVisibleRegion, getRoute, clearPolylineOnDB } from '../../utils/Gateways';

export default function useHomeHook(userName) {
    const [storedLocation, setStoredLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [closerDrivers, setCloserDrivers] = useState(null);
    const [markerLocations, setMarkerLocations] = useState(null);
    const [markerNames, setMarkerNames] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [visibleRegion, setVisibleRegion] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const [showBelowModal, setShowBelowModal] = useState(false);
    const [routeCoordinates, setRouteCoordinates] = useState(null);
    const [travelData, setTravelData] = useState(null);

    const onRegionChangeComplete = region => {
        setIsSearch(true);
        setVisibleRegion(region);
    };

    const onRequestButton = async () => {
        setIsSearch(false);
        setCloserDrivers(await getDriversInVisibleRegion(visibleRegion));
    }
    const handleClearRoute= async () => {
        clearPolylineOnDB(userName);
        setRouteCoordinates([]);
        setTravelData(null)
    }

    const handleAddTravel = async (destination, destinationName) =>{
        const travelData = await getRoute(storedLocation[userName], destination);
        setDestination(destination)
        if(travelData){
            setRouteCoordinates(travelData.polylineCoords)
            saveTravelPolyline(travelData.polylineCoords, storedLocation[userName], destinationName, userName)
            setTravelData(travelData)
        }
    }
    return {
        destination, travelData,
        routeCoordinates, setRouteCoordinates,
        storedLocation, setStoredLocation,
        closerDrivers, setCloserDrivers,
        markerLocations, setMarkerLocations,
        markerNames, setMarkerNames,
        errorMsg, setErrorMsg,
        isSearch, setIsSearch,
        showBelowModal, setShowBelowModal,
        handleAddTravel, handleClearRoute,
        onRequestButton,
        onRegionChangeComplete
    }
}