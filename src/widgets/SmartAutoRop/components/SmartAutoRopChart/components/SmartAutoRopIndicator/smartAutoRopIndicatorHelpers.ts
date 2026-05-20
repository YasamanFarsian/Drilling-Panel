import { IndicatorDataType } from '../../SmartAutoRopChart';

// eslint-disable-next-line complexity
export const getIndicatorIconRotateAngle = (datum: IndicatorDataType) => {
  switch (datum.dataKey) {
    case 'ROP':
      return datum.y > 0.5 ? 0 : 180;
    case 'RPM':
      return datum.x > 0.5 ? 90 : 270;
    case 'WOB':
      return datum.y < -0.5 ? 180 : 0;
    case 'FlowRate':
      return datum.x < -0.5 ? 270 : 90;
    default:
      return 0;
  }
};
