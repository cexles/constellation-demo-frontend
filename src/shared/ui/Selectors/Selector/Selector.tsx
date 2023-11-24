'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import ArrowLeftIcon from '@public/icons/arrow-left.svg';

import styles from './Selector.module.scss';

export default function Selector<T extends string | string[]>({
  value,
  options,
  placeholder,
  label,
  hint,
  warn,
  error,
  text,
  size = 'm',
  direction = 'down',
  disabled = false,
  onChange,
  valueRenderFn,
}: {
  value: T;
  options: Record<string, string | React.ReactNode>;
  placeholder?: string;
  label?: string;
  hint?: string;
  warn?: string;
  error?: string;
  text?: string;
  size?: 's' | 'm' | 'l';
  direction?: 'up' | 'down';
  disabled?: boolean;
  onChange: (newValue: T) => void;
  valueRenderFn?: (newValue: T) => string | React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  useClickAway(containerRef, () => {
    setOpen(false);
  });

  const openClose = () => {
    setOpen(!isOpen);
  };

  const handleChange = (newValue: string) => {
    if (Array.isArray(value)) {
      if (value.includes(newValue)) {
        onChange(value.filter((v) => v !== newValue) as T);
      } else {
        onChange([...value, newValue] as T);
      }
    } else {
      if (newValue === value) {
        onChange('' as T);
      } else {
        onChange(newValue as T);
      }

      setOpen(false);
    }
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
        <div>
          {valueRenderFn?.(value) ||
            (Array.isArray(value)
              ? Object.keys(value)
                  .map((option) => options[option])
                  .filter((o) => o)
                  .join(', ')
              : options[value]) ||
            placeholder}
        </div>

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
            {text && <div className={styles.text}>{text}</div>}

            {Object.keys(options).map((id) => (
              <div
                key={id}
                className={clsx(
                  styles.option,
                  styles[`option_${size}`],
                  ((Array.isArray(value) && value.includes(id)) || id === value) &&
                    styles.option_selected,
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
