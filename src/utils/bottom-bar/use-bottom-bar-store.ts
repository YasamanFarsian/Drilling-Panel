/* eslint-disable max-lines */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { produce } from 'immer';
import { create } from 'zustand';

export type BottomBarState = {
  window?: TrackWindow;
  latestTimestamp?: number;
  firstTimestamp?: number;
  witsmlLatestTimestamp?: number;
  witsmlFirstTimestamp?: number;
  latestTimestampRequestAt?: number;
  isScrolledToBottom: boolean;
  showAnnotation: boolean;
  zoom: ZoomState;
};

export type BottomBarAction = {
  getWindow: () => TrackWindow;
  setWindow: (window?: TrackWindow) => void;

  getAvailableTimestamps: () => { firstTimestamp: number; latestTimestamp: number } | null;

  getLatestTimestamp: () => number;
  getFirstTimestamp: () => number;
  getWitsmlLatestTimestamp: () => number | null;
  getWitsmlFirstTimestamp: () => number | null;

  getLatestTimestampRequestAt: () => number | undefined;

  setLatestTimestamp: (timestamp?: number) => void;
  setFirstTimestamp: (timestamp?: number) => void;
  setWitsmlLatestTimestamp: (timestamp: number) => void;
  setWitsmlFirstTimestamp: (timestamp: number) => void;

  setLatestTimestampRequestAt: (timestamp: number) => void;

  scrollToBottom: () => void;
  scrollTo: (ts: number) => void;

  setShowAnnotation: (isSet: boolean) => void;

  startZoom: (props: { top: number; height: number; trackHeight: number }) => void;
  resetZoom: () => void;
};

export type TrackWindow = {
  top: number;
  bottom: number;
  granularity: number;
};

type ZoomState = {
  isZooming: boolean;
  originWindow?: TrackWindow;
};

