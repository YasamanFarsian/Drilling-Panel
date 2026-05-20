import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import LocaleProvider from '@dt-advisory/providers/Locale';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { useDeleteLayout } from './useDeleteLayout';

jest.mock('@dt-advisory/store/Settings', () => ({
  useSettingsStore: jest.fn(),
}));
jest.mock('react-query', () => ({
  useMutation: jest.fn().mockReturnValue({ mutateAsync: jest.fn(), isLoading: false }),
}));

describe('useDeleteLayout', () => {
  describe('handleConfimDelete', () => {
    const mockPurgeRoadmap = jest.fn();
    (useSettingsStore as unknown as jest.Mock).mockImplementation((cb) =>
      cb({ purgeRoadmap: mockPurgeRoadmap }),
    );

    it('should call purgeRoadmap to remove all garbage roadmap setting', async () => {
      const { result } = renderHook(
        () => useDeleteLayout('mock template id', 'mock template name'),
        {
          wrapper: LocaleProvider,
        },
      );

      result.current.handleConfimDelete();

      await waitFor(() => expect(mockPurgeRoadmap).toHaveBeenCalled());
    });
  });
});
