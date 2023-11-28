'use client';

import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { networks } from '@shared/config/networks';
import { NetworkSelector } from '@shared/ui';

export default function SwitchNetwork({
  variant = 'default',
}: {
  variant?: 'default' | 'extended';
}) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [networkError, setNetworkError] = useState<string>();

  const handleSwitch = (newNetworkId: string) => {
    if (switchNetwork) {
      switchNetwork(+newNetworkId);
    }
  };

  useEffect(() => {
    if (chain && !Object.keys(networks).includes(chain.id.toString())) {
      setNetworkError('Unsupported network');
    } else {
      setNetworkError(undefined);
    }
  }, [chain]);

  if (!chain) {
    return null;
  }

  return (
    <NetworkSelector
      value={chain.id.toString()}
      error={networkError}
      variant={variant}
      onChange={handleSwitch}
    />
  );
}
