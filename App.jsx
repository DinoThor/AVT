import React, { useEffect } from 'react';

import { AppState } from 'react-native';

import 'react-native-gesture-handler';
import { isOnGoing, setSessionId, _storeData } from './components/utils/asyncStorage';
import { createSesion } from './components/utils/dataService';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './components/sidebar/CustomSidebarMenu';

import Home from './components/screens/home/Home';
import Notifications from './components/screens/notifications/Notifications';
import Settings from './components/screens/notifications/Notifications';
import MorphCast from './components/morphcast/MorphCast';


const Drawer = createDrawerNavigator();

function App() {
  useEffect(() => {
    const handleChange = (newState) => {
      if (newState == 'active') {
        isOnGoing().then((value) => {
          if (!value) {
            createSesion().then((id) => { setSessionId(id) });
          }
        });
      }
    }


    AppState.addEventListener('change', handleChange);
    return () => { AppState.removeEventListener('change', handleChange) }
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
          name="Notifications"
          options={{
            drawerLabel: 'Notificaciones',
            title: "Notificaciones"
          }}
          component={Notifications}
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
      {/* <MorphCast /> */}
    </NavigationContainer>
  );
}

export default App;
