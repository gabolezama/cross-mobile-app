import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home';
import Login from './src/Screens/Login';
import { getUserLocation, requestLocationPermission } from './src/utils/app-configurations';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './src/Store';
const Stack = createStackNavigator();

export default function App() {
  const [permission, setPermission] = useState(null);
  
  useEffect(() => {
    executeConfig = async () =>{
      setPermission(await requestLocationPermission());
      await getUserLocation()
    }
    executeConfig();
  }, []);

  console.log('PERMISSION: ', permission);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
