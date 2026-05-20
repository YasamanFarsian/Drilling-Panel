import { useLocalStorage } from '@dt-advisory/hooks/useLocalStorage';
import { dark, light, generateHostTheme, ThemeMode } from '@dt-advisory/styles/theme';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React, { useMemo } from 'react';

type ThemeProviderPropsType = {
  children: React.ReactNode;
  isLightTheme?: boolean;
  isHostTheme?: boolean;
};

const ThemeProvider = ({
  children,
  isLightTheme,
  isHostTheme,
}: ThemeProviderPropsType): JSX.Element => {
  const [darkTheme, setDarkTheme] = useLocalStorage('darkMode', true);
  const isDarkTheme = !!darkTheme && !isLightTheme;

  const theme = useMemo(() => {
    return {
      ...(isHostTheme
        ? generateHostTheme(isLightTheme ? 'light' : 'dark')
        : createTheme(isDarkTheme ? dark : light)),
      mode: isDarkTheme ? ('dark' as ThemeMode) : ('light' as ThemeMode),
      setMode: (nextMode: ThemeMode) => {
        nextMode === 'dark' ? setDarkTheme(true) : setDarkTheme(false);
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);
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

export default ThemeProvider;
