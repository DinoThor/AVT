import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { isOnGoing, setSessionId, setSessionOnGoing, _retrieveData } from './components/utils/asyncStorage';
import { createSesion } from './components/utils/dataService';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './components/sidebar/CustomSidebarMenu';

import Home from './components/screens/home/Home';
import Notifications from './components/screens/notifications/Notifications';
import Settings from './components/screens/notifications/Notifications';
import FeedBack from './components/screens/feedback/FeedBack';
import MorphCast from './components/morphcast/MorphCast';


const Drawer = createDrawerNavigator();

function App() {
  const checkSession = async () => { return await isOnGoing(); }

  const CreateNewSession = async () => {
    createSesion().then((id) => setSessionId(id))
    setSessionOnGoing();
  }

  var onGoing = true;
  checkSession().then((value) => onGoing = value);
  if (!onGoing) { CreateNewSession(); }
  console.log(onGoing)

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
          initialParams={{ isFeedBack: onGoing }}
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
      <MorphCast />
    </NavigationContainer>
  );
}

export default App;
