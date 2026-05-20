import { Box, ToggleButtonGroup as MuiToggleButtongGroup, ToggleButton } from '@mui/material';
import React from 'react';
import { toggleButtonStyle, toggleGroupStyle } from './ToggleButtonGroup.style';

export type ToggleButtonGroupOption<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type ToggleButtonGroupPropsType<T extends string> = {
  options: ToggleButtonGroupOption<T>[];
  value: T;
  disabled?: boolean;
  onChange: (event: React.MouseEvent<HTMLElement>, value: T) => void;
  viewportUnit?: boolean;
  isSmallVersion?: boolean;
};

const ToggleButtonGroup = <T extends string>({
  options,
  value,
  onChange,
  viewportUnit = false,
  isSmallVersion = false,
}: ToggleButtonGroupPropsType<T>): JSX.Element => {
  return (
    <Box data-testid="toggle_button_group_1676551568116">
      <MuiToggleButtongGroup
        css={toggleGroupStyle(isSmallVersion)}
        value={value}
        exclusive
        onChange={onChange}
      >
        {options.map((x, index) => (
          <ToggleButton
            data-testid={`button_${index}`}
            key={`${x.value}`}
            css={toggleButtonStyle(viewportUnit, isSmallVersion)}
            value={x.value}
            disabled={x.disabled}
            disableRipple
          >
            {x.label}
          </ToggleButton>
        ))}
      </MuiToggleButtongGroup>
    </Box>
  );
};

export default ToggleButtonGroup;
