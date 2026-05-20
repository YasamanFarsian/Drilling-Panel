import clsx from 'clsx';
import React from 'react';

type RowType = {
  label: string;
  value?: string | number;
  header?: boolean;
  atClassName?: string;
  divider?: boolean;
};
export function Row({ label, value, header, atClassName, divider }: RowType) {
  const validValue = 'number' !== typeof value ? (value ?? '-') : value;
  return (
    <div className={clsx('row', atClassName)}>
      {header ? (
        <div className="header">{label}</div>
      ) : (
        <>
          <div className="label">{label}</div>
          <div className="value">{validValue}</div>
        </>
      )}
    </div>
  );
}
