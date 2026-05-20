/* eslint-disable max-lines-per-function */
import { Box, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import OneRowThreeWidgets from '@dt-advisory/assets/svgs/OneRowThreeWidgets.svg?react';
import OneRowFourWidgets from '@dt-advisory/assets/svgs/OneRowFourWidgets.svg?react';
import OneRowFiveWidgets from '@dt-advisory/assets/svgs/OneRowFiveWidgets.svg?react';
import TwoRowsSixWidgets from '@dt-advisory/assets/svgs/TwoRowsSixWidgets.svg?react';

import {
  containerStyle,
  headerTitleStyle,
  widgetStyle,
  widgetsLayoutContainerStyle,
} from './WidgetsLayout.style';

const WidgetsLayout = (): JSX.Element => {
  const currentSelectedLayout = useUserConfigurationStore((x) => x.currentSelectedLayout);
  const setCurrentSelectedLayout = useUserConfigurationStore((x) => x.setCurrentSelectedLayout);
  return (
    <Box data-testid="user_configuration_modal_widgets_layout" css={containerStyle}>
      <Typography css={headerTitleStyle}>
        <FormattedMessage
          id={'userConfiguration.settings.widgetsLayout.title'}
          defaultMessage={'Widgets Layout'}
        />
      </Typography>
      <Box css={widgetsLayoutContainerStyle}>
        <Box
          role="button"
          css={widgetStyle(currentSelectedLayout === WidgetLayoutEnum.OneRowThreeWidgets)}
          onClick={() => setCurrentSelectedLayout(WidgetLayoutEnum.OneRowThreeWidgets)}
        >
          <OneRowThreeWidgets width="inherit" height="inherit" />
        </Box>
        <Box
          role="button"
          css={widgetStyle(currentSelectedLayout === WidgetLayoutEnum.OneRowFourWidgets)}
          onClick={() => setCurrentSelectedLayout(WidgetLayoutEnum.OneRowFourWidgets)}
        >
          <OneRowFourWidgets width="inherit" height="inherit" />
        </Box>
        <Box
          role="button"
          css={widgetStyle(currentSelectedLayout === WidgetLayoutEnum.OneRowFiveWidgets)}
          onClick={() => setCurrentSelectedLayout(WidgetLayoutEnum.OneRowFiveWidgets)}
        >
          <OneRowFiveWidgets width="inherit" height="inherit" />
        </Box>
        <Box
          role="button"
          css={widgetStyle(currentSelectedLayout === WidgetLayoutEnum.TwoRowsSixWidgets)}
          onClick={() => setCurrentSelectedLayout(WidgetLayoutEnum.TwoRowsSixWidgets)}
        >
          <TwoRowsSixWidgets width="inherit" height="inherit" />
        </Box>
      </Box>
    </Box>
  );
};

export default WidgetsLayout;
