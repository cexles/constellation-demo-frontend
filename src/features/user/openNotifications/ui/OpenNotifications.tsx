'use client';

import Image from 'next/image';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';
import clsx from 'clsx';

import { useNotificationsStore, selectExistsNotShownNotifications } from '@entities/user';
import BellIcon from '@public/icons/bell.svg';

import styles from './OpenNotifications.module.scss';

export default function OpenNotifications() {
  const router = useRouter();
  const notificationsSegment = useSelectedLayoutSegment('notifications');
  const existsNotShownNotifications = useNotificationsStore(selectExistsNotShownNotifications);
  const makeAllNotificationsShown = useNotificationsStore(
    (state) => state.makeAllNotificationsShown,
  );

  const open = () => {
    router.push('/notifications');
    makeAllNotificationsShown();
  };

  return (
    <div
      className={clsx(
        styles.notifications,
        notificationsSegment !== '__DEFAULT__' && styles.notifications_active,
      )}
      onClick={open}
    >
      <Image src={BellIcon} alt="Bell" draggable="false" />

      {existsNotShownNotifications && <div />}
    </div>
  );
}
