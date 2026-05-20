/* eslint-disable max-lines-per-function */
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import React, { useRef } from 'react';
import type { Axis, SVGType } from '../WellboreChartHelper';

type AxisProp = {
  hideAxisLabel: boolean;
  svgAxis: SVGType['axis'];
  axis: Axis;
  hasDashedLines?: boolean;
  title?: string;
};
export const XAxis = ({ svgAxis }: AxisProp) => (
  <g id="axis-x">
    {/*<line x1="0" y1="0" x2={axis.x.screenMax} y2="0" />*/}
    {svgAxis.x.map((v: any, i: number) => (
      <g key={'x' + i}>
        <text textAnchor="middle" x={v.sx || 10} y="23">
          {v.label}
        </text>
        {/*<line x1={v.sx} y1="0" x2={v.sx} y2="8" />*/}
      </g>
    ))}
  </g>
);

export const YAxis = ({
  hideAxisLabel,
  svgAxis,
  axis,
  title,
  hasDashedLines = false,
}: AxisProp) => {
  const textTitleRef = useRef<SVGTextElement>(null);

  const widgetStyle = useWidgetSettingsStore((x) => x.widgetStyle);

  const style: any = {
    ...widgetStyle.labelStyle,
  };

  if (hideAxisLabel) {
    return <></>;
  }
  return (
    <g id="axis-y">
      {/*<line x1="0" y1="0" x2="0" y2={axis.y.screenMax} />*/}
      {title && svgAxis?.yLabelPos && (
        <text
          ref={textTitleRef}
          x={svgAxis?.yLabelPos - (textTitleRef.current?.getBBox().width ?? 0) / 2}
          y="50"
          transform="rotate(-90 10,40)"
          style={style}
        >
          {title}
        </text>
      )}
      {svgAxis.y.map((v: any, i: number) => (
        <g key={'y' + i}>
          <>
            {hasDashedLines && (
              <line
                x1="50"
                y1={v.sy}
                x2={axis.x.screenMax - 10}
                y2={v.sy}
                strokeDasharray="8"
                strokeWidth="0.2"
              />
            )}
            <text dominantBaseline="middle" x="50" y={v.sy || 20} style={style}>
              {v.label}
            </text>
            {/* <line x1="0" y1={v.sy} x2="8" y2={v.sy} /> */}
          </>
        </g>
      ))}
    </g>
  );
};
