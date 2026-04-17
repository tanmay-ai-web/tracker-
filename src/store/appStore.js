import { create } from 'zustand';
import { darkTheme } from '../theme/darkTheme';
import { lightTheme } from '../theme/lightTheme';

const seedSubscriptions = [
  { id: '1', name: 'Netflix', price: 499, renewalDate: '2026-04-21', frequency: 'Monthly', status: 'Active', category: 'Entertainment', confidence: 0.96 },
  { id: '2', name: 'Spotify', price: 119, renewalDate: '2026-04-22', frequency: 'Monthly', status: 'Active', category: 'Entertainment', confidence: 0.93 },
  { id: '3', name: 'Notion AI', price: 800, renewalDate: '2026-04-28', frequency: 'Monthly', status: 'Active', category: 'Productivity', confidence: 0.88 },
  { id: '4', name: 'iCloud+', price: 75, renewalDate: '2026-04-25', frequency: 'Monthly', status: 'Active', category: 'Utilities', confidence: 0.92 }
];

export const useAppStore = create((set) => ({
  theme: darkTheme,
  notificationsEnabled: true,
  privacyMode: true,
  budgetLimit: 2000,
  subscriptions: seedSubscriptions,
  scanResults: [],
  spendingStreakDays: 18,
  totalSaved: 3260,
  setThemeMode: (mode) => set({ theme: mode === 'dark' ? darkTheme : lightTheme }),
  toggleNotifications: () => set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),
  togglePrivacyMode: () => set((state) => ({ privacyMode: !state.privacyMode })),
  resetData: () => set({ subscriptions: [], scanResults: [], spendingStreakDays: 0, totalSaved: 0 }),
  setScanResults: (scanResults) => set({ scanResults }),
  addConfirmedSubscription: (item) => set((state) => ({ subscriptions: [...state.subscriptions, item] })),
  deleteSubscription: (id) => set((state) => ({ subscriptions: state.subscriptions.filter((sub) => sub.id !== id) })),
  markInactive: (id) => set((state) => ({
    subscriptions: state.subscriptions.map((sub) => (sub.id === id ? { ...sub, status: 'Cancelled' } : sub))
  })),
  updateBudget: (budgetLimit) => set({ budgetLimit })
}));
