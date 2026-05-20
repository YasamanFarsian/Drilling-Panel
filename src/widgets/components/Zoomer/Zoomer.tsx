import React from 'react';
import { useTheme } from '@emotion/react';
import ZoomToggleButtonGroup from '../ZoomToggleButtonGroup';
import useZoomer from './useZoomer';
import { SearchIcon } from '@dt-advisory/shared/ui/Icon';
import { createIconSizes } from '../../shared/headerIconSizes';

export type ZoomerPropsType = {
  widgetId?: string;
  zoomer: string; // friendly reminder it is type of widget. We will refactor later.
  widgetName?: string;
};

const iconColors = {
  light: '#000000',
  dark: 'white',
};

const Zoomer = ({ widgetId, zoomer, widgetName = 'unassigned' }: ZoomerPropsType): JSX.Element => {
  const { options, currentValue, onChange, isSelected, disabled } = useZoomer(
    zoomer,
    widgetId ?? '',
  );

  const theme = useTheme();

  return (
    <ZoomToggleButtonGroup
      widgetName={`${widgetName}-zoom`}
      Icon={
        <SearchIcon
          style={{ color: iconColors[theme.mode], ...createIconSizes().style }}
          className={createIconSizes().className}
        />
      }
      value={currentValue}
      options={options}
      disabled={disabled}
      onChange={onChange}
      isSelected={isSelected}
    />
  );
};

export default Zoomer;
