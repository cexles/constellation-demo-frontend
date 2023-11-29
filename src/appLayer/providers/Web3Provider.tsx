import { WagmiConfig } from 'wagmi';
import {
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { SiweMessage, generateNonce } from 'siwe';

import { chains, theme, wagmiConfig } from '@app/config/rainbowkit.config';
import { useAuth, useUserStore } from '@entities/user';

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const userStatus = useUserStore((state) => state.status);
  const { login, logout } = useAuth();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      return generateNonce();
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'hello',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.statement!;
    },
    verify: async ({ message, signature }) => {
      const loggedIn = await login(message.address, signature);

      return loggedIn;
    },
    signOut: async () => {
      logout();
    },
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={userStatus}>
        <RainbowKitProvider chains={chains} theme={theme}>
          {children}
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
