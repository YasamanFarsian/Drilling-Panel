import { useAxisLabelToggleStore } from '@dt-advisory/store/AxisLabelToggle';
import { useOpenCloseWidgetSettingStore } from '@dt-advisory/store/OpenCloseWidgetSettings';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetStatusEnum } from '@dt-advisory/widgets/components/BaseWidget';
import { useNoStreamingTimer } from '@dt-advisory/widgets/hooks/useNoStreamingTimer';
import {
  getActiveDataKeys,
  getSmartAutoRopIndicatorData,
  getSmartRopInfoData,
} from '../smartAutoRopHelpers';
import { SmartAutoRopType } from '../SmartAutoRopTypes';

type UseSmartAutoRopPropsType = {
  noConnectionTimerLimit?: number;
  data: SmartAutoRopType | null;
  isConnected: boolean;
};

// eslint-disable-next-line max-lines-per-function
export const useSmartAutoRop = ({
  noConnectionTimerLimit,
  data,
  isConnected,
}: UseSmartAutoRopPropsType) => {
  const thresholdLimit = useSettingsStore((state) => state.settings.smartAutoRop.thresholdLimit);
  useNoStreamingTimer({
    data,
    type: WidgetsEnum.SmartAutoRop,
    keys: ['lastUpdated'],
    noConnectionTimerLimit,
  });
  const isShowGraph = Boolean(isConnected && data);
  let status: WidgetStatusEnum;
  if (!isShowGraph) {
    status = WidgetStatusEnum.UNREADY;
  } else if (data?.active) {
    status = WidgetStatusEnum.ACTIVE;
  } else {
    status = WidgetStatusEnum.INACTIVE;
  }

  const hideInformation = useAxisLabelToggleStore((state) => state.hideAxisLabel.smartAutoRop);

  const isOpenSetting = useOpenCloseWidgetSettingStore((state) => state.smartAutoRop.isOpen);

  const activeDataKeys = getActiveDataKeys(data, thresholdLimit);
  const indicatorData = getSmartAutoRopIndicatorData(data);
  const infoData = getSmartRopInfoData(data);

  return {
    hideInformation,
    indicatorData,
    activeDataKeys,
    status,
    isShowGraph,
    infoData,
    isOpenSetting,
  };
};
