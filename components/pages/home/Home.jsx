import {
  StyleSheet,
  Button,
  View, Text,
  SafeAreaView
} from 'react-native';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.home}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is the First Page under First Page Option
          </Text>
          <Button
            onPress={() => navigation.navigate('SecondPage')}
            title="Go to Second Page"
          />
          <Button
            onPress={() => navigation.navigate('ThirdPage')}
            title="Go to Third Page"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: "#FFF",
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