import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getContext } from '../utils/dataService';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}>
    <Text
      style={[styles.title, { color: textColor }]}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

function ContextPicker({ navigation, route }) {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const getContextData = async () => {
      const contextList = await getContext();
      var tmp = [];
      for (let i = 0; i < contextList.length; i++) {
        tmp.push({
          id: contextList[i]["id_contexto"],
          title: contextList[i]["name"]
        })
      }
      setDataList(tmp);
    };

    getContextData();
  }, [])

  const renderItem = ({ item }) => {
    const backgroundColor = '#b3d1ff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('MoodPicker', { itemId: item.id })}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View
      style={styles.container}>
      <FlatList
        data={dataList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 50,

  },
  title: {
    fontSize: 28,
  },
});

export default ContextPicker;