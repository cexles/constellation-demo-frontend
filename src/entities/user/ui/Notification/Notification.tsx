'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import clsx from 'clsx';

import { useNotificationsStore } from '@entities/user';
import { Notification } from '@entities/user/model/types';
import CloseIcon from '@public/icons/close.svg';

import styles from './Notification.module.scss';

export default function NotificationComponent({
  notification,
  noAnimation,
  withCloseIcon,
  showTime = 5000,
  onClick,
  onClose,
}: {
  notification: Notification;
  noAnimation?: boolean;
  withCloseIcon?: boolean;
  showTime?: number;
  onClick?: () => void;
  onClose?: () => void;
}) {
  const timeout = useRef<NodeJS.Timeout>();
  const timeLeft = useRef(showTime);
  const timeoutStart = useRef(0);
  const firstRender = useRef(true);
  const setIsNewNotification = useNotificationsStore((state) => state.setIsNewNotification);

  const [isOpen, setOpen] = useState(false);

  const handleClose = (e?: React.MouseEvent<HTMLImageElement>) => {
    e?.stopPropagation();
    setOpen(false);

    if (noAnimation) {
      setIsNewNotification(notification.id, false);
    } else {
      setTimeout(() => setIsNewNotification(notification.id, false), 300);
    }

    if (onClose) {
      if (noAnimation) {
        onClose();
      } else {
        setTimeout(() => onClose(), 300);
      }
    }
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    handleClose();
  };

  const stopTimeout = () => {
    clearTimeout(timeout.current);
    timeLeft.current -= +moment() - timeoutStart.current;
  };

  const resumeTimeout = () => {
    timeout.current = setTimeout(handleClose, timeLeft.current);
    timeoutStart.current = +moment();
  };

  useEffect(() => {
    if (!noAnimation && firstRender.current) {
      setTimeout(() => setOpen(true));
      timeout.current = setTimeout(handleClose, timeLeft.current);
      timeoutStart.current = +moment();
      firstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(
        styles.container,
        styles[`container_${isOpen || noAnimation ? 'open' : 'close'}`],
        notification.shown && styles.container_shown,
        onClick && styles.container_clickable,
      )}
      onMouseEnter={stopTimeout}
      onMouseLeave={resumeTimeout}
      onTouchStart={stopTimeout}
      onTouchEnd={resumeTimeout}
      onClick={handleClick}
    >
      <div className={clsx(styles.type, styles[`type_${notification.type}`])} />

      <div className={styles.body}>
        <div className={clsx(styles.timestamp, notification.shown && styles.timestamp_shown)}>
          {moment(notification.timestamp).format('DD/MM/YYYY HH:mm')}
        </div>

        <div className={clsx(styles.text, notification.shown && styles.text_shown)}>
          {notification.text}
        </div>

        {notification.withActions && <div className={styles.actions} />}
      </div>

      {withCloseIcon && (
        <Image
          src={CloseIcon}
          className={styles.close}
          alt="Close"
          draggable="false"
          onClick={handleClose}
        />
      )}
    </div>
  );
}
