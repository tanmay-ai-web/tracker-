import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import { HomeScreen } from '../screens/HomeScreen';
import { ScanScreen } from '../screens/ScanScreen';
import { InsightsScreen } from '../screens/InsightsScreen';
import { SubscriptionsScreen } from '../screens/SubscriptionsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const iconMap = {
  Home: 'home',
  Scan: 'scan',
  Insights: 'analytics',
  Subscriptions: 'albums',
  Settings: 'settings'
};

export const AppNavigator = () => {
  const colors = useAppStore((s) => s.theme.colors);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 68,
          paddingTop: 8,
          paddingBottom: 10
        },
        tabBarIcon: ({ color, size }) => <Ionicons name={iconMap[route.name]} color={color} size={size} />
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Subscriptions" component={SubscriptionsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
