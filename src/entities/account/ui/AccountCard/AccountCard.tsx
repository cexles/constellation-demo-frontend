'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';

import { useUserStore } from '@entities/user';
import { Account } from '@entities/account/model/types';
import { networks } from '@shared/config/networks';
import { formatNumberWithCurrency, formatNumberWithSeparator } from '@shared/lib/formatters';
import { DeltaIndicator } from '@shared/ui';

import styles from './AccountCard.module.scss';

export default function AccountCard({
  account,
  withSubaccounts,
  withLink,
  withType,
}: {
  account: Account;
  withSubaccounts?: boolean;
  withLink?: boolean;
  withType?: boolean;
}) {
  const router = useRouter();
  const userCurrency = useUserStore((state) => state.currency);

  const goToAccount = () => {
    if (withLink) {
      router.push(`/account/${account.id}`);
    }
  };

  return (
    <div
      className={clsx(
        styles.container,
        withLink && styles.container_clickable,
        withType && styles.container_withType,
      )}
      onClick={goToAccount}
    >
      {withType && <div className={styles.type}>{account.type}</div>}

      <div className={styles.account}>
        <div className={styles.leftScope}>
          <div className={styles.name}>{account.name}</div>

          <div className={styles.networks}>
            {account.networks.map((network) => (
              <div key={network} className={styles.network}>
                <Image src={networks[network]?.icon} alt={network.toString()} draggable="false" />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightScope}>
          <div className={styles.balance}>
            {formatNumberWithCurrency(
              formatNumberWithSeparator(account.balance),
              userCurrency,
              'start',
            )}
          </div>

          <DeltaIndicator delta={account.delta} />
        </div>
      </div>

      {withSubaccounts && account.subaccounts.length > 0 && (
        <div className={styles.subaccounts}>
          {account.subaccounts.map((subaccount) => (
            <div key={subaccount.id} className={styles.subaccount}>
              <div className={styles.subRow}>
                <div className={styles.subName}>{subaccount.name}</div>

                <div className={styles.subBalance}>
                  {formatNumberWithCurrency(
                    formatNumberWithSeparator(subaccount.balance),
                    userCurrency,
                    'start',
                  )}
                </div>
              </div>

              <div className={styles.subRow}>
                <div className={styles.networks}>
                  {subaccount.networks.map((network) => (
                    <div key={network} className={styles.network}>
                      <Image
                        src={networks[network]?.icon}
                        alt={network.toString()}
                        draggable="false"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
