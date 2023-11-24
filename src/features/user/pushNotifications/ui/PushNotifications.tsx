'use client';

import { useNotificationsStore } from '@entities/user';
import RadioButton from '@shared/ui/RadioButton/RadioButton';

import styles from './PushNotifications.module.scss';

export default function PushNotifications() {
  const notifications = useNotificationsStore();

  return (
    <div className={styles.radio}>
      <RadioButton
        value={notifications.pushNotifications ? 'yes' : 'no'}
        options={{
          yes: 'Yes',
          no: 'No',
        }}
        onChange={(push: string) => notifications.setPushNotifications(push === 'yes')}
      />
    </div>
  );
}
