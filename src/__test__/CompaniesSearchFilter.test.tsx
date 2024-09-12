import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CompaniesSearchFilter from '@/components/CompaniesSearchFilter';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CompaniesSearchFilter', () => {
  it('renders search and filter input', async () => {
    render(
      <CompaniesSearchFilter
        sort="priceFluctuation"
        sortDirection="asc"
        exchangeSymbols={['ASX']}
        scoreRange={
          {
            value: [0, 100],
            future: [0, 100],
            past: [0, 100],
            health: [0, 100],
            dividend: [0, 100],
            total: [0, 100],
          } as any
        }
        page={0}
        rowsPerPage={10}
      />
    );

    expect(screen.getAllByText('Sort By')[0]).toBeVisible();
    expect(screen.getAllByText('Sort Direction')[0]).toBeVisible();
    expect(screen.getAllByText('Exchange Symbols')[0]).toBeVisible();
    expect(screen.getAllByText('Score Filter')[0]).toBeVisible();
  });
});
