import { renderHook } from '@testing-library/react-hooks';
import { ReacgtQueryAndLocaleProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import useFetchHeaderConfigValues from './useFetchHeaderConfigValues';

jest.mock('react-query', () => {
  const mockUseQuery = jest
    .fn()
    .mockReturnValueOnce({
      isLoading: false,
      data: {
        dataFound: true,
        drillingMethod: 'BACK_PRESSURE',
        section: 1234,
        rigName: 'Foo Rig',
        wellName: 'Foo Well',
      },
    })
    .mockReturnValueOnce({
      isLoading: false,
      data: {
        dataFound: false,
        drillingMethod: '',
        section: 0,
        rigName: '',
        wellName: '',
      },
    })
    .mockReturnValue({
      isLoading: true,
      data: {
        dataFound: true,
        drillingMethod: 'MPD',
        section: 0,
        rigName: 'foo',
        wellName: 'bar',
      },
    });
  return {
    ...jest.requireActual('react-query'),
    useQuery: mockUseQuery,
  };
});

describe('useFetchHeaderConfigValues', () => {
  it('should return correct header value if drilling method is: BACK_PRESSURE', async () => {
    const { result, waitFor } = renderHook(() => useFetchHeaderConfigValues(true, true), {
      wrapper: ReacgtQueryAndLocaleProviderWrapper,
    });
    const headerConfigValues = result.current.data;
    await waitFor(() => expect(headerConfigValues?.drillingMethod).toEqual('BACK_PRESSURE'));
  });
  it('should return correct header value dataFound is false', async () => {
    const { result, waitFor } = renderHook(() => useFetchHeaderConfigValues(true, true), {
      wrapper: ReacgtQueryAndLocaleProviderWrapper,
    });
    const headerConfigValues = result.current.data;
    await waitFor(() => expect(headerConfigValues?.dataFound).toBeFalsy());
  });
  it('should return correct header value if dataFound is true', async () => {
    jest.useFakeTimers();
    const { result, waitFor } = renderHook(() => useFetchHeaderConfigValues(true, true), {
      wrapper: ReacgtQueryAndLocaleProviderWrapper,
    });
    // calls invalidateQueries after 30s
    jest.advanceTimersByTime(35000);
    await waitFor(() => expect(result.current.data?.dataFound).toBeTruthy());
    await waitFor(() => expect(result.current.data?.drillingMethod).toEqual('MPD'));
  });
});
