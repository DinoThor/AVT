import {
  StyleSheet,
  StatusBar
} from 'react-native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';

import MoodPicker from '../../statePicker/MoodPicker'
import ContextPicker from '../../statePicker/ContextPicker';

const Stack = createStackNavigator();

function Home() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContextPicker"
        component={ContextPicker}
        options={{
          title: '¿Qué va a hacer ahora?',
          headerStyle: {
            backgroundColor: '#FFFFFF'
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
            backgroundColor: '#FFFFFF'
          },
          headerTitleAlign: 'center'
        }}
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