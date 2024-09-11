import { useState } from 'react';
import { SORT_OPTIONS, EXCHANGE_SYMBOLS } from '@/constants/companies';

export function useCompaniesSearchFilter(
  initialSort: keyof typeof SORT_OPTIONS,
  initialExchangeSymbols: (keyof typeof EXCHANGE_SYMBOLS)[],
  initialTotalScoreRange: [number, number]
) {
  const [sort, setSort] = useState<keyof typeof SORT_OPTIONS>(initialSort);
  const [exchangeSymbols, setExchangeSymbols] =
    useState<(keyof typeof EXCHANGE_SYMBOLS)[]>(initialExchangeSymbols);
  const [totalScoreRange, setTotalScoreRange] = useState<[number, number]>(initialTotalScoreRange);

  return {
    sort,
    setSort,
    exchangeSymbols,
    setExchangeSymbols,
    totalScoreRange,
    setTotalScoreRange,
  };
}
