import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import { getMood, updateSesion } from '../../../utils/dataService';
import SuccesDialog from '../../succesDialog/succesDialog';
import { getSessionId, setFeedBack } from '../../../utils/asyncStorage';


const Item = ({ item, onPress, textColor }) => (
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


const MoodPicker = ({ navigation, route }) => {
  const [dataList, setDataList] = useState([]);
  const [showSuccesDialog, setshowSuccesDialog] = useState(false);

  useEffect(() => {
    getMood().then((moodList) => {
      var tmp = [];
      for (let i = 0; i < moodList.length; i++) {
        tmp.push({
          id: moodList[i]["id_estado"],
          title: moodList[i]["name"],
          icon: moodList[i]["icon"]
        })
      }
      setDataList(tmp);
    })
  }, []);

  const renderItem = ({ item }) => {
    const backgroundColor = '#b3d1ff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => { closeSession(item.id, route) }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  const closeSession = (mood, route) => {
    let context = route.params['itemId'];
    getSessionId().then((id) => {
      updateSesion(id, mood, context);
      setFeedBack(true);
    }, (err) => console.log(err));

    setshowSuccesDialog(true);
  }


  const dismissDialog = () => {
    setshowSuccesDialog(false);
    navigation.navigate('ContextPicker')
    setTimeout(() => BackHandler.exitApp(), 190)
  }


  return (
    <View style={styles.container}>
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between', width: '42%' }}
        data={dataList}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <SuccesDialog
        displayMsg={'Registro correcto'}
        visibility={showSuccesDialog}
        onPress={dismissDialog}
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