export const SET_MY_LOCATION = 'SET_MY_LOCATION'

const initialState = {
    myLocation: {
        latitude: 0,
        longitude: 0
    }
}

export default (state = initialState, { type, payload }) => {
    console.log('REDUCER: ', type, payload);
  switch (type) {

  case SET_MY_LOCATION:
    return { 
        ...state,
        myLocation: {
            latitude: payload.latitude,
            longitude: payload.longitude,
        }
    }

  default:
    return state
  }
}
