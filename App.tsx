import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './src/routes/stack.routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack />
    </NavigationContainer>
  );
}
