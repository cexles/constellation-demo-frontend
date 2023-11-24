'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import CloseIcon from '@public/icons/close.svg';

import styles from './Sidebar.module.scss';

export default function Sidebar({
  children,
  header,
  width = 400,
  position = 'right',
  onClose,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  width?: number;
  position?: 'left' | 'right';
  onClose?: () => void;
}) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);

    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  useEffect(() => {
    setTimeout(() => setOpen(true));
  }, []);

  useClickAway(sidebarRef, handleClose);

  return (
    <div
      className={clsx(
        styles.wrapper,
        styles[`wrapper_${isOpen ? 'open' : 'close'}`],
        styles[`wrapper_${position}`],
      )}
    >
      <div
        ref={sidebarRef}
        className={clsx(
          styles.sidebar,
          styles[`sidebar_${position}`],
          styles[`sidebar_${position}_${isOpen ? 'open' : 'close'}`],
        )}
        style={{ width }}
      >
        {header && (
          <div className={styles.header}>
            <div>{header}</div>

            <Image
              src={CloseIcon}
              className={styles.close}
              alt="Close"
              draggable="false"
              onClick={handleClose}
            />
          </div>
        )}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
