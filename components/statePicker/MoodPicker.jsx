import React from 'react';
import {StyleSheet, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Happy from './faces/Happy'
import Neutral from './faces/Neutral';
import Sad from './faces/Sad';

const MoodPicker = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttons}>
        <Happy/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
        <Neutral/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
        <Sad/>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center'
  },
  buttons: {
    margin: 10
  }
});

export default MoodPicker;