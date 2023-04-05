import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { getEmail, setEmail } from "./AsyncRetriveData";

import DialogInput from 'react-native-dialog-input';

export function EditEmailCSV({ styles }) {
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
        setButtonEmail={setemailcsv}
      />
    </TouchableOpacity>
  );
}

export function EmailModal({ visible, setVisible, setButtonEmail }) {
  const treatInput = (input) => {
    setEmail(input);
    setButtonEmail(input);
    setVisible(false);
  }

  return (
    <DialogInput isDialogVisible={visible}
      title={"Nuevo email"}
      message={"Establezca un email donde recibir el archivo CSV con los datos del usuario"}
      hintInput={"email@email.copm"}
      submitInput={(inputText) => { treatInput(inputText) }}
      closeDialog={() => { setVisible(false) }}>
    </DialogInput>
  );
}