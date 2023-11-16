'use client';

import Image from 'next/image';

import { Button } from '@shared/ui';
import ArrowLeftIcon from '@public/icons/arrow-left.svg';
import { Pagination } from './types';

import styles from './Pagination.module.scss';

export default function PaginationComponent({
  pagination,
  disabled,
}: {
  pagination: Pagination;
  disabled: boolean;
}) {
  return (
    <div className={styles.pagination}>
      <Button
        size="squared"
        disabled={disabled || pagination.page === 1}
        onClick={pagination.onPrevPage}
      >
        <Image src={ArrowLeftIcon} alt="Prev" draggable="false" />
      </Button>

      {pagination.page !== 1 && pagination.page !== 3 && (
        <Button size="squared" disabled={disabled} onClick={() => pagination.onPageChange(1)}>
          1
        </Button>
      )}

      {pagination.page > 2 && (
        <>
          {pagination.page > 4 && <div className={styles.dots}>...</div>}

          <Button
            size="squared"
            disabled={disabled}
            onClick={() => pagination.onPageChange(pagination.page - 2)}
          >
            {pagination.page - 2}
          </Button>

          <Button
            size="squared"
            disabled={disabled}
            onClick={() => pagination.onPageChange(pagination.page - 1)}
          >
            {pagination.page - 1}
          </Button>
        </>
      )}

      <div className={styles.currentPage}>
        <Button size="squared" disabled={disabled} onClick={() => {}}>
          {pagination.page}
        </Button>
      </div>

      {pagination.page < pagination.totalPages - 1 && (
        <>
          <Button
            size="squared"
            disabled={disabled}
            onClick={() => pagination.onPageChange(pagination.page + 1)}
          >
            {pagination.page + 1}
          </Button>

          <Button
            size="squared"
            disabled={disabled}
            onClick={() => pagination.onPageChange(pagination.page + 2)}
          >
            {pagination.page + 2}
          </Button>

          {pagination.page < pagination.totalPages - 3 && <div className={styles.dots}>...</div>}
        </>
      )}

      {pagination.page !== pagination.totalPages &&
        pagination.page !== pagination.totalPages - 2 && (
          <Button
            size="squared"
            disabled={disabled}
            onClick={() => pagination.onPageChange(pagination.totalPages)}
          >
            {pagination.totalPages}
          </Button>
        )}

      <Button
        size="squared"
        disabled={disabled || pagination.page === pagination.totalPages}
        onClick={pagination.onNextPage}
      >
        <Image src={ArrowLeftIcon} alt="Next" draggable="false" />
      </Button>
    </div>
  );
}
