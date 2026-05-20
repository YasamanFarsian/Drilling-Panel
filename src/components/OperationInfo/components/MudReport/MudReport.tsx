/* eslint-disable max-lines, max-lines-per-function */
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue, getValue } from '../../OperationHelper';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, sevenLabelBold, tableContainerStyle } from './MudReport.style';

export type MudReportPropsType = {
  data?: OperationInfoType['mudReport'];
  isLoading: boolean;
};

const MudReport = ({ data, isLoading }: MudReportPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const { getLabel } = useUnitLabels();

  const firstData = [
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.mudReport.mudSampleDensity.dynamic.label',
        UnitTypeEnums.Density,
      ),
      value: getFormattedValue(data?.mudSampleDensity, 2),
      className: 'at_operationInfo_mudReport_mudSampleDensity',
    },
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.mudReport.mudSampleTemp.dynamic.label',
        UnitTypeEnums.Temperature,
      ),
      value: getFormattedValue(data?.mudSampleTemperature, 1),
      className: 'at_operationInfo_mudReport_mudSampleTemp',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.fluidType.label' }),
      value: getValue(data?.fluidType),
      className: 'at_operationInfo_mudReport_fluidType',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.oilWaterRatio.label' }),
      value: getFormattedValue(data?.oilWaterRatio),
      className: 'at_operationInfo_mudReport_oilWaterRatio',
    },
    {
      uid: shortId.generate(),
      title: getLabel('operationInfo.mudReport.temp.dynamic.label', UnitTypeEnums.Temperature),
      value: getFormattedValue(data?.temperature, 0),
      className: 'at_operationInfo_mudReport_temp',
    },
    {
      uid: shortId.generate(),
      title: getLabel('operationInfo.mudReport.press.dynamic.label', UnitTypeEnums.Pressure),
      value: getFormattedValue(data?.pressure, 0),
      className: 'at_operationInfo_mudReport_press',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.gelStrength.label' }),
      value: '',
      className: 'at_operationInfo_mudReport_gelStrength',
    },
    {
      uid: shortId.generate(),
      title: getLabel('operationInfo.mudReport.10s.dynamic.label', UnitTypeEnums.SmallStrength),
      value: getFormattedValue(data?.gelStrength10s, 1),
      className: 'at_operationInfo_mudReport_10sPa',
    },
    {
      uid: shortId.generate(),
      title: getLabel('operationInfo.mudReport.10min.dynamic.label', UnitTypeEnums.SmallStrength),
      value: getFormattedValue(data?.gelStrength10min, 1),
      className: 'at_operationInfo_mudReport_10minPa',
    },
  ];

  const secondData = [
    {
      uid: shortId.generate(),
      title: getLabel(
        'operationInfo.mudReport.mudSampleDensity.dynamic.header',
        UnitTypeEnums.SmallPressure,
      ),
      value: '',
      className: '',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.3rpm.label' }),
      value: getFormattedValue(data?.stress3RPM, 1),
      className: 'at_operationInfo_mudReport_3rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.6rpm.label' }),
      value: getFormattedValue(data?.stress6RPM, 1),
      className: 'at_operationInfo_mudReport_6rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.30rpm.label' }),
      value: getFormattedValue(data?.stress30RPM, 1),
      className: 'at_operationInfo_mudReport_30rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.60rpm.label' }),
      value: getFormattedValue(data?.stress60RPM, 1),
      className: 'at_operationInfo_mudReport_60rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.100rpm.label' }),
      value: getFormattedValue(data?.stress100RPM, 1),
      className: 'at_operationInfo_mudReport_100rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.200rpm.label' }),
      value: getFormattedValue(data?.stress200RPM, 1),
      className: 'at_operationInfo_mudReport_200rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.300rpm.label' }),
      value: getFormattedValue(data?.stress300RPM, 1),
      className: 'at_operationInfo_mudReport_300rpm',
    },
    {
      uid: shortId.generate(),
      title: formatMessage({ id: 'operationInfo.mudReport.600rpm.label' }),
      value: getFormattedValue(data?.stress600RPM, 1),
      className: 'at_operationInfo_mudReport_600rpm',
    },
  ];
  return (
    <div
      data-testid="at_operationInfo_mudReport"
      className="at_operationInfo_mudReport"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={titleStyle}>
        <FormattedMessage id={'operationInfo.mudReport.title'} />
      </div>
      <div css={tableContainerStyle}>
        <Table
          isLoading={isLoading}
          isAlternated={true}
          isTransposed={true}
          tableBodyStyle={sevenLabelBold}
          columns={[
            {
              name: 'title',
              label: 'title',
              className: '',
            },
            {
              name: 'value',
              label: 'value',
              className: '',
            },
          ]}
          data={firstData}
        />
        <Table
          isLoading={isLoading}
          isAlternated={true}
          isTransposed={true}
          columns={[
            {
              name: 'title',
              label: 'title',
              className: '',
            },
            {
              name: 'value',
              label: 'value',
              className: '',
            },
          ]}
          data={secondData}
        />
      </div>
    </div>
  );
};

export default MudReport;
