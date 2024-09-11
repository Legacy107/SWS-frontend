import { Suspense } from 'react';
import client from '@/graphql/apollo-client';
import { GET_COMPANIES } from '@/graphql/queries/companies';
import { Container, Skeleton, Stack, Typography } from '@mui/material';
import Companies, { SearchOptions } from '@/components/Companies';
import CompaniesSearchFilter from '@/components/CompaniesSearchFilter';
import { EXCHANGE_SYMBOLS, MAX_SCORE, SORT_OPTIONS } from '@/constants/companies';

const CompaniesList = async ({ searchOptions }: { searchOptions: SearchOptions }) => {
  const { sort, exchangeSymbols, totalScoreRange, page, rowsPerPage } = searchOptions;
  try {
    const { data } = await client.query({
      query: GET_COMPANIES,
      variables: {
        paging: {
          offset: page * rowsPerPage,
          limit: rowsPerPage,
        },
        pricePaging: {
          first: rowsPerPage,
        },
        sorting: sort ? [SORT_OPTIONS[sort as keyof typeof SORT_OPTIONS]?.value] : [],
        filter: {
          ...(exchangeSymbols.length && {
            exchange_symbol: {
              in: exchangeSymbols,
            },
          }),
          total_score: {
            between: {
              lower: totalScoreRange[0],
              upper: totalScoreRange[1],
            },
          },
        },
      },
    });

    return <Companies data={data} searchOptions={searchOptions} />;
  } catch (error) {
    return (
      <Typography variant="body1" color="error">
        Error fetching companies
      </Typography>
    );
  }
};

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
        <Suspense key={key} fallback={<Skeleton variant="rectangular" height={600} />}>
          <CompaniesList
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
