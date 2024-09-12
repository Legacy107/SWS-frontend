import { Suspense } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import ComapaniesTableLoader from '@/components/CompaniesTableLoader';
import CompaniesSearchFilter from '@/components/CompaniesSearchFilter';
import Companies from '@/components/Companies';
import { EXCHANGE_SYMBOLS, MAX_SCORE, SORT_OPTIONS } from '@/constants/companies';

interface SearchParams {
  sort?: keyof typeof SORT_OPTIONS;
  exchangeSymbols?: string;
  totalScoreRange?: string;
  page?: number;
  rowsPerPage?: number;
}

export default async function page({ searchParams }: { searchParams: SearchParams }) {
  const key = JSON.stringify(searchParams);
  const {
    sort = 'scoreDesc',
    exchangeSymbols = '',
    totalScoreRange = `0,${MAX_SCORE}`,
  } = searchParams;
  const page = Number(searchParams.page) || 0;
  const rowsPerPage = Number(searchParams.rowsPerPage) || 10;
  const [lower, upper] = totalScoreRange.split(',').map(Number);
  const exchangeSymbolsArray = (
    exchangeSymbols ? exchangeSymbols.split(',') : []
  ) as (keyof typeof EXCHANGE_SYMBOLS)[];

  return (
    <Container>
      <Stack gap={2}>
        <Typography variant="h4">Companies</Typography>
        <CompaniesSearchFilter
          sort={sort}
          exchangeSymbols={exchangeSymbolsArray}
          totalScoreRange={[lower, upper]}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <Suspense
          key={key}
          fallback={<ComapaniesTableLoader page={page} rowsPerPage={rowsPerPage} />}
        >
          <Companies
            searchOptions={{
              sort,
              exchangeSymbols: exchangeSymbolsArray,
              totalScoreRange: [lower, upper],
              page,
              rowsPerPage,
            }}
          />
        </Suspense>
      </Stack>
    </Container>
  );
}
