'use client';

import styles from './PageWithTitle.module.scss';

export default function PageWithTitle({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>

      {children}
    </div>
  );
}
