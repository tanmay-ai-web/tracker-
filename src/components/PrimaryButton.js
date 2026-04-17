import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AppText } from './AppText';
import { useAppStore } from '../store/appStore';

export const PrimaryButton = ({ label, onPress, disabled }) => {
  const colors = useAppStore((s) => s.theme.colors);
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: colors.primary, opacity: disabled ? 0.5 : 1 }]}
    >
      <AppText weight="700" size={15} color="#FFF">{label}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16
  }
});
