import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { SearchOptions } from '@/components/CompaniesTable';

export function useCompaniesSearchFilter(
  initialSort: SearchOptions['sort'],
  initialSortDirection: SearchOptions['sortDirection'],
  initialExchangeSymbols: SearchOptions['exchangeSymbols'],
  initialScoreRange: SearchOptions['scoreRange'],
  fetchData: (
    sort: SearchOptions['sort'],
    sortDirection: SearchOptions['sortDirection'],
    exchangeSymbols: SearchOptions['exchangeSymbols'],
    scoreRange: SearchOptions['scoreRange']
  ) => void
) {
  const [sort, _setSort] = useState<SearchOptions['sort']>(initialSort);
  const [sortDirection, _setSortDirection] =
    useState<SearchOptions['sortDirection']>(initialSortDirection);
  const [exchangeSymbols, _setExchangeSymbols] =
    useState<SearchOptions['exchangeSymbols']>(initialExchangeSymbols);
  const [scoreRange, _setScoreRange] = useState<SearchOptions['scoreRange']>(initialScoreRange);
  const debouncedFetchData = useDebounce(fetchData, 500);

  const setSort = (sort: SearchOptions['sort']) => {
    _setSort(sort);
    fetchData(sort, sortDirection, exchangeSymbols, scoreRange);
  };

  const setSortDirection = (sortDirection: SearchOptions['sortDirection']) => {
    _setSortDirection(sortDirection);
    fetchData(sort, sortDirection, exchangeSymbols, scoreRange);
  };

  const setExchangeSymbols = (exchangeSymbols: SearchOptions['exchangeSymbols']) => {
    _setExchangeSymbols(exchangeSymbols);
    fetchData(sort, sortDirection, exchangeSymbols, scoreRange);
  };

  const setScoreRange = (scoreRange: SearchOptions['scoreRange']) => {
    _setScoreRange(scoreRange);
    debouncedFetchData(sort, sortDirection, exchangeSymbols, scoreRange);
  };

  return {
    sort,
    setSort,
    sortDirection,
    setSortDirection,
    exchangeSymbols,
    setExchangeSymbols,
    scoreRange,
    setScoreRange,
  };
}
