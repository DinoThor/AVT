import React from 'react';
import WebView from 'react-native-webview';

import { SafeAreaView } from 'react-native';

function MorphCast() {
  return (
    <SafeAreaView style={{ flex: 0 }}>
      <WebView
        source={{
          uri: "https://dinothor.github.io/AVT/"
        }}
        onMessage={(e) => {
          let rawData = JSON.parse(e.nativeEvent.data)
          console.log(rawData)
        }}
      />
    </SafeAreaView>
  );
}

export default MorphCast;