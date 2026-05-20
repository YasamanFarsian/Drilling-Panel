import { useFetchOperations } from '@dt-advisory/hooks/useFetchOperations';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useEffect } from 'react';

const SYNCING_TIMEOUT = 5000; // ms

export const useSyncingTimeout = (isSyncing: boolean) => {
  const updateSettings = useSettingsStore((state) => state.updateSettings);
  const { fetchOperations } = useFetchOperations({});

  useEffect(() => {
    if (!isSyncing) return;

    const syncingTimeout = setTimeout(async () => {
      const operationData = await fetchOperations();

      if (!operationData || !operationData.autoNavigateToActiveOpEnabled) return;

      const activeOperation = operationData.operations.find((operation) => operation.active);

      if (!activeOperation) return;

      const isIdChanged = activeOperation.id !== useSettingsStore.getState().settings.operationId;

      if (!isIdChanged) return;

      updateSettings('operationId', activeOperation.id);
    }, SYNCING_TIMEOUT);

    return () => {
      clearTimeout(syncingTimeout);
    };
  }, [isSyncing]);
};
