'use client';

import Image from 'next/image';
import { useRef } from 'react';
import clsx from 'clsx';

import CheckIcon from '@public/icons/check.svg';

import styles from './Checkbox.module.scss';

export default function Checkbox({
  value,
  label,
  disabled,
  onChange,
}: {
  value: boolean;
  label?: string;
  disabled?: boolean;
  onChange: (newValue: boolean) => void;
}) {
  const checkboxRef = useRef<HTMLDivElement>(null);

  const handleChange = () => {
    onChange(!value);
    checkboxRef.current?.blur();
  };

  return (
    <div
      ref={checkboxRef}
      tabIndex={0}
      className={clsx(
        styles.checkbox,
        value && styles.checkbox_selected,
        disabled && styles.checkbox_disabled,
      )}
      onClick={handleChange}
    >
      <div
        className={clsx(
          styles.check,
          value && styles.check_selected,
          disabled && styles.check_disabled,
        )}
      >
        {value && <Image src={CheckIcon} alt="Check" draggable="false" />}
      </div>

      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
}
