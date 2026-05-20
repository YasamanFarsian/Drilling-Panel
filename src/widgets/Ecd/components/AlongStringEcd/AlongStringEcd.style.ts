import { Theme } from '@mui/material/styles';

export const alongStringEcdElementColor = (themeMode: Theme['mode']) => ({
  data: {
    fill: 'light' === themeMode ? '#1671FF' : '#34A9CC',
  },
});
