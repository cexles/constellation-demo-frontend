import { fiatCurrencies } from '@shared/config/currencies';

export const formatNumberWithSeparator = (
  num: string | number,
  decimals = 2,
  separator: string = ' ',
): string => {
  const pow = 10 ** decimals;
  const roundedNum = Math.round(+num * pow) / pow;
  const parts = roundedNum.toString().split('.');

  return `${parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)}${parts[1] ? `.${parts[1]}` : ''}`;
};

export const formatNumberWithCurrency = (
  num: string | number,
  currency = 'USD',
  position: 'start' | 'end' = 'end',
): string => {
  if (position === 'end') {
    return `${num} ${fiatCurrencies[currency]?.sign || currency}`;
  }

  return `${fiatCurrencies[currency]?.sign || currency} ${num}`;
};

export const truncateAddressWithSeparator = (
  address: string,
  separator: string = '****',
): string => {
  return `${address.slice(0, 6)}${separator}${address.slice(-6)}`;
};
