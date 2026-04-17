import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { VictoryPie } from 'victory-native';
import { AppText } from '../components/AppText';
import { GlassCard } from '../components/GlassCard';
import { useAppStore } from '../store/appStore';
import { useCurrency } from '../hooks/useCurrency';

export const InsightsScreen = () => {
  const colors = useAppStore((s) => s.theme.colors);
  const subscriptions = useAppStore((s) => s.subscriptions);
  const totalSaved = useAppStore((s) => s.totalSaved);
  const { formatInr } = useCurrency();

  const data = [
    { x: 'Entertainment', y: subscriptions.filter((s) => s.category === 'Entertainment').reduce((a, b) => a + b.price, 0) || 1 },
    { x: 'Utilities', y: subscriptions.filter((s) => s.category === 'Utilities').reduce((a, b) => a + b.price, 0) || 1 },
    { x: 'Productivity', y: subscriptions.filter((s) => s.category === 'Productivity').reduce((a, b) => a + b.price, 0) || 1 }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.content}>
      <GlassCard>
        <AppText size={18} weight="700">Category breakdown</AppText>
        <VictoryPie
          height={220}
          colorScale={[colors.primary, colors.success, colors.warning]}
          data={data}
          style={{ labels: { fill: colors.text, fontSize: 12, fontWeight: 700 } }}
          innerRadius={48}
        />
      </GlassCard>

      <GlassCard style={styles.mt}>
        <AppText weight="700">Smart insights</AppText>
        <View style={styles.gap}><AppText>• Duplicate subscriptions: 1 possible match</AppText></View>
        <View style={styles.gap}><AppText>• Price increase detected: +₹50 (last 30 days)</AppText></View>
        <View style={styles.gap}><AppText>• Free trial ending soon: 2 days left</AppText></View>
      </GlassCard>

      <GlassCard style={styles.mt}>
        <AppText size={16} weight="700" color={colors.success}>Potential savings: {formatInr(450)}</AppText>
        <AppText size={13} color={colors.muted}>AI: You can save ₹450 by cancelling Notion AI.</AppText>
        <AppText size={16} weight="700" style={styles.mt2}>Savings tracker: {formatInr(totalSaved)}</AppText>
      </GlassCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 18, paddingBottom: 120 },
  mt: { marginTop: 12 },
  mt2: { marginTop: 8 },
  gap: { marginTop: 8 }
});
