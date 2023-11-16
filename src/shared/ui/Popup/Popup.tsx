'use client';

import { useRef } from 'react';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import { useUnmountWithDelay } from '@shared/lib/useUnmountWithDelay';

import styles from './Popup.module.scss';

export default function Popup({
  children,
  anchor,
  show,
  position = 'center',
  close,
}: {
  children: React.ReactNode;
  anchor: React.ReactNode;
  show: boolean;
  position?: 'left' | 'right' | 'center';
  close: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldRender = useUnmountWithDelay(show, 150);

  useClickAway(containerRef, close);

  return (
    <div ref={containerRef} className={clsx(styles.container, styles[`container_${position}`])}>
      {anchor}

      {shouldRender && (
        <div className={clsx(styles.popup, show ? styles.popup_open : styles.popup_close)}>
          {children}
        </div>
      )}
    </div>
  );
}
