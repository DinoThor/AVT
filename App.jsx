import * as React from 'react';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import CustomSidebarMenu from './CustomSidebarMenu';

import FirstPage from './components/pages/home/Home';
import SecondPage from './components/pages/notifications/Notifications';
import ThirdPage from './components/pages/notifications/Notifications';




const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={require('./assets/avatar.jpg')}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{ 
            drawerLabel: 'Inicio',
            title: "",
          }}
          component={FirstPage}
        />
        <Drawer.Screen
          name="SecondPage"
          options={{ 
            drawerLabel: 'Notificaciones',
            title: ""
          }}
          component={SecondPage}
        />
        <Drawer.Screen
          name="ThirdPage"
          options={{ 
            drawerLabel: 'Ajustes',
            title: ""
          }}
          component={ThirdPage}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}