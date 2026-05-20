import { checkWellboreData } from '@dt-advisory/helpers/getSafeData';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import {
  useUserConfigurationStore,
  WidgetsEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWebSocket } from '@dt-advisory/widgets/hooks/useWebSocket';
import { useEffect, useState } from 'react';
import { NewWellboreDTO, WellboreBaseValue, WellboreStreamMessage } from '../WellboreTypes';

const mapByProp = (prop: 'md' | 'val', data: WellboreBaseValue[] = []): number[] => {
  return data.map((d) => d[prop]);
};

export const mapToCurrentDTO = (data: NewWellboreDTO): WellboreStreamMessage => {
  const config = {
    bitDepth: data.bitDepth,
    casingDepth: data.casingDepth,
    holeDepth: data.holeDepth,
    neutralPoint: data.neutralPoint,
    targetDepth: data.targetDepth,
    bitRotation: data.bitRotation,
    mudCirculation: data.mudCirculation,
  };
  const val = {
    inclinationVal: mapByProp('val', data.inclination),
    inclinationMD: mapByProp('md', data.inclination),
    cuttingsMassFractionsVal: mapByProp('val', data.cuttingsMassFractions),
    cuttingsMassFractionsMD: mapByProp('md', data.cuttingsMassFractions),
    cuttingsBedHeightVal: mapByProp('val', data.cuttingsBedHeight),
    cuttingsBedHeightMD: mapByProp('md', data.cuttingsBedHeight),
  };

  return { config, val, isLive: data.isLive, currentTime: data.currentTime };
};

export function useWellboreStream(): {
  isConnected: boolean;
  data: WellboreStreamMessage | null;
} {
  const { ws, isConnected } = useWebSocket({ path: WidgetsEnum.Wellbore });
  const [data, setData] = useState<WellboreStreamMessage | null>(null);
  const isSettingsModalOpen = useUserConfigurationStore((x) => x.isSettingsModalOpen);
  const setSyncState = useSyncStateStore((x) => x.setSyncStates);
  const removeSyncState = useSyncStateStore((x) => x.removeSyncState);
  const widgetKey = WidgetsEnum.Wellbore;

  useEffect(() => {
    setData(null);

    ws?.on(WidgetsEnum.Wellbore, (message: any) => {
      if (!isSettingsModalOpen) {
        const wellboreData = checkWellboreData(mapToCurrentDTO(JSON.parse(message)));
        setSyncState({ [widgetKey]: wellboreData?.isLive ? wellboreData.isLive : false });
        setData(wellboreData);
      }
    });

    return () => {
      ws?.off(WidgetsEnum.Wellbore);
      removeSyncState(widgetKey);
    };
  }, [ws, isSettingsModalOpen]);

  return { isConnected, data };
}
