import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler
} from 'react-native';

export function FlatList({ props, Item }) {
  
  const renderItem = ({ item }) => {
    const backgroundColor = '#b3d1ff';
    const color = 'black';

    return (
      <Item
        item={item}
        onPress={() => { closeSession(item.id, route) }}
        backgroundColor={props.backgroundColor}
        textColor={props.textColor}
      />
    );
  };
}