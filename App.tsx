/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
      />
    </SafeAreaView>
  );
}

export default App;
