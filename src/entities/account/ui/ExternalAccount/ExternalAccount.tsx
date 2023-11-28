'use client';

import { useAccount, useBalance } from 'wagmi';

import { AccountCard } from '@entities/account';
import { networksArray } from '@shared/config/networks';

export default function ExternalAccount({ withType }: { withType?: boolean }) {
  const { address, connector } = useAccount();
  const balance = useBalance({ address });

  if (!address) {
    return null;
  }

  return (
    <AccountCard
      account={{
        id: address,
        name: `General ${connector?.name} account`,
        networks: networksArray.map((n) => n.id),
        type: 'external',
        balance: +(balance?.data?.formatted || 0),
        delta: 0,
        subaccounts: [],
        members: [],
      }}
      withType={withType}
      withLink
    />
  );
}
