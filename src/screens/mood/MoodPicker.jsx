import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';

import { getMood, lastSession, updateSesion } from '../../utils/dataService';

import SuccesDialog from '../../components/succesDialog/succesDialog';
import Header from '../../components/header/Header';



const Item = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.item}>
    <Text style={styles.emoji}>
      {item.icon}
    </Text>
    <Text style={styles.title}>
      {item.title}
    </Text>
  </TouchableOpacity>
);


const MoodPicker = ({ route }) => {
  const [dataList, setDataList] = useState([]);
  const [showSuccesDialog, setshowSuccesDialog] = useState(false);

  useEffect(() => {
    getMood().then((moodList) => {
      var tmp = [];
      for (let i = 0; i < moodList.length; i++) {
        tmp.push({
          id: moodList[i]["id_mood"],
          title: moodList[i]["name"],
          icon: moodList[i]["icon"]
        })
      }
      setDataList(tmp);
    })
  }, []);


  const closeSession = (mood, route) => {
    lastSession().then((values) => {
      let id = values['id_sesion'];
      updateSesion(id, mood, route.params['itemId']);
    });

    setshowSuccesDialog(true);
  }


  return (
    <View style={styles.container}>
      <Header title={'¿Y cómo le hace sentir?'} />
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between', width: '42%' }}
        data={dataList}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <Item
              item={item}
              onPress={() => { closeSession(item.id, route) }}
              backgroundColor='#b3d1ff'
              textColor='black'
            />
          )
        }}
        keyExtractor={item => item.id}
      />
      <SuccesDialog
        displayMsg={'Registro correcto'}
        visibility={showSuccesDialog}
        onPress={() => {
          setshowSuccesDialog(false);
          route.params.cleanScreen(null);
          setTimeout(() => BackHandler.exitApp(), 250)
        }}
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
    backgroundColor: '#b3d1ff',
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
    color: 'black',
  },
  emoji: {
    alignSelf: 'center',
    fontSize: 55,
    color: 'black',
  },
});

export default MoodPicker;