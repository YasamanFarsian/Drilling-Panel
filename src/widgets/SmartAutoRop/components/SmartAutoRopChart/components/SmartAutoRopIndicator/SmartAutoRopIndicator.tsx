import { useTheme } from '@emotion/react';
import React from 'react';
import { isUndefined } from '@dt-advisory/helpers/isUndefined';
import { SmartRopDataKeyType } from '@dt-advisory/widgets/SmartAutoRop/SmartAutoRopTypes';
import { IndicatorDataType } from '../../SmartAutoRopChart';
import { getIndicatorIconRotateAngle } from './smartAutoRopIndicatorHelpers';

export type SmartAutoRopIndicatorPropsType = {
  activeDataKeys: SmartRopDataKeyType[];
  radius: number;
  x?: number;
  y?: number;
  datum?: IndicatorDataType;
};

// eslint-disable-next-line max-lines-per-function, complexity
const SmartAutoRopIndicator = ({
  activeDataKeys,
  radius,
  x,
  y,
  datum,
}: SmartAutoRopIndicatorPropsType): JSX.Element => {
  const theme = useTheme();

  if (isUndefined(x) || isUndefined(y) || isUndefined(datum)) {
    return <></>;
  }

  const dataKey = datum.dataKey;
  const showMatchedTargetIcon = activeDataKeys.includes(dataKey);
  const rotationAngle = getIndicatorIconRotateAngle(datum);

  return (
    <svg
      data-testid={`smart_auto_rop_indicator_${dataKey}`}
      x={x - radius}
      y={y - radius}
      width={radius * 2}
      height={radius * 2}
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16.5" cy="16.5" r="16.5" fill={theme.smartAutoRop.chart.indicatorBg} />
      {showMatchedTargetIcon ? (
        <circle cx="16.5" cy="16.5" r="7" fill={theme.smartAutoRop.chart.indicatorIcon} />
      ) : (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.5841 23.8203C16.1047 23.8203 15.6456 23.6317 15.3113 23.2974L8.32732 16.3134C7.64353 15.6296 7.65905 14.5361 8.36199 13.8709C9.06493 13.2057 10.1891 13.2208 10.8729 13.9046L16.5841 19.6159L22.2953 13.9046C22.9791 13.2208 24.1033 13.2057 24.8062 13.8709C25.5092 14.5361 25.5247 15.6296 24.8409 16.3134L17.8569 23.2974C17.5226 23.6317 17.0635 23.8203 16.5841 23.8203Z"
          fill={theme.smartAutoRop.chart.indicatorIcon}
          transform={`rotate(${rotationAngle},16.5,16.5)`}
        />
      )}
    </svg>
  );
};

export default SmartAutoRopIndicator;
