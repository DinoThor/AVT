import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';
import {
  closeSession,
  getMood,
  lastSession
} from '../../utils/dataService';
import { useNavigation } from '@react-navigation/native';

import SuccesDialog from '../../components/succesDialog/succesDialog';
import Header from '../../components/header/Header';
import SplashScreen from 'react-native-splash-screen';


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


function FeedBack() {
  const navigation = useNavigation();

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
    SplashScreen.hide();
  }, []);


  return (
    <View style={styles.container}>
      <Header title={'¿Qué tal fue la anterior actividad?'} />
      <FlatList
        columnWrapperStyle={{
          justifyContent: 'space-between',
          width: '42%'
        }}
        data={dataList}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <Item
              item={item}
              onPress={() => {
                lastSession().then((values) => {
                  console.log(values);
                  closeSession(values['id_sesion'], item.id);
                  setshowSuccesDialog(true);
                })
              }}
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
          navigation.navigate('ContextPicker');
          BackHandler.exitApp();
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
    width: '100%',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#b3d1ff'
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'black'
  },
  emoji: {
    alignSelf: 'center',
    fontSize: 55,
    color: 'black'
  },
});

export default FeedBack;