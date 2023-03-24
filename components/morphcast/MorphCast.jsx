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
          treatData(JSON.parse(e.nativeEvent.data))
        }}
      />
    </SafeAreaView>
  );
}


function treatData(data) {

}

export default MorphCast;