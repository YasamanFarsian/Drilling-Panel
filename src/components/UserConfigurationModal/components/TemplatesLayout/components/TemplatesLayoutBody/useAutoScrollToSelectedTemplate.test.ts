import { renderHook } from '@testing-library/react-hooks';
import {
  ConfigurationStoreType,
  useUserConfigurationStore,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { TemplateToSaveType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useAutoScrollToSelectedTemplate } from './useAutoScrollToSelectedTemplate';

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration');

describe('useAutoScrollToSelectedTemplate', () => {
  describe('TemplateLayoutCard width is 576px and gap is 32px', () => {
    // all test under this group assume item width is 576px and gap 32px if there's any change for item width/gap,
    // developer who changed it should re-calculate these test again
    describe('selectedTemplate is second item inline', () => {
      beforeEach(() => {
        const mockState: Partial<ConfigurationStoreType> = {
          currentSelectedTemplateId: 'selectedId',
          scrollToLastSnapNeeded: false,
        };
        (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
          callback(mockState),
        );
      });

      const mockLayoutData: TemplateToSaveType[] = [
        { id: 'template1', name: 'any name1', isEditable: false, gridConfig: [], widgetConfig: [] },
        { id: 'template2', name: 'any name2', isEditable: false, gridConfig: [], widgetConfig: [] },
        { id: 'template3', name: 'any name3', isEditable: false, gridConfig: [], widgetConfig: [] },
        { id: 'template4', name: 'any name4', isEditable: false, gridConfig: [], widgetConfig: [] },
      ];

      describe('selectedTemplateId is not existed in layoutData', () => {
        beforeEach(() => {
          const mockState: Partial<ConfigurationStoreType> = {
            currentSelectedTemplateId: 'i am not existed',
            scrollToLastSnapNeeded: false,
          };
          (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
            callback(mockState),
          );
        });

        it('should not call scrollTo', () => {
          const mockEmblaApi = {
            scrollTo: jest.fn(),
            containerNode: jest.fn(() => document.createElement('div')),
          } as any;
          renderHook(() => useAutoScrollToSelectedTemplate(mockLayoutData, mockEmblaApi));
          expect(mockEmblaApi.scrollTo).not.toHaveBeenCalled();
        });
      });
      describe('selectedTemplateId is existed in layoutData', () => {
        it('should call scrollTo(0)', () => {
          const mockState: Partial<ConfigurationStoreType> = {
            currentSelectedTemplateId: 'template3',
            scrollToLastSnapNeeded: false,
          };
          (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
            callback(mockState),
          );
          const mockEmblaApi = {
            scrollTo: jest.fn(),
            containerNode: jest.fn(() => document.createElement('div')),
          } as any;
          renderHook(() => useAutoScrollToSelectedTemplate(mockLayoutData, mockEmblaApi));
          expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(0);
        });

        it('should call scrollTo(1)', () => {
          const mockState: Partial<ConfigurationStoreType> = {
            currentSelectedTemplateId: 'template4',
            scrollToLastSnapNeeded: false,
          };
          (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
            callback(mockState),
          );
          const mockEmblaApi = {
            scrollTo: jest.fn(),
            containerNode: jest.fn(() => document.createElement('div')),
          } as any;
          renderHook(() => useAutoScrollToSelectedTemplate(mockLayoutData, mockEmblaApi));
          expect(mockEmblaApi.scrollTo).toHaveBeenCalledWith(1);
        });
      });
      describe('scrollToLastSnapNeeded is true', () => {
        beforeEach(() => {
          const mockState: Partial<ConfigurationStoreType> = {
            currentSelectedTemplateId: 'selectedId',
            scrollToLastSnapNeeded: true,
          };
          (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((callback) =>
            callback(mockState),
          );
        });
        it('should not call scrollTo', () => {
          const mockEmblaApi = {
            scrollTo: jest.fn(),
            containerNode: jest.fn(() => document.createElement('div')),
          } as any;
          renderHook(() => useAutoScrollToSelectedTemplate(mockLayoutData, mockEmblaApi));
          expect(mockEmblaApi.scrollTo).not.toHaveBeenCalled();
        });
      });
    });
  });
});
