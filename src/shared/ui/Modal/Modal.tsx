'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState, useEffect } from 'react';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import CloseIcon from '@public/icons/close.svg';

import styles from './Modal.module.scss';

export default function Modal({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(router.back, 200);
  };

  useEffect(() => {
    setTimeout(() => setOpen(true));
  }, []);

  useClickAway(modalRef, handleClose);

  return (
    <div className={clsx(styles.wrapper, styles[`wrapper_${isOpen ? 'open' : 'close'}`])}>
      <div
        ref={modalRef}
        className={clsx(styles.modal, styles[`modal_${isOpen ? 'open' : 'close'}`])}
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

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
}
