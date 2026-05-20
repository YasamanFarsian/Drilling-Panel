import React from 'react';
import { IntlProvider } from 'react-intl';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import Thermometer, { ThermometerParams } from './Thermometer';

const mockData: ThermometerParams = {
  label: 'Eff.loss',
  range: { min: 0, max: 100 },
  lo: 20,
  hi: 80,
};

describe('ThermometerChart Component', () => {
  it('renders without crashing', () => {
    renderWithThemeAndLocaleProviders(
      <IntlProvider locale="en">
        <Thermometer {...mockData} />
      </IntlProvider>,
    );
  });
  it('renders Thermometer component', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(<Thermometer {...mockData} />);
    expect(getByText('Eff.loss')).toBeInTheDocument();
  });
  it('renders Thermometer component with values outside the range limited to [0, 100]', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(
      <Thermometer label="Eff.loss(%)" range={{ min: 10, max: 150 }} lo={50} hi={130} />,
    );
    expect(getByText('0')).toBeInTheDocument();
    expect(getByText('150')).toBeInTheDocument();
  });
  it('renders Thermometer component with custom range values', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(
      <Thermometer label="Temperature" range={{ min: -50, max: 50 }} lo={-20} hi={40} />,
    );
    expect(getByText('-50')).toBeInTheDocument();
    expect(getByText('50')).toBeInTheDocument();
  });
  it('renders Thermometer component with different label text', () => {
    const { getByText } = renderWithThemeAndLocaleProviders(
      <Thermometer label="WOB(ton)" range={{ min: 0, max: 30 }} lo={30} hi={70} />,
    );
    expect(getByText('WOB(ton)')).toBeInTheDocument();
  });
});
