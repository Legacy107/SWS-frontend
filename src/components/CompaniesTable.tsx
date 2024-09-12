'use client';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/hooks/usePagination';
import {
  Box,
  tableCellClasses,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  styled,
  Stack,
} from '@mui/material';
import RadarChart from '@/components/RadarChart';
import { SORT_OPTIONS, EXCHANGE_SYMBOLS, SORT_DIRECTIONS } from '@/constants/companies';
import { SnowflakeArea } from '@/@types/companies';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export interface SearchOptions {
  sort: keyof typeof SORT_OPTIONS;
  sortDirection: keyof typeof SORT_DIRECTIONS;
  exchangeSymbols: (keyof typeof EXCHANGE_SYMBOLS)[];
  scoreRange: Record<SnowflakeArea, [number, number]>;
  page: number;
  rowsPerPage: number;
}

interface CompaniesProps {
  data: any;
  searchOptions: SearchOptions;
}

export default function CompaniesTable({
  data,
  searchOptions: { sort, sortDirection, exchangeSymbols, scoreRange, page, rowsPerPage },
}: CompaniesProps) {
  const router = useRouter();
  const handlePaginationChange = (page: number, rowsPerPage: number) => {
    router.push(
      '/?' +
        new URLSearchParams({
          sort,
          sortDirection,
          exchangeSymbols: exchangeSymbols.join(','),
          ...Object.fromEntries(
            Object.entries(scoreRange).map(([key, [lower, upper]]) => [key, `${lower},${upper}`])
          ),
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
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader />
          <TableBody>
            {data?.companies?.nodes?.map?.((company: any) => {
              const radarData = [
                company.score.value,
                company.score.future,
                company.score.past,
                company.score.health,
                company.score.dividend,
              ];
              return (
                <StyledTableRow key={company.unique_symbol}>
                  <StyledTableCell>{company.name}</StyledTableCell>
                  <StyledTableCell>{company.unique_symbol}</StyledTableCell>
                  <StyledTableCell>${company.price.edges[0].node.price}</StyledTableCell>
                  <StyledTableCell align="center" sx={{ padding: 0, paddingBlock: 0.5 }}>
                    <Stack alignItems="center" maxHeight="4.75rem">
                      <RadarChart
                        data={radarData}
                        labels={['Value', 'Future', 'Past', 'Health', 'Dividend']}
                      />
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="center">{company.score.total}</StyledTableCell>
                </StyledTableRow>
              );
            })}
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
    </Box>
  );
}

export function TableHeader() {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell>Company Name</StyledTableCell>
        <StyledTableCell>Unique Symbol</StyledTableCell>
        <StyledTableCell>Last Share Price</StyledTableCell>
        <StyledTableCell align="center">Score</StyledTableCell>
        <StyledTableCell align="center">Total Score</StyledTableCell>
      </TableRow>
    </TableHead>
  );
}
