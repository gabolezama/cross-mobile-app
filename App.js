import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home/Home';
import Login from './src/Screens/Login';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/Store';
import { useEffect } from 'react';
import { getAppSettings } from './src/utils/Gateways';
import { setAppSettings } from './src/Store/actions/generalActions';
const Stack = createStackNavigator();

export default function App() {
  useEffect(()=>{
    (async() =>{
      const settings = await getAppSettings();
      store.dispatch(setAppSettings(settings))
    })()
  },[])
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
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
