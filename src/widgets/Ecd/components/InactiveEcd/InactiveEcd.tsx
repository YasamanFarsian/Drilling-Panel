/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any */
import { getUnitLabelIdByUnitType, UnitTypeEnums } from '@dt-advisory/helpers/units/unitsHelper';
import AreaComponent from '@dt-advisory/widgets/components/AreaComponent';
import CartesianGraph from '@dt-advisory/widgets/components/CartesianGraph';
import CartesianXAxis from '@dt-advisory/widgets/components/CartesianXAxis';
import DepthAxis from '@dt-advisory/widgets/components/DepthAxis';
import LineComponent from '@dt-advisory/widgets/components/LineComponent';
import ReferenceLine from '@dt-advisory/widgets/components/ReferenceLine';
import {
  inactiveEcdLineStyle,
  maxBoundGradients,
  maxBoundStrokes,
  minBoundGradients,
  minBoundStrokes,
} from '@dt-advisory/widgets/Ecd/components/EcdChart/EcdChart.style';
import { useTheme } from '@emotion/react';
import React from 'react';
import { VictoryAxis } from 'victory';
import BelowBitDepthOverlay from '../BelowBitDepthOverlay';
import ClosestLine from '../ClosestLine';
import { axisStyle } from './InactiveEcd.style';

const InactiveEcd = (): JSX.Element => {
  const theme = useTheme();
  const minDomain = { x: 0, y: 0.9 };
  const maxDomain = { x: 1200, y: 1.9 };
  const casingShoeDepth = 807;
  const bitDepth = 977;
  const MD = 977;
  const TD = 1200;
  const closestToFracLine = {
    from: 1.2,
    to: 1.5,
    depth: 807,
    showBackground: true,
  };
  const closestToPoreLine = {
    from: 1.2,
    to: 1.2,
    depth: 807,
    showBackground: false,
  };

  // fake data
  const margins: any = [];
  for (let i = 0; i < 35; i++) {
    margins.push([807 + i * 15, 1.2, 1.5]);
  }

  // fake data
  const ecd: any = [];
  for (let i = 0; i < 300; i++) {
    ecd.push({ x: 100 + i * 10, y: 0.95 });
  }

  return (
    <CartesianGraph minDomain={minDomain} maxDomain={maxDomain} inactive={true} horizontal>
      <VictoryAxis crossAxis invertAxis style={axisStyle} />
      <DepthAxis
        axisLabel={'widget.ecd.axis.y.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Depth)}
      />
      <CartesianXAxis
        tickOffsetY={0}
        axisLabel={'widget.ecd.axis.x.dynamic.label'}
        axisUnit={getUnitLabelIdByUnitType(UnitTypeEnums.Density)}
      />
      <AreaComponent
        name="max-bound-pressure"
        data={margins}
        x={0}
        y={2}
        y0={() => maxDomain.y}
        gradientConfig={{
          id: 'max-bound',
          configs: maxBoundGradients,
          strokes: maxBoundStrokes,
          strokeWidth: '1px',
        }}
      />
      <AreaComponent
        name="min-bound-pressure"
        data={margins}
        x={0}
        y={1}
        gradientConfig={{
          id: 'min-bound',
          configs: minBoundGradients,
          strokes: minBoundStrokes,
          strokeWidth: '1px',
        }}
      />
      <BelowBitDepthOverlay MD={MD} TD={TD} inactive={true} />
      <ReferenceLine depth={casingShoeDepth} colorStrokeType="casingShoeDepth" inactive={true} />
      <ReferenceLine depth={bitDepth} colorStrokeType="bitDepth" inactive={true} />
      <ClosestLine id="closest-pore" {...closestToPoreLine} inactive={true} />
      <ClosestLine id="closest-frac" {...closestToFracLine} inactive={true} />
      <LineComponent name="ecd" data={ecd} style={inactiveEcdLineStyle(theme.mode)} />
    </CartesianGraph>
  );
};

export default InactiveEcd;
