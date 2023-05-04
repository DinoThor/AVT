import React, { useEffect, useState } from 'react';

import {
  AppState,
  NativeModules,
  PermissionsAndroid
} from 'react-native';

import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import {
  isOnGoing,
  setSessionId,
  _storeData
} from './src/utils/asyncStorage';
import { createSesion } from './src/utils/dataService';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './src/components/sidebar/CustomSidebarMenu';

import Home from './src/screens/home/Home';
import Settings from './src/screens/settings/Settings';
import MorphCast from './src/components/morphcast/MorphCast';

var RNFS = require('react-native-fs');

const Drawer = createDrawerNavigator();
const { ServerModule } = NativeModules;




function App() {
  const [background, setBackground] = useState(false);

  
  useEffect(() => {
    //ServerModule.createServer();

    const handleChange = (newState) => {
      if (newState == 'active') {
        setBackground(false);
        isOnGoing().then((value) => {
          if (!value) createSesion().then((id) => {
            setSessionId(id)
          })
        });
        setTimeout(() => SplashScreen.hide(), 500)
      }
      else if (newState == 'background') {
        setBackground(true);
      }
    }

    const sub = AppState.addEventListener('change', handleChange);

    return () => sub.remove()

  }, []);


  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{
            headerShown: false,
            drawerLabel: 'Pantalla principal'
          }}
          component={Home}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Ajustes',
            title: "Ajustes"
          }}
          component={Settings}
        />
      </Drawer.Navigator>
      {/* {!background ? <MorphCast /> : null} */}
    </NavigationContainer>
  );
}

export default App;
