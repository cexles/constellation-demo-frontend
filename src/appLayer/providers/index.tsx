'use client';

import Web3Provider from '@app/providers/Web3Provider';
import AccountsProvider from '@app/providers/AccountsProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Web3Provider>
      <AccountsProvider>{children}</AccountsProvider>
    </Web3Provider>
  );
}
