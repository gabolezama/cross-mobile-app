import { SET_MY_LOCATION, SET_USER_NAME } from "../reducers/generalReducer"

export const setMyLocationAction = (location) =>{
    return {
        type: SET_MY_LOCATION,
        payload: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }
}

export const setMyNameAction = (name) =>{
    return {
        type: SET_USER_NAME,
        payload: {
            name
        }
    }
}