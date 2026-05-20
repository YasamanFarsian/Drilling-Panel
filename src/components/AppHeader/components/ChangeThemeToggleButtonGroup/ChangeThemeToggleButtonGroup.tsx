import { Box, IconButton } from '@mui/material';
import React from 'react';
import DarkThemeIcon from '@dt-advisory/assets/svgs/theme/dark.svg?react';
import LightThemeIcon from '@dt-advisory/assets/svgs/theme/light.svg?react';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { containerStyle, iconButtonColor, iconStyle } from './ChangeThemeToggleButtonGroup.style';

export type ChangeThemeToggleButtonGroupPropsType = {
  value: AppearanceEnum;
  onChange: (newValue: AppearanceEnum) => void;
};

const ChangeThemeToggleButtonGroup: React.FC<ChangeThemeToggleButtonGroupPropsType> = ({
  value,
  onChange,
}) => {
  const toggleTheme = () => {
    const newValue = value === AppearanceEnum.LIGHT ? AppearanceEnum.DARK : AppearanceEnum.LIGHT;
    onChange(newValue);
  };

  return (
    <Box css={containerStyle} className="at_main_settings_appearance app-header-button-space">
      <IconButton
        onClick={toggleTheme}
        css={iconButtonColor}
        data-testid={value === AppearanceEnum.LIGHT ? 'light-theme-icon' : 'dark-theme-icon'}
      >
        {value === AppearanceEnum.LIGHT ? (
          <DarkThemeIcon css={iconStyle} />
        ) : (
          <LightThemeIcon css={iconStyle} />
        )}
      </IconButton>
    </Box>
  );
};

export default ChangeThemeToggleButtonGroup;
