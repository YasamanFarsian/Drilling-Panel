import { Box } from '@mui/material';
import React from 'react';
import { MapKeyType } from '@dt-advisory/helpers/keyId';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetTemplate from '../WidgetTemplate';
import { containerStyle } from './OneRowFourWidgetsTemplate.style';

const isRowTwo = (index: number) => (index === 2 ? '1' : '2');

export type OneRowFourWidgetsTemplatePropsType = {
  onSelectWidget: (selectingWidgetIdx: number) => void;
  isEditable: boolean;
  widgetsToLoad: MapKeyType<WidgetsLoaderEnum>[];
  onRemoveWidget: (widgetToLoadIdx: number) => void;
};

const OneRowFourWidgetsTemplate = ({
  onSelectWidget,
  isEditable,
  widgetsToLoad,
  onRemoveWidget,
}: OneRowFourWidgetsTemplatePropsType): JSX.Element => {
  return (
    <div data-testid="one_row_four_widgets_template_1677053415513" css={containerStyle}>
      {widgetsToLoad.map((widget, widgetsToLoadIdx) => (
        <Box
          key={widget.key}
          gridRow={widgetsToLoadIdx < 2 ? '1/3' : isRowTwo(widgetsToLoadIdx)}
          data-testid={`one_row_four_widgets_template--widget${widgetsToLoadIdx}`}
          onClick={() => isEditable && onSelectWidget(widgetsToLoadIdx)}
        >
          <WidgetTemplate
            widgetKey={widget.value}
            smallWidget={widgetsToLoadIdx >= 2}
            isEditable={isEditable}
            onRemoveWidget={() => onRemoveWidget(widgetsToLoadIdx)}
          />
        </Box>
      ))}
    </div>
  );
};

export default OneRowFourWidgetsTemplate;
