import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/Screens/Home/Home';
import Login from './src/Screens/Login/Login';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/Store';
import { useEffect, useState } from 'react';
import { getAppSettings } from './src/utils/Gateways';
import { setAppSettings } from './src/Store/actions/generalActions';
import Registration from './src/Screens/Registration/Registration';
import { STACK } from './src/utils/Constants';
const Stack = createStackNavigator();

export default function App() {
  useEffect(()=>{
    (async() =>{
      const settings = await getAppSettings();
      store.dispatch(setAppSettings(settings));
    })()
  },[]);
  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              options={{
                headerShown: false
              }} 
              name={STACK.login} 
              component={Login} 
            />
            <Stack.Screen 

              name={STACK.home} 
              component={Home} 
            />
            <Stack.Screen name={STACK.registration} component={Registration} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
