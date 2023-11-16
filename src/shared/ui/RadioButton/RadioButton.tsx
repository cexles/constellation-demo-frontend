'use client';

import clsx from 'clsx';

import styles from './RadioButton.module.scss';

export default function RadioButton<T extends string | number | symbol>({
  value,
  options,
  disabled,
  onChange,
}: {
  value: T;
  options: Record<T, string | React.ReactNode>;
  disabled?: boolean;
  onChange: (newValue: T) => void;
}) {
  return (
    <>
      {(Object.keys(options) as T[]).map((id) => (
        <div
          tabIndex={0}
          key={id.toString()}
          className={clsx(
            styles.radio,
            id === value && styles.radio_current,
            disabled && styles.radio_disabled,
          )}
          onClick={() => onChange(id)}
        >
          <div className={clsx(styles.mark, disabled && styles.mark_disabled)}>
            <div
              className={clsx(
                styles.check,
                id === value && styles.check_current,
                disabled && styles.check_disabled,
              )}
            />
          </div>

          <div className={styles.label}>{options[id]}</div>
        </div>
      ))}
    </>
  );
}
