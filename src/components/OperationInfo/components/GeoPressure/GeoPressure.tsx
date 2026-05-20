/* eslint-disable max-lines, max-lines-per-function */
import { FitDataType, OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue } from '../../OperationHelper';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import GeoPressureToggler, { GeoPressureToggleValue } from './components/GeoPressureToggler';
import {
  containerStyle,
  geoPressureTogglerContainerStyle,
  tableStyle,
  wrapperStyle,
} from './GeoPressure.style';
import { GeoPressureWidget } from './GeoPressureWidget';

export type GeoPressurePropsType = {
  data?: OperationInfoType['geoPressure'];
  isLoading: boolean;
};

const GeoPressure = ({ data, isLoading }: GeoPressurePropsType): JSX.Element => {
  const [mode, setMode] = useState(GeoPressureToggleValue.MD);
  const handleToggleGeoPressureMode = () =>
    setMode((currMode) =>
      currMode === GeoPressureToggleValue.MD
        ? GeoPressureToggleValue.TVD
        : GeoPressureToggleValue.MD,
    );

  const placeholderRows = [
    {
      uid: shortId.generate(),
      md: '-',
      val: '-',
    },
  ] as FitDataType[];

  const getData = (_data: FitDataType[]): FitDataType[] =>
    _data.map((x) => ({
      ...x,
      md: getFormattedValue(x.md as number, 1),
      val: getFormattedValue(x.val as number, 2),
      uid: shortId.generate(),
    }));
  const fitDataRows =
    data?.fitData && Array.isArray(data?.fitData) && data.fitData.length > 0
      ? getData(data.fitData)
      : placeholderRows;

  const { getLabel } = useUnitLabels();
  return (
    <div
      data-testid="at_operationInfo_geoPressure"
      className="at_operationInfo_geoPressure"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={wrapperStyle}>
        {/*
         ** Mud Weigh
         ** operationInfo.geoPressure.mudWeightData.axisX.label
         ** operationInfo.geoPressure.mudWeightData.axisY.label
         */}
        <div css={geoPressureTogglerContainerStyle}>
          <div css={titleStyle}>
            <FormattedMessage id={'operationInfo.geoPressure.title'} />
          </div>

          <GeoPressureToggler value={mode} onToggle={handleToggleGeoPressureMode} />
        </div>
        <div />
        <GeoPressureWidget mode={mode} data={data} />
        {/*
         ** Fit data
         */}
        <div css={tableStyle}>
          <Table
            isLoading={isLoading}
            isAlternated={false}
            columns={[
              {
                name: 'md',
                label: getLabel(
                  'operationInfo.geoPressure.fitData.md.dynamic.label',
                  UnitTypeEnums.Depth,
                ),
                className: 'at_operationInfo_geoPressure_md',
              },
              {
                name: 'val',
                label: getLabel(
                  'operationInfo.geoPressure.fitData.val.dynamic.label',
                  UnitTypeEnums.Density,
                ),
                className: 'at_operationInfo_geoPressure_val',
              },
            ]}
            data={fitDataRows}
          />
        </div>
      </div>
    </div>
  );
};

export default GeoPressure;
