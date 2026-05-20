/* eslint-disable complexity */
import { useTheme } from '@emotion/react';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';
import StyledScrollbar from '@dt-advisory/components/StyledScrollbar';
import {
  WidgetConfigType,
  WidgetsLoaderEnum,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { IMG_SRC_MAPPINGS } from '../../../WidgetTemplate';
import {
  widgetCaptionStyle,
  widgetCatalogContainerStyle,
  widgetItemStyle,
} from './WidgetCatalog.style';

const ALWAYS_ENABLED_WIDGET = [WidgetsLoaderEnum.RoadmapDrag, WidgetsLoaderEnum.RoadmapTorque];

export type WidgetCatalogPropsType = {
  smallWidgetMode: boolean;
  largeWidgetMode: boolean;
  currentWidget: WidgetsLoaderEnum;
  selectedWidgets: WidgetsLoaderEnum[];
  widgets: WidgetConfigType[];
  selectingWidget: WidgetsLoaderEnum;
  onSelect: (widgetKey: WidgetsLoaderEnum) => void;
};

// eslint-disable-next-line max-lines-per-function
const WidgetCatalog = ({
  smallWidgetMode,
  largeWidgetMode,
  currentWidget,
  selectedWidgets,
  widgets,
  selectingWidget,
  onSelect,
}: WidgetCatalogPropsType): JSX.Element => {
  const theme = useTheme();
  const { formatMessage } = useIntl();

  return (
    <StyledScrollbar css={widgetCatalogContainerStyle} data-testid="widget_catalog_1678936303802">
      {widgets
        .filter((x) => (smallWidgetMode ? x.widgetConfig?.hasSmallVersion : x))
        .filter((x) => (largeWidgetMode ? x.widgetConfig?.hasLargeVersion : x))
        // eslint-disable-next-line max-lines-per-function
        .map((widget) => {
          const highlightWidget = selectingWidget === widget.key;
          const isCurrentWidget = currentWidget === widget.key;
          const disabledWidget =
            !isCurrentWidget &&
            !highlightWidget &&
            selectedWidgets.includes(widget.key) &&
            !ALWAYS_ENABLED_WIDGET.includes(widget.key);

          return (
            <div
              data-testid={`widget_catalog--widgetItem${widget.key}`}
              key={widget.key}
              css={widgetItemStyle}
              className={clsx(disabledWidget && 'disabledItem')}
              onClick={() => onSelect(widget.key)}
            >
              <div className={clsx('imgContainer', smallWidgetMode && 'smallImg')}>
                {highlightWidget && (
                  <div data-testid="widget_catalog--selectingItem" className="selectingItem" />
                )}
                {widget.key !== WidgetsLoaderEnum.Unsettled && (
                  <img
                    src={
                      IMG_SRC_MAPPINGS[theme.mode][widget.key][smallWidgetMode ? 'small' : 'large']
                    }
                    alt={`${widget.key} image`}
                  />
                )}
              </div>
              <span css={widgetCaptionStyle}>
                {formatMessage({
                  id: `userConfiguration.settings.templatesLayout.widgetLabel.${widget.key}`,
                  defaultMessage: widget.key,
                })}
              </span>
            </div>
          );
        })}
    </StyledScrollbar>
  );
};

export default WidgetCatalog;
