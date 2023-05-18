import { View, Text, StyleSheet } from 'react-native'

function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 40
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold'
  }
})

export default Header;