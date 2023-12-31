'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

import { AccountCard, ExternalAccount, useAccountsStore } from '@entities/account';
import { NewAccountButton } from '@features/account/create';
import { Scope } from '@shared/ui';
import EyeIcon from '@public/icons/eye.svg';

import styles from './Accounts.module.scss';

export default function Accounts() {
  const internalAccounts = useAccountsStore((state) => state.internalAccounts);
  const [internal, setInternal] = useState(false);

  return (
    <Scope
      title="Accounts"
      actions={
        <div
          className={clsx(styles.internal, internal && styles.internal_active)}
          onClick={() => setInternal(!internal)}
        >
          <Image src={EyeIcon} alt="Eye" draggable="false" />

          <div>internal accounts</div>
        </div>
      }
    >
      <div className={styles.container}>
        <div className={styles.accounts}>
          {!internal && <ExternalAccount withType />}

          {internalAccounts.map((account) => (
            <AccountCard key={account.id} account={account} withSubaccounts withLink withType />
          ))}
        </div>

        {internalAccounts.length === 0 && <NewAccountButton />}
      </div>
    </Scope>
  );
}
