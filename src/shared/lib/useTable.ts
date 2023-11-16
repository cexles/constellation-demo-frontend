import { useState, useMemo } from 'react';
import { SortingState } from '@tanstack/react-table';

import { Pagination } from '@shared/ui';

export function useTable(initialPerPage: number = 7, initialSorting: SortingState = []) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [totalPages, setTotalPages] = useState(15);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const pagination = useMemo<Pagination>(
    () => ({
      page,
      perPage,
      totalPages,
      onNextPage: nextPage,
      onPrevPage: prevPage,
      onPageChange: setPage,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page, perPage, totalPages],
  );

  return {
    loading,
    pagination,
    sorting,
    setLoading,
    setPerPage,
    setTotalPages,
    setSorting,
  };
}
