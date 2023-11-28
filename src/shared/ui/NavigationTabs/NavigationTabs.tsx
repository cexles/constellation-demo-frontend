'use client';

import clsx from 'clsx';

import styles from './NavigationTabs.module.scss';

export default function NavigationTabs<T extends string | number | symbol>({
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
  const optionsIds = Object.keys(options) as T[];
  const currentIndex = optionsIds.findIndex((id) => id === value);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {optionsIds.map((id) => (
          <div
            key={id.toString()}
            className={clsx(
              styles.tab,
              value === id && styles.tab_current,
              disabled && styles.tab_disabled,
            )}
            style={{ width: `${100 / optionsIds.length}%` }}
            onClick={() => onChange(id)}
          >
            <div>{options[id]}</div>
          </div>
        ))}
      </div>

      {currentIndex >= 0 && (
        <div
          className={styles.slider}
          style={{
            width: `${100 / optionsIds.length}%`,
            left: `${currentIndex * (100 / optionsIds.length)}%`,
          }}
        />
      )}
    </div>
  );
}
