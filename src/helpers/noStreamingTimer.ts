import { differenceInSeconds, compareAsc, addSeconds } from 'date-fns';

export type TimerState = { state: boolean; timestamp: Date };

const _LIMIT_SECONDS = 5;

export const initialTimerState: TimerState = { state: false, timestamp: new Date() };

type CheckDateStatePropsType = {
  lastUpdate?: string;
  currentTime?: string;
  noConnectionTimerLimit?: number;
};

export const checkDateState = ({
  lastUpdate,
  currentTime,
  noConnectionTimerLimit,
}: CheckDateStatePropsType) => {
  let _lastUpdateState = false;
  let today = new Date();
  const currentLimit = noConnectionTimerLimit ?? _LIMIT_SECONDS;
  try {
    if (lastUpdate && currentTime) {
      today = new Date(currentTime);
      const lastUpdateDate = new Date(lastUpdate);
      const diff = differenceInSeconds(today, lastUpdateDate);
      _lastUpdateState = diff > currentLimit;
      today = addSeconds(today, diff);
    }
  } catch (e) {
    //
  }
  return { state: _lastUpdateState, timestamp: today };
};

export const getNewestDate = (states: TimerState[]) => {
  return states.reduce((a, b) => (compareAsc(a.timestamp, b.timestamp) === 1 ? a : b), states[0]);
};

export const getActiveState = (states: TimerState[]) => {
  return (
    states.find((state) => state.state) ?? {
      state: false,
      timestamp: new Date(),
    }
  );
};
