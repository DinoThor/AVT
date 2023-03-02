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

//import { Button } from 'raect-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';


import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function CustomSidebarMenu(props) {
  return (
    <SafeAreaView style={styles.androidSafeView}>

      <Avatar />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity>
        <BottomDrawer/>
      </TouchableOpacity>

    </SafeAreaView>
  );
};


function Avatar(props) {
  // TODO: Dynamic name/picutre from user acount
  return (
    <View>
      <Image
        source={require('./assets/avatar.jpg')}
        style={styles.sideMenuProfileIcon}
      />
      <Text style={styles.userName}>
        Eustaquio
      </Text>
    </View>
  );
}

function BottomDrawer() {
  return (
    <View>  
      {/* <Button 
        icon={
          <Icon 
            name="logout"
            size={15}
            color="black"
          />
        }
        text="Cerrar aplicación"
      /> */}
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
