import { useTheme } from '@mui/styles';
import React from 'react';
import LoadingDark from './components/LoadingDark';
import LoadingLight from './components/LoadingLight';

const Loading = (): JSX.Element => {
  const theme = useTheme();

  return theme.mode === 'light' ? <LoadingLight /> : <LoadingDark />;
};

export default Loading;
