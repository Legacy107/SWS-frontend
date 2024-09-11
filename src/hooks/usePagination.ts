import { useState } from 'react';

export function usePagination(
  initialPage: number,
  initialRowsPerPage: number,
  onPaginationChange: (page: number, rowsPerPage: number) => void
) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
    onPaginationChange(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPage(0);
    onPaginationChange(0, rowsPerPage);
  };

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
