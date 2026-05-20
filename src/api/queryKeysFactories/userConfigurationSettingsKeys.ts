export const userConfigurationSettingsKeys = {
  all: ['settings'] as const,
  getSettings: () => [...userConfigurationSettingsKeys.all, 'getSettings'] as const,
  saveSettings: () => [...userConfigurationSettingsKeys.all, 'saveSettings'] as const,

  // Start Layout related keys
  layout: () => [...userConfigurationSettingsKeys.all, 'layout'] as const,
  layoutList: () => [...userConfigurationSettingsKeys.layout(), 'list'] as const,
  createLayout: () => [...userConfigurationSettingsKeys.layout(), 'createLayout'] as const,
  updateLayout: (id: string) =>
    [...userConfigurationSettingsKeys.layout(), id, 'updateLayout'] as const,
  deleteLayout: (id: string) =>
    [...userConfigurationSettingsKeys.layout(), id, 'deleteLayout'] as const,
  // End Layout related keys

  // Start Widget related keys
  widget: () => [...userConfigurationSettingsKeys.all, 'widget'] as const,
  widgetList: () => [...userConfigurationSettingsKeys.widget(), 'list'] as const,
  // End Widget related keys
};
