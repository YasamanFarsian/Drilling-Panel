import { useTheme } from '@mui/styles';
import React from 'react';
import { VictoryScatter } from 'victory';
import { BaseDataValue } from '../../EcdTypes';
import { downholeMwdEcdColorOuter } from './DownholeMwdEcd.style';

export type DownholeMwdEcdPropsType = {
  data: BaseDataValue[];
  name?: string;
};

export const DownholeMwdEcdElement = (props: any) => {
  const theme = useTheme();
  const outerLine = downholeMwdEcdColorOuter(theme.mode);
  return (
    <svg x={props.x} y={props.y}>
      <circle cx={5} cy={5} r={4} stroke={outerLine.data.fill} strokeWidth="2" fill="none" />
    </svg>
  );
};

const DownholeMwdEcd = ({ data, ...props }: DownholeMwdEcdPropsType): JSX.Element => {
  return <VictoryScatter {...props} data={data} dataComponent={<DownholeMwdEcdElement />} />;
};

export default DownholeMwdEcd;
