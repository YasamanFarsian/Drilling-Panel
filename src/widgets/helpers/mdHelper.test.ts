import { filterMd, getMdToUseWithPerc } from './mdHelper';

describe('getMdToUseWithPerc', () => {
  it('should return MD', () => {
    const result = getMdToUseWithPerc({ MD: 1, TD: 2 });
    expect(result).toEqual(1);
  });
  it('should return TD', () => {
    const result = getMdToUseWithPerc({ MD: 3, TD: 2 });
    expect(result).toEqual(2);
  });
  it('should return MD with perc', () => {
    const result = getMdToUseWithPerc({ MD: 1, TD: 2, options: { increase: 0.05 } });
    expect(result).toEqual(1.05);
  });
});

const mockedData = [
  {
    md: 1,
    val: 2,
  },
  {
    md: 2,
    val: 2,
  },
  {
    md: 3,
    val: 2,
  },
];
const mockedData2 = [
  {
    min: {
      md: 1,
      val: 3,
    },
  },
  {
    min: {
      md: 2,
      val: 3,
    },
  },
  {
    min: {
      md: 3,
      val: 3,
    },
  },
];
const mockedData3 = [
  {
    Md: undefined,
    val: 2,
  },
  {
    Md: 2,
    val: 2,
  },
  {
    Md: 3,
    val: 2,
  },
];
describe('filterMd', () => {
  it('should return list of values', () => {
    const result = filterMd({ data: mockedData, max: 4 });
    expect(result.length).toEqual(3);
  });
  it('should return list of values', () => {
    const result = filterMd({ data: mockedData, max: 2 });
    expect(result.length).toEqual(2);
  });
  it('should return list of values', () => {
    const result = filterMd({ data: mockedData2, max: 2 });
    expect(result.length).toEqual(2);
  });
  it('should return list of values', () => {
    const result = filterMd({ data: mockedData3, max: 2 });
    expect(result.length).toEqual(1);
  });
});
