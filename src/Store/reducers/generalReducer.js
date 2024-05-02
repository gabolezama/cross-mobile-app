export const SET_MY_LOCATION = 'SET_MY_LOCATION';
export const SET_USER_NAME = 'SET_USER_NAME';

const initialState = {
    userName: 'Freddy Lezama',
    myLocation: {
        latitude: 0,
        longitude: 0
    }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case SET_MY_LOCATION:
        return { 
            ...state,
            myLocation: {
                latitude: payload.latitude,
                longitude: payload.longitude,
            }
        }

    case SET_USER_NAME:
        return { 
            ...state,
            userName: payload.name
        }

  default:
    return state
  }
}
