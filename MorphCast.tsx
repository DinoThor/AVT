import React from 'react';
import WebView from 'react-native-webview';

function MorphCast(): JSX.Element {
  return (
      <WebView
        source={{
          uri: "https://dinothor.github.io/AVT/"
        }}
        onMessage={(e) => {
          let rawData = JSON.parse(e.nativeEvent.data)
          console.log(rawData)
        }}
      />
  );
}

export default MorphCast;
