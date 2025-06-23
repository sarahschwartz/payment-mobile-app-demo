import React from 'react';
import { router } from 'expo-router';
import { View, Button, Text } from 'react-native';

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>ZKsync SSO Pay</Text>
      <Button
        title="Login"
        onPress={() => {
          router.replace('/(tabs)');
        }}
      />
    </View>
  );
}
