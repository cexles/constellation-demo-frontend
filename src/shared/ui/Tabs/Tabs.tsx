'use client';

import clsx from 'clsx';

import styles from './Tabs.module.scss';

export default function Tabs<T extends string | symbol | number>({
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

  const changeTab = (newValue: T) => {
    onChange(newValue);
  };

  return (
    <div className={clsx(styles.container, disabled && styles.container_disabled)}>
      <div className={styles.slider}>
        <div
          className={styles.slide}
          style={{
            width: `${100 / optionsIds.length}%`,
            transform: `translateX(${100 * optionsIds.findIndex((id) => id === value)}%)`,
          }}
        />

        {optionsIds.map((id) => (
          <div
            key={id.toString()}
            className={clsx(styles.tab, id === value && styles.tab_current)}
            style={{
              width: `${100 / optionsIds.length}%`,
            }}
            onClick={() => changeTab(id)}
          >
            {options[id]}
          </div>
        ))}
      </div>
    </div>
  );
}
