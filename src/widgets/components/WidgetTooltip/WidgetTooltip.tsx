/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import { Tooltip } from '@dt-advisory/utils/Tooltip';
import { useTheme } from '@mui/styles';
import { VictoryTooltip, VictoryTooltipProps } from 'victory';

const getFixedDatum = (datum: any, digits = 2) => {
  const x = Number(datum.x).toFixed(digits);
  const y = Number(datum.y).toFixed(digits);
  return { x, y };
};

export const getFormattedDatum = (datum: any): string => {
  const { x, y } = getFixedDatum(datum);
  return `${x} ${y}`;
};

type WidgetTooltipProps = VictoryTooltipProps & {
  name: string;
  axisUnitLabel: string;
  depthAxisUnitLabel: string;
  flyoutWidth?: number;
  flyoutHeight?: number;
  datumX?: string;
  datumY?: string;
  withBlueDot?: boolean;
};

const CustomTooltip = ({ withBlueDot = true, ...props }: WidgetTooltipProps) => {
  const BLUE_DOT_OFFSET_X = 6;
  const BLUE_DOT_OFFSET_Y = 6;
  const TOOLTIP_OFFSET_Y = 10;
  const theme = useTheme();
  const { fontSize, color } = theme.common.baseWidget.widgetTooltip;
  const {
    x,
    y,
    flyoutHeight = 75,
    flyoutWidth = 75,
    datum,
    datumX,
    datumY,
    depthAxisUnitLabel,
    axisUnitLabel,
    name,
  } = props;

  if (!datum || !x || !y) {
    return <></>;
  }

  const currentDatum = {
    x: datumX ? datum[datumX] : datum.x,
    y: datumY ? datum[datumY] : datum.y,
  };
  const formattedDatum = getFixedDatum(currentDatum);

  const posX = x - flyoutWidth / 2;
  const posY = y - flyoutHeight - TOOLTIP_OFFSET_Y;

  return (
    <g>
      <foreignObject width={flyoutWidth} height={flyoutHeight} x={posX} y={posY}>
        <Tooltip.Root isStatic>
          <Tooltip.Container>
            <div className="flex" style={{ color, fontSize }}>
              {formattedDatum.x}
              {depthAxisUnitLabel}
            </div>
            <div className="flex" style={{ color, fontSize, fontWeight: 600 }}>
              {name}
            </div>
            <div className="flex" style={{ color, fontSize }}>
              {formattedDatum.y}
              {axisUnitLabel}
            </div>
          </Tooltip.Container>
        </Tooltip.Root>
      </foreignObject>
      {withBlueDot && (
        <svg
          x={x - BLUE_DOT_OFFSET_X}
          y={y - BLUE_DOT_OFFSET_Y}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="8" height="8" rx="4" fill="#2F9ABA" />
          <rect x="1" y="1" width="10" height="10" rx="5" />
        </svg>
      )}
    </g>
  );
};

export const WidgetTooltip = (props: WidgetTooltipProps) => {
  return (
    <VictoryTooltip
      {...props}
      data-testid="widget_tooltip"
      flyoutComponent={<CustomTooltip {...props} />}
      labelComponent={<></>}
    />
  );
};

export default WidgetTooltip;
