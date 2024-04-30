import { SET_MY_LOCATION } from "../reducers/generalReducer"

export const setMyLocationAction = (location) =>{
    return {
        type: SET_MY_LOCATION,
        payload: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }
}