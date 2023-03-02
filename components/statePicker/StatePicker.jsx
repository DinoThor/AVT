import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { Text, StyleSheet } from 'react-native';

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <ButtonGroup
        buttons={['Tv', 'MIs muertos', 'GROUP']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <ButtonGroup
        buttons={['Tv', 'MIs muertos', 'GROUP']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
      <ButtonGroup
        buttons={['Tv', 'MIs muertos', 'GROUP']}
        selectedIndex={selectedIndex}
        onPress={(value) => {
          setSelectedIndex(value);
        }}
        containerStyle={{ marginBottom: 20 }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  subHeader: {
    backgroundColor: "#2089dc",
    color: "white",
    textAlign: "center",
    paddingVertical: 5,
    marginBottom: 10
  }
})