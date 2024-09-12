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
} from '@mui/material';

export interface CompaniesTableLoaderProps {
  page: number;
  rowsPerPage: number;
}

export default function CompaniesTableLoader({ page, rowsPerPage }: CompaniesTableLoaderProps) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHeader />
          <TableBody>
            {Array.from({ length: rowsPerPage }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
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
    </>
  );
}
