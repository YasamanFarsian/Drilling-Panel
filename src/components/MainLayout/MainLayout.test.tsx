import { useUserConfiguration } from '@dt-advisory/components/MainLayout/useUserConfiguration';
import { renderWithThemeAndLocaleProviders } from '@dt-advisory/helpers/tests/renderWithContext';
import ConfigsProvider from '@dt-advisory/providers/Configs';
import EmbedderProvider from '@dt-advisory/providers/Embedder';
import EmulatorProvider from '@dt-advisory/providers/Emulator';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

jest.mock('@dt-advisory/components/MainLayout/useUserConfiguration', () => ({
  useUserConfiguration: jest.fn(),
}));
describe('MainLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render loading when without crashing', async () => {
    (useUserConfiguration as jest.Mock).mockReturnValue({ isLoading: true });
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MemoryRouter>
          <ConfigsProvider>
            <EmulatorProvider>
              <MainLayout />
            </EmulatorProvider>
          </ConfigsProvider>
        </MemoryRouter>
      </EmbedderProvider>,
    );

    // Wait for the main layout to appear in the document
    await waitFor(() => {
      expect(getByTestId('full_page_loading')).toBeInTheDocument();
    });
  });

  it('should render MainLayout without crashing', () => {
    (useUserConfiguration as jest.Mock).mockReturnValue({ isLoading: false });
    const { getByTestId } = renderWithThemeAndLocaleProviders(
      <EmbedderProvider>
        <MemoryRouter>
          <ConfigsProvider>
            <EmulatorProvider>
              <MainLayout />
            </EmulatorProvider>
          </ConfigsProvider>
        </MemoryRouter>
      </EmbedderProvider>,
    );

    expect(getByTestId('main_layout')).toBeInTheDocument();
    expect(window.getComputedStyle(getByTestId('main_layout_content')).padding).toContain('rem');
  });
});
