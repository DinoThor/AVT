import React, { useState, useEffect, createContext, useContext } from 'react';

import 'react-native-gesture-handler';
import asyncStorage, { getSessionId, isOnGoing, setSessionId, _retrieveData } from './components/utils/asyncStorage';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './components/sidebar/CustomSidebarMenu';

import Home from './components/screens/home/Home';
import Notifications from './components/screens/notifications/Notifications';
import Settings from './components/screens/notifications/Notifications';
import MorphCast from './components/morphcast/MorphCast';
import { setSesion, } from './components/utils/dataService';

const Drawer = createDrawerNavigator();
const SessionContext = createContext(null);

function App() {
  useEffect(() => {
    const getSession = async () => {
      var onGoing = await isOnGoing();
      if (!onGoing) { setNewSession(); }
    }

    const setNewSession = async () => {
      var id = await setSesion();
      setSessionId(id);
    }

    getSession();
  }, [])

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
      <MorphCast/>
    </NavigationContainer>
  );
}

export default App;
