/* eslint-disable */

import { convertDataForRoadMap } from '@dt-advisory/helpers/units/unitsHelper';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import useReplayStore from '@dt-advisory/utils/replay-store/use-replay-store';
import { useWebSocket, UseWebSocketPropsType } from '@dt-advisory/widgets/hooks/useWebSocket';
import {
  BaseRoadmapPatchedType,
  BaseRoadmapReturnType,
  BaseRoadmapType,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch/DataProviderWithJsonPatch.types';
import { jsonPatchDefaultRoadmapDragValues } from '@dt-advisory/widgets/RoadmapDrag/RoadmapDragConstants';
import { applyPatch } from 'fast-json-patch';
import React, { useEffect, useMemo, useState } from 'react';
import { HostProviderType } from '../HostJsonProvider';

const HostJsonPatchProviderContext = React.createContext<HostProviderType<any> | undefined>(
  undefined,
);

export const useHostJsonPatchProvider = <
  T extends { currentTime: string },
>(): HostProviderType<T> => {
  const context = React.useContext(HostJsonPatchProviderContext);
  if (context === undefined) {
    throw new Error(
      'useHostJsonPatchProvider can not be used outside HostJsonPatchProviderProvider',
    );
  }
  return context;
};

type HostJsonPatchProviderProviderPropsType = {
  widgetId: string;
  widgetType: WidgetsEnum.RoadmapDrag | WidgetsEnum.RoadmapTorque;
  children: React.ReactNode;
  mappingFn: (
    webSocketData: BaseRoadmapType | null,
    patchedData: BaseRoadmapPatchedType,
  ) => BaseRoadmapReturnType | null;
  shouldReconnect?: boolean;
  hostOperationId?: string;
} & Pick<UseWebSocketPropsType, 'getTokenFormHost' | 'webSocketUrlFromHost'>;

const HostJsonPatchProviderProvider = ({
  widgetType,
  children,
  mappingFn,
  shouldReconnect,
  webSocketUrlFromHost,
  getTokenFormHost,
  hostOperationId,
}: HostJsonPatchProviderProviderPropsType): JSX.Element => {
  const { ws, isConnected } = useWebSocket({
    path: widgetType,
    webSocketUrlFromHost,
    getTokenFormHost,
    hostOperationId,
  });

  const [_, setSiData] = useState<BaseRoadmapPatchedType | null>(null);
  const [data, setData] = useState<BaseRoadmapReturnType | null>(null);

  const updateConvertedData = (msg: any, wsSiData: BaseRoadmapPatchedType | null) => {
    const convertedFullFrameDocument = convertDataForRoadMap(widgetType, wsSiData);
    const newFullFrameMappedData = mappingFn(msg, convertedFullFrameDocument);
    setData(newFullFrameMappedData);
  };
  let isFullFilled = false;

  if (widgetType !== WidgetsEnum.RoadmapDrag && widgetType !== WidgetsEnum.RoadmapTorque)
    throw new Error('This provider only can be used by Roadmap chart series');

  useEffect(() => {
    setData(null);
    setSiData(null);
  }, [hostOperationId]);

  useEffect(() => {
    if (shouldReconnect) {
      isFullFilled = false;
    }

    ws?.on(widgetType, (message) => {
      if (useReplayStore.getState().status === 'triggered') {
        useReplayStore.getState().startReplays();
      }

      const msg = JSON.parse(message);
      const isFullFrame = Boolean(msg?.isFullFrame);

      if (isFullFrame) {
        isFullFilled = true;
        const wsSiData = applyPatch<BaseRoadmapPatchedType>(
          jsonPatchDefaultRoadmapDragValues,
          msg.data,
        ).newDocument;

        setSiData(wsSiData);
        updateConvertedData(msg, wsSiData);
      }

      if (!isFullFrame && isFullFilled) {
        if (Array.isArray(msg.data) && msg.data.length > 0) {
          // eslint-disable-next-line max-nested-callbacks
          setSiData((prev) => {
            if (!prev) return prev;
            const wsSiData = applyPatch<BaseRoadmapPatchedType>(prev, msg.data).newDocument;
            updateConvertedData(msg, wsSiData);
            return wsSiData;
          });
        }
      }
    });

    return () => {
      ws?.off(widgetType);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, shouldReconnect]);

  const value = useMemo(() => ({ data, isConnected }), [data, isConnected]);

  return (
    <HostJsonPatchProviderContext.Provider value={value}>
      {children}
    </HostJsonPatchProviderContext.Provider>
  );
};

export default HostJsonPatchProviderProvider;
