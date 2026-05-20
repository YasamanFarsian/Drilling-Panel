import { checkDateState, getActiveState } from '@dt-advisory/helpers/noStreamingTimer';
import { useEffect, useState } from 'react';

import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

// eslint-disable-next-line max-lines-per-function
type CurrentTimeDataType = { currentTime: string };
export type UseNoStreamingTimerPropsType<T> = {
  data: T | null;
  type: WidgetsEnum;
  keys: Array<keyof T>;
  noConnectionTimerLimit?: number;
};
export const useNoStreamingTimer = <T extends CurrentTimeDataType>({
  data,
  type,
  keys,
  noConnectionTimerLimit,
}: UseNoStreamingTimerPropsType<T>) => {
  const operationId = useSettingsStore((x) => x.settings.operationId);
  const [currentOpId, setCurrentOpId] = useState('');

  const currentTime = data?.currentTime;

  useEffect(() => {
    if (currentTime) {
      const lastUpdateState = keys.map((x) =>
        checkDateState({
          lastUpdate: data[x] as string,
          currentTime: data.currentTime,
          noConnectionTimerLimit,
        }),
      );
      const activeState = getActiveState(lastUpdateState);
    }
  }, [currentTime]);

  // reset timer when opId changes
  useEffect(() => {
    if (currentOpId !== operationId) {
      setCurrentOpId(operationId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationId]);
};
