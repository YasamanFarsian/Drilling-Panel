import { useTheme } from '@emotion/react';
import React from 'react';
import { RoadmapDragStyleConstantsType } from '@dt-advisory/styles/roadmapDragStyleConstants';
import { CoordinatesType, Domain } from '@dt-advisory/widgets/helpers/types';
import LabelList from '@dt-advisory/widgets/components/LabelList/LabelList';
type LineDataType = {
  data: Array<CoordinatesType>;
  label: string;
  lineColor: string;
};
export type LineWithLabelListPropsType = {
  linesData: Array<LineDataType>;
  maxY: number;
  labelStyle: RoadmapDragStyleConstantsType['lineLabel'];
  isSmallVersion: boolean;
  minDomain: Domain;
  maxDomain: Domain;
  holeDepth: number;
};
const LabelListMapper = ({
  labelStyle,
  linesData,
  maxY,
  isSmallVersion,
  minDomain,
  maxDomain,
  holeDepth,
  ...props
}: LineWithLabelListPropsType): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      {linesData.map((line, index) => (
        <LabelList
          {...props}
          key={`${line.label}-${index}`}
          data={line.data}
          label={line.label}
          mode={theme.mode}
          labelStyle={labelStyle}
          maxY={maxY}
          isSmallVersion={isSmallVersion}
          placementTop={index % 2 === 0}
          minDomain={minDomain}
          maxDomain={maxDomain}
          holeDepth={holeDepth}
        />
      ))}
    </>
  );
};
export default LabelListMapper;
