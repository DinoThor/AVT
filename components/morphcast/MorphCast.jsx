import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

import { SafeAreaView } from 'react-native';
import { getSessionId } from '../utils/asyncStorage';
import { getDBConnection, storeAV } from '../utils/dataService';

function MorphCast() {
  const [sessionId, setsessionId] = useState(null);
  const [db, setdb] = useState(null);

  useEffect(() => {
    const retriveDBCon = async () => {
      let db = await getDBConnection();
      setdb(db);
    }

    setsessionId(getSessionId());
  }, [])

  const test = async (db, sessionId, rawData) => {
    await storeAV(db, sessionId, rawData)
  }

  return (
    <SafeAreaView style={{ flex: 0 }}>
      <WebView
        source={{
          uri: "https://dinothor.github.io/AVT/"
        }}
        onMessage={(e) => {
          let rawData = JSON.parse(e.nativeEvent.data)['output']
          
          test(db, sessionId, rawData)
        }}
      />
    </SafeAreaView>
  );
}


function treatData(data) {
  console.log(data)
  //console.log(data['arousal'], data['valence'])
}

export default MorphCast;