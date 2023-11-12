'use client';

import clsx from 'clsx';

import styles from './NavigationTabs.module.scss';

export default function NavigationTabs({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (newValue: string) => void;
}) {
  const currentIndex = options.findIndex((option) => option === value);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {options.map((option) => (
          <div
            key={option}
            className={clsx(styles.tab, value === option && styles.tab_current)}
            style={{ width: `${100 / options.length}%` }}
            onClick={() => onChange(option)}
          >
            <div>{option}</div>
          </div>
        ))}
      </div>

      {currentIndex >= 0 && (
        <div
          className={styles.slider}
          style={{
            width: `${100 / options.length}%`,
            left: `${currentIndex * (100 / options.length)}%`,
          }}
        />
      )}
    </div>
  );
}
