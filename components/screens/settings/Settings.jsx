import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Divider from './Divider';

import { EditEmailCSV } from './setEmailCSV/EmailModal';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Divider title={"CSV"}/>
      <EditEmailCSV styles={styles}/>

      <TouchableOpacity
        style={styles.button}
        onPress={() => { }}>
        <Text style={styles.title}>
          Enviar respaldo datos usuario
        </Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3
  },
  title: {
    fontSize: 20,
    color: 'black',
  },
  subtitle: {
    fontSize: 10,
  },
  categoryTitle: {
    alignContent: 'center',
    width: '100%',
    backgroundColor: '#b3d1ff'
  },
  categoryTitleText: {
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
});