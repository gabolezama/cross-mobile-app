import { SET_APP_SETTINGS, SET_MY_LOCATION, SET_USER_INFO } from "../reducers/generalReducer"

export const setMyLocationAction = (location) =>{
    return {
        type: SET_MY_LOCATION,
        payload: {
            latitude: location.latitude,
            longitude: location.longitude
        }
    }
}

export const setUserInfo = (data) =>{
    return {
        type: SET_USER_INFO,
        payload: {
            ...data
        }
    }
}

export const setAppSettings = (settings) =>{
    return {
        type: SET_APP_SETTINGS,
        payload: {
            settings
        }
    }
}