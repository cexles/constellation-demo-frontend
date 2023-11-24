'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

import { Account } from '@widgets/Account';
import { Actions } from '@widgets/Actions';

import styles from './AccountPage.module.scss';

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={styles.container}>
      <div className={styles.account}>{segment === 'members' ? null : <Account id={id} />}</div>

      <div className={styles.section}>
        {segment !== 'members' && <Actions />}

        {children}
      </div>
    </div>
  );
}
