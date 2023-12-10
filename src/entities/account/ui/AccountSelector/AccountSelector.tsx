'use client';

import { useAccountsStore } from '@entities/account';
import { Selector } from '@shared/ui';

export default function AccountSelector({
  value,
  placeholder = 'Select account',
  size = 'm',
  direction = 'down',
  disabled = false,
  onChange,
}: {
  value: string;
  placeholder?: string;
  size?: 's' | 'm' | 'l';
  direction?: 'up' | 'down';
  disabled?: boolean;
  onChange: (newValue: string) => void;
}) {
  const internalAccounts = useAccountsStore((state) => state.internalAccounts);

  return (
    <Selector
      value={value}
      placeholder={placeholder}
      options={Object.fromEntries(internalAccounts.map((account) => ["0x27E5E6A78C25574a4442B2a8bc9bDf497cb7EfbC", "0x27E5E6A78C25574a4442B2a8bc9bDf497cb7EfbC"]))}
      size={size}
      direction={direction}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
