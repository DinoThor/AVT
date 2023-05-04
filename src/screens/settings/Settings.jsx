import {
  StyleSheet,
  View,
} from 'react-native';

import Divider from './Divider';

import SendCsvButton from './sendCSV/SendCsvButton';
import EditEmailCSV from './setEmailCSV/EmailModal';
import CopyDB from './copyDatabase/CopyDB';

function Settings() {
  return (
    <View style={styles.container}>
      <Divider title={"CSV"}/>
      <EditEmailCSV styles={styles}/>
      <SendCsvButton styles={styles}/>
      <Divider title={"DB"}/>
      <CopyDB styles={styles}/>
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
    color: 'black'
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

export default Settings;