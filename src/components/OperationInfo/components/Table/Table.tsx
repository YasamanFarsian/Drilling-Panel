/* eslint-disable max-lines-per-function */
import { SerializedStyles } from '@emotion/react';
import {
  Table as MuiTable,
  TableRow as MuiTableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from '@mui/material';
import React from 'react';
import TableRow, { Resource, TableColumn } from './components/TableRow';
import { tableCellStyle, tableContainerStyle } from './Table.style';

export type TablePropsType<T> = {
  data: T[];
  columns: TableColumn<T>[];
  isAlternated: boolean;
  isLoading: boolean;
  isTransposed?: boolean;
  tableBodyStyle?: SerializedStyles;
};

const Table = <T extends Resource>({
  columns,
  data,
  isAlternated,
  isTransposed,
  tableBodyStyle,
}: TablePropsType<T>): JSX.Element => {
  const hideTableHeader = !!isTransposed;
  return (
    <TableContainer data-testid="table_container" css={tableContainerStyle}>
      <MuiTable>
        {!hideTableHeader && (
          <TableHead>
            <MuiTableRow>
              {columns.map((x) => (
                <TableCell css={tableCellStyle(!!isTransposed)} key={x.name as string}>
                  {x.label}
                </TableCell>
              ))}
            </MuiTableRow>
          </TableHead>
        )}
        <TableBody css={tableBodyStyle}>
          {data.length > 0 &&
            data.map((rowData) => {
              return (
                <TableRow
                  key={rowData.uid}
                  data={rowData}
                  columns={columns}
                  isAlternated={isAlternated}
                  isTransposed={!!isTransposed}
                />
              );
            })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
