import { useEffect, useState } from 'react';

import { Account } from '@entities/account';

export function useInternalAccount(id?: string) {
  const [internalAccount, setInternalAcount] = useState<Account>();

  useEffect(() => {
    if (!id) {
      return;
    }

    setInternalAcount({
      id: '',
      name: '',
      networks: [],
      type: 'external',
      balance: 0,
      delta: 0,
      subaccounts: [],
      members: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return internalAccount;
}
