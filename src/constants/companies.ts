export const SORT_OPTIONS = {
  scoreDesc: {
    label: 'Total Score (High to Low)',
    value: { field: 'total_score', direction: 'DESC' },
  },
  scoreAsc: {
    label: 'Total Score (Low to High)',
    value: { field: 'total_score', direction: 'ASC' },
  },
  priceFluctuationDesc: {
    label: 'Price Fluctuation (High to Low)',
    value: { field: 'price_fluctuation', direction: 'DESC' },
  },
  priceFluctuationAsc: {
    label: 'Price Fluctuation (Low to High)',
    value: { field: 'price_fluctuation', direction: 'ASC' },
  },
};

export const EXCHANGE_SYMBOLS = {
  ASX: 'ASX',
  NYSE: 'NYSE',
  NasdaqGS: 'NasdaqGS',
};

export const MAX_SCORE = 30;
