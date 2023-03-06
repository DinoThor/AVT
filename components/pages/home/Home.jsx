import {
  StyleSheet,
  Button,
  View, Text,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import { createStackNavigator } from '@react-navigation/stack';

import MoodPicker from '../../statePicker/MoodPicker'

const Stack = createStackNavigator();
const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;


export default function Home({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="¿Qué va a hacer ahora?"
        component={Testbut}
      />
      <Stack.Screen
        name="¿Y como se siente?"
        component={MoodPicker}
      />
    </Stack.Navigator>
  );
};


function Testbut({ navigation }) {
  return (
    <View>
      <Button
        title='Test'
        onPress={() => navigation.navigate('¿Y como se siente?')}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFF",
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 20
  },
  carousel: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginBottom: navbarHeight,
    borderWidth: 1,
    justifyContent: 'center',
  },
  buttonState: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  label: {
    alignSelf: 'center',
    marginVertical: 10,
    fontWeight: 'bold'
  }
});