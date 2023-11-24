'use client';

import { useUserStore } from '@entities/user';
import { Selector } from '@shared/ui';
import { fiatCurrenciesArray } from '@shared/config/currencies';

export default function ChangeCurrency() {
  const user = useUserStore();

  return (
    <Selector
      value={user.currency}
      options={Object.fromEntries(
        fiatCurrenciesArray.map((currency) => [currency.symbol, currency.symbol]),
      )}
      onChange={user.updateCurrency}
    />
  );
}
