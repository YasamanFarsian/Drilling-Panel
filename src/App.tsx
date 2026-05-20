import MainLayout from '@dt-advisory/components/MainLayout';
import { useLocalStorage } from '@dt-advisory/hooks/useLocalStorage';
import en from '@dt-advisory/locales/en.json';
import LoadingPage from '@dt-advisory/pages/LoadingPage';
import NotFoundPage from '@dt-advisory/pages/NotFoundPage';
import { ConfigsContext, MOCK_CONFIG } from '@dt-advisory/providers/Configs';
import { dark, light, ThemeMode } from '@dt-advisory/styles/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { createContext, useContext, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import './index.css';

type LocaleType = { locale: 'en' };
const LocaleContext = createContext<LocaleType>({ locale: 'en' });
export const useLocale = () => useContext(LocaleContext);

type EmbedderType = { isInIframe: boolean };
const EmbedderContext = createContext<EmbedderType>({ isInIframe: false });
export const useEmbedder = () => useContext(EmbedderContext);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

const LazyDashboard = React.lazy(() => import('@dt-advisory/pages/DashboardPage'));
const DashboardPage = () => (
  <React.Suspense fallback={<LoadingPage />}>
    <LazyDashboard />
  </React.Suspense>
);

const AppRoutes = () =>
  useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'operation/:id', element: <DashboardPage /> },
        { path: 'widget/:widgetName', element: <DashboardPage /> },
        { path: 'operation/:id/widget/:widgetName', element: <DashboardPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ]);

const ThemedApp = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);
  const theme = useMemo(
    () => ({
      ...createTheme(darkMode ? dark : light),
      mode: (darkMode ? 'dark' : 'light') as ThemeMode,
      setMode: (m: ThemeMode) => setDarkMode(m === 'dark'),
    }),
    [darkMode],
  );
  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
};

export default function App() {
  const isInIframe = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemedApp>
          <QueryClientProvider client={queryClient}>
            <EmbedderContext.Provider value={{ isInIframe }}>
              <ConfigsContext.Provider value={MOCK_CONFIG}>
                <IntlProvider messages={en} locale="en" defaultLocale="en">
                  <LocaleContext.Provider value={{ locale: 'en' }}>
                    <AppRoutes />
                  </LocaleContext.Provider>
                </IntlProvider>
              </ConfigsContext.Provider>
            </EmbedderContext.Provider>
          </QueryClientProvider>
        </ThemedApp>
      </BrowserRouter>
    </HelmetProvider>
  );
}
