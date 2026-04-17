import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppStore } from '../store/appStore';
import { requestSmsPermission, fetchInboxSms } from '../services/smsService';
import { parseSms } from '../services/parser';
import { detectSubscriptions } from '../services/detectionEngine';
import { useCurrency } from '../hooks/useCurrency';

export const ScanScreen = () => {
  const colors = useAppStore((s) => s.theme.colors);
  const scanResults = useAppStore((s) => s.scanResults);
  const setScanResults = useAppStore((s) => s.setScanResults);
  const addConfirmedSubscription = useAppStore((s) => s.addConfirmedSubscription);
  const { formatInr } = useCurrency();
  const [loading, setLoading] = useState(false);

  const runScan = async () => {
    setLoading(true);
    const permission = await requestSmsPermission();
    if (permission.granted) {
      const inbox = await fetchInboxSms();
      const parsed = inbox.map(parseSms);
      setScanResults(detectSubscriptions(parsed));
    }
    setLoading(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <PrimaryButton label="Scan SMS" onPress={runScan} disabled={loading} />
      {loading && <ActivityIndicator size="large" color={colors.primary} style={styles.loader} />}
      {scanResults.map((item) => (
        <GlassCard key={item.id} style={styles.card}>
          <AppText size={17} weight="700">{item.name}</AppText>
          <AppText color={colors.muted}>{formatInr(item.amount)} • {item.frequency}</AppText>
          <AppText size={12}>Confidence: {(item.confidence * 100).toFixed(0)}%</AppText>
          <View style={styles.actions}>
            <PrimaryButton label="Confirm" onPress={() => addConfirmedSubscription({ ...item, id: `${Date.now()}` })} />
            <PrimaryButton label="Edit" onPress={() => {}} />
            <PrimaryButton label="Ignore" onPress={() => setScanResults(scanResults.filter((x) => x.id !== item.id))} />
          </View>
        </GlassCard>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, gap: 12, paddingBottom: 120 },
  loader: { marginTop: 14 },
  card: { marginTop: 8 },
  actions: { gap: 8, marginTop: 12 }
});
