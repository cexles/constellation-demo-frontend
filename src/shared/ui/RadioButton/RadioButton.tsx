'use client';

import clsx from 'clsx';

import styles from './RadioButton.module.scss';

export default function RadioButton({
  value,
  options,
  disabled,
  onChange,
}: {
  value: string;
  options: Record<string, string | React.ReactNode>;
  disabled?: boolean;
  onChange: (newValue: string) => void;
}) {
  return (
    <>
      {Object.keys(options).map((id) => (
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
            <div className={clsx(styles.check, id === value && styles.check_current)} />
          </div>

          <div className={styles.label}>{options[id]}</div>
        </div>
      ))}
    </>
  );
}
