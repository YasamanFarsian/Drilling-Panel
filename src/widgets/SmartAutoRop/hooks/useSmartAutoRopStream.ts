import { getConvertedDataSmartAutoRop } from '@dt-advisory/helpers/units/unitsHelper';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import {
  useUserConfigurationStore,
  WidgetsEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWebSocket } from '@dt-advisory/widgets/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { SmartAutoRopType } from '../SmartAutoRopTypes';

// Please complete WidgetsEnum with SmartAutoRop

export type SmartAutoRopPropsType = Record<string, never>;

export const useSmartAutoRopStream = (): {
  data: SmartAutoRopType | null;
  isConnected: boolean;
} => {
  const { ws, isConnected } = useWebSocket({ path: WidgetsEnum.SmartAutoRop });
  const [data, setData] = useState<SmartAutoRopType | null>(null);
  const isSettingsModalOpen = useUserConfigurationStore((x) => x.isSettingsModalOpen);
  const setSyncState = useSyncStateStore((x) => x.setSyncStates);
  const removeSyncState = useSyncStateStore((x) => x.removeSyncState);
  const widgetKey = WidgetsEnum.SmartAutoRop;

  useEffect(() => {
    setData(null);

    ws?.on(WidgetsEnum.SmartAutoRop, (message: any) => {
      if (!isSettingsModalOpen) {
        const smartAutoRopData = JSON.parse(message);
        setSyncState({ [widgetKey]: smartAutoRopData.isLive });
        setData(getConvertedDataSmartAutoRop(smartAutoRopData));
      }
    });

    return () => {
      ws?.off(WidgetsEnum.SmartAutoRop);
      removeSyncState(widgetKey);
    };
  }, [ws, isSettingsModalOpen]);

  return { data, isConnected };
};
