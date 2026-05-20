/* eslint-disable complexity */
import { convertDataForRoadMap } from '@dt-advisory/helpers/units/unitsHelper';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import {
  useUserConfigurationStore,
  WidgetsEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useWSConnectionStore } from '@dt-advisory/store/WsConnection';
import { useWebSocket } from '@dt-advisory/widgets/hooks/useWebSocket';
import {
  BaseRoadmapPatchedType,
  BaseRoadmapReturnType,
  BaseRoadmapType,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch/DataProviderWithJsonPatch.types';
import { jsonPatchDefaultRoadmapDragValues } from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragConstants';
import { applyPatch } from 'fast-json-patch';
import React, { useEffect, useMemo, useState } from 'react';

// TODO: this is a duplicate of host-poc/HostJsonPatchProvider/HostJsonPatchProvider.tsx (used in DrillAware), one of the two should be removed and these should be moved up to a common module

/* eslint-disable max-lines-per-function */
type DataProviderWithJsonPatchType<T> = {
  data: T | null;
  isConnected: boolean;
};

const DataProviderWithJsonPatchContext = React.createContext<
  DataProviderWithJsonPatchType<any> | undefined
>(undefined);

export const useDataProviderWithJsonPatch = <
  T extends { currentTime: string },
>(): DataProviderWithJsonPatchType<T> => {
  const context = React.useContext(DataProviderWithJsonPatchContext);
  if (context === undefined) {
    throw new Error(
      'useDataProviderWithJsonPatch can not be used outside DataProviderWithJsonPatchProvider',
    );
  }
  return context;
};

type DataProviderWithJsonPatchProviderPropsType = {
  widgetId: string;
  widgetType: WidgetsEnum.RoadmapDrag | WidgetsEnum.RoadmapTorque;
  children: React.ReactNode;
  mappingFn: (
    webSocketData: BaseRoadmapType | null,
    patchedData: BaseRoadmapPatchedType,
  ) => BaseRoadmapReturnType | null;
};

// eslint-disable-next-line max-lines-per-function
const DataProviderWithJsonPatchProvider = ({
  widgetId,
  widgetType,
  children,
  mappingFn,
}: DataProviderWithJsonPatchProviderPropsType): JSX.Element => {
  const shouldReconnect = useWSConnectionStore((x) => x.shouldReconnect);
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const [currentOpId, setCurrentOpId] = useState('');
  const { ws, isConnected } = useWebSocket({ path: widgetType });
  const [_, setSiData] = useState<BaseRoadmapPatchedType | null>(null);
  const [data, setData] = useState<BaseRoadmapReturnType | null>(null);

  const isSettingsModalOpen = useUserConfigurationStore((x) => x.isSettingsModalOpen);
  const [hasAddedOp, setHasAddedOp] = useState(false);

  const setSyncState = useSyncStateStore((x) => x.setSyncStates);
  const removeSyncState = useSyncStateStore((x) => x.removeSyncState);

  const updateConvertedData = (
    msg: any,
    wsSiData: BaseRoadmapPatchedType | null,
    isLive: boolean,
  ) => {
    const convertedFullFrameDocument = convertDataForRoadMap(widgetType, wsSiData);
    setSyncState({ [widgetKey]: isLive });
    const newFullFrameMappedData = mappingFn(msg, convertedFullFrameDocument);
    setData(newFullFrameMappedData);
  };

  const widgetKey = widgetType + '_' + widgetId;

  let isFullFilled = false;

  if (widgetType !== WidgetsEnum.RoadmapDrag && widgetType !== WidgetsEnum.RoadmapTorque)
    throw new Error('This provider only can be used by Roadmap chart series');

  useEffect(() => {
    if (currentOpId !== operationId) {
      setHasAddedOp(false);
      setCurrentOpId(operationId);
    }
  }, [currentOpId, operationId]);

  useEffect(() => {
    if (shouldReconnect) {
      isFullFilled = false;
      setHasAddedOp(false);
    }

    ws?.on(widgetType, (message) => {
      const msg = JSON.parse(message);
      const isFullFrame = Boolean(msg?.isFullFrame);
      const isLive = Boolean(msg?.isLive);

      if (isFullFrame) {
        isFullFilled = true;
        const wsSiData = applyPatch<BaseRoadmapPatchedType>(
          jsonPatchDefaultRoadmapDragValues,
          msg.data,
        ).newDocument;

        setSiData(wsSiData);
        updateConvertedData(msg, wsSiData, isLive);
      }

      if (!isFullFrame && isFullFilled) {
        if (Array.isArray(msg.data) && msg.data.length > 0) {
          // eslint-disable-next-line max-nested-callbacks
          setSiData((prev) => {
            if (!prev) return prev;
            const wsSiData = applyPatch<BaseRoadmapPatchedType>(prev, msg.data).newDocument;
            updateConvertedData(msg, wsSiData, isLive);
            return wsSiData;
          });
        }
      }
    });

    return () => {
      ws?.off(widgetType);
      removeSyncState(widgetKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, isSettingsModalOpen, hasAddedOp, shouldReconnect]);

  const value = useMemo(() => ({ data, isConnected }), [data, isConnected]);

  return (
    <DataProviderWithJsonPatchContext.Provider value={value}>
      {children}
    </DataProviderWithJsonPatchContext.Provider>
  );
};

export default DataProviderWithJsonPatchProvider;
