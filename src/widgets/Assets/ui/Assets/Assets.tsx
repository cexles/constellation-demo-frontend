'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useAccount } from 'wagmi';

import { useUserStore } from '@entities/user';
import { Asset, AssetMeta, useAssetsTable } from '@entities/asset';
import {
  DefaultTable,
  NetworkSelector,
  NoData,
  Scope,
  TextInput,
} from '@shared/ui';
import { formatNumberWithCurrency, formatNumberWithSeparator } from '@shared/lib/formatters';
import SearchIcon from '@public/icons/search.svg';

import styles from './Assets.module.scss';

export default function Assets({ id }: { id?: string }) {
  const { address } = useAccount();
  const userCurrency = useUserStore((state) => state.currency);
  const {
    loading,
    assets,
    sorting,
    searchQuery,
    networks,
    setSorting,
    setSearchQuery,
    setNetworks,
  } = useAssetsTable(id || address);

  const columns = useMemo<ColumnDef<Asset>[]>(
    () => [
      {
        header: 'Asset',
        id: 'name',
        accessorKey: 'name',
        // eslint-disable-next-line react/no-unstable-nested-components
        cell: ({ row }) => <AssetMeta asset={row.original} />,
      },
      {
        header: 'Price',
        id: 'price',
        accessorKey: 'price',
        cell: ({ row }) =>
          formatNumberWithCurrency(formatNumberWithSeparator(row.original.price), userCurrency),
      },
      {
        header: 'Balance',
        id: 'formatted',
        accessorKey: 'formatted',
        cell: ({ row }) =>
          formatNumberWithCurrency(
            formatNumberWithSeparator(row.original.formatted, 6),
            row.original.symbol,
          ),
      },
      // {
      //   header: 'Value',
      //   id: 'value',
      //   accessorKey: 'value',
      //   cell: ({ row }) =>
      //     formatNumberWithCurrency(formatNumberWithSeparator(row.original.value), userCurrency),
      // },
      // {
      //   header: 'Last 24h',
      //   id: 'delta',
      //   accessorKey: 'delta',
      //   // eslint-disable-next-line react/no-unstable-nested-components
      //   cell: ({ row }) => <DeltaIndicator delta={row.original.delta} />,
      // },
    ],
    [userCurrency],
  );

  return (
    <Scope
      title="Assets"
      actions={
        <div className={styles.filters}>
          <TextInput
            placeholder="Search"
            value={searchQuery}
            disabled={loading}
            element={<Image src={SearchIcon} alt="Search" draggable="false" />}
            onChange={setSearchQuery}
          />

          <NetworkSelector
            placeholder="All networks"
            value={networks}
            disabled={loading}
            onChange={setNetworks}
          />
        </div>
      }
    >
      {assets.length > 0 ? (
        <DefaultTable
          columns={columns}
          data={assets}
          rowId="name"
          sorting={sorting}
          loading={loading}
          headerStyles={styles.header}
          rowStyles={styles.row}
          manualSorting={false}
          onSortingChange={setSorting}
        />
      ) : (
        <NoData text="There's no assets" height={400} />
      )}
    </Scope>
  );
}
