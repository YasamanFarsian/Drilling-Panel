import { SECOND } from '@dt-advisory/helpers/constants';

export const calculationDuration = (text: string) => {
  const defaultWord = 3;
  const defaultDuration = 3 * SECOND;
  const maximumDuration = 10 * SECOND;
  const durationEachWord = 0.25 * SECOND;
  const words = text.split(' ');

  const durationTime =
    words.length > defaultWord
      ? (words.length - defaultWord) * durationEachWord + defaultDuration
      : defaultDuration;
  return durationTime >= maximumDuration ? maximumDuration : durationTime;
};
