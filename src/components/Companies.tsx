'use client';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@mui/material';
import { SORT_OPTIONS, EXCHANGE_SYMBOLS } from '../constants/companies';
import { usePagination } from '@/hooks/usePagination';

export interface SearchOptions {
  sort: keyof typeof SORT_OPTIONS;
  exchangeSymbols: (keyof typeof EXCHANGE_SYMBOLS)[];
  totalScoreRange: [number, number];
  page: number;
  rowsPerPage: number;
}

interface CompaniesProps {
  data: any;
  searchOptions: SearchOptions;
}

export default function Companies({
  data,
  searchOptions: { sort, exchangeSymbols, totalScoreRange, page, rowsPerPage },
}: CompaniesProps) {
  const router = useRouter();
  const handlePaginationChange = (page: number, rowsPerPage: number) => {
    router.push(
      '/?' +
        new URLSearchParams({
          sort,
          exchangeSymbols: exchangeSymbols.join(','),
          totalScoreRange: totalScoreRange.join(','),
          page: page.toString(),
          rowsPerPage: rowsPerPage.toString(),
        }).toString()
    );
  };
  const {
    page: pageState,
    rowsPerPage: rowsPerPageState,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(page, rowsPerPage, handlePaginationChange);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Unique Symbol</TableCell>
              <TableCell>Last Share Price</TableCell>
              <TableCell>Total Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.companies?.nodes?.map?.((company: any) => (
              <TableRow key={company.unique_symbol}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.unique_symbol}</TableCell>
                <TableCell>{company.price.edges[0].node.price}</TableCell>
                <TableCell>{company.score.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.companies.totalCount}
        rowsPerPage={rowsPerPageState}
        page={pageState}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
