/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint, max-lines-per-function, complexity, max-nested-callbacks */
import { getConvertedData } from '@dt-advisory/helpers/units/unitsHelper';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import {
  useUserConfigurationStore,
  WidgetsEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWSConnectionStore } from '@dt-advisory/store/WsConnection';
import { useWebSocket, UseWebSocketPropsType } from '@dt-advisory/widgets/hooks/useWebSocket';
import React, { useEffect, useMemo, useState } from 'react';

type DataProviderType<T> = {
  data: T | null;
  isConnected: boolean;
}; // provider value shape

export type DataHubType = {
  currentTime: string;
  isLive: boolean | null;
};

const DataProviderContext = React.createContext<DataProviderType<any> | undefined>(undefined);

export const useDataProvider = <T extends DataHubType>(): DataProviderType<T> => {
  const context = React.useContext(DataProviderContext);
  if (context === undefined) {
    throw new Error('useDataProvider can not be used outside DataProvider');
  }
  return context;
};

type DataProviderPropsType<T> = {
  widgetType: WidgetsEnum;
  checkSafeData: (data: T) => T;
  children: React.ReactNode;
} & Pick<UseWebSocketPropsType, 'getTokenFormHost' | 'webSocketUrlFromHost'>;

const DataProvider = <T extends DataHubType>({
  widgetType,
  checkSafeData,
  children,
  webSocketUrlFromHost,
  getTokenFormHost,
}: DataProviderPropsType<T>): JSX.Element => {
  const shouldReconnect = useWSConnectionStore((x) => x.shouldReconnect);
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const [currentOpId, setCurrentOpId] = useState('');
  const { ws, isConnected } = useWebSocket({
    path: widgetType,
    webSocketUrlFromHost,
    getTokenFormHost,
  });
  const [data, setData] = useState<T | null>(null);
  const isSettingsModalOpen = useUserConfigurationStore((x) => x.isSettingsModalOpen);
  const setSyncState = useSyncStateStore((x) => x.setSyncStates);
  const removeSyncState = useSyncStateStore((x) => x.removeSyncState);
  const [hasAddedOp, setHasAddedOp] = useState(false);

  useEffect(() => {
    if (currentOpId !== operationId) {
      setHasAddedOp(false);
      setCurrentOpId(operationId);
    }
  }, [currentOpId, operationId]);

  useEffect(() => {
    setData(null);
    if (shouldReconnect) {
      setData(null);
      setHasAddedOp(false);
    }
    ws?.on(widgetType, (message: any) => {
      if (!isSettingsModalOpen) {
        const safeData = checkSafeData(JSON.parse(message));
        const convertedData = getConvertedData(widgetType, safeData);
        setSyncState({ [widgetType]: convertedData.isLive });
        setData(convertedData as T);
      }
    });

    return () => {
      ws?.off(widgetType);
      removeSyncState(widgetType);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, isSettingsModalOpen, hasAddedOp, shouldReconnect]);

  const value = useMemo(() => ({ data, isConnected }), [data, isConnected]);

  return <DataProviderContext.Provider value={value}>{children}</DataProviderContext.Provider>;
};

export default DataProvider;
