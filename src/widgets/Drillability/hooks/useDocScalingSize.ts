import { useScalingSize } from './useScalingSize';

export const useDocScalingSize = (): string => {
  return useScalingSize({
    default: '20 30 360 462',
    xtra: '20 18 360 480',
    biggest: '20 25 420 472',
    macResolution: '20 40 360 462',
  });
};
