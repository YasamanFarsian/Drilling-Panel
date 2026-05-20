import React from 'react';
import { MapKeyType } from '@dt-advisory/helpers/keyId';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetTemplate from '../WidgetTemplate';
import { containerStyle } from './OneRowThreeWidgetsTemplate.style';

export type OneRowThreeWidgetsTemplatePropsType = {
  isEditable: boolean;
  onSelectWidget: (selectingWidgetIdx: number) => void;
  widgetsToLoad: MapKeyType<WidgetsLoaderEnum>[];
  onRemoveWidget: (widgetToLoadIdx: number) => void;
};

const OneRowThreeWidgetsTemplate = ({
  isEditable,
  onSelectWidget,
  widgetsToLoad,
  onRemoveWidget,
}: OneRowThreeWidgetsTemplatePropsType): JSX.Element => {
  return (
    <div data-testid="one_row_three_widgets_template_1676349486075" css={containerStyle}>
      {widgetsToLoad.map((widget, widgetsToLoadIdx) => (
        <div
          key={`widget-${widget.key}`}
          data-testid={`one_row_three_widgets_template--widget${widgetsToLoadIdx}`}
          onClick={() => isEditable && onSelectWidget(widgetsToLoadIdx)}
        >
          <WidgetTemplate
            widgetKey={widget.value}
            isEditable={isEditable}
            onRemoveWidget={() => onRemoveWidget(widgetsToLoadIdx)}
          />
        </div>
      ))}
    </div>
  );
};

export default OneRowThreeWidgetsTemplate;
