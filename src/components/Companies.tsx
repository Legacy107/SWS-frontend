import client from '@/graphql/apollo-client';
import { GET_COMPANIES } from '@/graphql/queries/companies';
import { Typography } from '@mui/material';
import { SORT_OPTIONS } from '@/constants/companies';
import CompaniesTable, { SearchOptions } from './CompaniesTable';

export default async function Companies({ searchOptions }: { searchOptions: SearchOptions }) {
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

    return <CompaniesTable data={data} searchOptions={searchOptions} />;
  } catch (error) {
    return (
      <Typography variant="body1" color="error">
        Error fetching companies
      </Typography>
    );
  }
}
