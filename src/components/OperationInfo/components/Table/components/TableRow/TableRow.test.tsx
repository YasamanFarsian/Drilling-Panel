import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import TableRow from './TableRow';

describe('TableRow', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeProviders(
      <TableRow
        isAlternated={false}
        isTransposed={false}
        columns={[{ name: 'foo' }, { name: 'bar', render: (x) => <>x</> }]}
        data={{ uid: 'uid1', foo: 'foo', bar: 'bar' }}
      />,
    );
    expect(getByTestId('table_row')).toBeInTheDocument();
  });
});
