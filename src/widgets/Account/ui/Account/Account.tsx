'use client';

import { useAccount } from 'wagmi';

import { AccountCard, BalanceCard, ExternalAccount, useAccountsStore } from '@entities/account';
import { Scope } from '@shared/ui';

import styles from './Account.module.scss';

export default function Account({ id }: { id: string }) {
  const { address } = useAccount();
  const internalAccount = useAccountsStore((state) => state.internalAccounts).find(
    (account) => account.id === id,
  );

  if (id === address) {
    return (
      <div className={styles.container}>
        <div className={styles.account}>
          <Scope title="External account" type="secondary">
            <ExternalAccount />
          </Scope>
        </div>
      </div>
    );
  }

  if (internalAccount) {
    return (
      <div className={styles.container}>
        {/*<BalanceCard account={internalAccount} />*/}

        <div className={styles.account}>
          <Scope title="Main account" type="secondary">
            <AccountCard account={internalAccount} />
          </Scope>

          {internalAccount.subaccounts.length > 0 && (
            <Scope title="Subaccounts" type="secondary">
              <div className={styles.subaccounts}>
                {internalAccount.subaccounts.map((acc) => (
                  <AccountCard key={acc.id} account={acc} />
                ))}
              </div>
            </Scope>
          )}
        </div>
      </div>
    );
  }

  return null;
}
