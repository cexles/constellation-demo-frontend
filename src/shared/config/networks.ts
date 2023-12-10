import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import MaticIcon from '@public/networks/matic.svg';
import EthIcon from '@public/networks/eth.svg';
import AvalancheIcon from '@public/networks/avax.svg';

export interface Network {
  id: number;
  name: string;
  backendName: string;
  network?: string;
  symbol: string;
  icon: StaticImport;
  url: string;
}

export const networks: Record<string, Network> = {
  80001: {
    id: 80001,
    name: 'Polygon Mumbai',
    symbol: 'MATIC',
    backendName: 'polygon',
    icon: MaticIcon,
    url: 'https://rpc.ankr.com/polygon_mumbai',
  },
  11155111: {
    id: 11155111,
    name: 'Sepolia',
    symbol: 'ETH',
    backendName: 'ethereum',
    icon: EthIcon,
    url: 'https://rpc.ankr.com/eth_sepolia',
  },
  97: {
    id: 97,
    name: 'BNB Smart Chain Testnet',
    symbol: 'BNB',
    backendName: '',
    icon: AvalancheIcon,
    url: 'https://rpc.ankr.com/bsc_testnet_chapel',
  }
};

export const networksArray: Network[] = Object.values(networks);