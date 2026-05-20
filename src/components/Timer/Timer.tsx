/* eslint-disable max-lines-per-function, complexity */
import React from 'react';
import { useTimer } from '@dt-advisory/hooks/useTimer';
import { containerStyle, labelContainerStyle, labelStyle, trapezoidStyle } from './Timer.style';

export type TimerPropsType = {
  active?: boolean;
  timestamp?: Date;
};

const Timer = ({ timestamp }: TimerPropsType): JSX.Element => {
  const watch = useTimer(timestamp);

  return (
    <div data-testid="at_main_noConnection" css={containerStyle} className="at_main_noConnection">
      <div css={trapezoidStyle} />
      <div css={labelContainerStyle}>
        <div css={labelStyle}>NO CONNECTION</div>
        <div css={labelStyle}>{`${watch.hours}:${watch.minutes}:${watch.seconds}`}</div>
      </div>
    </div>
  );
};

export default Timer;
