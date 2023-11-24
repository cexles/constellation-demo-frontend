'use client';

import Image from 'next/image';

import NoDataIcon from '@public/icons/no-data.svg';

import styles from './NoData.module.scss';

export default function NoData({ text, height }: { text?: string; height?: number }) {
  return (
    <div className={styles.container} style={{ height: height || '100%' }}>
      <Image src={NoDataIcon} className={styles.image} alt="No data" draggable="false" />

      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
}
