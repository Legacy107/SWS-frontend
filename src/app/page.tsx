'use client';

import { useQuery } from '@apollo/client';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TablePagination,
  Typography,
  Stack,
  Skeleton,
  Slider,
} from '@mui/material';
import { GET_COMPANIES } from '@/graphql/queries/companies';
import client from '@/graphql/apollo-client';

const SORT_OPTIONS = {
  scoreDesc: {
    label: 'Total Score (High to Low)',
    value: { field: 'total_score', direction: 'DESC' },
  },
  scoreAsc: {
    label: 'Total Score (Low to High)',
    value: { field: 'total_score', direction: 'ASC' },
  },
};

const EXCHANGE_SYMBOLS = {
  ASX: 'ASX',
  NYSE: 'NYSE',
  NasdaqGS: 'NasdaqGS',
};

const MAX_SCORE = 30;

const CompaniesPage = () => {
  const [sort, setSort] = useState<keyof typeof SORT_OPTIONS>('scoreDesc');
  const [exchangeSymbols, setExchangeSymbols] = useState<string[]>([]);
  const [totalScoreRange, setTotalScoreRange] = useState<[number, number]>([0, MAX_SCORE]);
  const [totalScoreRangeInput, setTotalScoreRangeInput] = useState<[number, number]>([
    0,
    MAX_SCORE,
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeScoreRange = useDebounce(
    (value: [number, number]) => setTotalScoreRange(value),
    500
  );

  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: {
      paging: {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      },
      sorting: sort ? [SORT_OPTIONS[sort].value] : [],
      filter: {
        ...(exchangeSymbols.length && {
          exchange_symbol: {
            in: exchangeSymbols,
          },
        }),
        ...(totalScoreRange && {
          total_score: {
            between: {
              lower: totalScoreRange[0],
              upper: totalScoreRange[1],
            },
          },
        }),
      },
    },
    client,
  });

  if (error) return <p>Error: {error.message}</p>;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h4">Companies</Typography>
        <Stack direction="row" gap={2}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              label="Sort By"
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof SORT_OPTIONS)}
            >
              {Object.entries(SORT_OPTIONS).map(([key, option]) => (
                <MenuItem key={key} value={key}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="exchange-label">Exchange Symbols</InputLabel>
            <Select
              labelId="exchange-label"
              label="Exchange Symbols"
              multiple
              value={exchangeSymbols}
              onChange={(e) => {
                const value = e.target.value as string[];
                setExchangeSymbols(value);
              }}
            >
              {Object.entries(EXCHANGE_SYMBOLS).map(([key, value]) => (
                <MenuItem key={key} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ ml: 1 }}>
            <Typography gutterBottom>Total Score</Typography>
            <Slider
              value={totalScoreRangeInput}
              onChange={(_, newValue) => {
                const range = newValue as [number, number];
                setTotalScoreRangeInput(range);
                handleChangeScoreRange(range);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={MAX_SCORE}
            />
          </FormControl>
        </Stack>

        {loading ? (
          <Skeleton variant="rectangular" height={600} />
        ) : (
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
                  {data.companies.nodes.map((company: any) => (
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
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Stack>
    </Container>
  );
};

export default CompaniesPage;
