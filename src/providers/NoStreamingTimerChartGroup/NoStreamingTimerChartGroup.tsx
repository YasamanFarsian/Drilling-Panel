/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-non-null-assertion */
import Timer from '@dt-advisory/components/Timer';
import { TimerState } from '@dt-advisory/helpers/noStreamingTimer';
import React, { useEffect, useRef, useState } from 'react';

import { checkAndRedirect, LocalStorageKeys } from '@dt-advisory/helpers/launcherHelper';
import { useConfigs } from '@dt-advisory/providers/Configs';
import { useSyncStateStore } from '@dt-advisory/store/SyncStateStore';
import { useNoStreamingTimerChartGroupProvider } from './useNoStreamingTimerChartGroupProvider';

type NoStreamingTimerChartGroupType = Record<string, never>;

const NoStreamingTimerChartGroupContext = React.createContext<
  NoStreamingTimerChartGroupType | undefined
>(undefined);

type NoStreamingTimerChartGroupProviderPropsType = {
  children: React.ReactNode;
};

const NoStreamingTimerChartGroupProvider = ({
  children,
}: NoStreamingTimerChartGroupProviderPropsType): JSX.Element => {
  const initialTimerState: TimerState = { state: false, timestamp: new Date() };
  const [timer, setTimer] = useState<TimerState>(initialTimerState);
  const setIsNoConnectionLabelEnabled = useSyncStateStore((x) => x.setIsNoConnectionLabelEnabled);
  useNoStreamingTimerChartGroupProvider({ timer, setTimer }); // Switches to next active operation when NO CONNECTION
  const configs = useConfigs();
  let launcherTimerStart = useRef<number | null>(null);

  /**
   * check for missing streaming
   * */

  useEffect(() => {
    if (timer?.state) {
      if (
        launcherTimerStart.current === null &&
        localStorage.getItem(LocalStorageKeys.RigCode) !== null
      ) {
        launcherTimerStart.current = new Date().getTime();
      }
    } else {
      launcherTimerStart.current = null;
    }
  }, [timer?.state]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (launcherTimerStart.current !== null) {
        checkAndRedirect(configs, launcherTimerStart.current);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [configs]);

  return (
    <NoStreamingTimerChartGroupContext.Provider value={undefined}>
      {!!timer?.state && <Timer timestamp={timer.timestamp} />}
      {children}
    </NoStreamingTimerChartGroupContext.Provider>
  );
};

export default NoStreamingTimerChartGroupProvider;
