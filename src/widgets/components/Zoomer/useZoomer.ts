/* eslint-disable max-lines-per-function, complexity */
import { useZoomerToggleStore, ZoomerValue } from '@dt-advisory/store/ZoomerToggle';
import { ZoomToggleButtonGroupOption } from '../ZoomToggleButtonGroup';

const getOptionsForZoomerType = (
  type: string,
): {
  defaultValue: number;
  options: ZoomToggleButtonGroupOption<number | boolean>[];
} => {
  // this might be updated later for futur features
  let options: ZoomToggleButtonGroupOption<number | boolean>[] = [];
  let defaultValue = 0;
  switch (type) {
    case 'wellbore':
      defaultValue = 2;
      options = [
        {
          value: 2,
          label: '1x',
        },
        {
          value: 4,
          label: '2x',
        },
        {
          value: 8,
          label: '4x',
        },
      ];
      break;
  }
  return { defaultValue, options };
};

const useZoomer = (type: string, widgetId: string) => {
  const zoomer = useZoomerToggleStore((state) => state.zoomer);
  const zoomerValue = useZoomerToggleStore((state) => state.zoomerValue);
  const setZoomValueForType = useZoomerToggleStore((state) => state.setZoomValueForType);
  const toggleZoom = useZoomerToggleStore((state) => state.toggleZoom);
  const isSelected = useZoomerToggleStore((state) => state.zoomer[type]);
  const { defaultValue, options } = getOptionsForZoomerType(type);
  const isDisableZoom =
    useZoomerToggleStore((state) => {
      return state.disabledZoom[widgetId];
    }) ?? true;

  const onChangeEcd = (_event: React.MouseEvent<HTMLElement>, _value: ZoomerValue) => {
    toggleZoom(type);
  };

  const onChangeWellbore = (_event: React.MouseEvent<HTMLElement>, value: ZoomerValue) => {
    if (value) {
      setZoomValueForType(type, value);
    }
  };

  const onChange =
    'ecd' === type ? onChangeEcd : 'wellbore' === type ? onChangeWellbore : () => void 0;

  const currentValue = 'ecd' === type ? zoomer[type] : (zoomerValue[type] ?? defaultValue);

  return {
    currentValue,
    options,
    onChange,
    isSelected,
    disabled: isDisableZoom && type === 'ecd',
  };
};

export default useZoomer;
