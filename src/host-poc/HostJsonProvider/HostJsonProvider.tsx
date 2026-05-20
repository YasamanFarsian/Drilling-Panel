/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any  */
import { UnitsConfiguration } from '@dt-advisory/api/units/units.types';
import { getConvertedData, setConfigResponse } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import useReplayStore from '@dt-advisory/utils/replay-store/use-replay-store';
import { useWebSocket, UseWebSocketPropsType } from '@dt-advisory/widgets/hooks/useWebSocket';
import React, { useEffect, useMemo, useState } from 'react';

export type HostProviderType<T> = {
  data: T | null;
  isConnected: boolean;
};

export type DataHubType = {
  currentTime: string;
  isLive: boolean | null;
};

const HostJsonProviderContext = React.createContext<HostProviderType<any> | undefined>(undefined);

export const useHostJsonProvider = <T extends DataHubType>(): HostProviderType<T> => {
  const context = React.useContext(HostJsonProviderContext);
  if (context === undefined) {
    throw new Error('useHostJsonProvider can not be used outside HostJsonProviderProvider');
  }
  return context;
};

type HostJsonProviderProviderPropsType<T> = {
  widgetType: WidgetsEnum;
  checkSafeData: (data: T) => T;
  children: React.ReactNode;
  hostOperationId?: string;
  unitsSettings?: UnitsConfiguration;
} & Pick<UseWebSocketPropsType, 'getTokenFormHost' | 'webSocketUrlFromHost'>;

const HostJsonProviderProvider = <T extends DataHubType>({
  children,
  checkSafeData,
  widgetType,
  getTokenFormHost,
  webSocketUrlFromHost,
  hostOperationId,
  unitsSettings,
}: HostJsonProviderProviderPropsType<T>): JSX.Element => {
  const [data, setData] = useState<T | null>(null);
  const { ws, isConnected } = useWebSocket({
    path: widgetType,
    webSocketUrlFromHost,
    getTokenFormHost,
    hostOperationId,
  });

  if (unitsSettings) {
    setConfigResponse(unitsSettings);
  }

  useEffect(() => {
    setData(null);
    ws?.on(widgetType, (message: any) => {
      if (useReplayStore.getState().status === 'triggered') {
        useReplayStore.getState().startReplays();
      }

      const safeData = checkSafeData(JSON.parse(message));
      const convertedData = getConvertedData(widgetType, safeData);
      setData(convertedData as T);
    });

    return () => {
      ws?.off(widgetType);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);
  const value = useMemo(() => ({ data, isConnected }), [data, isConnected]);
  return (
    <HostJsonProviderContext.Provider value={value}>{children}</HostJsonProviderContext.Provider>
  );
};

export default HostJsonProviderProvider;
