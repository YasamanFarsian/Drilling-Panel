import React from 'react';
import { useTimer } from '@dt-advisory/hooks/useTimer';
import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { SafeguardType } from '@dt-advisory/widgets/Safeguards/SafeguardTypes';
import { OrchestrationType } from '@dt-advisory/widgets/SekalHalliburtonLimit/SekalHalliburtonLimitTypes';
import { SignalIcon } from '@dt-advisory/shared/ui/Icon';
import { createIconSizes } from '@dt-advisory/widgets/shared/headerIconSizes';
import { useTheme } from '@mui/styles';

export type WidgetTimerPropsType = {
  timestamp?: Date;
  label?: SafeguardType | WidgetsEnum | OrchestrationType;
};

const timerColor = {
  light: '#DF2536',
  dark: '#FF5968',
};
const timerBg = {
  light: '#FFFFFF',
  dark: '#292929',
};

const WidgetTimer = ({ timestamp, label }: WidgetTimerPropsType): JSX.Element => {
  const theme = useTheme();
  const watch = useTimer(timestamp);

  const advStyles = { margin: 0 };

  return (
    <div
      data-testid={`widgetTimer_${label}_noConnection`}
      className="flex justify-center items-center border border-solid rounded-[4px] relative leading-none py-0.5 px-1 base:pl-2 base:pr-2.5"
      style={{
        ...advStyles,
        backgroundColor: timerBg[theme.mode],
        borderColor: timerColor[theme.mode],
      }}
    >
      <span>
        <SignalIcon
          className={(createIconSizes().className, 'mr-1')}
          style={{ color: timerColor[theme.mode], ...createIconSizes().style }}
        />
      </span>
      <div
        style={{ color: timerColor[theme.mode], ...advStyles }}
        className="text-[8px] hd:text-[10px] qhd:text-xs font-500 leading-none"
      >
        {`${watch.hours}:${watch.minutes}:${watch.seconds}`}
      </div>
    </div>
  );
};

export default WidgetTimer;
