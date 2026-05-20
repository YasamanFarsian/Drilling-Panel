import React from 'react';
import { VictoryAxis, VictoryAxisProps } from 'victory';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';

export type ZeroOnAxisPropsType = VictoryAxisProps & {
  hideLabel?: boolean;
};

const ZeroOnAxis = ({ hideLabel, ...props }: ZeroOnAxisPropsType): JSX.Element => {
  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  return (
    <VictoryAxis
      {...props}
      crossAxis
      tickValues={[0]}
      tickComponent={<></>}
      orientation="left"
      groupComponent={<g role="presentation" id="zero-on-axis-group" />}
      style={{
        ticks: {
          size: 10,
        },
        tickLabels: {
          ...widgetStyle.labelStyle,
          fill: hideLabel ? 'transparent' : 'currentColor',
        },
      }}
    />
  );
};

export default ZeroOnAxis;
