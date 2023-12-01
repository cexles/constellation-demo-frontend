'use client';

import Image from 'next/image';

import { Transaction } from '@entities/transaction';
import { useUserStore } from '@entities/user';
import { InfoCard } from '@shared/ui';
import { cryptoCurrencies } from '@shared/config/currencies';
import { formatNumberWithCurrency } from '@shared/lib/formatters';
import ArrowIcon from '@public/icons/arrow-right-thin-with-tail.svg';

import styles from './TransactionView.module.scss';

export default function TransactionView({ transaction }: { transaction: Transaction }) {
  const userCurrency = useUserStore((state) => state.currency);

  return (
    <div className={styles.container}>
      <div className={styles.participant}>
        <div className={styles.wallet}>
          <div className={styles.title}>From</div>
          <div className={styles.coin}>
            <Image
              src={cryptoCurrencies[transaction.sender.asset].icon}
              alt={transaction.sender.asset}
              draggable="false"
            />

            <div>{cryptoCurrencies[transaction.sender.asset].name}</div>
          </div>

          <div className={styles.address}>{transaction.sender.address}</div>
        </div>

        <div className={styles.amount}>
          <div className={styles.title}>Amount</div>
          <div className={styles.amountContainer}>
            <div className={styles.amount}>
              {formatNumberWithCurrency(transaction.sender.amount, transaction.sender.asset)}
            </div>

            <div className={styles.value}>
              {formatNumberWithCurrency(
                transaction.sender.amount * transaction.sender.price,
                userCurrency,
              )}
            </div>
          </div>
        </div>

        <InfoCard
          rows={[
            ['Other information1', '345hjKkjghL34502Jh32kkj2j4j'],
            ['Other information2', '345hjKkjghL34502Jh32kkj2j4j'],
            ['Other information3', '345hjKkjghL34502Jh32kkj2j4j'],
          ]}
        />
      </div>

      <Image src={ArrowIcon} className={styles.arrow} alt="Arrow" draggable="false" />

      <div className={styles.participant}>
        <div className={styles.wallet}>
          <div className={styles.title}>To</div>
          <div className={styles.coin}>
            <Image
              src={cryptoCurrencies[transaction.recipient.asset].icon}
              alt={transaction.recipient.asset}
              draggable="false"
            />

            <div>{cryptoCurrencies[transaction.recipient.asset].name}</div>
          </div>

          <div className={styles.address}>{transaction.recipient.address}</div>
        </div>

        <div className={styles.amount}>
          <div className={styles.title}>Amount</div>
          <div className={styles.amountContainer}>
            <div className={styles.amount}>
              {formatNumberWithCurrency(transaction.recipient.amount, transaction.recipient.asset)}
            </div>

            <div className={styles.value}>
              {formatNumberWithCurrency(
                transaction.recipient.amount * transaction.recipient.price,
                userCurrency,
              )}
            </div>
          </div>
        </div>

        <InfoCard
          rows={[
            ['Other information1', '345hjKkjghL34502Jh32kkj2j4j'],
            ['Other information2', '345hjKkjghL34502Jh32kkj2j4j'],
            ['Other information3', '345hjKkjghL34502Jh32kkj2j4j'],
          ]}
        />
      </div>
    </div>
  );
}
