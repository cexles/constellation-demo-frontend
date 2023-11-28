import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAccount } from 'wagmi';

import { useAuth } from '@entities/user';
import { useInternalAccounts } from '@entities/account';

export default function AccountsProvider({ children }: { children: React.ReactNode }) {
  const prevPathname = useRef('');
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { internalAccounts } = useInternalAccounts();
  const { refresh, logout } = useAuth();
  useAccount({ onDisconnect: logout });

  useEffect(() => {
    if (
      prevPathname.current === '/auth' &&
      pathname === '/dashboard' &&
      internalAccounts.length === 0
    ) {
      router.push('/new-account?back=false');
    }

    prevPathname.current = pathname;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, internalAccounts]);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return children;
}
