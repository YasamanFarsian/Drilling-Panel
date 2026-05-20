import { getSettingHeaderTitleTranslationKey } from './settingsHeaderHelpers';

describe('settingsHeaderHelpers', () => {
  describe('getSettingHeaderTitleTranslationKey', () => {
    it('should return the correct translation key object for "safeguards"', () => {
      const expected = {
        id: 'widgetSettings.safeguards.title',
        defaultMessage: 'SAFE GUIDES SETTINGS',
      };
      const result = getSettingHeaderTitleTranslationKey('safeguards');
      expect(result).toEqual(expected);
    });

    it('should return the correct translation key object for "smartAutoRop"', () => {
      const expected = {
        id: 'widget.smartAutoRop.setting.title',
        defaultMessage: 'SMART AUTO ROP SETTINGS',
      };
      const result = getSettingHeaderTitleTranslationKey('smartAutoRop');
      expect(result).toEqual(expected);
    });

    it('should return the correct translation key object for "roadMapDrag"', () => {
      const expected = {
        id: 'widget.roadmapDrag.setting.title',
        defaultMessage: 'ROADMAP DRAG SETTINGS',
      };
      const result = getSettingHeaderTitleTranslationKey('roadmapDrag');
      expect(result).toEqual(expected);
    });

    it('should return the default translation key object for other settings', () => {
      const expected = {
        defaultMessage: 'SETTINGS',
      };
      const result = getSettingHeaderTitleTranslationKey('otherSetting' as any);
      expect(result).toEqual(expected);
    });
  });
});
