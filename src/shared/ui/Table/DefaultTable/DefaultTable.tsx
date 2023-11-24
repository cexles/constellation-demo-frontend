'use client';

import Image from 'next/image';
import { memo } from 'react';
import {
  ColumnDef,
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';

import { Pagination } from '@shared/ui';
import ArrowDownIcon from '@public/icons/arrow-filled-down.svg';
import PaginationComponent from '../Pagination/Pagination';

import styles from './DefaultTable.module.scss';

function DefaultTable<T>({
  columns,
  data,
  rowId,
  sorting,
  pagination,
  withoutHeader,
  disabled,
  loading,
  headerStyles,
  rowStyles,
  manualSorting = true,
  onSortingChange,
  onRowClick,
}: {
  columns: ColumnDef<T>[];
  data: T[];
  rowId: keyof T;
  sorting?: SortingState;
  pagination?: Pagination;
  withoutHeader?: boolean;
  disabled?: boolean;
  loading?: boolean;
  headerStyles?: string;
  rowStyles?: string;
  manualSorting?: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  onRowClick?: (id: string) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPages || -1,
    state: {
      sorting,
      pagination: pagination && { pageIndex: pagination.page - 1, pageSize: pagination.perPage },
    },
    onSortingChange,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualSorting,
    manualPagination: true,
  });

  return (
    <>
      <div className={styles.table}>
        {!withoutHeader &&
          table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className={clsx(styles.header, headerStyles)}>
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className={clsx(header.column.getCanSort() && styles.header_sortable)}
                  {...{
                    onClick: header.column.getToggleSortingHandler(),
                  }}
                >
                  <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>

                  {header.column.getCanSort() && (
                    <Image
                      src={ArrowDownIcon}
                      className={clsx(
                        styles.sort,
                        styles[`sort_${header.column.getIsSorted()}`],
                        header.column.getIsSorted() && styles.sort_sorted,
                      )}
                      alt={`${header.column.getIsSorted()}`}
                      draggable="false"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

        <div
          className={clsx(
            styles.body,
            withoutHeader && styles.body_withoutHeader,
            !pagination && styles.body_withoutPagination,
          )}
        >
          {!loading &&
            table.getRowModel().rows.map((row, rowIndex) => (
              <div
                key={row.original[rowId] as string}
                className={clsx(
                  styles.row,
                  rowIndex % 2 === 1 && styles.row_colored,
                  onRowClick && styles.row_clickable,
                  rowStyles,
                )}
                onClick={() => onRowClick && onRowClick(row.original[rowId] as string)}
              >
                {row.getVisibleCells().map((cell) => (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      {pagination && (
        <div className={styles.pagination}>
          <PaginationComponent pagination={pagination} disabled={!!loading || !!disabled} />
        </div>
      )}
    </>
  );
}

const genericMemo: <T>(component: T) => T = memo;

export default genericMemo(DefaultTable);
