/* eslint-disable max-lines-per-function */
import { differenceInSeconds } from 'date-fns';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getOperationInfo } from '@dt-advisory/api/operationInfo/operationInfo.query';
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { operationInfoKeys } from '@dt-advisory/api/queryKeysFactories/operationInfoKeys';
import { getConvertedDataForConfiguration } from '@dt-advisory/helpers/units/unitsHelper';
import { useSettingsStore } from '@dt-advisory/store/Settings';

type IntervalTimeout = ReturnType<typeof setInterval>;

type useFetchOperationInfoPropsType = {
  enabled: boolean;
  intervalMS?: number;
};

export const useFetchOperationInfo = ({
  enabled = false,
  intervalMS = 0,
}: useFetchOperationInfoPropsType) => {
  const [latestAvailableData, setLatestAvailableData] = useState<
    | (OperationInfoType & {
        timestamp: Date;
      })
    | undefined
  >();
  const [currentIntervalId, setCurrentIntervalId] = useState<IntervalTimeout>();
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const queryClient = useQueryClient();

  const invalidateCache = async (opId: string) => {
    try {
      await queryClient.invalidateQueries(operationInfoKeys.getOperationInfo(opId));
    } catch (e) {
      console.error(e);
    }
  };

  // init interval
  useEffect(() => {
    if (enabled && intervalMS > 0 && operationId) {
      const intervalId = setInterval(() => {
        (async function handleInvalidate() {
          try {
            await invalidateCache(operationId);
          } catch (e) {
            console.error(e);
          }
        })();
      }, intervalMS);
      setCurrentIntervalId(intervalId);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [enabled, operationId]);

  // clear interval
  useEffect(() => {
    if (!enabled) {
      clearInterval(currentIntervalId as IntervalTimeout);
    }
  }, [currentIntervalId, enabled]);

  const { isLoading, isRefetching, data } = useQuery(
    operationInfoKeys.getOperationInfo(operationId),
    () => getOperationInfo({ operationId }),
    {
      enabled,
    },
  );

  useEffect(() => {
    if (!data) return;
    if (!isRefetching && data.dataFound) {
      const newData = getConvertedDataForConfiguration(data);
      setLatestAvailableData({
        ...newData,
        timestamp: new Date(),
      });
    } else if (
      latestAvailableData?.timestamp &&
      differenceInSeconds(new Date(), latestAvailableData.timestamp) > 30
    ) {
      setLatestAvailableData(undefined);
    }
  }, [data, isRefetching]);

  return {
    data: latestAvailableData ? (({ timestamp, ...rest }) => rest)(latestAvailableData) : undefined,
    isLoading: isLoading || isRefetching,
  };
};
