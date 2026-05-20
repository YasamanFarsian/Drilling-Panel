import AuthenticationProvider from '@dt-advisory/providers/Authentication';
import BaseWidgetProvider from '@dt-advisory/providers/BaseWidget';
import { ConfigsContext, MOCK_CONFIG } from '@dt-advisory/providers/Configs/Configs';

import EmulatorProvider from '@dt-advisory/providers/Emulator';
import LocaleProvider from '@dt-advisory/providers/Locale';
import NoStreamingTimerChartGroupProvider from '@dt-advisory/providers/NoStreamingTimerChartGroup';
import ReactQueryProvider from '@dt-advisory/providers/ReactQueryProvider';
import ReconnectingChartGroupProvider from '@dt-advisory/providers/ReconnectingChartGroup';
import ThemeProvider from '@dt-advisory/providers/Theme';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { render, RenderResult } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';

export function ReconnectingChartGroupProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <IntlProvider locale="en">
      <ThemeProvider>
        <ReconnectingChartGroupProvider>{children}</ReconnectingChartGroupProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}

export function NoStreamingTimerChartGroupProviderWrapper({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <ConfigsContext.Provider value={MOCK_CONFIG}>
      <ReconnectingChartGroupProvider>
        <NoStreamingTimerChartGroupProvider>{children}</NoStreamingTimerChartGroupProvider>
      </ReconnectingChartGroupProvider>
    </ConfigsContext.Provider>
  );
}

export function ConfigsProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <ConfigsContext.Provider value={MOCK_CONFIG}>{children}</ConfigsContext.Provider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}

export function ConfigsAndEmulatorProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <ConfigsContext.Provider value={MOCK_CONFIG}>
      <EmulatorProvider>{children}</EmulatorProvider>
    </ConfigsContext.Provider>
  );
}

export function LocaleProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return <LocaleProvider>{children}</LocaleProvider>;
}

export function ReacgtQueryAndLocaleProviderWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <ReactQueryProvider>
      <LocaleProvider>{children}</LocaleProvider>
    </ReactQueryProvider>
  );
}

export function renderWithThemeProviders(ui: React.ReactElement): RenderResult {
  return render(
    <ReactQueryProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <HelmetProvider>
          <ThemeProvider>
            <BaseWidgetProvider>{ui}</BaseWidgetProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </ReactQueryProvider>,
  );
}

export function renderWithThemeAndLocaleProviders(ui: React.ReactElement): RenderResult {
  return render(
    <ReactQueryProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <HelmetProvider>
          <ThemeProvider>
            <BaseWidgetProvider>
              <LocaleProvider>{ui}</LocaleProvider>
            </BaseWidgetProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </ReactQueryProvider>,
  );
}

export function renderWidget(widget: React.ReactElement): RenderResult {
  return render(
    <ReactQueryProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <HelmetProvider>
          <ThemeProvider>
            <LocaleProvider>
              <ConfigsContext.Provider value={MOCK_CONFIG}>
                <ReconnectingChartGroupProvider>
                  <NoStreamingTimerChartGroupProvider>{widget}</NoStreamingTimerChartGroupProvider>
                </ReconnectingChartGroupProvider>
              </ConfigsContext.Provider>
            </LocaleProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </ReactQueryProvider>,
  );
}

function renderWithAllProviders(ui: React.ReactElement): RenderResult {
  return render(
    <ReactQueryProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <HelmetProvider>
          <ThemeProvider>
            <ConfigsContext.Provider value={MOCK_CONFIG}>
              <AuthenticationProvider>
                <LocaleProvider>
                  <EmulatorProvider>
                    <BaseWidgetProvider>{ui}</BaseWidgetProvider>
                  </EmulatorProvider>
                </LocaleProvider>
              </AuthenticationProvider>
            </ConfigsContext.Provider>
          </ThemeProvider>
        </HelmetProvider>
      </LocalizationProvider>
    </ReactQueryProvider>,
  );
}

export default renderWithAllProviders;
