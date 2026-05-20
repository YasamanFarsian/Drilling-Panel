import { TimerState } from '@dt-advisory/helpers/noStreamingTimer';
import WidgetTimer from '@dt-advisory/widgets/components/WidgetTimer';
import React from 'react';
import useIsSingleWidget from '../../../../hooks/useIsSingleWidget';
import {
  borderlineStyle,
  containerTitleStyle,
  limitsStyle,
  maxStyleLabel,
  minmaxStyle,
  minStyleLabel,
  titleLimitsStyle,
} from './CategoryTitle.style';

export type CategoryTitleProps = {
  label?: string;
  maxLabel?: string;
  minLabel?: string;
  timer?: TimerState;
};
const CategoryTitle: React.FC<CategoryTitleProps> = ({
  label,
  maxLabel = 'max.',
  minLabel = 'min.',
  timer,
}) => {
  const isSingleWidget = useIsSingleWidget();

  return (
    <div css={containerTitleStyle}>
      {label && (
        <div css={limitsStyle}>
          <div css={titleLimitsStyle(isSingleWidget)}>
            {label}
            {label === 'Halliburton Limit' && timer?.state && (
              <WidgetTimer label="halliburtonLimit" timestamp={timer?.timestamp} />
            )}
          </div>
          {label !== 'Measured Value' && (
            <div css={minmaxStyle(isSingleWidget)}>
              <div css={maxStyleLabel}>{maxLabel}</div>
              <div css={borderlineStyle}></div>
              <div css={minStyleLabel}>{minLabel}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryTitle;
