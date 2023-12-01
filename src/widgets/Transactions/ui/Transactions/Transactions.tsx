'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import moment from 'moment';
import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';

import { useUserStore } from '@entities/user';
import { Transaction, useTransactionsTable } from '@entities/transaction';
import { AccountSelector } from '@entities/account';
import { DateRangePicker, DefaultTable, NoData, Scope, Tabs } from '@shared/ui';
import { formatNumberWithCurrency, truncateAddressWithSeparator } from '@shared/lib/formatters';
import { cryptoCurrencies } from '@shared/config/currencies';
import ReceiveIcon from '@public/icons/receive.svg';
import TradeIcon from '@public/icons/swap.svg';
import SendIcon from '@public/icons/send.svg';
import ArrowIcon from '@public/icons/arrow-with-tail.svg';

import styles from './Transactions.module.scss';

export default function Transactions({ id }: { id?: string }) {
  const router = useRouter();
  const { address } = useAccount();
  const userCurrency = useUserStore((state) => state.currency);
  const {
    loading,
    pagination,
    transactions,
    type,
    account,
    dateFrom,
    dateTo,
    setType,
    setAccount,
    setDateFrom,
    setDateTo,
  } = useTransactionsTable(id || address);

  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        header: undefined,
        accessorKey: 'timestamp',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: ({ row }) => (
          <div className={styles.meta}>
            <div className={clsx(styles.typeImage, styles[`typeImage_${row.original.type}`])}>
              <Image
                src={
                  (row.original.type === 'receive' && ReceiveIcon) ||
                  (row.original.type === 'send' && SendIcon) ||
                  TradeIcon
                }
                alt={row.original.type}
                draggable="false"
              />
            </div>

            <div>
              <div className={styles.type}>{row.original.type}</div>

              <div className={styles.timestamp}>
                {moment(row.original.timestamp).format('DD/MM/YYYY HH:mm')}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: undefined,
        accessorKey: 'type',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: ({ row }) => (
          <div className={clsx(styles.transaction, styles[`transaction_${row.original.type}`])}>
            <div className={styles.participant}>
              <div className={styles.asset}>
                <Image
                  src={cryptoCurrencies[row.original.sender.asset].icon}
                  alt={row.original.sender.asset}
                  draggable="false"
                />
              </div>

              <div>
                <div className={styles.amount}>
                  -{formatNumberWithCurrency(row.original.sender.amount, row.original.sender.asset)}
                </div>

                <div className={styles.value}>
                  -
                  {formatNumberWithCurrency(
                    row.original.sender.amount * row.original.sender.price,
                    userCurrency,
                  )}
                </div>
              </div>
            </div>

            <Image src={ArrowIcon} className={styles.arrow} alt="Arrow" draggable="false" />

            <div className={styles.participant}>
              <div className={styles.asset}>
                <Image
                  src={cryptoCurrencies[row.original.recipient.asset].icon}
                  alt={row.original.recipient.asset}
                  draggable="false"
                />
              </div>

              <div>
                <div className={styles.amount}>
                  +
                  {formatNumberWithCurrency(
                    row.original.recipient.amount,
                    row.original.recipient.asset,
                  )}
                </div>

                <div className={styles.value}>
                  +
                  {formatNumberWithCurrency(
                    row.original.recipient.amount * row.original.recipient.price,
                    userCurrency,
                  )}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        header: undefined,
        accessorKey: 'recipient',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: ({ row }) => (
          <div className={styles.wallets}>
            <div className={styles.address}>
              {truncateAddressWithSeparator(row.original.sender.address)}
            </div>

            <Image src={ArrowIcon} className={styles.arrow} alt="Arrow" draggable="false" />

            <div className={styles.address}>
              {truncateAddressWithSeparator(row.original.recipient.address)}
            </div>
          </div>
        ),
      },
    ],
    [userCurrency],
  );

  return (
    <Scope
      title="Transactions"
      actions={
        <div className={styles.filters}>
          <Tabs
            value={type}
            options={{
              all: 'All',
              send: 'Send',
              receive: 'Receive',
              trade: 'Trade',
            }}
            onChange={setType}
          />

          <AccountSelector placeholder="All accounts" value={account} onChange={setAccount} />

          <DateRangePicker
            placeholder="All dates"
            dateFrom={dateFrom}
            dateTo={dateTo}
            positionX="right"
            setDateFrom={setDateFrom}
            setDateTo={setDateTo}
          />
        </div>
      }
    >
      {transactions.length > 0 ? (
        <DefaultTable
          columns={columns}
          data={transactions}
          rowId="id"
          pagination={pagination}
          loading={loading}
          rowStyles={styles.row}
          withoutHeader
          onRowClick={(transactionId: string) => router.push(`/transaction?id=${transactionId}`)}
        />
      ) : (
        <NoData text="There's no transactions" height={400} />
      )}
    </Scope>
  );
}
