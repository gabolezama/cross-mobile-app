
import { useState } from 'react'
import { getDriversInVisibleRegion } from '../../utils/Gateways';

export default function useHomeHook() {
    const [storedLocation, setStoredLocation] = useState(null);
    const [closerDrivers, setCloserDrivers] = useState(null);
    const [markerLocations, setMarkerLocations] = useState(null);
    const [markerNames, setMarkerNames] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [visibleRegion, setVisibleRegion] = useState(null);
    const [requestButton, setShowRequestButton] = useState(false);

    const onRegionChangeComplete = region => {
        setShowRequestButton(true);
        setVisibleRegion(region);
    };

    const onRequestButton = async () => {
        setCloserDrivers(await getDriversInVisibleRegion(visibleRegion));
        setShowRequestButton(false);
    }

    return {
        storedLocation, setStoredLocation,
        closerDrivers, setCloserDrivers,
        markerLocations, setMarkerLocations,
        markerNames, setMarkerNames,
        errorMsg, setErrorMsg,
        requestButton, setShowRequestButton,
        onRequestButton,
        onRegionChangeComplete
    }
}