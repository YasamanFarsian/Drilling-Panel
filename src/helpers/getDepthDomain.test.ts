import { getDepthDomain } from './getDepthDomain';

describe('Help getDepthDomain', () => {
  it('getDepthDomain ZOOM OUT should return proper values', () => {
    const data = getDepthDomain['out'](1);
    expect(data.length).toEqual(2);
    expect(data[1]).toEqual(1);
  });
  it('getDepthDomain ZOOM IN should return proper values', () => {
    const data = getDepthDomain['in'](2, 3);
    expect(data.length).toEqual(2);
  });
});
