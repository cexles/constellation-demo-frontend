import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import EthIcon from '@public/currencies/eth.svg';
import UsdtIcon from '@public/currencies/usdt.svg';
import MaticIcon from '@public/currencies/matic.svg';
import AvaxIcon from '@public/currencies/avax.svg';

import UsdIcon from '@public/currencies/usd.svg';
import EurIcon from '@public/currencies/eur.svg';

export interface Currency {
  symbol: string;
  name: string;
  icon: StaticImport;
  sign?: string;
}

export const cryptoCurrencies: Record<string, Currency> = {
  ETH: { symbol: 'ETH', name: 'Ethereum', icon: EthIcon },
  MATIC: { symbol: 'MATIC', name: 'Polygon', icon: MaticIcon },
  AVAX: { symbol: 'AVAX', name: 'Avalanche', icon: AvaxIcon },
  LINK: { symbol: 'LINK', name: 'LINK', icon: UsdtIcon },
  TUSDC: { symbol: 'TUSDC', name: 'Test USDC', icon: EthIcon },
};

export const fiatCurrencies: Record<string, Currency> = {
  USD: { symbol: 'USD', name: 'United States Dollar', icon: UsdIcon, sign: '$' },
  EUR: { symbol: 'EUR', name: 'Euro', icon: EurIcon, sign: '€' },
};

export const cryptoCurrenciesArray: Currency[] = Object.values(cryptoCurrencies);

export const fiatCurrenciesArray: Currency[] = Object.values(fiatCurrencies);
