/* eslint-disable max-lines, max-lines-per-function, complexity */
import { Menu as DropDownMenu, MenuItem as DropDownMenuItem } from '@mui/material';
import { useTheme } from '@mui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import { DropDownType } from '@dt-advisory/widgets/components/BaseWidget';
import {
  dropDownMenuItemStyle,
  dropDownMenuStyle,
  fillStyle,
  menuItemStyle,
  svgIconStyle,
} from './DropDown.style';
import { getCurrentList } from './DropDownHelper';
import { IconButton, ArrowDown, ArrowUp } from '@dt-advisory/shared/ui/Icon';
import { createIconSizes } from '../../shared/headerIconSizes';

const arrowColors = {
  light: '#1C1C1A',
  dark: 'white',
};

export type DropDownPropsType = {
  type: DropDownType;
  widgetName?: WidgetsLoaderEnum;
};

const DropDown = ({ type, widgetName }: DropDownPropsType): JSX.Element => {
  const theme = useTheme();

  const list = getCurrentList(theme.mode);
  const currentList = list[type as keyof typeof list];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pos, setPos] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setPos({ x: event.clientX, y: event.clientY });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton data-testid={`${widgetName}-dropdown`} onClick={handleClick}>
        <ArrowDown
          style={{ color: arrowColors[theme.mode], ...createIconSizes().style }}
          className={createIconSizes().className}
        />
      </IconButton>
      <DropDownMenu
        css={dropDownMenuStyle}
        anchorEl={anchorEl}
        //getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorPosition={{
          top: pos.y - 20,
          left: pos.x + 30,
        }}
        anchorReference="anchorPosition"
      >
        {[{ name: 'Dropdown', svgIcon: null }, ...currentList].map((x, index) => (
          <div key={x.name}>
            {index === 0 && (
              <DropDownMenuItem css={dropDownMenuItemStyle} onClick={handleClose}>
                <div css={menuItemStyle}>
                  <div css={fillStyle}></div>
                  <IconButton>
                    <ArrowUp
                      style={{ color: arrowColors[theme.mode], ...createIconSizes().style }}
                      className={createIconSizes().className}
                    />
                  </IconButton>
                </div>
              </DropDownMenuItem>
            )}
            {index > 0 && (
              <DropDownMenuItem
                data-testid={`${widgetName}-dropdown-${x.name}`}
                css={dropDownMenuItemStyle}
                onClick={handleClose}
              >
                <div css={menuItemStyle}>
                  <div css={svgIconStyle}>{x.svgIcon}</div>
                  <div>
                    <FormattedMessage id={x.name} />
                  </div>
                </div>
              </DropDownMenuItem>
            )}
          </div>
        ))}
      </DropDownMenu>
    </>
  );
};

export default DropDown;
