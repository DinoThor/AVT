import { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  LogBox
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../../statePicker/MoodPicker'
import ContextPicker from '../../statePicker/ContextPicker';
import { FeedBack } from '../feedback/FeedBack';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);

const Stack = createStackNavigator();

function Home({ route }) {
  const [feedBack, setfeedBack] = useState(route.params['isFeedBack']);

  if (!feedBack)
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ContextPicker"
          component={ContextPicker}
          options={{
            title: '¿Qué va a hacer ahora?',
            headerStyle: {
              backgroundColor: '#FFFFFF',
              height: 100,
            },
            headerTitleAlign: 'center',
            gestureDirection: 'horizontal'
          }}
          styles={styles.home}
        />
        <Stack.Screen
          name="MoodPicker"
          component={MoodPicker}
          options={{
            title: '¿Y cómo le hace sentir?',
            headerStyle: {
              backgroundColor: '#FFFFFF',
              height: 100,
            },
            headerTitleAlign: 'center'
          }}
        />
      </Stack.Navigator>
    );
  else
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="FeedBack"
          component={FeedBack}
          options={{
            title: '¿Qué le hizo sentir la anterior actividad?',
            headerStyle: {
              backgroundColor: '#FFFFFF',
              height: 100,
            },
            headerTitleAlign: 'center',
            gestureDirection: 'horizontal'
          }}
          styles={styles.home}
          initialParams={{feedBack: setfeedBack}}
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

export default Home