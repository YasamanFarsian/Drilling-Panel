import { SettingStoreType } from './Settings';
import { settingsPersistDataMigration } from './settingsPersistDataMigration';

const roadmapShouldDefinedTest = (oldState: any, fromVersion: number) => {
  it('should return a new state with roadmap property', () => {
    const newState = settingsPersistDataMigration(oldState, fromVersion);

    expect(newState.settings.roadmap).toBeDefined();
  });
};

const smartAutoRopShouldNotBeModifiedTest = (oldState: any, fromVersion: number) => {
  it('should not modify smartAutoRop property', () => {
    const newState = settingsPersistDataMigration(oldState, fromVersion);

    expect(newState.settings.smartAutoRop.thresholdLimit).toEqual(10);
  });
};

const dontModifiedUnrelatedStateTest = (oldState: any, fromVersion: number) => {
  it('should maintain the old state properties', () => {
    const newState = settingsPersistDataMigration(oldState, fromVersion);

    expect(newState.settings.operationId).toEqual(oldState.settings?.operationId);
  });
};

describe('settingsPersistDataMigration', () => {
  describe('from version 0', () => {
    const oldState = { settings: { operationId: 'bar' } } as Partial<SettingStoreType>;
    const fromVersion = 0;
    it('should return a new state with smartAutoRop property', () => {
      const newState = settingsPersistDataMigration(oldState, fromVersion);

      expect(newState.settings.smartAutoRop).toBeDefined();
      expect(newState.settings.smartAutoRop.thresholdLimit).toBe(5);
    });

    it('should maintain the old state properties', () => {
      const newState = settingsPersistDataMigration(oldState, fromVersion);

      expect(newState.settings.operationId).toEqual(oldState.settings?.operationId);
    });
  });

  describe('from version 1', () => {
    const oldState = {
      settings: { operationId: 'bar', smartAutoRop: { thresholdLimit: 10 } },
    } as Partial<SettingStoreType>;
    const fromVersion = 1;

    roadmapShouldDefinedTest(oldState, fromVersion);
    smartAutoRopShouldNotBeModifiedTest(oldState, fromVersion);
    dontModifiedUnrelatedStateTest(oldState, fromVersion);
  });

  describe('from version 2', () => {
    const oldState = {
      settings: { operationId: 'bar', smartAutoRop: { thresholdLimit: 10 }, roadmapDrag: {} },
    };
    const fromVersion = 2;

    it('should remove roadmapDrag property from settings', () => {
      const newState = settingsPersistDataMigration(oldState, fromVersion) as any;

      expect(newState.settings.roadmapDrag).not.toBeDefined();
    });

    roadmapShouldDefinedTest(oldState, fromVersion);
    smartAutoRopShouldNotBeModifiedTest(oldState, fromVersion);
    dontModifiedUnrelatedStateTest(oldState, fromVersion);
  });
});
