import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMood } from '../utils/dataService';


const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}>
    <Text style={[styles.emoji, { color: textColor }]}>
      {item.icon}
    </Text>
    <Text style={[styles.title, { color: textColor }]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

const MoodPicker = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const getMoodData = async () => {
      const moodList = await getMood();
      var tmp = [];
      for (let i = 0; i < moodList.length; i++) {
        tmp.push({
          id: moodList[i]["id_estado"],
          title: moodList[i]["name"],
          icon: moodList[i]["icon"]
        })
      }
      setDataList(tmp);
    };

    getMoodData();
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = '#b3d1ff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => { }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between', width: '42%' }}
        data={dataList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  item: {
    width: '100%',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 30,
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
  },
  emoji: {
    alignSelf: 'center',
    fontSize: 55,
  },
});

export default MoodPicker;