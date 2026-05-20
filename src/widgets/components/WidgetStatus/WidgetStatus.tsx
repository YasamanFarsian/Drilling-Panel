import React from 'react';
import { useIntl } from 'react-intl';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { WidgetStatusEnum } from '../BaseWidget';
import { containerStyle, textStyle, wrapperStyle } from './WidgetStatus.style';

export type WidgetStatusPropsType = {
  label: WidgetStatusEnum;
  widgetLabel?: WidgetsLoaderEnum;
};

const WidgetStatus = ({ label, widgetLabel }: WidgetStatusPropsType): JSX.Element => {
  const { formatMessage } = useIntl();
  if (WidgetStatusEnum.ACTIVE === label || WidgetStatusEnum.UNREADY === label) return <></>;

  const marginStyle = { margin: 0 };

  return (
    <div data-testid={`widget_status_${widgetLabel}`} css={wrapperStyle} style={{ ...marginStyle }}>
      <div css={containerStyle}>
        <div css={textStyle}>{formatMessage({ id: `widget.status.${label}` })}</div>
      </div>
    </div>
  );
};

export default WidgetStatus;
