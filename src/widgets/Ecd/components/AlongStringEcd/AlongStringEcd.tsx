/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryScatter } from 'victory';
import { BaseDataValue } from '../../EcdTypes';
import { alongStringEcdElementColor } from './AlongStringEcd.style';

export type AlongStringEcdPropsType = {
  data: BaseDataValue[];
  name?: string;
};

export const AlongStringEcdElement = (props: any) => {
  const theme = useTheme();
  const alongStringFill = alongStringEcdElementColor(theme.mode);

  return (
    <svg x={props.x} y={props.y}>
      <circle cx={5} cy={5} r={4} fill={alongStringFill.data.fill} />
    </svg>
  );
};
const AlongStringEcd = ({ data, ...props }: AlongStringEcdPropsType): JSX.Element | null => {
  return <VictoryScatter {...props} data={data} dataComponent={<AlongStringEcdElement />} />;
};

export default AlongStringEcd;
