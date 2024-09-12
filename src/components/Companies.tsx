import client from '@/graphql/apollo-client';
import { GET_COMPANIES } from '@/graphql/queries/companies';
import { Typography } from '@mui/material';
import { SORT_DIRECTIONS, SORT_OPTIONS } from '@/constants/companies';
import CompaniesTable, { SearchOptions } from './CompaniesTable';

export default async function Companies({ searchOptions }: { searchOptions: SearchOptions }) {
  const { sort, sortDirection, exchangeSymbols, scoreRange, page, rowsPerPage } = searchOptions;
  try {
    // wait 1 second to simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
        sorting:
          SORT_OPTIONS[sort]?.value && SORT_DIRECTIONS[sortDirection]?.value
            ? [
                {
                  field: SORT_OPTIONS[sort].value,
                  direction: SORT_DIRECTIONS[sortDirection].value,
                },
              ]
            : [],
        filter: {
          ...(exchangeSymbols.length && {
            exchange_symbol: {
              in: exchangeSymbols,
            },
          }),
          ...Object.fromEntries(
            Object.entries(scoreRange).map(([key, [lower, upper]]) => [
              key,
              {
                between: {
                  lower,
                  upper,
                },
              },
            ])
          ),
        },
      },
    });

    return <CompaniesTable data={data} searchOptions={searchOptions} />;
  } catch (error) {
    console.error(error);
    return (
      <Typography variant="body1" color="error">
        Error fetching companies
      </Typography>
    );
  }
}
