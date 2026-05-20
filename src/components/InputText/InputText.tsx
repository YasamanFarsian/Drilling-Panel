/* eslint-disable max-lines-per-function */
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { inputAdornmentStyle, textFieldStyle } from './InputText.style';

type InputTextValueType = string | number;
export type InputTextPropsType<T extends InputTextValueType> = {
  name: string;
  maxWidth?: number | string;
  value: T;
  onChange: (value: T) => void;
  type?: 'text' | 'number';
  includeNumberStep?: boolean;
  endAdornment?: string;
  placeholder?: string;
  viewportUnit?: boolean;
  isSmallVersion?: boolean;
};

const InputText = <T extends InputTextValueType>({
  maxWidth,
  name,
  includeNumberStep,
  onChange,
  type,
  value,
  endAdornment,
  placeholder,
  viewportUnit = false,
  isSmallVersion = false,
}: InputTextPropsType<T>): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = 'number' === type ? event.target.valueAsNumber : event.target.value;
    onChange(v as T);
  };
  return (
    <Box data-testid="input_text_1676555561126" maxWidth={maxWidth}>
      <TextField
        role="textField"
        fullWidth
        css={textFieldStyle(viewportUnit, isSmallVersion)}
        name={name}
        onChange={handleOnChange}
        value={value}
        type={type ?? 'text'}
        inputProps={{
          autoComplete: 'off',
          step: includeNumberStep && 'number' === type ? '.01' : undefined,
        }}
        InputProps={{
          endAdornment: endAdornment ? (
            <InputAdornment position="end">
              <Typography css={inputAdornmentStyle}>{endAdornment}</Typography>
            </InputAdornment>
          ) : undefined,
          style: {
            height: !isSmallVersion ? 'inherit' : '22px',
          },
        }}
        placeholder={placeholder}
      />
    </Box>
  );
};

export default InputText;
