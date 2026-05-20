import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';

export const useScalingSize = (breakpoints: {
  default: string;
  xtra: string;
  biggest: string;
  macResolution: string;
}): string => {
  const theme = useTheme();
  const defaultScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const xtraScreen = useMediaQuery(theme.breakpoints.between('xl', '2k'));
  const biggestScreen = useMediaQuery(theme.breakpoints.up('2k'));
  const macHighResolution = useMediaQuery('(min-width:2870px)');

  if (macHighResolution) {
    return breakpoints.macResolution;
  } else if (defaultScreen) {
    return breakpoints.default;
  } else if (xtraScreen) {
    return breakpoints.xtra;
  } else if (biggestScreen) {
    return breakpoints.biggest;
  } else {
    return breakpoints.default;
  }
};
