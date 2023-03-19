import React from 'react';
import WebView from 'react-native-webview';

import {
  SafeAreaView, Text,
} from 'react-native';


function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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

export default App;