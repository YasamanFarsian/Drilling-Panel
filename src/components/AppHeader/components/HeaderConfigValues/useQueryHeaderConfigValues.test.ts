import { renderHook } from '@testing-library/react-hooks';
import { ReacgtQueryAndLocaleProviderWrapper } from '@dt-advisory/helpers/tests/renderWithContext';
import { HeaderProperties } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import useFetchHeaderConfigValues from './useFetchHeaderConfigValues';
import useQueryHeaderConfigValues from './useQueryHeaderConfigValues';

jest.mock('./useFetchHeaderConfigValues');

const mockUseFetchHeaderConfigValues = (data: any) => {
  (useFetchHeaderConfigValues as jest.Mock).mockImplementation(() => data);
};
describe('useQueryHeaderConfigValues', () => {
  it('should return correct header value if drilling method is: BACK_PRESSURE', async () => {
    mockUseFetchHeaderConfigValues({
      isLoading: false,
      data: {
        dataFound: true,
        drillingMethod: 'BACK_PRESSURE',
        section: 1234,
        rigName: 'Foo Rig',
        wellName: 'Foo Well',
      },
    });
    const { result } = renderHook(
      () =>
        useQueryHeaderConfigValues(true, [
          HeaderProperties.rigName,
          HeaderProperties.wellName,
          HeaderProperties.section,
          HeaderProperties.mpdStatus,
        ]),
      {
        wrapper: ReacgtQueryAndLocaleProviderWrapper,
      },
    );
    const headerConfigValues = result.current.headerConfigValues;
    const foundBlackPressure = headerConfigValues.find((x) => x.value === 'MPD');
    expect(foundBlackPressure).toBeTruthy();
  });
  it('should return 3 header values if drilling method is: NONE', async () => {
    mockUseFetchHeaderConfigValues({
      isLoading: false,
      data: {
        dataFound: true,
        drillingMethod: 'NONE',
        section: 1234,
        rigName: 'Foo Rig',
        wellName: 'Foo Well',
      },
    });
    const { result } = renderHook(
      () =>
        useQueryHeaderConfigValues(true, [
          HeaderProperties.rigName,
          HeaderProperties.wellName,
          HeaderProperties.section,
          HeaderProperties.mpdStatus,
        ]),
      {
        wrapper: ReacgtQueryAndLocaleProviderWrapper,
      },
    );
    const headerConfigValues = result.current.headerConfigValues;
    expect(headerConfigValues.length).toEqual(3);
  });
  it('should return correct header value if drilling method is: SOMETHINGELSE', async () => {
    mockUseFetchHeaderConfigValues({
      isLoading: false,
      data: {
        dataFound: true,
        drillingMethod: 'SOMETHINGELSE',
        section: 1234,
        rigName: 'Foo Rig',
        wellName: 'Foo Well',
      },
    });
    const { result } = renderHook(
      () =>
        useQueryHeaderConfigValues(true, [
          HeaderProperties.rigName,
          HeaderProperties.wellName,
          HeaderProperties.section,
          HeaderProperties.mpdStatus,
        ]),
      {
        wrapper: ReacgtQueryAndLocaleProviderWrapper,
      },
    );
    const headerConfigValues = result.current.headerConfigValues;
    const foundSomethingElse = headerConfigValues.find((x) => x.value === 'SOMETHINGELSE');
    expect(foundSomethingElse).toBeTruthy();
  });
  it('should return empty result', async () => {
    mockUseFetchHeaderConfigValues({
      isLoading: false,
      data: {
        dataFound: false,
      },
    });
    const { result } = renderHook(
      () =>
        useQueryHeaderConfigValues(true, [
          HeaderProperties.rigName,
          HeaderProperties.wellName,
          HeaderProperties.section,
          HeaderProperties.mpdStatus,
        ]),
      {
        wrapper: ReacgtQueryAndLocaleProviderWrapper,
      },
    );
    const headerConfigValues = result.current.headerConfigValues;
    expect(Object.keys(headerConfigValues).length).toEqual(3);
  });
});
