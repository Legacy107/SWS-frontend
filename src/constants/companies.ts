import { SnowflakeArea } from '@/@types/companies';

export const SORT_DIRECTIONS = {
  asc: {
    label: 'Low to High',
    value: 'ASC',
  },
  desc: {
    label: 'High to Low',
    value: 'DESC',
  },
};

export const SORT_OPTIONS = {
  [SnowflakeArea.VALUE]: {
    label: 'Value Score',
    value: SnowflakeArea.VALUE,
  },
  [SnowflakeArea.FUTURE]: {
    label: 'Future Score',
    value: SnowflakeArea.FUTURE,
  },
  [SnowflakeArea.PAST]: {
    label: 'Past Score',
    value: SnowflakeArea.PAST,
  },
  [SnowflakeArea.HEALTH]: {
    label: 'Health Score',
    value: SnowflakeArea.HEALTH,
  },
  [SnowflakeArea.DIVIDEND]: {
    label: 'Dividend Score',
    value: SnowflakeArea.DIVIDEND,
  },
  [SnowflakeArea.TOTAL]: {
    label: 'Total Score',
    value: SnowflakeArea.TOTAL,
  },
  priceFluctuation: {
    label: 'Price Fluctuation',
    value: 'price_fluctuation',
  },
};

export const EXCHANGE_SYMBOLS = {
  ASX: 'ASX',
  NYSE: 'NYSE',
  NasdaqGS: 'NasdaqGS',
};

export const MAX_SCORE = {
  [SnowflakeArea.DIVIDEND]: 6,
  [SnowflakeArea.FUTURE]: 6,
  [SnowflakeArea.HEALTH]: 6,
  [SnowflakeArea.PAST]: 6,
  [SnowflakeArea.VALUE]: 6,
  [SnowflakeArea.TOTAL]: 30,
};
