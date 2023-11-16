'use client';

import clsx from 'clsx';

import { useUnmountWithDelay } from '@shared/lib/useUnmountWithDelay';

import styles from './Tooltip.module.scss';

export default function Tooltip({
  children,
  text,
  show,
}: {
  children: React.ReactNode;
  text: string;
  show: boolean;
}) {
  const shouldRender = useUnmountWithDelay(show, 150);

  return (
    <div className={styles.container}>
      {shouldRender && (
        <div className={clsx(styles.tooltip, show ? styles.tooltip_open : styles.tooltip_close)}>
          {text}
        </div>
      )}

      {children}
    </div>
  );
}
