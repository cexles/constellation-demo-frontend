import { useEffect, useState } from 'react';
import { useNetwork, useAccount, useBalance } from 'wagmi';

import { Account } from '@entities/account';
import { networksArray } from '@shared/config/networks';

export function useExternalAccount() {
  const { chain } = useNetwork();
  const { address, connector } = useAccount();
  const balance = useBalance({ address });
  const [externalAccount, setExternalAccount] = useState<Account>({
    id: '',
    name: '',
    networks: networksArray.map((n) => n.id),
    type: 'external',
    balance: 0,
    delta: 0,
    subaccounts: [],
    members: [],
  });

  useEffect(() => {
    if (address) {
      setExternalAccount({
        ...externalAccount,
        id: address,
        name: `General ${connector?.name} account`,
        balance: +(balance?.data?.formatted || 0),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, chain]);

  return externalAccount;
}
