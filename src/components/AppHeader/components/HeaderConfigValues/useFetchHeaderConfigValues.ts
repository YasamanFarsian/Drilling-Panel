import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getOperationHeader } from '@dt-advisory/api/operationHeader/operationHeader.query';
import { operationHeaderKeys } from '@dt-advisory/api/queryKeysFactories/operationHeaderKeys';
import { useSettingsStore } from '@dt-advisory/store/Settings';

const SHORT_INTERVAL_MS = 5000;
const LONG_INTERVAL_MS = 30000;

const useFetchHeaderConfigValues = (configIsLoaded: boolean, enabled: boolean) => {
  const queryClient = useQueryClient();
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const { isLoading, data } = useQuery(
    operationHeaderKeys.getOperationHeader(operationId),
    () => getOperationHeader({ operationId }),
    {
      enabled: enabled && configIsLoaded,
      retry: false,
    },
  );
  const dataFound = data?.dataFound;
  useEffect(() => {
    const timeInterval = dataFound ? LONG_INTERVAL_MS : SHORT_INTERVAL_MS;
    const timerId = setInterval(() => {
      void queryClient.invalidateQueries(operationHeaderKeys.getOperationHeader(operationId));
    }, timeInterval);
    return () => {
      clearInterval(timerId);
    };
  }, [dataFound, operationId]);

  return { isLoading, data };
};

export default useFetchHeaderConfigValues;
