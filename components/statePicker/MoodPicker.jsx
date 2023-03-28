import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getSessionId } from '../utils/asyncStorage';



const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item]}>
    <Text
      style={[styles.title]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const MoodPicker = () => {
  const [dataList, setDataList] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const sessionId = async () => {
      let id = await getSessionId();
      setSessionId(id);
    }

    const getMoodData = async () => {
      const moodList = await getMood();
      var tmp = [];
      for (let i = 0; i < moosList.length; i++) {
        tmp.push({
          id: moodList[i]["id_contexto"],
          title: moodList[i]["name"]
        })
      }
      setDataList(tmp);
    };

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