/* eslint-disable max-lines-per-function */
import { OperationInfoType } from '@dt-advisory/api/operationInfo/operationInfo.types';
import { UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import useUnitLabels from '@dt-advisory/hooks/useUnitLabels';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import shortId from 'shortid';
import { getFormattedValue } from '../../OperationHelper';
import { gridItemContainerStyle, subTitleStyle, titleStyle } from '../../OperationInfo.style';
import { getSection } from '../Table/helpers/tableHelper';
import { containerStyle, wrapperStyle } from './Trajectory.style';

export type TrajectoryPropsType = {
  data?: OperationInfoType['trajectory'];
  isLoading: boolean;
};

const Trajectory = ({ data, isLoading }: TrajectoryPropsType): JSX.Element => {
  const plannedPlaceHolderRows = [
    {
      uid: shortId.generate(),
      plannedAz: '-',
      plannedIncl: '-',
      plannedMD: '-',
      plannedTVD: '-',
    },
  ];

  const actualPlaceHolderRows = [
    {
      uid: shortId.generate(),
      actualAz: '-',
      actualIncl: '-',
      actualMD: '-',
      actualTVD: '-',
    },
  ];

  const plannedDataRows = data
    ? [
        {
          uid: shortId.generate(),
          plannedAz: getFormattedValue(data.plannedAz as number, 1),
          plannedIncl: getFormattedValue(data.plannedIncl as number, 1),
          plannedMD: getFormattedValue(data.plannedMD as number, 1),
          plannedTVD: getFormattedValue(data.plannedTVD as number, 1),
        },
      ]
    : plannedPlaceHolderRows;

  const actualDataRows = data
    ? [
        {
          uid: shortId.generate(),
          actualAz: getFormattedValue(data.actualAz as number, 1),
          actualIncl: getFormattedValue(data.actualIncl as number, 1),
          actualMD: getFormattedValue(data.actualMD as number, 1),
          actualTVD: getFormattedValue(data.actualTVD as number, 1),
        },
      ]
    : actualPlaceHolderRows;

  const { getLabel } = useUnitLabels();

  enum ColumnType {
    MD,
    Incl,
    Az,
    TVD,
  }

  const getColumnLabel = (name: ColumnType) => {
    switch (name) {
      case ColumnType.MD:
        return getLabel('operationInfo.trajectory.md.dynamic.label', UnitTypeEnums.Depth);
      case ColumnType.Incl:
        return getLabel('operationInfo.trajectory.incl.dynamic.label', UnitTypeEnums.Angle);
      case ColumnType.Az:
        return getLabel('operationInfo.trajectory.az.dynamic.label', UnitTypeEnums.Angle);
      case ColumnType.TVD:
        return getLabel('operationInfo.trajectory.tvd.dynamic.label', UnitTypeEnums.Depth);
    }
  };

  return (
    <div
      data-testid="at_operationInfo_trajectory"
      className="at_operationInfo_trajectory"
      css={[gridItemContainerStyle, containerStyle]}
    >
      <div css={titleStyle}>
        <FormattedMessage id={'operationInfo.trajectory.title'} />
      </div>
      <div css={wrapperStyle}>
        {/*
         ** Planned
         */}
        {getSection({
          subTitleStyle,
          titleKey: 'operationInfo.trajectory.plannedTDSurvey.title',
          isLoading,
          isAlternated: false,
          columns: [
            {
              name: 'plannedMD',
              label: getColumnLabel(ColumnType.MD),
              className: 'at_operationInfo_trajectory_plannedTDSurvey_md',
            },
            {
              name: 'plannedIncl',
              label: getColumnLabel(ColumnType.Incl),
              className: 'at_operationInfo_trajectory_plannedTDSurvey_incl',
            },
            {
              name: 'plannedAz',
              label: getColumnLabel(ColumnType.Az),
              className: 'at_operationInfo_trajectory_plannedTDSurvey_az',
            },
            {
              name: 'plannedTVD',
              label: getColumnLabel(ColumnType.TVD),
              className: 'at_operationInfo_trajectory_plannedTDSurvey_tvd',
            },
          ],
          data: plannedDataRows,
        })}

        {/*
         ** Actual
         */}
        {getSection({
          subTitleStyle,
          titleKey: 'operationInfo.trajectory.lastActualSurvey.title',
          isLoading,
          isAlternated: false,
          columns: [
            {
              name: 'actualMD',
              label: getColumnLabel(ColumnType.MD),
              className: 'at_operationInfo_trajectory_lastActualSurvey_md',
            },
            {
              name: 'actualIncl',
              label: getColumnLabel(ColumnType.Incl),
              className: 'at_operationInfo_trajectory_lastActualSurvey_incl',
            },
            {
              name: 'actualAz',
              label: getColumnLabel(ColumnType.Az),
              className: 'at_operationInfo_trajectory_lastActualSurvey_az',
            },
            {
              name: 'actualTVD',
              label: getColumnLabel(ColumnType.TVD),
              className: 'at_operationInfo_trajectory_lastActualSurvey_tvd',
            },
          ],
          data: actualDataRows,
        })}
      </div>
    </div>
  );
};

export default Trajectory;
