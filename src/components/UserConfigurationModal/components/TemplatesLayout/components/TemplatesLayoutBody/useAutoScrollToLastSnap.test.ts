import { renderHook } from '@testing-library/react-hooks';
import {
  ConfigurationStoreType,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { TemplateToSaveType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useAutoScrollToLastSnap } from './useAutoScrollToLastSnap';

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration');

describe('useAutoScrollToLastSnap', () => {
  const mockLayoutData: TemplateToSaveType[] = [
    { id: '1', name: 'any name1', isEditable: false, gridConfig: [], widgetConfig: [] },
    {
      id: 'selectedId',
      name: 'any name2',
      isEditable: false,
      gridConfig: [],
      widgetConfig: [],
    },
    { id: '2', name: 'any name3', isEditable: false, gridConfig: [], widgetConfig: [] },
  ];

  describe('scrollToLastSnapNeeded is false', () => {
    const mockState: Partial<ConfigurationStoreType> = {
      scrollToLastSnapNeeded: false,
      handleScrollToLastSnapSuccess: jest.fn(),
    };
    beforeEach(() => {
      (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
        callback(mockState),
      );
    });
    it('should not call scrollTo', () => {
      const mockEmblaApi = {
        scrollTo: jest.fn(),
        containerNode: jest.fn(() => document.createElement('div')),
      } as any;
      renderHook(() => useAutoScrollToLastSnap(mockLayoutData, mockEmblaApi));
      expect(mockEmblaApi.scrollTo).not.toHaveBeenCalled();
    });
    it('should not call handleScrollToLastSnapSuccess', () => {
      const mockEmblaApi = {
        scrollTo: jest.fn(),
        containerNode: jest.fn(() => document.createElement('div')),
      } as any;
      renderHook(() => useAutoScrollToLastSnap(mockLayoutData, mockEmblaApi));
      expect(mockState.handleScrollToLastSnapSuccess).not.toHaveBeenCalled();
    });
  });
  describe('scrollToLastSnapNeeded is true', () => {
    const mockState: Partial<ConfigurationStoreType> = {
      scrollToLastSnapNeeded: true,
      handleScrollToLastSnapSuccess: jest.fn(),
    };
    beforeEach(() => {
      (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
        callback(mockState),
      );
    });

    it('should call scrollTo with index Infinity', () => {
      const mockEmblaApi = {
        scrollTo: jest.fn(),
        containerNode: jest.fn(() => document.createElement('div')),
      } as any;
      renderHook(() => useAutoScrollToLastSnap(mockLayoutData, mockEmblaApi));
      expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(Infinity);
    });
    it('should call handleScrollToLastSnapSuccess', () => {
      const mockEmblaApi = {
        scrollTo: jest.fn(),
        containerNode: jest.fn(() => document.createElement('div')),
      } as any;
      renderHook(() => useAutoScrollToLastSnap(mockLayoutData, mockEmblaApi));
      expect(mockState.handleScrollToLastSnapSuccess).toHaveBeenCalled();
    });
  });
});
