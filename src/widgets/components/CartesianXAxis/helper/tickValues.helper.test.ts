import { sample } from '@dt-advisory/helpers/tests/mockedData/xaxis/dataSamples';
import { getTickValues } from './tickValues.helper';

const processSample = () => {
  const lines = sample.split('\n');
  const main: Array<string[]> = [];
  lines.forEach((x) => {
    main.push(x.split(','));
  });
  return main;
};

const processedSample = processSample();
const numOfTicks = 5;

describe('getTickValues', () => {
  it('should return correct tick values with numOfTicks of 5', () => {
    processedSample.forEach((line) => {
      const min = Number(line[0]);
      const max = Number(line[1]);
      const expectedTickValues = line.slice(2);
      const result = getTickValues({
        min,
        max,
        numOfTicks,
      });
      expect(result.tickValuesAsString).toEqual(expectedTickValues);
      expect(result.tickValuesAsString.length).toEqual(numOfTicks);
    });
  });
  it('should return correct number of ticks if it is even', () => {
    const result = getTickValues({
      min: 0,
      max: 10,
      numOfTicks: 4,
    });
    expect(result.tickValuesAsString.length).toEqual(4);
  });
});
