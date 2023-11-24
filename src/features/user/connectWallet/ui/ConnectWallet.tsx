'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { Button } from '@shared/ui';

export default function ConnectWallet() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, authenticationStatus, mounted, openChainModal, openConnectModal }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (() => {
          if (!connected) {
            return (
              <Button
                variant="contained"
                loading={authenticationStatus === 'loading'}
                onClick={openConnectModal}
              >
                Connect
              </Button>
            );
          }

          if (chain.unsupported) {
            return (
              <Button variant="contained" onClick={openChainModal}>
                Wrong network
              </Button>
            );
          }

          return null;
        })();
      }}
    </ConnectButton.Custom>
  );
}
