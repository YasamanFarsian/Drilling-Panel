import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import DataProviderWithJsonPatchProvider, {
  useDataProviderWithJsonPatch,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch';
import { getDataProviderForWidget } from './layoutDataProviderHelper';

describe('getDataProviderForWidget', () => {
  it('should return correct data provider for non json patch widgets', () => {
    const result = getDataProviderForWidget(WidgetsLoaderEnum.Ecd);
    expect(result).toHaveProperty('HostDataProvider');
    expect(result.HostDataProvider).toEqual(DataProvider);
    expect(result).toHaveProperty('useHostDataProvider');
    expect(result.useHostDataProvider).toEqual(useDataProvider);
  });
  it('should return correct data provider for json patch widgets', () => {
    const result = getDataProviderForWidget(WidgetsLoaderEnum.RoadmapDrag);
    expect(result).toHaveProperty('HostDataProvider');
    expect(result.HostDataProvider).toEqual(DataProviderWithJsonPatchProvider);
    expect(result).toHaveProperty('useHostDataProvider');
    expect(result.useHostDataProvider).toEqual(useDataProviderWithJsonPatch);
  });
});
