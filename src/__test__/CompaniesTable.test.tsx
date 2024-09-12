import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CompaniesTable from '@/components/CompaniesTable';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CompaniesTable', () => {
  it('renders table loader', async () => {
    render(
      <CompaniesTable
        data={{
          companies: {
            totalCount: 10,
          },
        }}
        searchOptions={{
          sort: 'priceFluctuation',
          sortDirection: 'asc',
          exchangeSymbols: ['ASX'],
          scoreRange: {
            value: [0, 100],
            future: [0, 100],
            past: [0, 100],
            health: [0, 100],
            dividend: [0, 100],
            total: [0, 100],
          } as any,
          page: 0,
          rowsPerPage: 10,
        }}
      />
    );
    expect(screen.getByText('Company Name')).toBeVisible();
    expect(screen.getByText('Unique Symbol')).toBeVisible();
    expect(screen.getByText('Last Share Price')).toBeVisible();
    expect(screen.getByText('Score')).toBeVisible();
    expect(screen.getByText('Total Score')).toBeVisible();
  });
});
