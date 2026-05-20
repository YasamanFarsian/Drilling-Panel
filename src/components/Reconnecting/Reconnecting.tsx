/* eslint-disable max-lines-per-function, complexity */
import ReplayIcon from '@mui/icons-material/Replay';
import React, { useEffect } from 'react';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { containerStyle, iconStyle, labelContainerStyle, labelStyle } from './Reconnecting.style';

const Reconnecting = (): JSX.Element => {
  const resetWidgetSyncStates = useSyncStateStore((x) => x.resetWidgetSyncStates);

  useEffect(() => {
    resetWidgetSyncStates();
  }, [resetWidgetSyncStates]);

  return (
    <div data-testid="reconnecting" css={containerStyle}>
      <div css={labelContainerStyle}>
        <div css={labelStyle}>RECONNECTING</div>
        <div css={iconStyle}>
          <ReplayIcon />
        </div>
      </div>
    </div>
  );
};

export default Reconnecting;
