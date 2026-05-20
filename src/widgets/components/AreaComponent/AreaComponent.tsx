import React from 'react';
import { VictoryAreaProps, VictoryContainer } from 'victory';
import GradientArea, { GradientAreaPropsType } from '@dt-advisory/widgets/components/GradientArea';

export type AreaComponentPropsType = VictoryAreaProps & {
  gradientConfig: GradientAreaPropsType;
  inactive?: boolean;
};

const AreaComponent = ({ gradientConfig, ...props }: AreaComponentPropsType) => {
  return <GradientArea {...props} {...gradientConfig} />;
};
export default AreaComponent;
