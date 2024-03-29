import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { getContext } from '../../utils/dataService';

import Header from '../../components/header/Header';


const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.item}>
    <Text
      style={styles.title}>
      {item.title}
    </Text>
  </TouchableOpacity>
);

function ContextPicker({ navigation }) {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getContext().then((contextList) => {
      var tmp = [];
      for (let i = 0; i < contextList.length; i++) {
        tmp.push({
          id: contextList[i]["id_contexto"],
          title: contextList[i]["name"]
        })
      }
      setDataList(tmp);
    });
  }, [])
  

  return (
    <View style={styles.container}>
      <Header title={'¿Qué va a hacer ahora?'} />
      <FlatList
        data={dataList}
        renderItem={({item}) => {
          return (
            <Item
              item={item}
              onPress={() => navigation.navigate('MoodPicker', { itemId: item.id })}
            />
          );
        }}
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
    backgroundColor: '#b3d1ff'

  },
  title: {
    fontSize: 28,
    color: 'black'
  },
});

export default ContextPicker;