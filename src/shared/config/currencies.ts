import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import BtcIcon from '@public/currencies/btc.svg';
import BnbIcon from '@public/currencies/bnb.svg';
import DogeIcon from '@public/currencies/doge.svg';
import EthIcon from '@public/currencies/eth.svg';
import LtcIcon from '@public/currencies/ltc.svg';
import SolIcon from '@public/currencies/sol.svg';
import TrxIcon from '@public/currencies/trx.svg';
import UsdtIcon from '@public/currencies/usdt.svg';
import XrpIcon from '@public/currencies/xrp.svg';
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
  BTC: { symbol: 'BTC', name: 'Bitcoin', icon: BtcIcon },
  ETH: { symbol: 'ETH', name: 'Ethereum', icon: EthIcon },
  USDT: { symbol: 'USDT', name: 'TetherUS', icon: UsdtIcon },
  BNB: { symbol: 'BNB', name: 'Binance Coin', icon: BnbIcon },
  XRP: { symbol: 'XRP', name: 'Ripple', icon: XrpIcon },
  SOL: { symbol: 'SOL', name: 'Solana', icon: SolIcon },
  DOGE: { symbol: 'DOGE', name: 'Dogecoin', icon: DogeIcon },
  TRX: { symbol: 'TRX', name: 'TRON', icon: TrxIcon },
  LTC: { symbol: 'LTC', name: 'Litecoin', icon: LtcIcon },
  MATIC: { symbol: 'MATIC', name: 'Polygon', icon: MaticIcon },
  AVAX: { symbol: 'AVAX', name: 'Avalanche', icon: AvaxIcon },
};

export const fiatCurrencies: Record<string, Currency> = {
  USD: { symbol: 'USD', name: 'United States Dollar', icon: UsdIcon, sign: '$' },
  EUR: { symbol: 'EUR', name: 'Euro', icon: EurIcon, sign: '€' },
};

export const cryptoCurrenciesArray: Currency[] = Object.values(cryptoCurrencies);

export const fiatCurrenciesArray: Currency[] = Object.values(fiatCurrencies);
