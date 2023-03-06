import * as React from 'react';
import 'react-native-gesture-handler';

import { View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import CustomSidebarMenu from './CustomSidebarMenu';

import FirstPage from './components/pages/home/Home';
import SecondPage from './components/pages/notifications/Notifications';
import ThirdPage from './components/pages/notifications/Notifications';


const Drawer = createDrawerNavigator();

export default function App() {
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
          component={FirstPage}
        />
        <Drawer.Screen
          name="Notifications"
          options={{
            drawerLabel: 'Notificaciones',
            title: "Notificaciones"
          }}
          component={SecondPage}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerLabel: 'Ajustes',
            title: "Ajustes"
          }}
          component={ThirdPage}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}