'use client';

import Image from 'next/image';

import { Selector } from '@shared/ui';
import { networks, networksArray } from '@shared/config/networks';

import styles from './NetworkSelector.module.scss';

export default function NetworkSelector<T extends string | string[]>({
  value,
  placeholder = 'Select network',
  error,
  variant = 'default',
  size = 'm',
  direction = 'down',
  disabled = false,
  onChange,
}: {
  value: T;
  placeholder?: string;
  error?: string;
  variant?: 'default' | 'extended';
  size?: 's' | 'm' | 'l';
  direction?: 'up' | 'down';
  disabled?: boolean;
  onChange: (newValue: T) => void;
}) {
  const valueRenderFn = (newValue: T) => {
    if (Array.isArray(newValue)) {
      return newValue
        .map((v) => networks[v]?.name)
        .filter((v) => v)
        .join(', ');
    }

    if (newValue) {
      return networks[newValue as string]?.name;
    }

    return undefined;
  };

  return (
    <Selector
      value={value}
      placeholder={placeholder}
      options={
        variant === 'extended'
          ? Object.fromEntries(
              networksArray.map((network) => [
                network.id,
                <div className={styles.extended}>
                  <div className={styles.primary}>
                    <Image src={network.icon} alt={network.symbol} draggable="false" />

                    <div>
                      {network.name}
                      {network.network && <span>({network.network})</span>}
                    </div>
                  </div>
                </div>,
              ]),
            )
          : Object.fromEntries(
              networksArray.map((network) => [
                network.id,
                <div className={styles.normal}>
                  <Image src={network.icon} alt={network.symbol} draggable="false" />
                  <div>{network.name}</div>
                </div>,
              ]),
            )
      }
      text={
        variant === 'extended'
          ? 'Lorem ipsum dolor sit amet consectetur. Consequat ornare amet a mattis pretium accumsan tincidunt.'
          : ''
      }
      size={size}
      error={error}
      direction={direction}
      disabled={disabled}
      onChange={onChange}
      valueRenderFn={valueRenderFn}
    />
  );
}
