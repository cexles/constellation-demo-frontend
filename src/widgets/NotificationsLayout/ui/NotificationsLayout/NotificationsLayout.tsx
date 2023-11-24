'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';

import {
  NotificationComponent,
  selectNewNotifications,
  useNotificationsStore,
  useUserStore,
} from '@entities/user';

import styles from './NotificationsLayout.module.scss';

export default function NotificationsLayout() {
  const notificationsSegment = useSelectedLayoutSegment('notifications');
  const userStatus = useUserStore((state) => state.status);
  const newNotifications = useNotificationsStore(selectNewNotifications);

  if (notificationsSegment !== '__DEFAULT__' || newNotifications.length === 0) {
    return null;
  }

  return (
    <div className={clsx(styles.container, userStatus !== 'authenticated' && styles.container_top)}>
      {newNotifications.map((notification) => (
        <NotificationComponent key={notification.id} notification={notification} withCloseIcon />
      ))}
    </div>
  );
}
