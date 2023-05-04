import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getEmail, setEmail } from "./AsyncRetriveData";
import Dialog from 'react-native-dialog';

function EditEmailCSV({ styles }) {
  const [emailcsv, setemailcsv] = useState(null);
  const [emailModal, setemailModal] = useState(false);

  getEmail().then((email) => setemailcsv(email))

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => { setemailModal(true) }}
    >
      <Text style={styles.title}>
        Editar email CSV
      </Text>
      <Text style={styles.subtitle}>
        {emailcsv}
      </Text>
      <EmailModal
         visible={emailModal}
         setVisible={setemailModal}
      />
    </TouchableOpacity>
  );
}

function EmailModal({ visible, setVisible }) {
  const [textInput, setTextInput] = useState('');

  return (
    <View style={styles.container}>
      <Dialog.Container visible={visible} onRequestClose={() => setVisible(false)}>
        <Dialog.Title>Nuevo email</Dialog.Title>
        <Dialog.Description>
          Establezca un email donde recibir el archivo CSV con los datos del usuario.
        </Dialog.Description>
        <Dialog.Input
          placeholder='email@email.com'
          onChangeText={setTextInput}
        />
        <Dialog.Button label="Cancelar" onPress={() => setVisible(false)} />
        <Dialog.Button label="Editar" onPress={() => {
          setEmail(textInput);
          setVisible(false);
        }} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditEmailCSV;