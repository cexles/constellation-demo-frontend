import { create } from 'zustand';
import { AuthenticationStatus } from '@rainbow-me/rainbowkit';

import { UserStore, NotificationsStore, Notification } from './types';

export const useUserStore = create<UserStore>((set) => ({
  id: '',
  currency: 'USD',
  logout: () => set({}, true),
  updateCurrency: (currency: string) => set({ currency }),
  setStatus: (status: AuthenticationStatus) => set({ status }),
}));

export const useNotificationsStore = create<NotificationsStore>((set) => ({
  notifications: [],
  pushNotifications: true,
  setPushNotifications: (push: boolean) => set({ pushNotifications: push }),
  push: (notification: Notification) =>
    set((state) => ({
      notifications: state.pushNotifications
        ? [...state.notifications, notification]
        : [...state.notifications, { ...notification, isNew: false }],
    })),
  setIsNewNotification: (id: string, isNew: boolean) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isNew } : n)),
    })),
  makeAllNotificationsShown: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, shown: true })),
    })),
  setWithActions: (id: string, withActions: boolean) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, withActions } : n)),
    })),
}));

export const selectAllNotifications = (state: NotificationsStore) => {
  return state.notifications.sort((a, b) => b.timestamp - a.timestamp);
};

export const selectNewNotifications = (state: NotificationsStore) => {
  return state.notifications
    .filter((notification) => notification.isNew && !notification.shown)
    .sort((a, b) => b.timestamp - a.timestamp);
};

export const selectExistsNotShownNotifications = (state: NotificationsStore) => {
  return state.notifications.filter((notification) => !notification.shown).length > 0;
};
