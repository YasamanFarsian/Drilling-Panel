/* eslint-disable max-lines-per-function */
import { create } from 'zustand';

export type ReplayStatus = 'idle' | 'triggered' | 'replaying';

interface ReplayStore {
  status: ReplayStatus;
  startTimestamp: string | null;
  latestAvailableTimestamp: number | null;
  timestamp: number | null;
  replayRate: number;
  triggerReplays: (selectedTimestamp: number, latestAvailableTimestamp: number) => void;
  startReplays: () => void;
  stopReplays: () => void;
  updateTimer: (timestamp: number) => void;
  setReplayRate: (rate: number) => void;
}

let intervalId: NodeJS.Timeout | number | null = null;

const useReplayStore = create<ReplayStore>((set, get) => ({
  status: 'idle',
  startTimestamp: null,
  latestAvailableTimestamp: null,
  timestamp: null,
  replayRate: 1000,

  setReplayRate: (rate) => {
    set({ replayRate: rate * 1000 });
  },

  updateTimer: (timestamp: number) => {
    if (get().status !== 'replaying' || !timestamp) {
      return;
    }

    set({ timestamp });
  },

  triggerReplays: (selectedTimestamp, latestAvailableTimestamp) => {
    if (get().status === 'replaying') {
      get().stopReplays();
    }

    set({
      latestAvailableTimestamp,
      startTimestamp: new Date(selectedTimestamp).toISOString(),
      timestamp: selectedTimestamp,
      status: 'triggered',
    });
  },
  startReplays: () => {
    if (intervalId !== null) clearInterval(intervalId);

    set({ status: 'replaying' });

    const checkTime = () => {
      const { timestamp, latestAvailableTimestamp } = get();

      if (
        timestamp === null ||
        latestAvailableTimestamp === null ||
        timestamp >= latestAvailableTimestamp
      ) {
        console.warn(
          'Timestamp is missed or surpassed latestAvailableTimestamp. The replay has been stopped.',
        );
        get().stopReplays();
        return;
      }
    };

    intervalId = setInterval(() => {
      checkTime();
    }, get().replayRate);
  },

  stopReplays: () => {
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = null;
    set({
      status: 'idle',
      startTimestamp: null,
      latestAvailableTimestamp: null,
      timestamp: null,
      replayRate: 1000,
    });
  },
}));

export default useReplayStore;
