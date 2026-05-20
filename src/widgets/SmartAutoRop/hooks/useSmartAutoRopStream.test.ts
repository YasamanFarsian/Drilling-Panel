import { renderHook } from '@testing-library/react-hooks';
import { mockedSignalR } from '@dt-advisory/helpers/tests/mock/signalR';
import { ConfigsProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { useSmartAutoRopStream } from './useSmartAutoRopStream';

mockedSignalR();

describe('hook: useSmartAutoRopStream when settings false', () => {
  const { result } = renderHook(() => useSmartAutoRopStream(), {
    wrapper: ConfigsProviderWrapper,
  });

  it('property isConnected should be false', () => {
    expect(result.current.isConnected).toBeFalsy();
  });

  it('property data should not be null', () => {
    expect(result.current.data).toBeDefined();
  });

  it.skip('property data should be null', () => {
    jest
      .spyOn({ useUserConfigurationStore }, 'useUserConfigurationStore')
      .mockReturnValueOnce(true);
    expect(result.current.data).toEqual(null);
  });
});
