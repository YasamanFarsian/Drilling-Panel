/* eslint-disable @typescript-eslint/no-explicit-any */
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWebSocket, UseWebSocketPropsType } from '@dt-advisory/widgets/hooks/useWebSocket';
import React, { useEffect, useMemo, useState } from 'react';

export type DataHubType = {
  currentTime: string;
  isLive: boolean | null;
};

type DataProviderType<T> = {
  data: T | null;
  isConnected: boolean;
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
}: DataProviderPropsType<T>): JSX.Element => {
  const { ws, isConnected } = useWebSocket({ path: widgetType });
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    ws?.on(widgetType, (message: any) => {
      const parsed = typeof message === 'string' ? JSON.parse(message) : message;
      setData(checkSafeData(parsed));
    });
    return () => ws?.off(widgetType);
  }, [ws, widgetType, checkSafeData]);

  const value = useMemo(() => ({ data, isConnected }), [data, isConnected]);

  return <DataProviderContext.Provider value={value}>{children}</DataProviderContext.Provider>;
};

export default DataProvider;
