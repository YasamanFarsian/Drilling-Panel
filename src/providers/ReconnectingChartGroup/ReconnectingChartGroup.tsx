/* eslint-disable max-lines-per-function, complexity */
import Reconnecting from '@dt-advisory/components/Reconnecting';
import Syncing from '@dt-advisory/components/Syncing';
import { useTimeoutConnect } from '@dt-advisory/hooks/useTimer';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import {
  useUserConfigurationStore,
  WidgetsEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWSConnectionStore } from '@dt-advisory/store/WsConnection';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSyncingTimeout } from './useSyncingTimeout';

type ReconnectingChartGroupType = {
  isReconnecting?: boolean;
}; // provider value shape

export const DISABLE_IS_RECONNECTING = 5; // seconds
const ReconnectingChartGroupContext = React.createContext<ReconnectingChartGroupType | undefined>(
  undefined,
);

export const useReconnectingChartGroup = (): ReconnectingChartGroupType => {
  const context = React.useContext(ReconnectingChartGroupContext);
  if (context === undefined) {
    throw new Error(
      'useReconnectingChartGroup can not be used outside ReconnectingChartGroupProvider',
    );
  }
  return context;
};

type ReconnectingChartGroupProviderPropsType = {
  children: React.ReactNode;
};

const ReconnectingChartGroupProvider = ({
  children,
}: ReconnectingChartGroupProviderPropsType): JSX.Element => {
  const [isReconnecting, setReconnecting] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const isEmptyTemplate = useUserConfigurationStore((x) => x.isEmptyTemplate);
  const { isConnectionTimeout: canHandleWSConnection, pause: pauseWatch } =
    useTimeoutConnect(DISABLE_IS_RECONNECTING); // Enable display 5s after load
  const wsConnectionStates = useWSConnectionStore((x) => x.wsConnectionStates);
  const isSyncing = useSyncStateStore((x) => !x.isAtLeastOneWidgetConnected);

  useSyncingTimeout(isSyncing);

  const disableWatch = useCallback(() => pauseWatch(), [pauseWatch]);
  useEffect(() => {
    if (canHandleWSConnection) {
      setEnabled(true);
      disableWatch();
    }
  }, [canHandleWSConnection, disableWatch]);

  /**
   * check for disconnected streams
   * */
  const allWsConnectionStates = React.useMemo(() => {
    return (Object.keys(wsConnectionStates) as Array<WidgetsEnum>).map(
      (k) => !wsConnectionStates[k],
    );
  }, [wsConnectionStates]);

  useEffect(() => {
    if (isEnabled) {
      const allWsState = allWsConnectionStates.every((x) => x);
      setReconnecting(allWsState && !isEmptyTemplate);
    }
  }, [allWsConnectionStates, isEnabled]);

  const value = useMemo(() => ({ isReconnecting }), [isReconnecting]);
  return (
    <ReconnectingChartGroupContext.Provider value={value}>
      {isReconnecting && <Reconnecting data-testid={'reconnecting-overlay'} />}
      {isSyncing && <Syncing data-testid={'syncing-overlay'} />}
      {children}
    </ReconnectingChartGroupContext.Provider>
  );
};

export default ReconnectingChartGroupProvider;
