import { scalePxAsVh } from '../helpers/viewportUnitHelpers';

export const createIconSizes = () => {
  return {
    style: {
      width: `${scalePxAsVh(20)}px`,
      height: `${scalePxAsVh(20)}px`,
    },
    className: '',
  };
};

export const iconSizes = createIconSizes();
