/* eslint-disable complexity */
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';

export const useScalingTickSize = (): number => {
  const theme = useTheme();
  const minimumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const defaultScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const xtraScreen = useMediaQuery(theme.breakpoints.between('xl', '2k'));
  const biggestScreen = useMediaQuery(theme.breakpoints.between('2k', '4k'));
  const biggerThan4K = useMediaQuery(theme.breakpoints.up('4k'));

  switch (true) {
    case minimumScreen:
      return 3;
    case defaultScreen:
      return 4;
    case xtraScreen:
      return 5;
    case biggestScreen:
      return 6;
    case biggerThan4K:
      return 10;
    default:
      return 4;
  }
};
