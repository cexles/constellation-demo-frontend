import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import MaticIcon from '@public/networks/matic.svg';

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
};

export const networksArray: Network[] = Object.values(networks);
