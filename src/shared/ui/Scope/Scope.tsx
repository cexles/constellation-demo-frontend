'use client';

import clsx from 'clsx';

import styles from './Scope.module.scss';

export default function Scope({
  children,
  title,
  type = 'primary',
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  type?: 'primary' | 'secondary';
  actions?: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      {(title || actions) && (
        <div className={styles.titleContainer}>
          <div className={clsx(styles.title, styles[`title_${type}`])}>{title}</div>

          {actions}
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
