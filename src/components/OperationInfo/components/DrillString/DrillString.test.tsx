import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import DrillString from './DrillString';

describe('DrillString', () => {
  const mockedProps = {
    isLoading: false,
    data: {
      drillStringData: [
        {
          uid: 'foouid',
          id: 3,
          od: 4,
          element: 'Unknown',
          maxOd: 5,
          linWeight: 6,
          length: 7,
          displacement: 8,
        },
      ],
      displacementType: 'Open Ended',
      tfa: 3,
    } as any,
  };

  it('should render without crashing with data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<DrillString {...mockedProps} />);
    expect(getByTestId('at_operationInfo_drillstring')).toBeInTheDocument();
  });

  it('should render without crashing with data', () => {
    const drillStringDataEl = mockedProps.data.drillStringData[0];
    drillStringDataEl.element = null;
    drillStringDataEl.length = null;
    drillStringDataEl.maxOd = null;

    const { getByTestId } = renderWithThemeAndLocaleProviders(<DrillString {...mockedProps} />);
    expect(getByTestId('at_operationInfo_drillstring')).toBeInTheDocument();
  });

  it('should render without crashing if no data', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(<DrillString isLoading={false} />);
    expect(getByTestId('at_operationInfo_drillstring')).toBeInTheDocument();
  });
});
