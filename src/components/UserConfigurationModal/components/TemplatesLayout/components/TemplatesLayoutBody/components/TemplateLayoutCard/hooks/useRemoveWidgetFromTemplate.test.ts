import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useSnackbarStore } from '@dt-advisory/store/SnackbarStore';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { useRemoveWidgetFromTemplate } from './useRemoveWidgetFromTemplate';

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn(),
}));

jest.mock('@dt-advisory/store/SnackbarStore', () => ({
  useSnackbarStore: jest.fn(),
}));

jest.mock('@dt-advisory/store/UserConfiguration/UserConfiguration', () => ({
  useUserConfigurationStore: jest.fn(),
}));

jest.mock('react-query', () => ({
  useMutation: jest.fn().mockReturnValue({ mutateAsync: jest.fn(), isLoading: false }),
}));

jest.mock('react-intl', () => ({
  ...jest.requireActual('react-intl'),
  useIntl: () => ({ formatMessage: ({ id }: { id: string }) => id }), // Directly test on translation key
}));

describe('useRemoveWidgetFromTemplate', () => {
  describe('handleRemoveWidget', () => {
    const mockTemplateBody = {
      gridConfig: [
        [0, 1, 2],
        [0, 1, 2],
      ],
      isEditable: true,
      name: 'm',
      widgetConfig: [
        { key: WidgetsLoaderEnum.Ecd },
        { key: WidgetsLoaderEnum.Unsettled },
        { key: WidgetsLoaderEnum.Unsettled },
      ],
    };

    const mockPurgeRoadmap = jest.fn();
    (useSettingsStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ purgeRoadmap: mockPurgeRoadmap }),
    );

    const mockOpenSnackbar = jest.fn();
    (useSnackbarStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ actions: { openSnackbar: mockOpenSnackbar } }),
    );

    const mockUpdateTemplateById = jest.fn();
    (useUserConfigurationStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ updateTemplateById: mockUpdateTemplateById }),
    );

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call purgeRoadmap once', async () => {
      const { result } = renderHook(() => useRemoveWidgetFromTemplate('mockTemplateId'));

      result.current.handleRemoveWidget(0, mockTemplateBody);

      await waitFor(() => expect(mockPurgeRoadmap).toHaveBeenCalledTimes(1));
    });

    it('should call openSnackbar once with removeWidgetSuccess lokalise key', async () => {
      const { result } = renderHook(() => useRemoveWidgetFromTemplate('mockTemplateId'));
      result.current.handleRemoveWidget(0, mockTemplateBody);

      await waitFor(() => expect(mockOpenSnackbar).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(mockOpenSnackbar).toHaveBeenCalledWith(
          'userConfiguration.settings.templatesLayout.snackbarMessage.removeWidgetSuccess',
        ),
      );
    });

    it('should call updateTemplateById once with correct props', async () => {
      const { result } = renderHook(() => useRemoveWidgetFromTemplate('mockTemplateId'));
      result.current.handleRemoveWidget(0, mockTemplateBody);

      await waitFor(() => expect(mockUpdateTemplateById).toHaveBeenCalledTimes(1));
      await waitFor(() =>
        expect(mockUpdateTemplateById).toHaveBeenCalledWith('mockTemplateId', {
          ...mockTemplateBody,
          widgetConfig: [
            { key: WidgetsLoaderEnum.Unsettled },
            { key: WidgetsLoaderEnum.Unsettled },
            { key: WidgetsLoaderEnum.Unsettled },
          ],
        }),
      );
    });
  });
});
