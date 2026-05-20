import { useOpenCloseWidgetSettingStore } from '@dt-advisory/store/OpenCloseWidgetSettings';
import { SettingsType } from './BaseWidget';

type UseWidgetSettingType = {
  settingType?: SettingsType;
  widgetId?: string;
};

// eslint-disable-next-line max-lines-per-function
export const useWidgetSetting = ({ settingType, widgetId }: UseWidgetSettingType) => {
  const openSetting = useOpenCloseWidgetSettingStore((state) => state.actions.openSetting);
  const closeSetting = useOpenCloseWidgetSettingStore((state) => state.actions.closeSetting);

  const isOpenWidgetSetting = useOpenCloseWidgetSettingStore((state) => {
    if (settingType === undefined) {
      return false;
    } else if (settingType === 'roadmapDrag' || settingType === 'roadmapTorque') {
      return state.roadmap[widgetId ?? '']?.isOpen ?? false;
    }

    return state[settingType].isOpen;
  });

  const handleCloseSetting = () => {
    if (!settingType) {
      return;
    }
    closeSetting({ settingType, widgetId });
  };

  const handleOpenSetting = () => {
    if (!settingType) {
      return;
    }
    openSetting({ settingType, widgetId });
  };

  return { isOpenWidgetSetting, handleCloseSetting, handleOpenSetting };
};
