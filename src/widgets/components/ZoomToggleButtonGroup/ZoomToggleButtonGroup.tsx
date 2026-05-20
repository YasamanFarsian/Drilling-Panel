/* eslint-disable max-lines-per-function */
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import {
  toggleButtonStyle,
  toggleGroupStyle,
  toggleIconButtonStyle,
} from './ZoomToggleButtonGroup.style';

type ZoomToggleButtonGroupOptionValue = string | number | boolean;
export type ZoomToggleButtonGroupOption<T extends ZoomToggleButtonGroupOptionValue> = {
  value: T;
  label: string;
  disabled?: boolean;
  isIcon?: boolean;
};

export type ZoomToggleButtonGroupPropsType<T extends ZoomToggleButtonGroupOptionValue> = {
  options: ZoomToggleButtonGroupOption<T>[];
  value: T;
  onChange: (event: React.MouseEvent<HTMLElement>, value: T) => void;
  disabled?: boolean;
  Icon?: JSX.Element;
  isSelected?: boolean;
  widgetName?: string;
};

const ZoomToggleButtonGroup = <T extends ZoomToggleButtonGroupOptionValue>({
  options,
  value,
  disabled,
  onChange,
  Icon,
  isSelected,
  widgetName = 'unassigned',
}: ZoomToggleButtonGroupPropsType<T>): JSX.Element => {
  const isEmptyOptions = options.length === 0;

  return (
    <ToggleButtonGroup
      disabled={disabled}
      data-testid={`${widgetName}-zoom_toggle_button_group_1677587604920`}
      css={toggleGroupStyle({ isStandalone: isEmptyOptions })}
      value={value}
      exclusive
      onChange={onChange}
    >
      {Icon && (
        <ToggleButton
          data-testid={`${widgetName}-icon`}
          value=""
          disabled={disabled}
          css={toggleIconButtonStyle({
            isStandalone: isEmptyOptions,
            isSelected,
            disabled,
          })}
          disableRipple
        >
          {Icon}
        </ToggleButton>
      )}
      {options.map((x) => (
        <ToggleButton
          data-testid={`${widgetName}-${x.value}`}
          key={`${x.value}`}
          css={toggleButtonStyle}
          value={x.value}
          disabled={x.disabled}
          disableRipple
        >
          {x.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ZoomToggleButtonGroup;
