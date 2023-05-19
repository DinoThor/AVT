import React, { useState, useEffect } from 'react';

import {
  View,
  ActivityIndicator
} from 'react-native';

import { getUserName } from '../../utils/dataService';
import { sendData } from './API';

import QrScanner from '../../components/qrScanner/QrScanner';
import SuccesDialog from '../../components/succesDialog/succesDialog';

function Backup() {
  const [url, seturl] = useState(null);
  const [user, setuser] = useState(null);
  const [succes, setsucces] = useState(false);

  useEffect(() => {
    getUserName().then((user) => setuser(user['nombre']));
  }, [])

  useEffect(() => {
    if (url != null) {
      sendData(user, url);
      setsucces(true);
    }
  }, [url]);

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      {url == null
        ? <QrScanner returnUrl={seturl} />
        : <>
          <SuccesDialog
            displayMsg={'Datos enviados'}
            visibility={succes}
            onPress={() => {
              seturl(null);
              setsucces(false);
            }} />
          <ActivityIndicator size={100} style={{ paddingTop: 200 }} />
        </>}
    </View>
  );
}

export default Backup;