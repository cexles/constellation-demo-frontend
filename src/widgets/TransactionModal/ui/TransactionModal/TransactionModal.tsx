'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Transaction, TransactionView } from '@entities/transaction';
import { Modal } from '@shared/ui';

import styles from './TransactionModal.module.scss';

export default function TransactionModal() {
  const id = useSearchParams().get('id') || 'sd';
  const transaction: Transaction = {
    id,
    type: 'send',
    timestamp: 1701413689000,
    sender: {
      address: '23-9ctm8324890cttm',
      asset: 'BTC',
      price: 0,
      amount: 0.85,
    },
    recipient: {
      address: '23-9ctm8324890cttm',
      asset: 'BTC',
      price: 0,
      amount: 0.85,
    },
  };

  return (
    <Modal
      header={
        <div className={styles.header}>
          <div className={styles.title}>Transaction</div>

          <Link href={`https://www.google.com/transaction/${id}`} className={styles.id}>
            {transaction.id}
          </Link>
        </div>
      }
    >
      <TransactionView transaction={transaction} />
    </Modal>
  );
}
