/* eslint-disable max-lines-per-function, complexity */
import { useBaseWidget } from '@dt-advisory/providers/BaseWidget';
import BaseWidgetProvider from '@dt-advisory/providers/BaseWidget/BaseWidget';

import { WidgetsEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { StyleFunction } from '@dt-advisory/styles/theme';
import { Box, BoxProps, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import useDimensions from 'react-cool-dimensions';
import AxisLabelToggle from '../AxisLabelToggle';
import DropDown from '../DropDown';
import Settings from '../Settings';
import WidgetStatus from '../WidgetStatus';
import Zoomer from '../Zoomer';
import {
  contentStyle,
  headerWrapperStyle,
  paperStyle,
  rootStyle,
  widgetContentStyle,
} from './BaseWidget.style';
import SettingsHeader from './components/SettingsHeader';
import TitleTag, { TitleTagPropsType } from './components/TitleTag';
import { useWidgetSetting } from './useWidgetSetting';

type ContentProps = BoxProps & {
  hideLabel?: boolean;
  horizontalFluid?: boolean;
  isSmartRopSetting?: boolean;
};

export function Content({ hideLabel, horizontalFluid, isSmartRopSetting, ...props }: ContentProps) {
  const { setDimension, isResizing } = useBaseWidget();
  const { observe, width, height } = useDimensions();

  useEffect(() => {
    if (width && height)
      setDimension({
        width: width,
        height: height,
      });
  }, [width, height]);

  return (
    <div css={contentStyle}>
      {!isResizing && (
        <Box
          flexGrow={1}
          {...props}
          ref={observe}
          css={widgetContentStyle(horizontalFluid, hideLabel, isSmartRopSetting)}
        />
      )}
    </div>
  );
}

export type SettingsType =
  | 'safeguards'
  | 'smartAutoRop'
  | 'roadmapDrag'
  | 'roadmapTorque'
  | 'sekalHalliburtonlimit';

export type DropDownType =
  | 'ecd'
  | 'cutting'
  | 'wellbore'
  | 'transientmechanicaldrag'
  | 'transientmechanicaltorque'
  | 'roadmapDrag'
  | 'roadmapTorque';

export enum WidgetStatusEnum {
  UNREADY = 'unready',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export type BaseWidgetPropsType = {
  name?: WidgetsLoaderEnum;
  widgetStatus?: WidgetStatusEnum;
  className?: string;
  widgetId?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  dropdown?: DropDownType;
  settings?: SettingsType;
  zoomer?: string;
  axisLabelToggle?: string;
  label?: WidgetsEnum;
  css?: StyleFunction;
  hideLabel?: boolean;
  horizontalFluid?: boolean;
  titleTag?: TitleTagPropsType;
  widgetValidity?: string;
};

const BaseWidget = ({
  name,
  widgetStatus: status = WidgetStatusEnum.ACTIVE,
  widgetValidity,
  title,
  subtitle,
  children,
  className,
  dropdown,
  settings,
  zoomer,
  axisLabelToggle,
  label,
  css,
  hideLabel,
  widgetId,
  titleTag,
  horizontalFluid = false,
}: PropsWithChildren<BaseWidgetPropsType>): JSX.Element => {
  const theme = useTheme();
  const { isOpenWidgetSetting, handleCloseSetting, handleOpenSetting } = useWidgetSetting({
    settingType: settings,
    widgetId,
  });

  return (
    <div data-testid={`baseWidget_${name}`} css={[paperStyle, css]} className={className}>
      <div css={rootStyle}>
        <div css={headerWrapperStyle}>
          {settings && isOpenWidgetSetting ? (
            <SettingsHeader onClose={handleCloseSetting} type={settings} />
          ) : (
            <header className={name}>
              <div className="titleWrapper">
                <div className="titleLabels">
                  <Typography variant="h5">{title}</Typography>
                  {widgetValidity && <span css={widgetValidity}>{widgetValidity}</span>}
                  {titleTag && <TitleTag {...titleTag} />}
                </div>

                <WidgetStatus label={status} />
                <div className={'flex items-center ml-1'}>
                  {zoomer && <Zoomer widgetId={widgetId} zoomer={zoomer} widgetName={name} />}
                  {axisLabelToggle && <AxisLabelToggle type={axisLabelToggle} />}
                  {settings && <Settings onClick={handleOpenSetting} />}
                  {dropdown && <DropDown widgetName={name} type={dropdown} />}
                </div>
              </div>
              {subtitle && <Box height="1.25rem">{subtitle}</Box>}
            </header>
          )}
        </div>
      </div>
      <Content
        hideLabel={hideLabel}
        horizontalFluid={horizontalFluid}
        isSmartRopSetting={settings === 'smartAutoRop' && isOpenWidgetSetting}
      >
        {children}
      </Content>
    </div>
  );
};

const WrappedBaseWidget = (props: PropsWithChildren<BaseWidgetPropsType>) => {
  return (
    <BaseWidgetProvider>
      <BaseWidget {...props} />
    </BaseWidgetProvider>
  );
};

export default WrappedBaseWidget;
