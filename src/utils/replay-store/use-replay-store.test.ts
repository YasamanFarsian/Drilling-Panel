import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import useReplayStore from './use-replay-store';
import { useBottomBarStore } from '../bottom-bar/use-bottom-bar-store';

describe('useReplayStore', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('replay flow', () => {
    afterEach(() => {
      act(() => {
        useReplayStore.getState().stopReplays();
      });
    });

    it('should render with default values', () => {
      const { result } = renderHook(() => useReplayStore());
      expect(result.current.status).toBe('idle');
      expect(result.current.startTimestamp).toBeNull();
      expect(result.current.timestamp).toBeNull();
    });

    it('should update status to triggered, set startTimestamp and timer to selectedTimestamp, set latestAvailableTimestamp when triggerReplays', async () => {
      const { result } = renderHook(() => useReplayStore());
      act(() => {
        result.current.triggerReplays(1724036476368, 1800000000000);
      });

      expect(result.current.status).toBe('triggered');
      expect(result.current.startTimestamp).toBe('2024-08-19T03:01:16.368Z');
      expect(result.current.latestAvailableTimestamp).toBe(1800000000000);
      expect(result.current.timestamp).toBe(1724036476368);
    });

    it('should update status to replaying and run the timer when startReplays', async () => {
      const { result } = renderHook(() => useReplayStore());
      act(() => {
        useBottomBarStore.getState().setLatestTimestamp(new Date('3000-01-01T00:00:00Z').getTime());
        result.current.triggerReplays(1724036476368, 1800000000000);
        result.current.startReplays();
      });

      expect(result.current.status).toBe('replaying');
      expect(result.current.startTimestamp).toBe('2024-08-19T03:01:16.368Z');
      expect(result.current.latestAvailableTimestamp).toBe(1800000000000);
      expect(result.current.timestamp).toBe(1724036476368);

      act(() => {
        useReplayStore.getState().updateTimer(1724036476368 + 1000);
      });

      await waitFor(() => expect(result.current.timestamp).toBe(1724036476368 + 1000)); // add one sec
      expect(result.current.latestAvailableTimestamp).toEqual(1800000000000);
    });

    it('should reset to default state when stopReplays', async () => {
      const { result } = renderHook(() => useReplayStore());
      act(() => {
        result.current.triggerReplays(1724036476368, 1800000000000);
        result.current.startReplays();
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        result.current.stopReplays();
      });

      expect(result.current.status).toBe('idle');
      expect(result.current.startTimestamp).toBeNull();
      expect(result.current.latestAvailableTimestamp).toBeNull();
      expect(result.current.timestamp).toBeNull();
    });

    it('should automatically stop the replay when timer is null', () => {
      const { result } = renderHook(() => useReplayStore());

      act(() => {
        result.current.triggerReplays(1724036476368, 1800000000000);
        result.current.startReplays();
      });

      expect(result.current.status).toBe('replaying');
      expect(result.current.startTimestamp).toBe('2024-08-19T03:01:16.368Z');
      expect(result.current.latestAvailableTimestamp).toBe(1800000000000);
      expect(result.current.timestamp).toBe(1724036476368);

      act(() => {
        useReplayStore.setState({ timestamp: null });
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.status).toBe('idle');
      expect(result.current.startTimestamp).toBeNull();
      expect(result.current.latestAvailableTimestamp).toBeNull();
      expect(result.current.timestamp).toBeNull();
    });

    it('should automatically stop the replay when timer surpassed latestAvailableTimestamp', () => {
      const { result } = renderHook(() => useReplayStore());

      act(() => {
        result.current.triggerReplays(1724036400000, 1724038200000);
        result.current.startReplays();
      });

      expect(result.current.status).toBe('replaying');
      expect(result.current.startTimestamp).toBe('2024-08-19T03:00:00.000Z');
      expect(result.current.latestAvailableTimestamp).toBe(1724038200000);
      expect(result.current.timestamp).toBe(1724036400000);

      act(() => {
        useReplayStore.getState().updateTimer(1724538200001);
        jest.advanceTimersByTime(1000);
      });

      expect(result.current.status).toBe('idle');
      expect(result.current.startTimestamp).toBeNull();
      expect(result.current.latestAvailableTimestamp).toBeNull();
      expect(result.current.timestamp).toBeNull();
    });

    it('should override the startTimestamp, timer, and latestAvailableTimestamp  if triggerReplays when status is replaying', () => {
      const { result } = renderHook(() => useReplayStore());

      act(() => {
        result.current.triggerReplays(1724036476368, 1800000000000);
        result.current.startReplays();
      });

      expect(result.current.status).toBe('replaying');
      expect(result.current.startTimestamp).toBe('2024-08-19T03:01:16.368Z');
      expect(result.current.latestAvailableTimestamp).toBe(1800000000000);
      expect(result.current.timestamp).toBe(1724036476368);

      act(() => {
        result.current.triggerReplays(1724308897996, 1900000000000);
      });
      expect(result.current.status).toBe('triggered');
      expect(result.current.startTimestamp).toBe('2024-08-22T06:41:37.996Z');
      expect(result.current.latestAvailableTimestamp).toBe(1900000000000);
      expect(result.current.timestamp).toBe(1724308897996);
    });
  });
});
