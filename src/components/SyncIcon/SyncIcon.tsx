import React from 'react';
import LiveIcon from '@dt-advisory/assets/svgs/syncState/live.svg?react';
import SyncingIcon from '@dt-advisory/assets/svgs/syncState/syncing.svg?react';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { liveIconStyle, syncingIconStyle } from '../AppHeader/AppHeader.style';

const useShouldSyncIconBeVisible = () =>
  useSyncStateStore((x) => x.isSyncIconVisible && !x.isNoConnectionLabelEnabled);
const useIsWidgetsLive = () => useSyncStateStore((x) => x.isAllLive);

const SyncIcon = () => {
  const shouldShowSyncIcon = useShouldSyncIconBeVisible();
  const isWidgetsLive = useIsWidgetsLive();

  return (
    <>
      {shouldShowSyncIcon && (
        <>
          {isWidgetsLive ? (
            <LiveIcon
              data-testid="live-icon"
              className="app-header-button-space"
              css={liveIconStyle}
            />
          ) : (
            <SyncingIcon
              data-testid="syncing-icon"
              className="app-header-button-space"
              css={syncingIconStyle}
            />
          )}
        </>
      )}
    </>
  );
};

export default SyncIcon;
