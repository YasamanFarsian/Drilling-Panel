/* eslint-disable max-lines-per-function */
import React from 'react';
import { GearIcon, IconButton } from '@dt-advisory/shared/ui/Icon';
import { useTheme } from '@mui/styles';
import { createIconSizes } from '../../shared/headerIconSizes';

export type SettingsPropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Settings = ({ onClick }: SettingsPropsType) => {
  const theme = useTheme();

  return (
    <IconButton
      style={{ color: theme.palette.text.primary }}
      data-testid="settings_1676907540122"
      onClick={onClick}
    >
      <GearIcon className={createIconSizes().className} style={createIconSizes().style} />
    </IconButton>
  );
};

export default Settings;
