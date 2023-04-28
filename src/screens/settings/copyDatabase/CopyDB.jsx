import {
    TouchableOpacity,
    Text,
  } from 'react-native';

  
function CopyDB({ styles }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => hangCopy()}
        >
            <Text style={styles.title}>
                Copiar base de datos a sdcard/
            </Text>
        </TouchableOpacity>
    );
}

export default CopyDB;