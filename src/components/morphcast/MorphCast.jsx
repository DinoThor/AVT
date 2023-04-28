import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

import { SafeAreaView } from 'react-native';
import { getSessionId } from '../../utils/asyncStorage';
import { getDBConnection, storeAV } from '../../utils/dataService';


function MorphCast() {
  const [sessionId, setsessionId] = useState(null);
  const [db, setdb] = useState(null);

  useEffect(() => {
    getDBConnection().then((db) => setdb(db));
    getSessionId().then((id) => setsessionId(id));
  }, [])


  return (
    <SafeAreaView style={{ flex: 0 }}>
      <WebView
        source={{ uri: "http://localhost:5000" }}
        onMessage={(e) => storeAV(db, sessionId, JSON.parse(e.nativeEvent.data)['output'])}
      />
    </SafeAreaView>
  );
}

export default MorphCast;