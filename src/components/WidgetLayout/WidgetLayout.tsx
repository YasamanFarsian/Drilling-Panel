/* eslint-disable max-lines-per-function, complexity */
import { WidgetLayoutEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { Box } from '@mui/material';
import React from 'react';
import { layoutStyle } from './WidgetLayout.style';

export type WidgetLayoutPropsType = {
  layout: WidgetLayoutEnum;
  children: React.ReactNode;
};

const WidgetLayout = ({ children, layout }: WidgetLayoutPropsType): JSX.Element => {
  return (
    <Box css={layoutStyle(layout)} data-testid="widget_layout">
      {layout === WidgetLayoutEnum.OneRowFourWidgets && Array.isArray(children) && (
        <div className="container">
          <div className="one">{children[0]}</div>
          <div className="two">{children[1]}</div>
          <div className="three">
            {children[2]}
            {children[3]}
          </div>
        </div>
      )}
      {layout === WidgetLayoutEnum.OneRowFiveWidgets && Array.isArray(children) && (
        <div className="container">
          <div className="one">{children[0]}</div>
          <div className="two">
            {children[1]}
            {children[3]}
          </div>
          <div className="three">
            {children[2]}
            {children[4]}
          </div>
        </div>
      )}
      {layout === WidgetLayoutEnum.TwoRowsSixWidgets && Array.isArray(children) && (
        <div className="container">
          <div className="one">
            {children[0]}
            {children[3]}
          </div>
          <div className="two">
            {children[1]}
            {children[4]}
          </div>
          <div className="three">
            {children[2]}
            {children[5]}
          </div>
        </div>
      )}
    </Box>
  );
};

export default WidgetLayout;
