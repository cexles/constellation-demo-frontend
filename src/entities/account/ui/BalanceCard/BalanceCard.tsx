'use client';

import { useUserStore } from '@entities/user';
import { Account } from '@entities/account/model/types';
import { formatNumberWithCurrency } from '@shared/lib/formatters';
import { DeltaIndicator } from '@shared/ui';

import styles from './BalanceCard.module.scss';

export default function BalanceCard({ account }: { account: Account }) {
  const userCurrency = useUserStore((state) => state.currency);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Balance</div>

      <div>
        <div className={styles.balance}>
          {formatNumberWithCurrency(account.balance, userCurrency)}
        </div>

        <DeltaIndicator delta={account.delta} />
      </div>
    </div>
  );
}
