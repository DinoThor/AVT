import React from 'react';

import { Modal, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SuccesDialog({
  displayMsg,
  visibility,
  onPress,
}) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              height: 200,
              width: '90%',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            <View style={{ alignItems: 'center', margin: 10 }}>
              <Icon
                name="checkmark-done-circle-outline"
                size={80}
                color='green'
              />
              <Text style={{ fontSize: 18, marginTop: 5, color: 'black', fontWeight: 'bold' }}>{displayMsg}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={onPress}
              style={{
                width: '95%',
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: 'blue',
                borderColor: '#ddd',
                borderBottomWidth: 0,
                borderRadius: 5,
                bottom: 0,
                marginBottom: 10,
              }}>
              <Text style={{ color: 'white', margin: 15 }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}