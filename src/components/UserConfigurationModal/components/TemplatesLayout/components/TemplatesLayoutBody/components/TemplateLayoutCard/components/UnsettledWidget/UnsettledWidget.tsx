import { useTheme } from '@emotion/react';
import React from 'react';
import PlusWithCircleDarkIcon from '@dt-advisory/assets/svgs/templateLayout/plus-with-circle-dark.svg?react';
import PlusWithCircleLightIcon from '@dt-advisory/assets/svgs/templateLayout/plus-with-circle-light.svg?react';
import { containerStyle } from './UnsettledWidget.style';

const UnsettledWidget = ({ isEditable }: { isEditable: boolean }): JSX.Element => {
  const theme = useTheme();
  return (
    <div data-testid="unsettled_widget_1677041721300" css={containerStyle(isEditable)}>
      {isEditable &&
        (theme.mode === 'dark' ? (
          <PlusWithCircleDarkIcon data-testid="unsettled_widget--plusIconDark" />
        ) : (
          <PlusWithCircleLightIcon data-testid="unsettled_widget--plusIconLight" />
        ))}
    </div>
  );
};

export default UnsettledWidget;
