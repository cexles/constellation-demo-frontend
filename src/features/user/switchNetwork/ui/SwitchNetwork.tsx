'use client';

import { useNetwork, useSwitchNetwork } from 'wagmi';

import { NetworkSelector } from '@shared/ui';

export default function SwitchNetwork() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitch = (newNetworkId: string) => {
    if (switchNetwork) {
      switchNetwork(+newNetworkId);
    }
  };

  if (!chain) {
    return null;
  }

  return <NetworkSelector value={chain.id.toString()} onChange={handleSwitch} />;
}
