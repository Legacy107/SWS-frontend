'use client';
import { useRouter } from 'next/navigation';
import { useCompaniesSearchFilter } from '@/hooks/useCompaniesSearchFilter';
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Stack,
  Slider,
  Button,
  Box,
  Popover,
  useMediaQuery,
} from '@mui/material';
import { SORT_OPTIONS, EXCHANGE_SYMBOLS, MAX_SCORE, SORT_DIRECTIONS } from '@/constants/companies';
import { SearchOptions } from './CompaniesTable';
import { SnowflakeArea } from '@/@types/companies';
import { useState } from 'react';

const snowflakeLabels = {
  [SnowflakeArea.DIVIDEND]: 'Dividend',
  [SnowflakeArea.FUTURE]: 'Future',
  [SnowflakeArea.HEALTH]: 'Health',
  [SnowflakeArea.PAST]: 'Past',
  [SnowflakeArea.VALUE]: 'Value',
  [SnowflakeArea.TOTAL]: 'Total',
};

export default function CompaniesSearchFilter({
  sort,
  sortDirection,
  exchangeSymbols,
  scoreRange,
  rowsPerPage,
}: SearchOptions) {
  const router = useRouter();
  const handleSearch = (
    sort: SearchOptions['sort'],
    sortDirection: SearchOptions['sortDirection'],
    exchangeSymbols: SearchOptions['exchangeSymbols'],
    scoreRange: SearchOptions['scoreRange']
  ) => {
    router.push(
      '/?' +
        new URLSearchParams({
          sort,
          sortDirection,
          exchangeSymbols: exchangeSymbols.join(','),
          ...Object.fromEntries(
            Object.entries(scoreRange).map(([key, [lower, upper]]) => [key, `${lower},${upper}`])
          ),
          page: '0',
          rowsPerPage: rowsPerPage.toString(),
        }).toString()
    );
  };
  const {
    sort: sortState,
    setSort,
    sortDirection: sortDirectionState,
    setSortDirection,
    exchangeSymbols: exchangeSymbolsState,
    setExchangeSymbols,
    scoreRange: scoreRangeState,
    setScoreRange,
  } = useCompaniesSearchFilter(sort, sortDirection, exchangeSymbols, scoreRange, handleSearch);
  const [showScoreFilter, setShowScoreFilter] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery('(max-width: 700px)');

  return (
    <Stack gap={2}>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>
        <FormControl fullWidth>
          <InputLabel id="sort-label" size="small">
            Sort By
          </InputLabel>
          <Select
            labelId="sort-label"
            label="Sort By"
            value={sortState}
            onChange={(e) => setSort(e.target.value as SearchOptions['sort'])}
            size="small"
          >
            {Object.entries(SORT_OPTIONS).map(([key, option]) => (
              <MenuItem key={key} value={key}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="sort-direction-label" size="small">
            Sort Direction
          </InputLabel>
          <Select
            labelId="sort-direction-label"
            label="Sort Direction"
            value={sortDirectionState}
            onChange={(e) => setSortDirection(e.target.value as SearchOptions['sortDirection'])}
            size="small"
          >
            {Object.entries(SORT_DIRECTIONS).map(([key, option]) => (
              <MenuItem key={key} value={key}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="exchange-label" size="small">
            Exchange Symbols
          </InputLabel>
          <Select
            labelId="exchange-label"
            label="Exchange Symbols"
            multiple
            value={exchangeSymbolsState}
            onChange={(e) => {
              const value = e.target.value as unknown as SearchOptions['exchangeSymbols'];
              setExchangeSymbols(value);
            }}
            size="small"
          >
            {Object.entries(EXCHANGE_SYMBOLS).map(([key, value]) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ minWidth: '8rem' }}
          variant="text"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setShowScoreFilter(!showScoreFilter);
            if (showScoreFilter) {
              setAnchorEl(null);
            } else setAnchorEl(event.currentTarget);
          }}
        >
          Score Filter
        </Button>
      </Stack>

      <Popover
        open={showScoreFilter}
        anchorEl={anchorEl}
        onClose={() => {
          setShowScoreFilter(false);
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: isMobile ? 'center' : 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'center' : 'right',
        }}
      >
        <Box sx={{ p: 2, ...(!isMobile && { maxWidth: '20rem' }) }}>
          {Object.entries(scoreRangeState).map(([key, [lower, upper]]) => (
            <FormControl key={key} fullWidth sx={{ px: 1 }}>
              <Typography gutterBottom>{snowflakeLabels[key as SnowflakeArea]}</Typography>
              <Slider
                value={[lower, upper]}
                onChange={(_, newValue) => {
                  const range = newValue as [number, number];
                  setScoreRange({ ...scoreRangeState, [key]: range });
                }}
                valueLabelDisplay="auto"
                min={0}
                max={MAX_SCORE[key as SnowflakeArea]}
              />
            </FormControl>
          ))}
        </Box>
      </Popover>
    </Stack>
  );
}
