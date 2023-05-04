import { View, Text, StyleSheet } from "react-native";

function Divider({ title }) {
  return (
    <View style={styles.categoryTitle}>
      <Text style={styles.categoryTitleText}>
        {title}
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
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

export default Divider;