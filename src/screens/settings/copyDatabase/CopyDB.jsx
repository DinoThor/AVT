import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';
import SuccesDialog from '../../../components/succesDialog/succesDialog';

function CopyDB({ styles }) {
    const [showSuccesDialog, setshowSuccesDialog] = useState(false);

    const hangCopy = () => {
        var RNFS = require('react-native-fs');
        var date = new Date().toISOString().substring(0, 10);
        var fileDir = (RNFS.DocumentDirectoryPath).replace('files', 'databases/default.db');
        var destDir = (RNFS.ExternalDirectoryPath) + '/' + date + '.db';
        RNFS.copyFile(fileDir, destDir).then();
        setshowSuccesDialog(true);
    }


    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => hangCopy()}
            >
                <Text style={styles.title}>
                    Copiar base de datos
                </Text>
                <Text style={styles.subtitle}>Android/data/com.native/files</Text>
            </TouchableOpacity>
            <SuccesDialog
                displayMsg={'Copia realizada'}
                visibility={showSuccesDialog}
                onPress={() => setshowSuccesDialog(false)}
            />
        </View>

    );
}

export default CopyDB;