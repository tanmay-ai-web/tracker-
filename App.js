import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAppStore } from './src/store/appStore';

export default function App() {
  const theme = useAppStore((state) => state.theme);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={theme.navigation}>
        <StatusBar style={theme.mode === 'dark' ? 'light' : 'dark'} />
        <AppNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
