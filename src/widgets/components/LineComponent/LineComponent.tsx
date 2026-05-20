import React from 'react';
import { VictoryLine, VictoryLineProps } from 'victory';

type LineComponentPropsType = VictoryLineProps;

const LineComponent = (props: LineComponentPropsType) => {
  return <VictoryLine groupComponent={<g className={props.name} />} {...props} />;
};

export default LineComponent;
