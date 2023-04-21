import {
  Text,
  TouchableOpacity,
} from 'react-native';
import { sendData } from './sendData';


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