/* eslint-disable max-lines-per-function, complexity */
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import { Box } from '@mui/material';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue } from '../../OperationHelper';
import { gridItemContainerStyle, titleStyle } from '../../OperationInfo.style';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, legendStyle } from './DrillString.style';

export type DrillStringPropsType = {
  data?: OperationInfoType['drillString'];
  isLoading: boolean;
};

const DrillString = ({ data, isLoading }: DrillStringPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const placeholderDataRows = [
    {
      uid: shortId.generate(),
      id: '-',
      od: '-',
      element: '-',
      maxOd: '-',
      linWeight: '-',
      length: '-',
      displacement: '-',
    },
  ];
  const displacementType = data?.displacementType ?? '-';
  const tfa = data?.tfa ?? '-';
  const dataRows =
    data && Array.isArray(data?.drillStringData) && data.drillStringData.length > 0
      ? data.drillStringData.map((x) => {
          return {
            ...x,
            element: formatMessage({
              id: `operationInfo.drillString.elements.${x.element}`,
              defaultMessage: x.element || '-',
            }),
            length: getFormattedValue(x.length as number, 1),
            od: getFormattedValue((x.maxOd ?? x.od) as number, 2),
            id: getFormattedValue(x.id as number, 2),
            linWeight: getFormattedValue(x.linWeight as number, 1),
            displacement: getFormattedValue(x.displacement as number, 1),
            uid: shortId.generate(),
          };
        })
      : placeholderDataRows;

  const { getLabel } = useUnitLabels();
  return (
    <div
      data-testid="at_operationInfo_drillstring"
      className="at_operationInfo_drillstring"
      css={[gridItemContainerStyle, containerStyle]}
    >
      {getSection({
        subTitleStyle: titleStyle,
        titleKey: 'operationInfo.drillstring.title',
        isLoading,
        isAlternated: false,
        columns: [
          {
            name: 'element',
            label: formatMessage({ id: 'operationInfo.drillstring.element.label' }),
            className: 'at_operationInfo_drillstring_element',
          },
          {
            name: 'od', // 'maxOd', we display only od at the moment
            label: getLabel(
              'operationInfo.drillstring.maxGaugeOD.dynamic.label',
              UnitTypeEnums.PipeDiameter,
            ),
            className: 'at_operationInfo_drillstring_maxGaugeOD',
          },
          {
            name: 'id',
            label: getLabel(
              'operationInfo.drillstring.ID.dynamic.label',
              UnitTypeEnums.PipeDiameter,
            ),
            className: 'at_operationInfo_drillstring_ID',
          },
          {
            name: 'length',
            label: getLabel('operationInfo.drillstring.length.dynamic.label', UnitTypeEnums.Length),
            className: 'at_operationInfo_drillstring_length',
          },
          {
            name: 'linWeight',
            label: getLabel(
              'operationInfo.drillstring.lin.dynamic.label',
              UnitTypeEnums.WeightPerLength,
            ),
            className: 'at_operationInfo_drillstring_lin',
          },
          // TODO: API is not returning FluidDisplacementUnit for now
          // {
          //   name: 'displacement',
          //   label: getLabel(
          //     'operationInfo.drillstring.displacement.dynamic.label',
          //     UnitTypeEnums.FluidDisplacementUnit,
          //   ),
          //   className: 'at_operationInfo_drillstring_displacement',
          // },
        ],
        data: dataRows,
      })}
      <Box css={legendStyle}>
        <div>
          <span>
            <FormattedMessage id={'operationInfo.drillstring.displacementType.label'} />:
          </span>
          <FormattedMessage
            id={`operationInfo.drillstring.displacementType.${displacementType}.label`}
            defaultMessage="-"
          />
        </div>
        <div>
          <span>
            <FormattedMessage
              id={getLabel('operationInfo.drillstring.tfa.dynamic.label', UnitTypeEnums.SmallArea)}
            />
            :
          </span>
          {getFormattedValue(tfa as number, 2)}
        </div>
      </Box>
    </div>
  );
};

export default DrillString;
