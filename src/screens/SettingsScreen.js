import React from 'react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { AppText } from '../components/AppText';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppStore } from '../store/appStore';

export const SettingsScreen = () => {
  const theme = useAppStore((s) => s.theme);
  const setThemeMode = useAppStore((s) => s.setThemeMode);
  const notificationsEnabled = useAppStore((s) => s.notificationsEnabled);
  const toggleNotifications = useAppStore((s) => s.toggleNotifications);
  const privacyMode = useAppStore((s) => s.privacyMode);
  const togglePrivacyMode = useAppStore((s) => s.togglePrivacyMode);
  const resetData = useAppStore((s) => s.resetData);
  const budgetLimit = useAppStore((s) => s.budgetLimit);
  const spendingStreakDays = useAppStore((s) => s.spendingStreakDays);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} contentContainerStyle={styles.content}>
      <GlassCard>
        <Row label="Dark mode" right={<Switch value={theme.mode === 'dark'} onValueChange={(v) => setThemeMode(v ? 'dark' : 'light')} />} />
        <Row label="Notifications" right={<Switch value={notificationsEnabled} onValueChange={toggleNotifications} />} />
        <Row label="Data privacy" right={<Switch value={privacyMode} onValueChange={togglePrivacyMode} />} />
      </GlassCard>

      <GlassCard style={styles.mt}>
        <AppText weight="700">Budget limit: ₹{budgetLimit}</AppText>
        <AppText color={theme.colors.muted}>Spending streak: {spendingStreakDays} days</AppText>
        <AppText color={theme.colors.muted}>Renewal reminders enabled for next cycle.</AppText>
      </GlassCard>

      <GlassCard style={styles.mt}>
        <AppText weight="700">About Trackr+</AppText>
        <AppText color={theme.colors.muted}>Smart subscription detection from SMS signals with user confirmation controls.</AppText>
      </GlassCard>

      <View style={styles.mt}>
        <PrimaryButton label="Reset data" onPress={resetData} />
      </View>
    </ScrollView>
  );
};

const Row = ({ label, right }) => (
  <View style={styles.row}>
    <AppText size={15}>{label}</AppText>
    {right}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, paddingBottom: 120 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  mt: { marginTop: 12 }
});
