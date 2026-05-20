/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import React from 'react';
import useDimensions from 'react-cool-dimensions';
import { useWidgetSettingsStore } from '@dt-advisory/store/WidgetSettings';
import { getText } from '../../helper/cartesianXAxisHelper';

export type CustomTickLabelPropsType = Record<string, never>;

export const CustomTickLabel = ({
  x,
  y,
  hideLabel,
  text,
  index,
  ticks,
  showAllLabel,
  middleAlign,
}: any): JSX.Element => {
  const widgetStyle = useWidgetSettingsStore((state) => state.widgetStyle);

  const style: any = {
    ...widgetStyle.labelStyle,
    fill: 'currentColor',
    display: hideLabel ? 'none' : '',
  };

  const lastTick = ticks.length - 1;
  const textElem = useDimensions();
  const textElemWidth = textElem.width ?? 0;

  return (
    <text
      data-testid="x-aix-custom-tick-label"
      ref={textElem.observe as React.LegacyRef<SVGTextElement>}
      x={
        middleAlign
          ? x - textElemWidth / 2
          : index === 0
            ? x - 2
            : x - (index === lastTick ? textElemWidth - 1 : textElemWidth / 2)
      }
      y={y + widgetStyle.xSpaceBetweenTickAndLabel}
      style={style}
    >
      {showAllLabel ? text : getText(text, index)}
    </text>
  );
};

export default CustomTickLabel;
