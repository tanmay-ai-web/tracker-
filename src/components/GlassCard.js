import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../store/appStore';

export const GlassCard = ({ children, style }) => {
  const colors = useAppStore((s) => s.theme.colors);
  return (
    <LinearGradient
      colors={[`${colors.card}EE`, `${colors.card}CC`]}
      style={[styles.card, { borderColor: colors.border, shadowColor: colors.primary }, style]}
    >
      <View>{children}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  }
});
