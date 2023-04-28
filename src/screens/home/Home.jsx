import { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  AppState
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../mood/MoodPicker'
import ContextPicker from '../context/ContextPicker';
import { FeedBackPage } from '../feedback/FeedBack';
import { askFeedBack } from '../../utils/asyncStorage';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

function Home() {
  const [feedBack, setfeedBack] = useState(false);

  useEffect(() => {
    const handleChange = (newState) => {
      if (newState == 'active') {
        askFeedBack().then((value) => setfeedBack(value))
      };
    }

    const sub = AppState.addEventListener('change', handleChange);
    setTimeout(() => SplashScreen.hide(), 500)
    return () => { sub.remove() }
  }, []);

  if (!feedBack)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ContextPicker"
          component={ContextPicker}
          options={{
            headerShown: false,
          }}
          styles={styles.home}
        />
        <Stack.Screen
          name="MoodPicker"
          component={MoodPicker}
          options={{
            headerShown: false
          }}
          styles={styles.home}
        />
      </Stack.Navigator>
    );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedBack"
        component={FeedBackPage}
        options={{
          headerShown: false
        }}
        styles={styles.home}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 20
  }
});

export default Home;