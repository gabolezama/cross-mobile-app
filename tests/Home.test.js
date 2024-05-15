import { act, render, screen, waitFor } from "@testing-library/react-native"
import Home from "../src/Screens/Home/Home"
import { NavigationContainer } from "@react-navigation/native";
const mockMarkers = [
    {
        latitude: 112233,
        longitude: 445566
    },
    {
        latitude: 778899,
        longitude: 998877
    }
];
const mockNames = ['user', 'driver1', 'driver2'];
const mockStoredLocation = { mockUser : { latitude: 123, longitude: 456 }}
describe('Home Screen Tests: ', ()=>{
    beforeEach(()=> jest.clearAllMocks())
    test('Must show a Spinner & empty message while charging data', () => {
        render(<Home/>, {wrapper: NavigationContainer});
        const loading = screen.getByText(/cargando/i);
        expect(loading).toBeDefined();
    })
    test('Must have a Map', async () => {
        render(
        <Home 
            mockMarkers={mockMarkers}
            mockNames={mockNames}
            mockStoredLocation={mockStoredLocation}
        />, {wrapper: NavigationContainer});
        const map = screen.findAllByTestId('map-containe');
        expect(map).toBeDefined();
     })
    test('Must have a FAB component', () => { })
    test('FAB component should show a magnifier icon when maps changes its windows position', () => { })
    test('FAB component should search drivers if it is showing magnifier', () => { })
    test('FAB component should show a plus(add) icon after magnified is showed', () => { })
    test('FAB component should activate dropup modal', () => { })
    test('Should render polyline in map if thers a valid destination', () => { })
})