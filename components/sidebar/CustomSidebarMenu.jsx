import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';


export default function CustomSidebarMenu(props) {
  return (
    <SafeAreaView style={styles.androidSafeView}>
      <Avatar />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};


function Avatar(props) {
  // TODO: Dynamic name/picutre from user acount
  return (
    <View>
      <Image
        source={require('../../assets/avatar.jpg')}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={styles.userName}>
        Eustaquio
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  androidSafeView: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  userName: {
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 20
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
    marginTop: 20
  }
});
