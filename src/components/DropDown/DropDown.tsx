/* eslint-disable complexity */
/* eslint-disable max-lines-per-function */
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box, CircularProgress, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import React, { useState } from 'react';
import {
  containerStyle,
  iconStyle,
  menuStyle,
  placeHolderStyle,
  selectStyle,
} from './DropDown.style';

const KeyArrowIconComponent = <T extends string>(props: SelectProps<T>) => (
  <KeyboardArrowDownRoundedIcon className={props.className} css={iconStyle} />
);

export type Option<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
};
export type DropDownPropsType<T extends string> = {
  options: Option<T>[];
  placeHolder?: string;
  value: T;
  name: string;
  disabled?: boolean;
  isLoading?: boolean;
  clearValue?: boolean;
  clearValueLabel?: string;
  onChange: (event: SelectChangeEvent<T>) => void;
  viewportUnit?: boolean;
};

const DropDown = <T extends string>({
  options,
  placeHolder,
  onChange,
  value,
  name,
  disabled,
  isLoading,
  clearValue,
  clearValueLabel,
  viewportUnit = false,
}: DropDownPropsType<T>): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const isSelected = value !== '';
  return (
    <Box data-testid="dropdown_component" css={containerStyle}>
      <Select
        css={selectStyle(viewportUnit)}
        fullWidth
        IconComponent={KeyArrowIconComponent}
        displayEmpty
        open={open}
        onOpen={() => setOpen(true)}
        onClose={handleClose}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        style={{ borderRadius: '0.8rem' }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          marginThreshold: 0,
          sx: {
            '& > .MuiPaper-root > ul': {
              py: 0,
            },
          },
        }}
      >
        {placeHolder && !isSelected && (
          <MenuItem disabled value="" css={menuStyle(false)}>
            <span css={placeHolderStyle}>{placeHolder}</span>
          </MenuItem>
        )}

        {clearValue && isSelected && (
          <MenuItem value="" css={menuStyle(false)}>
            <span>{clearValueLabel}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            css={menuStyle(option?.isSelected)}
          >
            {option.label}
          </MenuItem>
        ))}
        {isLoading && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress aria-label="loading" size={20} />
          </Box>
        )}
      </Select>
    </Box>
  );
};

export default DropDown;
