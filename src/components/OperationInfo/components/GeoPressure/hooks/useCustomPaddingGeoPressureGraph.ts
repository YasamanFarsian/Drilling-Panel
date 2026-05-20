/* eslint-disable max-lines-per-function */
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';

export const useCustomPaddingGeoPressureGraph = () => {
  const theme = useTheme();
  const minimumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const defaultScreen = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const xtraScreen = useMediaQuery(theme.breakpoints.between('xl', '2k'));
  const biggestScreen = useMediaQuery(theme.breakpoints.between('2k', '4k'));
  const biggerThan4K = useMediaQuery(theme.breakpoints.up('4k'));

  const defaultPadding = {
    left: scalePxAsVw(80),
    bottom: scalePxAsVh(80),
    right: scalePxAsVw(80),
    top: scalePxAsVh(80),
  };

  switch (true) {
    case minimumScreen:
      return defaultPadding;
    case defaultScreen:
      return {
        left: scalePxAsVw(80),
        bottom: scalePxAsVh(65),
        right: scalePxAsVw(70),
        top: scalePxAsVh(55),
      };
    case xtraScreen || biggerThan4K:
      return {
        left: scalePxAsVw(80),
        bottom: scalePxAsVh(65),
        right: scalePxAsVw(80),
        top: scalePxAsVh(50),
      };
    case biggestScreen:
      return {
        left: scalePxAsVw(80),
        bottom: scalePxAsVh(70),
        right: scalePxAsVw(80),
        top: scalePxAsVh(50),
      };
    // smaller than minimum it will handle on another story
    default:
      return defaultPadding;
  }
};
