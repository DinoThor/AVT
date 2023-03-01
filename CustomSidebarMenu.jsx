import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
  Text
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export default function CustomSidebarMenu(props) {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={styles.androidSafeView}>
      <Image
        source={require('./assets/avatar.jpg')}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={styles.userName}>
        Eustaquio
      </Text>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

    </SafeAreaView>
  );
};

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
    fontSize: 15
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
