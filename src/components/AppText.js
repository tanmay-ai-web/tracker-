import React from 'react';
import { Text } from 'react-native';
import { useAppStore } from '../store/appStore';

export const AppText = ({ children, weight = '400', size = 14, color, style }) => {
  const colors = useAppStore((s) => s.theme.colors);
  return <Text style={[{ color: color || colors.text, fontSize: size, fontWeight: weight }, style]}>{children}</Text>;
};
