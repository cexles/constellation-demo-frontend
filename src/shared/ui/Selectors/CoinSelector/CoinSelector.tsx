'use client';

import Image from 'next/image';

import { Selector } from '@shared/ui';
import { cryptoCurrenciesArray } from '@shared/config/currencies';

import styles from './CoinSelector.module.scss';

export default function CoinSelector({
  value,
  placeholder = 'Select coin',
  size = 'm',
  direction = 'down',
  disabled = false,
  onChange,
}: {
  value: string;
  placeholder?: string;
  size?: 's' | 'm' | 'l';
  direction?: 'up' | 'down';
  disabled?: boolean;
  onChange: (newValue: string) => void;
}) {
  return (
    <Selector
      value={value}
      placeholder={placeholder}
      options={Object.fromEntries(
        cryptoCurrenciesArray.map((coin) => [
          coin.symbol,
          <div className={styles.container}>
            <Image src={coin.icon} alt={coin.symbol} draggable="false" />

            <div>
              {coin.symbol} <span>({coin.name})</span>
            </div>
          </div>,
        ]),
      )}
      size={size}
      direction={direction}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
