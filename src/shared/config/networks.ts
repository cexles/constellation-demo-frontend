import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import AvaxIcon from '@public/networks/avax.svg';
import MaticIcon from '@public/networks/matic.svg';
import EthIcon from '@public/networks/eth.svg';

export interface Network {
  id: number;
  name: string;
  backendName: string;
  symbol: string;
  arrivalTime: number;
  confirmations: number;
  icon: StaticImport;
  url: string;
}

export const networks: Record<string, Network> = {
  11155111: {
    id: 11155111,
    name: 'Ethereum Sepolia',
    backendName: 'ethereum',
    symbol: 'ETH',
    icon: EthIcon,
    url: 'https://rpc.ankr.com/eth_sepolia',
    arrivalTime: 1,
    confirmations: 60,
  },
  80001: {
    id: 80001,
    name: 'Polygon Mumbai',
    symbol: 'MATIC',
    backendName: 'polygon',
    icon: MaticIcon,
    url: 'https://rpc.ankr.com/polygon_mumbai',
    arrivalTime: 2,
    confirmations: 1,
  },
  43113: {
    id: 43113,
    name: 'Avalanche Fuji',
    symbol: 'AVAX',
    backendName: 'avalanche',
    icon: AvaxIcon,
    url: 'https://rpc.ankr.com/avalanche_fuji',
    arrivalTime: 2,
    confirmations: 2,
  },
};

export const networksArray: Network[] = Object.values(networks);
