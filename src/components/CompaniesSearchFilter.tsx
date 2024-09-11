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
} from '@mui/material';
import { SORT_OPTIONS, EXCHANGE_SYMBOLS, MAX_SCORE } from '@/constants/companies';

interface CompaniesSearchFIlterProps {
  sort: keyof typeof SORT_OPTIONS;
  exchangeSymbols: (keyof typeof EXCHANGE_SYMBOLS)[];
  totalScoreRange: [number, number];
  page: number;
  rowsPerPage: number;
}

export default function CompaniesSearchFilter({
  sort,
  exchangeSymbols,
  totalScoreRange,
  page,
  rowsPerPage,
}: CompaniesSearchFIlterProps) {
  const router = useRouter();
  const {
    sort: sortState,
    setSort,
    exchangeSymbols: exchangeSymbolsState,
    setExchangeSymbols,
    totalScoreRange: totalScoreRangeState,
    setTotalScoreRange,
  } = useCompaniesSearchFilter(sort, exchangeSymbols, totalScoreRange);

  const handleSearch = () => {
    router.push(
      '/?' +
        new URLSearchParams({
          sort: sortState,
          exchangeSymbols: exchangeSymbolsState.join(','),
          totalScoreRange: totalScoreRangeState.join(','),
          page: page.toString(),
          rowsPerPage: rowsPerPage.toString(),
        }).toString()
    );
  };

  return (
    <Stack direction="row" gap={2}>
      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          label="Sort By"
          value={sortState}
          onChange={(e) => setSort(e.target.value as keyof typeof SORT_OPTIONS)}
        >
          {Object.entries(SORT_OPTIONS).map(([key, option]) => (
            <MenuItem key={key} value={key}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="exchange-label">Exchange Symbols</InputLabel>
        <Select
          labelId="exchange-label"
          label="Exchange Symbols"
          multiple
          value={exchangeSymbolsState}
          onChange={(e) => {
            const value = e.target.value as unknown as Array<keyof typeof EXCHANGE_SYMBOLS>;
            setExchangeSymbols(value);
          }}
        >
          {Object.entries(EXCHANGE_SYMBOLS).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ ml: 1 }}>
        <Typography gutterBottom>Total Score</Typography>
        <Slider
          value={totalScoreRangeState}
          onChange={(_, newValue) => {
            const range = newValue as [number, number];
            setTotalScoreRange(range);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={MAX_SCORE}
        />
      </FormControl>
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
}
