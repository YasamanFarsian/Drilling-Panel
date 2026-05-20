import { useScalingSize } from './useScalingSize';

export const useEmseScalingSize = (): string => {
  return useScalingSize({
    default: '10 35 440 520',
    xtra: '20 35 380 560',
    biggest: '20 35 440 560',
    macResolution: '20 25 390 562',
  });
};
