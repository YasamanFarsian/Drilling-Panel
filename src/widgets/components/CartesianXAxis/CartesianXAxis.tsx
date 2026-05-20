/* eslint-disable import/order */
/* eslint-disable complexity */
/* eslint-disable max-lines-per-function, @typescript-eslint/no-explicit-any */
import React, { memo } from 'react';
import { useIntl } from 'react-intl';
import { VictoryAxis, VictoryLabel } from 'victory';
import { arePropsEqual } from '@dt-advisory/helpers/arePropsEqual';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import GridLine from '@dt-advisory/widgets/Ecd/components/GridLine';
import CartesianXAxisTick from './components/CartesianXAxisTick';
import CustomTickLabel from './components/CustomTickLabel';

export type CartesianXAxisPropsType = Record<string, any> & {
  hideLabel?: boolean;
  isSmallVersion?: boolean;
  axisLabel: string;
  axisUnit: string;
  fixedValue?: number;
  tickOffsetY?: number;
  isRound?: boolean;
  roundNumber?: number;
  tickValues?: number[];
};

const CartesianXAxis = ({
  hideLabel,
  isSmallVersion,
  axisLabel,
  axisUnit,
  tickOffsetY,
  fixedValue = 1,
  isRound = false,
  roundNumber = 0,
  adjustFirstTik = false,
  tickValues,
  ...props
}: CartesianXAxisPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  return (
    <VictoryAxis
      {...props}
      offsetY={hideLabel ? 0 : tickOffsetY}
      dependentAxis
      crossAxis
      orientation="bottom"
      tickValues={tickValues}
      tickFormat={(value: number) => Number(value).toFixed(fixedValue)}
      tickComponent={<CartesianXAxisTick adjustFirstTik={adjustFirstTik} />}
      tickLabelComponent={<CustomTickLabel hideLabel={hideLabel} />}
      axisLabelComponent={
        <VictoryLabel
          dy={widgetStyle.xAxisOffset}
          inline
          style={{
            ...widgetStyle.labelStyle,
            fill: 'currentColor',
            display: hideLabel ? 'none' : '',
          }}
        />
      }
      gridComponent={<GridLine interval={200} />}
      label={formatMessage(
        {
          id: axisLabel,
          defaultMessage: '-',
        },
        { unit: formatMessage({ id: axisUnit, defaultMessage: '-' }) },
      )}
    />
  );
};

const memoedCartesianXAxis = memo(
  CartesianXAxis,
  arePropsEqual([
    'width',
    'height',
    'domain.x[0]',
    'domain.x[1]',
    'domain.y[0]',
    'domain.y[1]',
    'hideLabel',
  ]),
);
memoedCartesianXAxis.displayName = 'CartesianXAxis';
export default memoedCartesianXAxis;
