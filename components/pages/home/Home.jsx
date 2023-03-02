import { Stack } from '@react-native-material/core';
import {
  StyleSheet,
  Button,
  View, Text,
  SafeAreaView,
  Dimensions,
  StatusBar
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { StretchOutY } from 'react-native-reanimated';

import Carousel from 'react-native-reanimated-carousel';

import StatePicker from '../../statePicker/StatePicker';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.home}>
      <View style={{
        flex: 1,
        borderWidth: 1,
        margin: 10
      }}>

      </View>
      <StatusPicker />

    </SafeAreaView>
  );
};


const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;


function StatusPicker(props) {
  return (
    <View style={{ flex: 2 }}>
      <Text style={{ alignSelf: 'center', marginVertical: 10, fontWeight: 'bold' }}>
        ¿Qué vas a hacer ahora?
      </Text>
      <Carousel
        loop
        width={Dimensions.get('window').width}
        data={[...new Array(3).keys()]}
        renderItem={({ index }) => (
          <View style={styles.carousel}>
            <StatePicker/>
          </View>
        )}
      />
    </View>
  );
}


// const Item = ({title}) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//   </View>
// );


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

    //padding: 10,
  }
});