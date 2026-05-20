import { DEFAULT_GRANULARITY, useBottomBarStore } from './use-bottom-bar-store';

describe('useBottomBarStore', () => {
  beforeEach(() => {
    useBottomBarStore.setState({
      window: undefined,
      showAnnotation: false,
      latestTimestamp: undefined,
      firstTimestamp: undefined,
      witsmlLatestTimestamp: undefined,
      witsmlFirstTimestamp: undefined,
    });
  });

  test('setWindow and getWindow', () => {
    const window = { top: 0, bottom: 60000, granularity: 60000 };
    const state = useBottomBarStore.getState();
    state.setWindow(window);
    expect(state.getWindow()).toEqual(window);
  });

  test('getLatestTimestamp and setLatestTimestamp', () => {
    const state = useBottomBarStore.getState();
    state.setLatestTimestamp(100);
    state.setWindow();
    expect(state.getLatestTimestamp()).toEqual(100);
    expect(state.getWindow()).toMatchObject({
      top: 100 - DEFAULT_GRANULARITY,
      bottom: 100,
      granularity: DEFAULT_GRANULARITY,
    });
  });

  test('scrollToBottom', () => {
    const state = useBottomBarStore.getState();
    state.setLatestTimestamp(DEFAULT_GRANULARITY);
    state.setLatestTimestamp(DEFAULT_GRANULARITY * 2);
    state.scrollToBottom();
    state.setWindow();

    expect(state.getWindow()).toMatchObject({
      granularity: 21600000,
      bottom: 43200000,
      top: 21600000,
    });
  });

  test('setShowAnnotation', () => {
    expect(useBottomBarStore.getState().showAnnotation).toEqual(false);
    useBottomBarStore.getState().setShowAnnotation(true);
    expect(useBottomBarStore.getState().showAnnotation).toEqual(true);
  });

  describe('zoom', () => {
    test('startZoom should have expected behaviors', () => {
      useBottomBarStore.setState({ window: { top: 0, bottom: 100000, granularity: 1000000 } });

      // first zoom
      useBottomBarStore.getState().startZoom({ top: 0, height: 10, trackHeight: 100 });

      // set new window correctly
      expect(useBottomBarStore.getState().window).toMatchObject({
        top: 0,
        bottom: 100000,
        granularity: 100000,
      });
      // save original window
      expect(useBottomBarStore.getState().zoom).toMatchObject({
        originWindow: { top: 0, bottom: 100000, granularity: 1000000 },
        isZooming: true,
      });

      // seconds zoom
      useBottomBarStore.getState().startZoom({ top: 0, height: 60, trackHeight: 100 });
      expect(useBottomBarStore.getState().window).toMatchObject({
        top: 0,
        bottom: 60000,
        granularity: 60000,
      });
      // the original window should not be altered
      expect(useBottomBarStore.getState().zoom).toMatchObject({
        originWindow: { top: 0, bottom: 100000, granularity: 1000000 },
        isZooming: true,
      });
    });

    test('resetZoom should have expected behaviors', () => {
      useBottomBarStore.setState({
        window: { top: 0, bottom: 100, granularity: 100 },
        zoom: { isZooming: true, originWindow: { top: 0, bottom: 1000, granularity: 1000 } },
      });

      useBottomBarStore.getState().resetZoom();

      // set window back to the original state
      expect(useBottomBarStore.getState().window).toMatchObject({
        top: 0,
        bottom: 1000,
        granularity: 1000,
      });
      // reset zoom state
      expect(useBottomBarStore.getState().zoom).toMatchObject({
        isZooming: false,
        originWindow: undefined,
      });
    });

    test('cannot zoom to lower than 60000', () => {
      useBottomBarStore.setState({ window: { top: 0, bottom: 100, granularity: 60000 } });
      expect(() =>
        useBottomBarStore.getState().startZoom({ top: 0, height: 59999, trackHeight: 60000 }),
      ).toThrowError();
    });
  });

  it('scrollTo should center scroll around timestamp', () => {
    const ts = 50000;

    useBottomBarStore.getState().setWindow({ top: 0, bottom: 100000, granularity: 100000 });
    useBottomBarStore.getState().setLatestTimestamp(100000);

    useBottomBarStore.getState().scrollTo(ts);

    const offset = 100000 / 2;

    expect(useBottomBarStore.getState().window).toMatchObject({
      top: ts - offset,
      bottom: ts + offset,
      granularity: 100000,
    });

    expect(useBottomBarStore.getState().isScrolledToBottom).toBe(false);
  });

  it('scrollTo should do nothing if timestamp is not in the window', () => {
    useBottomBarStore.setState({ window: undefined });
    useBottomBarStore.getState().scrollTo(200000);
    expect(useBottomBarStore.getState().window).toBeUndefined();
  });

  it('should set and get first timestamp', () => {
    const state = useBottomBarStore.getState();
    state.setFirstTimestamp(100);
    expect(state.getFirstTimestamp()).toEqual(100);
  });

  it('should set and get first witsml timestamp', () => {
    const state = useBottomBarStore.getState();
    state.setWitsmlFirstTimestamp(100);
    expect(state.getWitsmlFirstTimestamp()).toEqual(100);
  });

  it('should set and get last witsml timestamp', () => {
    const state = useBottomBarStore.getState();
    state.setWitsmlLatestTimestamp(100);

    expect(state.getWitsmlLatestTimestamp()).toEqual(100);
  });

  it('should get first timestamp available', () => {
    const state = useBottomBarStore.getState();
    state.setFirstTimestamp(1000);
    state.setWitsmlFirstTimestamp(200);
    expect(state.getAvailableTimestamps()?.firstTimestamp).toEqual(200);
  });

  it('should return undefined if first timestamp is not available', () => {
    const state = useBottomBarStore.getState();

    expect(state.getAvailableTimestamps()).toBeNull();
  });
});
