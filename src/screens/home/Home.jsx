import { useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  AppState
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../mood/MoodPicker'
import ContextPicker from '../context/ContextPicker';
import FeedBack from '../feedback/FeedBack';

import { useNavigation } from '@react-navigation/native';
import { createSesion, lastSession } from '../../utils/dataService';

const Stack = createStackNavigator();

function askFeedBack({ navigation }) {
  lastSession().then((values) => {
    if (values['mood_inicial'] > 0 && values['mood_final'] == 0)
      navigation.navigate('FeedBack');
    else if (values['mood_inicial'] > 0 && values['mood_final'] != 0)
      createSesion(); 
  })
}

function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    askFeedBack({navigation});
    const handleChange = (newState) => {
      if (newState == 'active') askFeedBack({navigation});
    }
    const sub = AppState.addEventListener('change', handleChange);
    return () => { sub.remove() }

  }, []);

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
      <Stack.Screen
        name="FeedBack"
        component={FeedBack}
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
  }
});

export default Home;