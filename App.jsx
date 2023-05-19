import React, { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomSidebarMenu from './src/components/sidebar/CustomSidebarMenu';

import Home from './src/screens/home/Home';
import MorphCast from './src/components/morphcast/MorphCast';
import Backup from './src/screens/backup/Backup';
import SignUp from './src/screens/signup/SignUp';
import { getUserName } from './src/utils/dataService';

const Drawer = createDrawerNavigator();

function App() {
  const [background, setBackground] = useState(false);
  const [isLogged, setisLogged] = useState(null);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (newState) => {
      if (newState == 'active') {
        setBackground(false);
      }
      else if (newState == 'background') {
        setBackground(true);
      }
    });

    getUserName().then((value) => { setisLogged(value != null) });
    return () => sub.remove();
  }, []);


  if (isLogged !== null) {
    return (
      isLogged
        ? (
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
                name="Backup"
                options={{
                  drawerLabel: 'Copia de datos',
                  title: "Copia de datos"
                }}
                component={Backup}
              />
            </Drawer.Navigator>
            {!background ? <MorphCast/> : null}
          </NavigationContainer>
        )
        :
        (
          <SignUp change={setisLogged} />
        )
    );
  }

  return (<></>)
}

export default App;
