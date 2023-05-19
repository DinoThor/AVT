import { useEffect, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  AppState
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../mood/MoodPicker'
import ContextPicker from '../context/ContextPicker';
import FeedBackScreen from '../feedback/FeedBack';

import { createSesion, lastSession } from '../../utils/dataService';
import SplashScreen from '../../components/splashScreen/SplashScreen';

const Stack = createStackNavigator();

function Home() {
  const [FeedBack, setFeedBack] = useState(null);

  function askFeedBack() {
    lastSession().then((values) => {
      if (values == undefined) {
        createSesion();
        setFeedBack(false);
        return;
      }

      if (values['mood_inicial'] > 0 && values['mood_final'] == 0)
        setFeedBack(true);
      else if (values['mood_inicial'] > 0 && values['mood_final'] != 0) {
        createSesion();
        setFeedBack(false);
      } else {
        setFeedBack(false);
      }
    })
  }

  useEffect(() => {
    askFeedBack();
    const handleChange = (newState) => {
      if (newState == 'active') askFeedBack();
    }
    const sub = AppState.addEventListener('change', handleChange);
    return () => { sub.remove() }
  }, []);


  return (
    FeedBack != null ?
      (
          <Stack.Navigator>
            {!FeedBack ?
              <>
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
                  initialParams={{cleanScreen: setFeedBack}}
                />
              </>
              :
              <Stack.Screen
                name="FeedBack"
                component={FeedBackScreen}
                options={{
                  headerShown: false
                }}
                styles={styles.home}
                initialParams={{cleanScreen: setFeedBack}}
              />
            }
          </Stack.Navigator>
      )
      :
      (
        <SplashScreen />
      )
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});

export default Home;