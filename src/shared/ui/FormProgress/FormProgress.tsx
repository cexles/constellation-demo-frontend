'use client';

import clsx from 'clsx';

import styles from './FormProgress.module.scss';

export default function FormProgress({
  children,
  step,
  complete,
  last,
}: {
  children: React.ReactNode;
  step: number;
  complete?: boolean;
  last?: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={clsx(styles.step, complete && styles.step_complete)}>
          <div>{step}</div>
        </div>

        {!last && <div className={clsx(styles.line, complete && styles.line_complete)} />}
      </div>

      <div className={clsx(styles.form, last && styles.form_last)}>{children}</div>
    </div>
  );
}