// eslint-disable-next-line max-lines-per-function
export const useBottomBarStore = create<BottomBarState & BottomBarAction>((set, get) => ({
  window: undefined,
  showAnnotation: false,
  isScrolledToBottom: false,
  latestTimestamp: undefined,
  firstTimestamp: undefined,
  witsmlLatestTimestamp: undefined,
  witsmlFirstTimestamp: undefined,
  latestTimestampRequestAt: undefined,

  getWindow: () => {
    const window = get().window;
    if (window === undefined) throw Error('Window not set.');
    return window;
  },
  setWindow: (window?: TrackWindow) => {
    const latestTs = get().getAvailableTimestamps()?.latestTimestamp ?? Date.now();
    if (!window) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const window = {
        granularity: DEFAULT_GRANULARITY,
        bottom: latestTs,
        top: latestTs - DEFAULT_GRANULARITY,
      };
      set({ window, isScrolledToBottom: true });
      return;
    }

    if (window.granularity < MIN_GRANULARITY) {
      throw new Error(
        `Granularity is too small. Min: ${MIN_GRANULARITY}, got: ${window.granularity}.`,
      );
    }
    set({ window, isScrolledToBottom: window.bottom >= latestTs });
  },

  /**
   * Get set of any available timestamps. Either WITSML or TimeSeries.
   * If nothing available, return null.
   */
  getAvailableTimestamps: () => {
    const { firstTimestamp, witsmlFirstTimestamp, latestTimestamp, witsmlLatestTimestamp } = get();

    if (!firstTimestamp && !witsmlFirstTimestamp && !latestTimestamp && !witsmlLatestTimestamp) {
      return null;
    }

    return {
      firstTimestamp:
        firstTimestamp && witsmlFirstTimestamp
          ? Math.min(firstTimestamp, witsmlFirstTimestamp)
          : (firstTimestamp ?? witsmlFirstTimestamp ?? 0),
      latestTimestamp:
        latestTimestamp && witsmlLatestTimestamp
          ? Math.max(latestTimestamp, witsmlLatestTimestamp)
          : (latestTimestamp ?? witsmlLatestTimestamp ?? 0),
    };
  },

  getLatestTimestamp: () => {
    const latestTimestamp = get().latestTimestamp;
    if (latestTimestamp === undefined) throw Error('Latest timestamp not set.');
    return latestTimestamp;
  },

  getFirstTimestamp: () => {
    const firstTimestamp = get().firstTimestamp;
    if (firstTimestamp === undefined) throw Error('First timestamp not set.');
    return firstTimestamp;
  },

  getWitsmlLatestTimestamp: () => {
    const witsmlLatestTimestamp = get().witsmlLatestTimestamp;
    if (!witsmlLatestTimestamp) return null;
    return witsmlLatestTimestamp;
  },

  getWitsmlFirstTimestamp: () => {
    const witsmlFirstTimestamp = get().witsmlFirstTimestamp;
    if (!witsmlFirstTimestamp) return null;
    return witsmlFirstTimestamp;
  },

  getLatestTimestampRequestAt: () => {
    const latestTimestampRequestAt = get().latestTimestampRequestAt;
    return latestTimestampRequestAt;
  },

  setLatestTimestampRequestAt: (timestamp: number) => {
    set({ latestTimestampRequestAt: timestamp });
  },

  setWitsmlLatestTimestamp: (timestamp: number) => {
    set({ witsmlLatestTimestamp: timestamp });
  },

  setLatestTimestamp: (timestamp?: number) => {
    set({ latestTimestamp: timestamp });
  },

  setFirstTimestamp: (timestamp?: number) => {
    set({ firstTimestamp: timestamp });
  },

  setWitsmlFirstTimestamp: (timestamp: number) => {
    set({ witsmlFirstTimestamp: timestamp });
  },

  scrollToBottom: () => {
    const { window, latestTimestamp } = get();

    if (window && latestTimestamp) {
      const w = {
        granularity: window.granularity,
        bottom: latestTimestamp,
        top: latestTimestamp - window.granularity,
      };

      set({
        window: w,
        isScrolledToBottom: true,
      });
    }
  },

  scrollTo: (ts: number) => {
    const { window, latestTimestamp } = get();

    if (window && latestTimestamp) {
      const offset = window.granularity / 2;
      set({
        window: {
          granularity: window.granularity,
          bottom: ts + offset,
          top: ts - offset,
        },
        isScrolledToBottom: ts > latestTimestamp,
      });
    }
  },

  zoom: {
    isZooming: false,
    originWindow: undefined,
  },

  startZoom: ({ top, height, trackHeight }) => {
    const window = get().getWindow();
    const timeOffsetTop = (top * window.granularity) / trackHeight;
    const timeOffsetBottom = ((top + height) * window.granularity) / trackHeight;
    const zoomGranularity = timeOffsetBottom - timeOffsetTop;
    const zoomTop = window.top + timeOffsetTop;
    const zoomBottom = zoomTop + zoomGranularity;

    if (zoomGranularity < MIN_GRANULARITY) {
      throw new Error('Granularity is too small to zoom in.');
    }

    set(
      produce<BottomBarState>((state) => {
        state.window = {
          granularity: zoomGranularity,
          top: zoomTop,
          bottom: zoomBottom,
        };
        state.isScrolledToBottom = false;
        state.zoom.isZooming = true;
        if (state.zoom.originWindow === undefined) state.zoom.originWindow = window;
      }),
    );
  },
  resetZoom: () => {
    set(
      produce<BottomBarState>((state) => {
        state.window = state.zoom.originWindow;
        state.zoom.isZooming = false;
        state.zoom.originWindow = undefined;
      }),
    );
  },

  setShowAnnotation: (isSet: boolean) => {
    set({ showAnnotation: isSet });
  },
}));

export const DEFAULT_GRANULARITY = 6 * 60 * 60 * 1000;
export const MIN_GRANULARITY = 60000;
export const GranularityToInterval: { [ms: number]: number } = {
  172800000: 28800000, // 48 Hours: every 8 hours
  86400000: 14400000, // 24 Hours: every 4 hours
  43200000: 7200000, // 12 Hours: every 2 hours
  21600000: 3600000, // 6 Hours (default): every 1 hour
  14400000: 1800000, // 4 Hours: every 30 mins
  7200000: 1800000, // 2 Hours: every 30 mins
  3600000: 600000, // 1 Hour: every 10 mins
  1800000: 300000, // 30 Min: every 5 mins
  900000: 120000, // 15 Min: every 2 mins
  600000: 120000, // 10 Min: every 2 mins
  300000: 60000, // 5 Min: every 1 min
  60000: 10000, // 1 Min: every 10 secs
};

export function cmpTrackWindow(a: TrackWindow, b: TrackWindow): boolean {
  return a.top === b.top && a.bottom === b.bottom && a.granularity === b.granularity;
}
