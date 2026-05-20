import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Table from './Table';

describe('Table', () => {
  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <Table
        isAlternated={false}
        isLoading={false}
        data={[
          {
            uid: 'bar',
            foo: '18.3',
          },
        ]}
        columns={[{ name: 'foo', label: 'operationInfo.trippingLimits.fromDepth.label' }]}
      />,
    );
    expect(getByTestId('table_container')).toBeInTheDocument();
  });
});
