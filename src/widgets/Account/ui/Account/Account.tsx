'use client';

import { useAccount } from 'wagmi';

import {
  AccountCard,
  BalanceCard,
  useExternalAccount,
  useInternalAccount,
} from '@entities/account';
import { NewAccountButton } from '@features/account/create';
import { Scope } from '@shared/ui';

import styles from './Account.module.scss';

export default function Account({ id }: { id: string }) {
  const { address } = useAccount();
  const externalAccount = useExternalAccount();
  const internalAccount = useInternalAccount(address !== id ? id : undefined);
  const account = internalAccount || externalAccount;

  return (
    <div className={styles.container}>
      <BalanceCard account={account} />

      <div className={styles.account}>
        <Scope title="Main account" type="secondary">
          <AccountCard account={account} />
        </Scope>

        {account.subaccounts.length > 0 && (
          <Scope title="Subaccounts" type="secondary">
            <div className={styles.subaccounts}>
              {account.subaccounts.map((acc) => (
                <AccountCard key={acc.id} account={acc} />
              ))}
            </div>
          </Scope>
        )}
      </div>

      <NewAccountButton subaccountOf={account.id} />
    </div>
  );
}
