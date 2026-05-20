import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import { OperationInfo } from './OperationInfo';

describe('OperationInfo', () => {
  const mockedProps = {
    visible: true,
    setVisible: jest.fn(),
  };

  it('should render OperationInfo without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <OperationInfo {...mockedProps} />
      </ConfigsProvider>,
    );

    expect(getByTestId('operation-info-modal')).toBeInTheDocument();
  });

  it('should close OperationInfo Modal', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <ConfigsProvider>
        <OperationInfo {...mockedProps} />
      </ConfigsProvider>,
    );

    expect(getByTestId('operation-info-modal')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByTestId('CloseIcon'));
    });
    expect(mockedProps.setVisible).toHaveBeenCalledTimes(1);
  });
});
