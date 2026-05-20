/* eslint-disable complexity */
import { Box } from '@mui/material';
import React from 'react';
import { MapKeyType } from '@dt-advisory/helpers/keyId';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetTemplate from '../WidgetTemplate';
import { containerStyle } from './OneRowFiveWidgetsTemplate.style';

const isLessThan3 = (index: number) => (index < 3 ? '1' : '2');
const isColEven = (index: number) => (index % 2 === 0 ? '3' : '2');

export type OneRowFiveWidgetsTemplatePropsType = {
  onSelectWidget: (selectingWidgetIdx: number) => void;
  isEditable: boolean;
  widgetsToLoad: MapKeyType<WidgetsLoaderEnum>[];
  onRemoveWidget: (widgetToLoadIdx: number) => void;
};

const OneRowFiveWidgetsTemplate = ({
  onSelectWidget,
  isEditable,
  widgetsToLoad,
  onRemoveWidget,
}: OneRowFiveWidgetsTemplatePropsType): JSX.Element => {
  return (
    <div data-testid="one_row_five_widgets_template_1677057560286" css={containerStyle}>
      {widgetsToLoad.map((widget, widgetsToLoadIdx) => (
        <Box
          key={widget.key}
          data-testid={`one_row_five_widgets_template--widget${widgetsToLoadIdx}`}
          gridRow={widgetsToLoadIdx === 0 ? '1/3' : isLessThan3(widgetsToLoadIdx)}
          gridColumn={widgetsToLoadIdx === 0 ? '1/2' : isColEven(widgetsToLoadIdx)}
          onClick={() => isEditable && onSelectWidget(widgetsToLoadIdx)}
        >
          <WidgetTemplate
            widgetKey={widget.value}
            smallWidget={widgetsToLoadIdx !== 0}
            isEditable={isEditable}
            onRemoveWidget={() => onRemoveWidget(widgetsToLoadIdx)}
          />
        </Box>
      ))}
    </div>
  );
};

export default OneRowFiveWidgetsTemplate;
