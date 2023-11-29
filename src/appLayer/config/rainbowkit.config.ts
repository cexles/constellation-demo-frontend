import { getDefaultWallets, connectorsForWallets, lightTheme, Theme } from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const appName = process.env.NEXT_PUBLIC_APP_NAME!;
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()],
);

const { wallets } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const theme: Theme = {
  ...lightTheme(),
  colors: {
    ...lightTheme().colors,
    accentColor: '#5850ec',
  },
};

export { chains, wagmiConfig, theme };
