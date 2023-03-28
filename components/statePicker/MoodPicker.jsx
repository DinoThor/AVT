import React, { useContext, useEffect, useState } from 'react';
import { ImageBackgroundComponent, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSessionId } from '../utils/asyncStorage';

import Happy from './faces/Happy'
import Neutral from './faces/Neutral';
import Sad from './faces/Sad';

const MoodPicker = () => {

  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    async function sessionId() {
      let id = await getSessionId();
      setSessionId(id);
    }
    
    sessionId();
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttons}>
        <Happy />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
        <Neutral />
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttons}>
        <Sad />
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