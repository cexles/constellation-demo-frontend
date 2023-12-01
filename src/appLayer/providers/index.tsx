'use client';

import { useEffect } from 'react';

import Web3Provider from '@app/providers/Web3Provider';
import AccountsProvider from '@app/providers/AccountsProvider';
import { useUserStore } from '@entities/user';

export default function Providers({ children }: { children: React.ReactNode }) {
  const user = useUserStore();

  useEffect(() => {
    user.setStatus('unauthenticated');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user.status) {
    return null;
  }

  return (
    <Web3Provider>
      <AccountsProvider>{children}</AccountsProvider>
    </Web3Provider>
  );
}
