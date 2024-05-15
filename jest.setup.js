jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockReturnValue("mockUser")
}))
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getFirestore: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));
jest.mock('expo-location', () =>({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({status: 'granted'}),
  getCurrentPositionAsync: jest.fn().mockReturnValue({
      coords:{
        latitude: 123,
        longitude: 456
      }
  })
}))
jest.mock("./src/utils/Gateways", () =>({
  getDriversInVisibleRegion: jest.fn().mockResolvedValue([
      {"driver1":{
          latitude: 112233,
          longitude: 445566
      }},
      {"driver2":{
          latitude: 778899,
          longitude: 998877
      }}
  ]),
  saveUserLocation: jest.fn()
}))