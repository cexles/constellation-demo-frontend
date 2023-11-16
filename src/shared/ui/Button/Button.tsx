'use client';

import { useRef } from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

export default function Button({
  children,
  variant = 'outlined',
  size = 'm',
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'outlined' | 'contained';
  size?: 'xs' | 's' | 'm' | 'l' | 'squared';
  disabled?: boolean;
  onClick: (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick(e);
      buttonRef.current?.blur();
    }
  };

  const handleTouchStart = () => {
    buttonRef.current?.focus();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!disabled) {
      onClick(e);
      buttonRef.current?.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!disabled && e.key === 'Enter') {
      onClick(e);
      buttonRef.current?.blur();
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      className={clsx(
        styles.button,
        styles[`button_${size}`],
        styles[`button_${variant}`],
        disabled && styles[`button_${variant}_disabled`],
      )}
      disabled={disabled}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
    >
      {children}
    </button>
  );
}
