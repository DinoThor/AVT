import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

var db = openDatabase({ name: 'userDataBase.db', createFromLocation: 1 },
  () => console.log("Succes"),
  () => console.log("Failrue")
);

const DATA = [ //HARDCODED
  {
    id: '1',
    title: '📺 Ver la televisión',
  },
  {
    id: '2',
    title: '👨‍👩‍👧‍👦 Visita familiar',
  },
  {
    id: '3',
    title: '📖 Leer',
  },
  {
    id: 'asdf',
    title: '🚶 Pasear'
  },
  {
    id: '4',
    title: '📺 Ver la televisión',
  },
  {
    id: '5',
    title: '👨‍👩‍👧‍👦 Visita familiar',
  },
  {
    id: '6',
    title: '📖 Leer',
  },
  {
    id: '7',
    title: '🚶 Pasear'
  }
];

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

function ContextPicker({ navigation }) {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    // Get context from database
    var contextList = [];
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM contexto',
        [],
        (tx, res) => {
          for (let i = 0; i < res.rows.length; i++) {
            contextList.push(results.rows.item(i));
          }
        }
      )
    })

    // Create data for button list
    var temp = []
    for (let i = 0; i < contextList.length; i++) {
      temp.push({
        id: contextList[i].id_contexto,
        text: contextList[i].name
      });
    }
    setDataList(temp);

  }, [])

  const renderItem = ({ item }) => {
    const backgroundColor = '#b3d1ff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('MoodPicker', {
          itemId: item.id
        })}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <View
      style={styles.container}>
      <FlatList
        data={DATA}
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
    borderWidth: 2
  },
  title: {
    fontSize: 32,
  },
});

export default ContextPicker;
