'use client';

import Image from 'next/image';
import clsx from 'clsx';

import ArrowIcon from '@public/icons/arrow-with-tail.svg';

import styles from './DeltaIndicator.module.scss';

export default function DeltaIndicator({ delta }: { delta: number }) {
  return (
    <div
      className={clsx(
        styles.delta,
        delta > 0 && styles.delta_increase,
        delta < 0 && styles.delta_decrease,
      )}
    >
      <div>{Math.abs(delta)}%</div>

      {delta !== 0 && (
        <Image src={ArrowIcon} alt={delta > 0 ? 'Increase' : 'Decrease'} draggable="false" />
      )}
    </div>
  );
}
