import React, { useState } from 'react'
import { ButtonGroup } from '@rneui/themed'
import { Text, StyleSheet, View } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Grid>
      <Row><Text>Text</Text></Row>
      <Row><Text>Text</Text></Row>
    </Grid>

  )
}

// const styles = StyleSheet.create({
//   subHeader: {
//     backgroundColor: "#2089dc",
//     color: "white",
//     textAlign: "center",
//     paddingVertical: 5,
//     marginBottom: 10
//   }
// })