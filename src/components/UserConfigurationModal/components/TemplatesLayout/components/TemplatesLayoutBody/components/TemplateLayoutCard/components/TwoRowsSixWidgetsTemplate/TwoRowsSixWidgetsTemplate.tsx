/* eslint-disable complexity */
import { Box } from '@mui/material';
import React from 'react';
import { MapKeyType } from '@dt-advisory/helpers/keyId';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import WidgetTemplate from '../WidgetTemplate';
import { containerStyle } from './TwoRowsSixWidgetsTemplate.style';

export type TwoRowsSixWidgetsTemplatePropsType = {
  onSelectWidget: (selectingWidgetIdx: number) => void;
  isEditable: boolean;
  widgetsToLoad: MapKeyType<WidgetsLoaderEnum>[];
  onRemoveWidget: (widgetToLoadIdx: number) => void;
};

const TwoRowsSixWidgetsTemplate = ({
  onSelectWidget,
  isEditable,
  widgetsToLoad,
  onRemoveWidget,
}: TwoRowsSixWidgetsTemplatePropsType): JSX.Element => {
  return (
    <div data-testid="two_rows_six_widgets_template_1677057631733" css={containerStyle}>
      {widgetsToLoad.map((widget, widgetsToLoadIdx) => (
        <Box
          key={widget.key}
          data-testid={`two_rows_six_widgets_template--widget${widgetsToLoadIdx}`}
          onClick={() => isEditable && onSelectWidget(widgetsToLoadIdx)}
        >
          <WidgetTemplate
            widgetKey={widget.value}
            smallWidget={true}
            isEditable={isEditable}
            onRemoveWidget={() => onRemoveWidget(widgetsToLoadIdx)}
          />
        </Box>
      ))}
    </div>
  );
};

export default TwoRowsSixWidgetsTemplate;
