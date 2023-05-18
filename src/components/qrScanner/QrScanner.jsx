import React, { Component } from 'react';

import View from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

function QrScanner({ returnUrl }) {
  const onSuccess = (e) => { returnUrl(e.data) };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      containerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

export default QrScanner;