import { getDataState, GetDataStatePropsType } from './smartAutoRopInformationHelpers';

describe('smartAutoRopInformationHelpers', () => {
  describe('getDataState', () => {
    const mockProps: GetDataStatePropsType = {
      dataKey: 'FlowRate',
      activeDataKeys: [],
    };

    it('should return idle by default', () => {
      const state = getDataState(mockProps);

      expect(state).toEqual('idle');
    });

    it('should return active if dataKey is existed in activeDataKeys', () => {
      const state = getDataState({
        ...mockProps,
        dataKey: 'FlowRate',
        activeDataKeys: ['FlowRate'],
      });

      expect(state).toEqual('active');
    });
  });
});
