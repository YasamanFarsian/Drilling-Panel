import { screen } from '@testing-library/react';
import React from 'react';
import { renderWithThemeProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import BaseSnackbar from './BaseSnackbar';

jest.mock('@dt-advisory/store/SnackbarStore');

describe('BaseSnackbar', () => {
  it('should not render snackbar when open is false', async () => {
    const mockState = {
      open: false,
      message: '',
      actions: { closeSnackbar: jest.fn() },
    };
    (useSnackbarStore as unknown as jest.Mock).mockImplementation((callback) =>
      callback(mockState),
    );

    renderWithThemeProviders(<BaseSnackbar />);

    expect(screen.queryByTestId('base_snackbar_1677723933877')).not.toBeInTheDocument();
  });

  it('should render snackbar with message when open is true', async () => {
    const mockState = {
      open: true,
      message: 'Test message ja',
      actions: { closeSnackbar: jest.fn() },
    };
    (useSnackbarStore as unknown as jest.Mock).mockImplementation((callback) =>
      callback(mockState),
    );

    renderWithThemeProviders(<BaseSnackbar />);

    expect(screen.queryByTestId('base_snackbar_1677723933877')).toHaveTextContent(
      'Test message ja',
    );
    expect(mockState.actions.closeSnackbar).not.toHaveBeenCalled();
  });

  it('should call closeSnackbar after 3 second for less than or equal 3 words message', async () => {
    const mockState = {
      open: true,
      message: 'Test message ja',
      actions: { closeSnackbar: jest.fn() },
    };
    (useSnackbarStore as unknown as jest.Mock).mockImplementation((callback) =>
      callback(mockState),
    );

    renderWithThemeProviders(<BaseSnackbar />);
    expect(mockState.actions.closeSnackbar).not.toHaveBeenCalled();

    // wait for three seconds
    await new Promise((r) => setTimeout(r, 3000));

    expect(mockState.actions.closeSnackbar).toHaveBeenCalled();
  });
});
