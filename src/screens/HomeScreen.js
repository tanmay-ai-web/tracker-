import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../store/appStore';
import { useCurrency } from '../hooks/useCurrency';
import { next7Days } from '../utils/date';

export const HomeScreen = () => {
  const { formatInr } = useCurrency();
  const colors = useAppStore((s) => s.theme.colors);
  const subscriptions = useAppStore((s) => s.subscriptions);
  const monthlySpend = subscriptions.filter((s) => s.status === 'Active').reduce((a, b) => a + b.price, 0);
  const yearlySpend = monthlySpend * 12;
  const renewals = subscriptions.filter((s) => next7Days(s.renewalDate));

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <AppText size={28} weight="800">Good evening</AppText>
      <AppText size={14} color={colors.muted} style={styles.mb}>Your money clarity, upgraded.</AppText>

      <GlassCard>
        <AppText size={13} color={colors.muted}>Monthly subscription spend</AppText>
        <AppText size={36} weight="800" color={colors.primary}>{formatInr(monthlySpend)}</AppText>
        <View style={styles.row}><AppText>Active: {subscriptions.length}</AppText><AppText>Renewals: {renewals.length}</AppText></View>
      </GlassCard>

      <GlassCard style={styles.mt}>
        <AppText size={16} weight="700">You are spending {formatInr(yearlySpend)}/year on subscriptions</AppText>
      </GlassCard>

      <GlassCard style={[styles.mt, { borderColor: colors.warning }]}>
        <AppText size={15} weight="700" color={colors.warning}>2 unused subscriptions detected</AppText>
      </GlassCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, gap: 12, paddingBottom: 120 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  mt: { marginTop: 12 },
  mb: { marginBottom: 10 }
});
