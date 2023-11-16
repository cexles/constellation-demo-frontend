'use client';

import { useRef } from 'react';
import clsx from 'clsx';
import InputMask from 'react-input-mask';

import styles from './TextInput.module.scss';

export default function TextInput({
  placeholder,
  value,
  type = 'text',
  disabled = false,
  label,
  hint,
  warn,
  error,
  size = 'm',
  element,
  mask,
  onChange,
  onEnterPress,
  onFocus,
  onBlur,
}: {
  placeholder: string;
  value: string | number;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  label?: string;
  hint?: string;
  warn?: string;
  error?: string;
  size?: 's' | 'm' | 'l';
  element?: React.ReactNode;
  mask?: string;
  onChange: (newValue: string) => void;
  onEnterPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = () => {
    inputRef.current?.focus();

    if (onFocus) {
      onFocus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.value);
    }
  };

  const handleEnterPress = () => {
    if (!disabled && onEnterPress) {
      onEnterPress();
      inputRef.current?.blur();

      if (onBlur) {
        onBlur();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
        handleEnterPress();
        break;
      case 'Escape':
        inputRef.current?.blur();

        if (onBlur) {
          onBlur();
        }

        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      {label && <div className={clsx(styles.label, styles[`label_${size}`])}>{label}</div>}

      <div
        className={clsx(
          styles.inputContainer,
          styles[`inputContainer_${size}`],
          disabled && styles.inputContainer_disabled,
          warn && styles.inputContainer_warn,
          error && styles.inputContainer_error,
        )}
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
      >
        {mask ? (
          <InputMask value={value} mask={mask} disabled={disabled} onChange={handleChange}>
            <input
              ref={inputRef}
              type={type}
              placeholder={placeholder}
              className={clsx(styles.input, styles[`input_${size}`])}
            />
          </InputMask>
        ) : (
          <input
            ref={inputRef}
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={clsx(styles.input, styles[`input_${size}`])}
            onChange={handleChange}
          />
        )}

        {element}
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
    </div>
  );
}
