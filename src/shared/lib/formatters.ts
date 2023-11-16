import { fiatCurrenciesSigns } from '@shared/config/fiatCurrencies';

export const formatNumberWithSeparator = (
  num: string | number,
  separator: string = ' ',
): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

export const formatNumberWithCurrency = (
  num: string | number,
  currency: string = 'usd',
): string => {
  return `${num} ${fiatCurrenciesSigns[currency] || currency.toUpperCase()}`;
};

export const truncateAddressWithSeparator = (
  address: string,
  separator: string = '****',
): string => {
  return `${address.slice(0, 4)}${separator}${address.slice(-4)}`;
};
