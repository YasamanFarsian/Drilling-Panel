/* eslint-disable complexity, max-lines-per-function */
import Logo from '@dt-advisory/assets/images/logo.svg?react';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { Box, Divider, Skeleton } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import {
  containerStyle,
  dividerStyle,
  labelContainerStyle,
  labelStyle,
  logoStyle,
} from './HeaderConfigValues.style';
import useQueryHeaderConfigValues from './useQueryHeaderConfigValues';

const HeaderConfigValues = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const applicationName = formatMessage({
    id: 'application.name',
    defaultMessage: 'DrillTronics',
  });
  const configIsLoaded = useUserConfigurationStore((x) => x.configIsLoaded);
  const currentUserConfig = useUserConfigurationStore((x) => x.currentUserConfig);
  const headerConfig = currentUserConfig?.headerConfig ?? [];
  const { isLoading, headerConfigValues } = useQueryHeaderConfigValues(
    configIsLoaded,
    headerConfig,
  );

  if (isLoading || !configIsLoaded) {
    return <Skeleton height={'2.5rem'} width={'60rem'} />;
  }

  return (
    <Box data-testid="header-config-values" css={containerStyle}>
      <Box css={labelContainerStyle}>
        <Logo css={logoStyle} />
        <div css={labelStyle}>{applicationName}</div>
        <Divider css={dividerStyle} orientation="vertical" flexItem />
      </Box>
      {!isLoading &&
        configIsLoaded &&
        headerConfigValues.map(
          (x, index) =>
            x && (
              <Box key={`${x.key}`} css={labelContainerStyle}>
                <div css={labelStyle}>{x.value}</div>
                {index < headerConfigValues.length - 1 && (
                  <Divider css={dividerStyle} orientation="vertical" flexItem />
                )}
              </Box>
            ),
        )}
    </Box>
  );
};

export default HeaderConfigValues;
