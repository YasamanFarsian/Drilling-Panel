import { SettingsType } from '../../BaseWidget';

export const getSettingHeaderTitleTranslationKey = (type: SettingsType) => {
  switch (type) {
    case 'safeguards':
      return {
        id: 'widgetSettings.safeguards.title',
        defaultMessage: 'SAFE GUIDES SETTINGS',
      };

    case 'smartAutoRop':
      return {
        id: 'widget.smartAutoRop.setting.title',
        defaultMessage: 'SMART AUTO ROP SETTINGS',
      };
    case 'roadmapDrag':
      return {
        id: 'widget.roadmapDrag.setting.title',
        defaultMessage: 'ROADMAP DRAG SETTINGS',
      };
    case 'roadmapTorque':
      return {
        id: 'widget.roadmapTorque.setting.title',
        defaultMessage: 'ROADMAP TORQUE SETTINGS',
      };
    default:
      return {
        defaultMessage: 'SETTINGS',
      };
  }
};
