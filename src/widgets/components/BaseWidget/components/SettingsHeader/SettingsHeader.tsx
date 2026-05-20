/* eslint-disable max-lines-per-function */
import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import leftArrow from '@dt-advisory/assets/svgs/leftArrow.svg?react';
import { SettingsType } from '../../BaseWidget';
import { iconButtonStyle, settingHeaderContainerStyle } from './SettingsHeader.style';
import { getSettingHeaderTitleTranslationKey } from './settingsHeaderHelpers';

export type SettingsHeaderPropsType = {
  onClose: () => void;
  type: SettingsType;
};

const SettingsHeader = ({ onClose, type }: SettingsHeaderPropsType): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <Box
      data-testid="settings_header_1677074473828"
      css={settingHeaderContainerStyle(type === 'roadmapDrag' || type === 'roadmapTorque')}
    >
      <IconButton
        data-testid="back_button_settings_header_1677074473828"
        onClick={onClose}
        disableRipple
        css={iconButtonStyle(type === 'smartAutoRop')}
      >
        <SvgIcon component={leftArrow} />
      </IconButton>
      <Typography>{formatMessage(getSettingHeaderTitleTranslationKey(type))}</Typography>
    </Box>
  );
};

export default SettingsHeader;
