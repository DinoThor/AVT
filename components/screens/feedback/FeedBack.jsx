import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import { feedbackSession, getMood } from '../../../utils/dataService';
import { SuccesDialog } from '../../succesDialog/succesDialog';
import { getSessionId, setFeedBack } from '../../../utils/asyncStorage';


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


export const FeedBack = () => {
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
        onPress={() => { closeSession(item.id) }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };


  const closeSession = (mood) => {
    getSessionId().then((id) => {
      feedbackSession(id, mood);
      setFeedBack(false);
    });

    setshowSuccesDialog(true);
  }


  const dismissDialog = () => {
    setshowSuccesDialog(false);
    setFeedBack(false);
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
