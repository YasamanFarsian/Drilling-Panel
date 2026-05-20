/* eslint-disable max-lines-per-function */
import {
  AvailableDrillingMethodsEnum,
  OperationInfoType,
} from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue, getValue } from '../../OperationHelper';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, sixLabelBold } from './GeneralInformation.style';

const useDrillingMethodValues = () => {
  const { formatMessage } = useIntl();
  const availableMethods = [
    AvailableDrillingMethodsEnum.BACK_PRESSURE,
    AvailableDrillingMethodsEnum.DUAL_GRADIENT,
    AvailableDrillingMethodsEnum.LOW_ANNULUS_LEVEL,
    AvailableDrillingMethodsEnum.RISERLESS_DRILLING,
  ];
  const getDrillingMethodDisplayedValue = (method?: string): string | undefined => {
    if (availableMethods.includes(method as AvailableDrillingMethodsEnum)) {
      const drillingMethodDisplayedValue = formatMessage({
        id: `userConfiguration.headerPropertiesValues.${method}.value`,
        defaultMessage: method,
      });
      return drillingMethodDisplayedValue;
    } else if (method === AvailableDrillingMethodsEnum.NONE) {
      return '-';
    } else {
      return method;
    }
  };
  return getDrillingMethodDisplayedValue;
};

export type GeneralInformationPropsType = {
  data?: OperationInfoType['general'];
  isLoading: boolean;
};

const GeneralInformation = ({ data, isLoading }: GeneralInformationPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const getDrillingMethodDisplayedValue = useDrillingMethodValues();

  const { getLabel } = useUnitLabels();
  const transformedData = [
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.generalInformation.rigName.label' }),
      value: getValue(data?.rigName),
      className: 'at_operationInfo_generalInformation_rigName',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.generalInformation.wellName.label' }),
      value: getValue(data?.wellName),
      className: 'at_operationInfo_generalInformation_wellName',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.section.dynamic.label',
        UnitTypeEnums.PipeDiameter,
      ),
      value: getFormattedValue(data?.section),
      className: 'at_operationInfo_generalInformation_section',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({
        id: 'operationInfo.generalInformation.drillingMethod.label',
        defaultMessage: ' ',
      }),
      value: getValue(getDrillingMethodDisplayedValue(data?.drillingMethod)),
      className: 'at_operationInfo_generalInformation_drillingMethod',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxSectionFlowRate.dynamic.label',
        UnitTypeEnums.FlowRate,
      ),
      value: getFormattedValue(data?.maxSectionFlowRate, 0),
      className: 'at_operationInfo_generalInformation_maxSectionFlowRate',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({
        id: 'operationInfo.generalInformation.machineLimits.label',
        defaultMessage: ' ',
      }),
      value: '',
      className: 'at_operationInfo_generalInformation_machineLimits',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxHookVelocity.dynamic.label',
        UnitTypeEnums.HookVelocity,
      ),
      value: getFormattedValue(data?.maxHookVelocity, 2),
      className: 'at_operationInfo_generalInformation_maxHookVelocity',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxHookAcceleration.dynamic.label',
        UnitTypeEnums.Acceleration,
      ),
      value: getFormattedValue(data?.maxHookAcceleration, 2),
      className: 'at_operationInfo_generalInformation_maxHookAcceleration',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxHookDeceleration.dynamic.label',
        UnitTypeEnums.Acceleration,
      ),
      value: getFormattedValue(data?.maxHookDeceleration, 2),
      className: 'at_operationInfo_generalInformation_maxHookAcceleration',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.MaxPumpAcceleration.dynamic.label',
        UnitTypeEnums.FlowRateAcceleration,
      ),
      value: getFormattedValue(data?.maxPumpRateAcceleration, 0),
      className: 'at_operationInfo_generalInformation_maxPumpRateAcceleration',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxPumpDeceleration.dynamic.label',
        UnitTypeEnums.FlowRateAcceleration,
      ),
      value: getFormattedValue(data?.maxPumpRateDeceleration, 0),
      className: 'at_operationInfo_generalInformation_maxPumpRateDeceleration',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxFlowRate.dynamic.label',
        UnitTypeEnums.FlowRate,
      ),
      value: getFormattedValue(data?.maxFlowRate, 0),
      className: 'at_operationInfo_generalInformation_maxFlowRate',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.generalInformation.maxSPP.dynamic.label',
        UnitTypeEnums.Pressure,
      ),
      value: getFormattedValue(data?.maxSPP, 0),
      className: 'at_operationInfo_generalInformation_maxSPP',
    },
  ];

  return (
    <div
      data-testid="at_operationInfo_generalInformation"
      className="at_operationInfo_generalInformation"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={titleStyle}>
        <FormattedMessage id={'operationInfo.generalInformation.title'} />
      </div>
      <Table
        isLoading={isLoading}
        isAlternated={true}
        isTransposed={true}
        tableBodyStyle={sixLabelBold}
        columns={[
          {
            name: 'title',
            label: 'title',
            className: undefined,
          },
          {
            name: 'value',
            label: 'value',
            className: undefined,
          },
        ]}
        data={transformedData}
      />
    </div>
  );
};

export default GeneralInformation;
