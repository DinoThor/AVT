import React, { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { TextInput, RadioButton, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUser } from "../../utils/dataService";

function SignUp({change}) {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [phone, setphone] = useState("");

  const [nameErr, setnameErr] = useState(false);
  const [ageErr, setageErr] = useState(false);
  const [phoneErr, setphoneErr] = useState(false);

  const [checked, setChecked] = React.useState('');

  const handleForm = () => {
    if (name == '') {
      setnameErr(true);
      return;
    }
    if (age == '') {
      setageErr(true);
      return;
    }
    if (phone == '') {
      setphoneErr(true);
      return;
    }

    createUser(name, age, phone, checked);
    change(true);   
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{
        flex: 5,
        alignItems: "center",
        width: '100%',
        marginTop: 30
      }}>
        <Text style={styles.title}>Hola!</Text>
        <Text style={styles.subtitle}>Que tal si nos conocemos</Text>

        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label='Nombre'
            value={name}
            error={nameErr}
            onChangeText={(name) => setname(name)}
            style={styles.input} />
          <TextInput
            mode="outlined"
            label='Edad'
            keyboardType="number-pad"
            value={age}
            error={ageErr}
            onChangeText={(text) => setage(text)}
            maxLength={3}
            style={styles.input} />
          <TextInput
            mode="outlined"
            label='Teléfono'
            keyboardType="number-pad"
            value={phone}
            error={phoneErr}
            onChangeText={(text) => setphone(text)}
            style={styles.input} />
        </View>

        <View style={styles.radioContainer}>
          <View style={{ alignItems: "center" }}>
            <RadioButton
              value=""
              status={checked === 'male' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('male')}
            />
            <Text style={{ color: 'black' }}>Hombre</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <RadioButton
              value=""
              status={checked === 'female' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('female')}
            />
            <Text style={{ color: 'black' }}>Mujer</Text>
          </View>
        </View>

        {/* <IconButton
          mode="contained"
          icon={'account-plus'}
          size={70}
          style={{
            marginTop: 10
          }}
          onPress={() => {
            setnameErr(false);
            setageErr(false);
            setphoneErr(false);
            handleForm();
          }}
        >
          Registrarse
        </IconButton> */}
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Button
          mode="contained"          
          style={{
          }}
          onPress={() => {
            setnameErr(false);
            setageErr(false);
            setphoneErr(false);
            handleForm();
          }}
        >
          Registrarse
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 60,
    color: 'black'
  },
  subtitle: {
    fontSize: 20,
    color: 'black'
  },
  inputContainer: {
    marginTop: 20,
    width: '100%'
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10

  },
  radioContainer: {
    flexDirection: "row",
    width: '100%',
    justifyContent: "space-between",
    marginVertical: 20,
    paddingHorizontal: 100
  }
})

export default SignUp;