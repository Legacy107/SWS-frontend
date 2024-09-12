import { Suspense } from 'react';
import { Container, Stack, Typography } from '@mui/material';
import ComapaniesTableLoader from '@/components/CompaniesTableLoader';
import CompaniesSearchFilter from '@/components/CompaniesSearchFilter';
import Companies from '@/components/Companies';
import { EXCHANGE_SYMBOLS, MAX_SCORE } from '@/constants/companies';
import { SnowflakeArea } from '@/@types/companies';
import { SearchOptions } from '@/components/CompaniesTable';

type SearchParams = {
  sort?: SearchOptions['sort'];
  sortDirection?: SearchOptions['sortDirection'];
  exchangeSymbols?: string;
  page?: number;
  rowsPerPage?: number;
} & Record<SnowflakeArea, string>;

export default async function page({ searchParams }: { searchParams: SearchParams }) {
  const key = JSON.stringify(searchParams);
  const {
    sort = SnowflakeArea.TOTAL as SearchOptions['sort'],
    sortDirection = 'desc' as SearchOptions['sortDirection'],
    exchangeSymbols = '',
    value_score: valueScoreRange = `0,${MAX_SCORE[SnowflakeArea.VALUE]}`,
    future_score: futureScoreRange = `0,${MAX_SCORE[SnowflakeArea.FUTURE]}`,
    past_score: pastScoreRange = `0,${MAX_SCORE[SnowflakeArea.PAST]}`,
    health_score: healthScoreRange = `0,${MAX_SCORE[SnowflakeArea.HEALTH]}`,
    dividend_score: dividendScoreRange = `0,${MAX_SCORE[SnowflakeArea.DIVIDEND]}`,
    total_score: totalScoreRange = `0,${MAX_SCORE[SnowflakeArea.TOTAL]}`,
  } = searchParams;
  const page = Number(searchParams.page) || 0;
  const rowsPerPage = Number(searchParams.rowsPerPage) || 10;
  const scoreRange = {
    [SnowflakeArea.VALUE]: valueScoreRange.split(',').map(Number) as [number, number],
    [SnowflakeArea.FUTURE]: futureScoreRange.split(',').map(Number) as [number, number],
    [SnowflakeArea.PAST]: pastScoreRange.split(',').map(Number) as [number, number],
    [SnowflakeArea.HEALTH]: healthScoreRange.split(',').map(Number) as [number, number],
    [SnowflakeArea.DIVIDEND]: dividendScoreRange.split(',').map(Number) as [number, number],
    [SnowflakeArea.TOTAL]: totalScoreRange.split(',').map(Number) as [number, number],
  };
  const exchangeSymbolsArray = (
    exchangeSymbols ? exchangeSymbols.split(',') : []
  ) as (keyof typeof EXCHANGE_SYMBOLS)[];

  return (
    <Container>
      <Stack pt={2} gap={3}>
        <Typography variant="h4">Companies</Typography>
        <CompaniesSearchFilter
          sort={sort}
          sortDirection={sortDirection}
          exchangeSymbols={exchangeSymbolsArray}
          scoreRange={scoreRange}
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
              sortDirection,
              exchangeSymbols: exchangeSymbolsArray,
              scoreRange,
              page,
              rowsPerPage,
            }}
          />
        </Suspense>
      </Stack>
    </Container>
  );
}
