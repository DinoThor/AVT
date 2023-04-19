import {
  Text,
  TouchableOpacity,
} from 'react-native';

const sendData = () => {
  return;
}

export function SendCsvButton({styles}) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => { sendData() }}>
      <Text style={styles.title}>
        Enviar respaldo datos usuario
      </Text>
    </TouchableOpacity>
  );
}