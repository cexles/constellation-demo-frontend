'use client';

import styles from './InfoCard.module.scss';

export default function InfoCard({ rows }: { rows: [string, string][] }) {
  return (
    <div className={styles.container}>
      {rows.map((row) => (
        <div key={row[0]} className={styles.row}>
          <div className={styles.row_left}>{row[0]}</div>
          <div className={styles.row_right}>{row[1]}</div>
        </div>
      ))}
    </div>
  );
}
