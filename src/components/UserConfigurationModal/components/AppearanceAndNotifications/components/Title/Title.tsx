import { Typography } from '@mui/material';
import React from 'react';
import { titleStyle } from './Title.style';

export type TitlePropsType = {
  value: string;
  uppercase?: boolean;
};

const Title = ({ uppercase, value }: TitlePropsType): JSX.Element => {
  return (
    <Typography css={titleStyle({ uppercase })} data-testid="title_1676546212865">
      {value}
    </Typography>
  );
};

export default Title;
