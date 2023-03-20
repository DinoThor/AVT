import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

export default ContextPicker
