import { fireEvent } from '@testing-library/react';
import React from 'react';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import UserConfigurationModal from './UserConfigurationModal';

describe('UserConfigurationModal', () => {
  const mockedProps = {
    visible: true,
    setVisible: () => jest.fn(),
    handleClose: jest.fn(),
  };

  it('should render without crashing', () => {
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <UserConfigurationModal {...mockedProps} />,
    );
    expect(getByTestId('user-configuration-modal')).toBeInTheDocument();
  });
  it('should close modal correctly', async () => {
    const mockSetVisible = jest.fn();
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <UserConfigurationModal {...mockedProps} setVisible={mockSetVisible} />,
    );
    const closeIcon = getByTestId('CloseIcon');
    fireEvent.click(closeIcon);
    expect(mockSetVisible).toHaveBeenCalled();
  });
});
