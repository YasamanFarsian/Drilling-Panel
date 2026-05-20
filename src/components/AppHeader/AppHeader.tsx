/* eslint-disable max-lines-per-function */
import OperationInfoIcon from '@dt-advisory/assets/svgs/operation-info-2.svg?react';
import SettingsIcon from '@dt-advisory/assets/svgs/settings.svg?react';
import { useAuthenticationFlow } from '@dt-advisory/hooks/useAuthenticationFlow';
import { useAuthentication } from '@dt-advisory/providers/Authentication';
import { useConfigs } from '@dt-advisory/providers/Configs';
import { useEmbedder } from '@dt-advisory/providers/Embedder';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { ExitToApp } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { OperationInfo as OperationInfoModal } from '../OperationInfo';
import SyncIcon from '../SyncIcon/SyncIcon';
import UserConfigurationModal from '../UserConfigurationModal';
import { containerStyle, iconButtonColor, iconStyle, wrapperStyle } from './AppHeader.style';
import ChangeThemeToggleButtonGroup from './components/ChangeThemeToggleButtonGroup';
import { useChangeThemeToggleButton } from './components/ChangeThemeToggleButtonGroup/useChangeThemeToggleButton';
import HeaderConfigValues from './components/HeaderConfigValues';

const AppHeader = (): JSX.Element => {
  const { logout: authFlowLogout } = useAuthenticationFlow();
  const configs = useConfigs();
  const { isInIframe: isEmbedded } = useEmbedder();
  const { signOut } = useAuthentication();
  const [visibleOperationInfo, setVisibleOperationInfo] = useState(false);
  const setSettingsModalOpen = useUserConfigurationStore((x) => x.setSettingsModalOpen);
  const isSettingsModalOpen = useUserConfigurationStore((x) => x.isSettingsModalOpen);
  const { handleOnChange: handleAppearanceChange, currentValue: currentAppearance } =
    useChangeThemeToggleButton();

  return (
    <Box data-testid="main-app-header" css={wrapperStyle}>
      <Box css={containerStyle}>
        <HeaderConfigValues />
        <Box flex={1} />
        <SyncIcon />

        <ChangeThemeToggleButtonGroup
          onChange={handleAppearanceChange}
          value={currentAppearance}
          data-testid="at_main_topBar_btn_theme"
          css={iconButtonColor}
        />

        <IconButton
          data-testid="at_main_topBar_btn_operationInfo"
          className="at_main_topBar_btn_operationInfo"
          css={iconButtonColor}
          size="large"
          onClick={() => setVisibleOperationInfo(!visibleOperationInfo)}
        >
          <OperationInfoIcon css={iconStyle} />
        </IconButton>
        <IconButton
          data-testid="at_main_topBar_btn_setting"
          className="at_main_topBar_btn_setting"
          css={iconButtonColor}
          size="large"
          onClick={() => setSettingsModalOpen(!isSettingsModalOpen)}
        >
          <SettingsIcon css={iconStyle} />
        </IconButton>

        {configs?.enableAuthentication && !isEmbedded && (
          <IconButton
            className="at_main_topBar_btn_signout"
            data-testid="at_main_topBar_btn_signout"
            css={iconButtonColor}
            size="large"
            onClick={() => {
              authFlowLogout();
              signOut();
            }}
          >
            <ExitToApp css={iconStyle} />
          </IconButton>
        )}
      </Box>
      <OperationInfoModal visible={visibleOperationInfo} setVisible={setVisibleOperationInfo} />
      <UserConfigurationModal visible={isSettingsModalOpen} setVisible={setSettingsModalOpen} />
    </Box>
  );
};

export default AppHeader;
