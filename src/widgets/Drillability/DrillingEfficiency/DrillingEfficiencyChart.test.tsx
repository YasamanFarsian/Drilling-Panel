import React from 'react';
import { IntlProvider } from 'react-intl';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { DrillingEfficiencyChart, DrillingEfficiencyParams } from './DrillingEfficiencyChart';

const mockData: DrillingEfficiencyParams = {
  downholeMSE: 5,
  doc: 10,
  effLoss: 15,
  bitHyd: 3,
  downholeWOB: 20,
  wobDrillingControlSystem: 25,
};

describe('DrillingEfficiencyChart Component', () => {
  it('renders without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <IntlProvider locale="en">
        <DrillingEfficiencyChart data={mockData} />
      </IntlProvider>,
    );
  });

  it('displays Downhole eMSE with correct label', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(
      <IntlProvider locale="en">
        <DrillingEfficiencyChart data={mockData} />
      </IntlProvider>,
    );
    expect(getByText('Downhole eMSE')).toBeInTheDocument();
  });
});
