/* eslint-disable max-lines-per-function */
import { CasingArchitectureType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue } from '../../OperationHelper';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import Table from '../Table';
import { containerStyle, tableStyle } from './CasingArchitecture.style';

export type CasingArchitecturePropsType = {
  data?: CasingArchitectureType[];
  isLoading: boolean;
};

const CasingArchitecture = ({ data, isLoading }: CasingArchitecturePropsType): JSX.Element => {
  const { getLabel } = useUnitLabels();
  const placeholderRows: CasingArchitectureType[] = [
    {
      uid: shortId.generate(),
      fromDepth: '-',
      toDepth: '-',
      od: '-',
      id: '-',
    },
  ];

  const getData = (_data: CasingArchitectureType[]): CasingArchitectureType[] => {
    return _data.map((x) => ({
      ...x,
      fromDepth: getFormattedValue(x.fromDepth as number, 1),
      toDepth: getFormattedValue(x.toDepth as number, 1),
      od: getFormattedValue(x.od as number, 2),
      id: getFormattedValue(x.id as number, 2),
      uid: shortId.generate(),
    }));
  };

  const dataRows = Array.isArray(data) && data.length > 0 ? getData(data) : placeholderRows;

  return (
    <div
      data-testid="at_operationInfo_casingArchitecture"
      className="at_operationInfo_casingArchitecture"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={titleStyle}>
        <FormattedMessage id={'operationInfo.casingArchitecture.title'} />
      </div>
      <Table
        isLoading={isLoading}
        isAlternated={false}
        tableBodyStyle={tableStyle}
        columns={[
          {
            name: 'fromDepth',
            label: getLabel(
              'operationInfo.casingArchitecture.fromDepth.dynamic.label',
              UnitTypeEnums.Depth,
            ),
            className: 'at_operationInfo_casingArchitecture_fromDepth',
          },
          {
            name: 'toDepth',
            label: getLabel(
              'operationInfo.casingArchitecture.toDepth.dynamic.label',
              UnitTypeEnums.Depth,
            ),
            className: 'at_operationInfo_casingArchitecture_toDepth',
          },
          {
            name: 'od',
            label: getLabel(
              'operationInfo.casingArchitecture.OD.dynamic.label',
              UnitTypeEnums.PipeDiameter,
            ),
            className: 'at_operationInfo_casingArchitecture_OD',
          },
          {
            name: 'id',
            label: getLabel(
              'operationInfo.casingArchitecture.ID.dynamic.label',
              UnitTypeEnums.PipeDiameter,
            ),
            className: 'at_operationInfo_casingArchitecture_ID',
          },
        ]}
        data={dataRows}
      />
    </div>
  );
};

export default CasingArchitecture;
