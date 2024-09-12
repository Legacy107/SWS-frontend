import { TableHeader } from './CompaniesTable';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
  Box,
} from '@mui/material';

export interface CompaniesTableLoaderProps {
  page: number;
  rowsPerPage: number;
}

export default function CompaniesTableLoader({ page, rowsPerPage }: CompaniesTableLoaderProps) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader />
          <TableBody>
            {Array.from({ length: rowsPerPage }).map((_, rowIdx) => (
              <TableRow key={`companies-loader-row-${rowIdx}`}>
                {Array.from({ length: 5 }).map((_, columnIdx) => (
                  <TableCell key={`companies-loader-row-${rowIdx}-column${columnIdx}`}>
                    <Skeleton variant="text" height="52px" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* @ts-expect-error: no event handler */}
      <TablePagination
        component="div"
        count={rowsPerPage}
        rowsPerPage={rowsPerPage}
        page={page}
        disabled
      />
    </Box>
  );
}
