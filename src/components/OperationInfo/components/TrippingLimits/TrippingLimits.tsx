/* eslint-disable max-lines-per-function, complexity */
import {
  CirculationType,
  OperationInfoType,
} from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue } from '../../OperationHelper';
import { gridItemContainerStyle, subTitleStyle, titleStyle } from '../../OperationInfo.style';
import { TableColumn } from '../Table/components/TableRow';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, wrapperStyle } from './TrippingLimits.style';

export type TrippingLimitsPropsType = {
  data?: OperationInfoType['trippingLimits'];
  isLoading: boolean;
};

const TrippingLimits = ({ data, isLoading }: TrippingLimitsPropsType): JSX.Element => {
  const placeholderRows = [
    {
      uid: shortId.generate(),
      fromDepth: '-',
      toDepth: '-',
      maxVelUpwards: '-',
      maxVelDownwards: '-',
    },
  ] as CirculationType[];

  const getData = (_data: CirculationType[]): CirculationType[] =>
    _data.map((x) => ({
      ...x,
      fromDepth: getFormattedValue(x.fromDepth as number, 0),
      toDepth: getFormattedValue(x.toDepth as number, 0),
      maxVelUpwards: getFormattedValue(x.maxVelUpwards as number, 2),
      maxVelDownwards: getFormattedValue(x.maxVelDownwards as number, 2),
      uid: shortId.generate(),
    }));

  const dataWithCirculations =
    data?.withCirculations &&
    Array.isArray(data?.withCirculations) &&
    data.withCirculations.length > 0
      ? getData(data.withCirculations)
      : placeholderRows;

  const dataWithoutCirculations =
    data?.withoutCirculations &&
    Array.isArray(data?.withoutCirculations) &&
    data.withoutCirculations.length > 0
      ? getData(data.withoutCirculations)
      : placeholderRows;

  const { getLabel } = useUnitLabels();

  const withCirculationColumns: TableColumn<CirculationType>[] = [
    {
      name: 'fromDepth',
      label: getLabel('operationInfo.trippingLimits.fromDepth.dynamic.label', UnitTypeEnums.Depth),
      className: 'at_operationInfo_trippingLimits_withCirculation_fromDepth',
    },
    {
      name: 'toDepth',
      label: getLabel('operationInfo.trippingLimits.toDepth.dynamic.label', UnitTypeEnums.Depth),
      className: 'at_operationInfo_trippingLimits_withCirculation_toDepth',
    },
    {
      name: 'maxVelUpwards',
      label: getLabel(
        'operationInfo.trippingLimits.maxVelUpwards.dynamic.label',
        UnitTypeEnums.HookVelocity,
      ),
      className: 'at_operationInfo_trippingLimits_withCirculation_maxVelUpwards',
    },
    {
      name: 'maxVelDownwards',
      label: getLabel(
        'operationInfo.trippingLimits.maxVelDownwards.dynamic.label',
        UnitTypeEnums.HookVelocity,
      ),
      className: 'at_operationInfo_trippingLimits_withCirculation_maxVelDownwards',
    },
  ];
  const withoutCirculationColumns: TableColumn<CirculationType>[] = [
    {
      name: 'fromDepth',
      label: getLabel('operationInfo.trippingLimits.fromDepth.dynamic.label', UnitTypeEnums.Depth),
      className: 'at_operationInfo_trippingLimits_withoutCirculation_fromDepth',
    },
    {
      name: 'toDepth',
      label: getLabel('operationInfo.trippingLimits.toDepth.dynamic.label', UnitTypeEnums.Depth),
      className: 'at_operationInfo_trippingLimits_withoutCirculation_toDepth',
    },
    {
      name: 'maxVelUpwards',
      label: getLabel(
        'operationInfo.trippingLimits.maxVelUpwards.dynamic.label',
        UnitTypeEnums.HookVelocity,
      ),
      className: 'at_operationInfo_trippingLimits_withoutCirculation_maxVelUpwards',
    },
    {
      name: 'maxVelDownwards',
      label: getLabel(
        'operationInfo.trippingLimits.maxVelDownwards.dynamic.label',
        UnitTypeEnums.HookVelocity,
      ),
      className: 'at_operationInfo_trippingLimits_withoutCirculation_maxVelDownwards',
    },
  ];
  return (
    <div
      data-testid="at_operationInfo_trippingLimits"
      className="at_operationInfo_trippingLimits"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={titleStyle}>
        <FormattedMessage id={'operationInfo.trippingLimits.title'} />
      </div>
      <div css={wrapperStyle}>
        {/*
         ** With Circulation
         */}
        {getSection({
          subTitleStyle,
          titleKey: 'operationInfo.trippingLimits.withCirculation.title',
          isLoading,
          isAlternated: false,
          columns: withCirculationColumns,
          data: dataWithCirculations,
        })}
        {/*
         ** Without Circulation
         */}
        {getSection({
          subTitleStyle,
          titleKey: 'operationInfo.trippingLimits.withoutCirculation.title',
          isLoading,
          isAlternated: false,
          columns: withoutCirculationColumns,
          data: dataWithoutCirculations,
        })}
      </div>
    </div>
  );
};

export default TrippingLimits;
