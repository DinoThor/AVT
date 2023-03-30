import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { isOnGoing, setSessionId, _retrieveData } from './components/utils/asyncStorage';
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
  const [mainWindow, setmainWindow] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      var onGoing = await isOnGoing();
      if (!onGoing) {
        CreateNewSession();
        setmainWindow(true);
      }
    }

    const CreateNewSession = async () => {
      var newSessionId = await createSesion();
      setSessionId(newSessionId);
    }

    checkSession();
  }, [])

  if (mainWindow) {
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
  else {
    return (
      <View>
        <Text>
          Test
        </Text>
      </View>
    );
  }
}

export default App;
