/* eslint-disable max-lines-per-function, complexity */
import { useCallback, useEffect, useState } from 'react';
import { TimerState } from '@dt-advisory/helpers/noStreamingTimer';
import { useFetchOperations } from '@dt-advisory/hooks/useFetchOperations';
import { useReconnectingChartGroup } from '@dt-advisory/providers/ReconnectingChartGroup';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { getNextActiveOperationId } from './NoStreamingTimerChartGroupProviderHelper';

const INTERVAL_QUERY_OPERATIONS_MS = 30000;

type IntervalTimeout = ReturnType<typeof setInterval>;

type useNoStreamingTimerChartGroupProviderProps = {
  timer: TimerState;
  setTimer: (timer: TimerState) => void;
};

// Switches to next active operation when NO CONNECTION
export const useNoStreamingTimerChartGroupProvider = ({
  timer,
  setTimer,
}: useNoStreamingTimerChartGroupProviderProps) => {
  const noConnection = !!timer?.state;
  const { isReconnecting } = useReconnectingChartGroup();
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const [previousOperationId, setPreviousOperationId] = useState('');
  const [currentIntervalId, setCurrentIntervalId] = useState<IntervalTimeout>();
  const currentOperationId = useSettingsStore((x) => x.settings.operationId);
  const { fetchOperations } = useFetchOperations({
    enabled: true,
  });

  // callback to handle logic
  const _getOperations = useCallback(async () => {
    const operationData = await fetchOperations();

    const autoNavigateToActiveOpEnabled = !!operationData?.autoNavigateToActiveOpEnabled;

    const nextOperationId = getNextActiveOperationId(operationData);

    const canSwitch =
      nextOperationId &&
      currentOperationId !== nextOperationId &&
      noConnection &&
      !isReconnecting &&
      autoNavigateToActiveOpEnabled;

    if (canSwitch) {
      updateSettings('operationId', nextOperationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noConnection, isReconnecting, currentOperationId]);

  // reset values when operationId changes
  useEffect(() => {
    if (previousOperationId !== currentOperationId) {
      setPreviousOperationId(currentOperationId);
      setTimer({ state: false, timestamp: new Date() });
      clearInterval(currentIntervalId as IntervalTimeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIntervalId, previousOperationId, currentOperationId]);

  // init interval when noConnection is truthy
  useEffect(() => {
    if (noConnection) {
      const intervalId = setInterval(() => {
        _getOperations();
      }, INTERVAL_QUERY_OPERATIONS_MS);
      setCurrentIntervalId(intervalId);
      return () => clearInterval(intervalId);
    }
  }, [noConnection, _getOperations]);

  // clear interval when noConnection is falsy
  useEffect(() => {
    if (!noConnection) {
      clearInterval(currentIntervalId as IntervalTimeout);
    }
  }, [currentIntervalId, noConnection]);
};
