import { AuthenticationStatus } from '@rainbow-me/rainbowkit';

export interface UserStore {
  id: string;
  currency: string;
  status: AuthenticationStatus;
  logout: () => void;
  updateCurrency: (currency: string) => void;
  setStatus: (status: AuthenticationStatus) => void;
}

export type NotificationType = 'default' | 'warning' | 'error';

export interface Notification {
  id: string;
  timestamp: number;
  type: NotificationType;
  text: string;
  isNew: boolean;
  shown: boolean;
  withActions: boolean;
}

export interface NotificationsStore {
  notifications: Notification[];
  pushNotifications: boolean;
  setPushNotifications: (push: boolean) => void;
  push: (notification: Notification) => void;
  setIsNewNotification: (id: string, isNew: boolean) => void;
  makeAllNotificationsShown: () => void;
  setWithActions: (id: string, withActions: boolean) => void;
}
