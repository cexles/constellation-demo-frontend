'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import ArrowLeftIcon from '@public/icons/arrow-left.svg';

import styles from './Selector.module.scss';

export default function Selector<T extends symbol | string | number>({
  value,
  options,
  placeholder,
  label,
  hint,
  warn,
  error,
  size = 'm',
  direction = 'down',
  disabled = false,
  onChange,
}: {
  value: T;
  options: Record<T, string | React.ReactNode>;
  placeholder?: string;
  label?: string;
  hint?: string;
  warn?: string;
  error?: string;
  size?: 's' | 'm' | 'l';
  direction?: 'up' | 'down';
  disabled?: boolean;
  onChange: (newValue: T) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  useClickAway(containerRef, () => {
    setOpen(false);
  });

  const openClose = () => {
    setOpen(!isOpen);
  };

  const handleChange = (newValue: T) => {
    onChange(newValue);
    setOpen(false);
  };

  return (
    <div tabIndex={0} ref={containerRef} className={styles.container}>
      {label && <div className={clsx(styles.label, styles[`label_${size}`])}>{label}</div>}

      <div
        className={clsx(
          styles.selector,
          styles[`selector_${size}`],
          warn && styles.selector_warn,
          error && styles.selector_error,
          isOpen && styles.selector_opened,
          disabled && styles.selector_disabled,
        )}
        onClick={openClose}
      >
        <div>{options[value] || placeholder}</div>

        <Image
          src={ArrowLeftIcon}
          className={clsx(
            styles.arrow,
            isOpen && styles.arrow_opened,
            disabled && styles.arrow_disabled,
          )}
          alt="Expand"
          draggable="false"
        />
      </div>

      {(error !== undefined || warn !== undefined || hint !== undefined) && (
        <div
          className={clsx(
            styles.message,
            styles[`message_${size}`],
            hint && styles.message_hint,
            warn && styles.message_warn,
            error && styles.message_error,
          )}
        >
          {error || warn || hint}
        </div>
      )}

      {isOpen && !disabled && (
        <div className={clsx(styles.optionsContainer, styles[`optionsContainer_${direction}`])}>
          <div className={styles.options}>
            {(Object.keys(options) as T[]).map((id) => (
              <div
                key={id.toString()}
                className={clsx(
                  styles.option,
                  styles[`option_${size}`],
                  id === value && styles.option_selected,
                )}
                onClick={() => handleChange(id)}
              >
                {options[id]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
