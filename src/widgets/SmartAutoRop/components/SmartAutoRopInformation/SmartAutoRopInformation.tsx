import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import { useHostSettingsStore } from '@dt-advisory/store/HostSettingsStore';
import React from 'react';
import { ActiveSmartAutoRopType, SmartRopDataKeyType } from '../../SmartAutoRopTypes';
import SmartAutoRopInfoItem from './components/SmartAutoRopInfoItem';
import { containerStyle } from './SmartAutoRopInformation.style';
import { getDataState } from './smartAutoRopInformationHelpers';

export type SmartAutoRopInformationPropsType = {
  data?: Pick<
    ActiveSmartAutoRopType,
    | 'ropActual'
    | 'ropTarget'
    | 'rpmActual'
    | 'rpmTarget'
    | 'wobActual'
    | 'wobTarget'
    | 'flowRateActual'
    | 'flowRateTarget'
  >;
  activeDataKeys: SmartRopDataKeyType[];
  isSmallVersion?: boolean;
  inactive: boolean;
};

// eslint-disable-next-line max-lines-per-function
const SmartAutoRopInformation = ({
  data,
  isSmallVersion,
  activeDataKeys,
  inactive,
}: SmartAutoRopInformationPropsType): JSX.Element => {
  const isEmbedded = useHostSettingsStore((x) => x.isEmbedded);
  const { getLabel } = useUnitLabels();
  return (
    <div
      data-testid="smart_auto_rop_information_1683620170570"
      css={containerStyle(isEmbedded, isSmallVersion)}
    >
      <SmartAutoRopInfoItem
        dataTestIdPrefix="slowVelocity"
        label={getLabel('widget.smartAutoRop.infoLabel.dynamic.rop', UnitTypeEnums.Rop)}
        state={getDataState({ dataKey: 'ROP', activeDataKeys })}
        targetVal={data?.ropTarget}
        actualVal={data?.ropActual}
        inactive={inactive}
      />
      <SmartAutoRopInfoItem
        dataTestIdPrefix="volumeFlowRate"
        label={getLabel('widget.smartAutoRop.infoLabel.dynamic.flowRate', UnitTypeEnums.FlowRate)}
        state={getDataState({ dataKey: 'FlowRate', activeDataKeys })}
        targetVal={data?.flowRateTarget}
        actualVal={data?.flowRateActual}
        inactive={inactive}
      />
      <SmartAutoRopInfoItem
        dataTestIdPrefix="rotationalSpeed"
        label={getLabel(
          'widget.smartAutoRop.infoLabel.dynamic.rpm',
          UnitTypeEnums.RotationFrequency,
        )}
        state={getDataState({ dataKey: 'RPM', activeDataKeys })}
        targetVal={data?.rpmTarget}
        actualVal={data?.rpmActual}
        inactive={inactive}
      />
      <SmartAutoRopInfoItem
        dataTestIdPrefix="weight"
        label={getLabel('widget.smartAutoRop.infoLabel.dynamic.wob', UnitTypeEnums.Wob)}
        state={getDataState({ dataKey: 'WOB', activeDataKeys })}
        targetVal={data?.wobTarget}
        actualVal={data?.wobActual}
        inactive={inactive}
      />
    </div>
  );
};

export default SmartAutoRopInformation;
