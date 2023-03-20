import {
  StyleSheet,
  Button,
  View, Text,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../../statePicker/MoodPicker'
import ContextPicker from '../../statePicker/ContextPicker';

const Stack = createStackNavigator();
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;

function Home({ navigation }) {
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
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="MoodPicker"
        component={MoodPicker}
        options={{
          title: '¿Y cómo le hace sentir?'
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
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