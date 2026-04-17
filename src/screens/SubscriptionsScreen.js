import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText';
import { GlassCard } from '../components/GlassCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAppStore } from '../store/appStore';
import { useCurrency } from '../hooks/useCurrency';
import { prettyDate } from '../utils/date';

export const SubscriptionsScreen = () => {
  const colors = useAppStore((s) => s.theme.colors);
  const subscriptions = useAppStore((s) => s.subscriptions);
  const deleteSubscription = useAppStore((s) => s.deleteSubscription);
  const markInactive = useAppStore((s) => s.markInactive);
  const { formatInr } = useCurrency();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      {subscriptions.map((sub) => (
        <GlassCard key={sub.id} style={styles.card}>
          <AppText size={17} weight="700">{sub.name}</AppText>
          <AppText color={colors.muted}>{formatInr(sub.price)} • {sub.frequency}</AppText>
          <AppText>Renews: {prettyDate(sub.renewalDate)}</AppText>
          <AppText color={sub.status === 'Active' ? colors.success : colors.warning}>Status: {sub.status}</AppText>
          <View style={styles.actions}>
            <PrimaryButton label="Delete" onPress={() => deleteSubscription(sub.id)} />
            <PrimaryButton label="Mark inactive" onPress={() => markInactive(sub.id)} />
            <PrimaryButton label="Cancel suggestion" onPress={() => {}} />
          </View>
        </GlassCard>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, gap: 12, paddingBottom: 120 },
  card: { marginBottom: 10 },
  actions: { gap: 8, marginTop: 10 }
});
