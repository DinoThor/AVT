import React, { useEffect, useState } from 'react';

import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './components/sidebar/CustomSidebarMenu';

import Home from './components/screens/home/Home';
import Notifications from './components/screens/notifications/Notifications';
import Settings from './components/screens/notifications/Notifications';

import MorphCast from './components/morphcast/MorphCast';

import useGetOnboardingStatus from './utils/useGetOnboardingStatus';

//var RNFS = require('react-native-fs');

const Drawer = createDrawerNavigator();

function App() {
  // const [user, setUser] = useState(null);

  // const { isFirstLaunch, isLoading } = useGetOnboardingStatus();

  // const basePath = RNFS.DocumentDirectoryPath;
  // useEffect(() => {
  //   RNFS.exists(basePath + "/userdata/database.db")
  //     .then((exists) => {
  //       if (!exists) {
  //         RNFS.copyFile(basePath + "/database/default/database.db", basePath + "/userdata/")
  //       }
  //     })
  // })

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
      <MorphCast />
    </NavigationContainer>
  );
}

export default App;
