/* eslint-disable max-lines-per-function */
import { SettingStoreType } from './Settings';

export const settingsPersistDataMigration = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldState: any,
  fromVersion: number,
): SettingStoreType => {
  switch (fromVersion) {
    case 2:
      const { roadmapDrag, ...oldStateSettingWithoutRoadmapDrag } = oldState.settings;
      return {
        ...oldState,
        settings: {
          ...oldStateSettingWithoutRoadmapDrag,
          roadmap: {},
        },
      };
    case 1:
      return {
        ...oldState,
        settings: {
          ...oldState.settings,
          roadmap: {},
        },
      };

    case 0:
    default:
      return {
        ...oldState,
        settings: {
          ...oldState.settings,
          smartAutoRop: {
            thresholdLimit: 5,
          },
          roadmap: {},
        },
      };
  }
};
