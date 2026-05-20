import { TableRow as MuiTableRow, TableCell, TableRowProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { tableCellStyle, tableRowStyle } from '../../Table.style';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Resource = { uid: string; className?: string } & Record<string, {}>;

export type TableColumn<T> = {
  name: keyof T;
  label?: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

export type TableRowPropsType<T> = {
  data: T;
  columns: TableColumn<T>[];
  isAlternated: boolean;
  isTransposed: boolean;
};

const TableRow = <T extends Resource>({
  data,
  columns,
  isAlternated,
  isTransposed,
}: TableRowProps & TableRowPropsType<T>): JSX.Element => {
  return (
    <MuiTableRow data-testid="table_row" aria-label="table row" css={tableRowStyle(isAlternated)}>
      {columns.map((column) => (
        <TableCell
          key={data.uid + String(column.name)}
          variant="body"
          css={tableCellStyle(isTransposed)}
          aria-label={`row ${data.uid} column ${String(column.name)}`}
          className={column.className ?? data.className}
        >
          {column.render ? column.render(data) : <>{data[column.name] as unknown as ReactNode}</>}
        </TableCell>
      ))}
    </MuiTableRow>
  );
};

export default TableRow;
