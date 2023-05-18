import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';

import { SafeAreaView, PermissionsAndroid } from 'react-native';
import { getDBConnection, lastSession, storeAV } from '../../utils/dataService';


function MorphCast({ sessionId }) {
  const [db, setdb] = useState(null);
  const [session, setsession] = useState(null);

  useEffect(() => {
    PermissionsAndroid.request('android.permission.CAMERA');
    getDBConnection().then((db) => setdb(db));
    lastSession().then((values) => setsession(values['id_sesion']))
  }, [])


  return (
    <SafeAreaView style={{ flex: 0 }}>
      <WebView
        source={{ uri: "https://server.d2t51zmkouzz1n.amplifyapp.com/" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        onMessage={(e) => storeAV(db, session, JSON.parse(e.nativeEvent.data)['output'])}
      />
    </SafeAreaView>
  );
}

export default MorphCast;