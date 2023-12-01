'use client';

import { useRouter } from 'next/navigation';
import {
  NotificationComponent,
  selectAllNotifications,
  useNotificationsStore,
} from '@entities/user';
import { Sidebar } from '@shared/ui';

import styles from './Notifications.module.scss';

export default function Notifications() {
  const router = useRouter();
  const notifications = useNotificationsStore(selectAllNotifications);

  return (
    <Sidebar header={<div className={styles.header}>Notifications</div>} onClose={router.back}>
      <div className={styles.container}>
        {notifications.map((notification) => (
          <NotificationComponent key={notification.id} notification={notification} noAnimation />
        ))}
      </div>
    </Sidebar>
  );
}
