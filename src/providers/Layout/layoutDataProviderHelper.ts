// HOST
// import HostJsonPatchProviderProvider, {
//   useHostJsonPatchProvider,
// } from '@dt-advisory/host-poc/HostJsonPatchProvider';
// import HostJsonProviderProvider, {
//   useHostJsonProvider,
// } from '@dt-advisory/host-poc/HostJsonProvider';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import DataProvider, { useDataProvider } from '@dt-advisory/widgets/providers/DataProvider';
import DataProviderWithJsonPatchProvider, {
  useDataProviderWithJsonPatch,
} from '@dt-advisory/widgets/providers/DataProviderWithJsonPatch';

const DATA_PROVIDER_WITH_JSON_PATCH = [
  WidgetsLoaderEnum.RoadmapDrag,
  WidgetsLoaderEnum.RoadmapTorque,
];

// TODO: this is a duplicate of host-poc/HostJsonPatchProvider/HostJsonPatchProvider.tsx (used in DrillAware), one of the two should be removed and these should be moved up to a common module
export const getDataProviderForWidget = (widget: WidgetsLoaderEnum) => {
  if (DATA_PROVIDER_WITH_JSON_PATCH.includes(widget)) {
    return {
      HostDataProvider: DataProviderWithJsonPatchProvider,
      useHostDataProvider: useDataProviderWithJsonPatch,
    };
    // HOST
    // return {
    //   HostDataProvider: HostJsonPatchProviderProvider,
    //   useHostDataProvider: useHostJsonPatchProvider,
    // };
  } else {
    return {
      HostDataProvider: DataProvider,
      useHostDataProvider: useDataProvider,
    };
    // HOST
    // return {
    //   HostDataProvider: HostJsonProviderProvider,
    //   useHostDataProvider: useHostJsonProvider,
    // };
  }
};
