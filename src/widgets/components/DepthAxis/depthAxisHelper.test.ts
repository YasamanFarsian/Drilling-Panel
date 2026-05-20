import {
  ALLOWED_STEPS,
  ONE_TRILLION,
  findNextMultiple,
  getSteps,
  getTickValues,
  tickToShow,
} from './depthAxisHelper';

type ResultInfoType = {
  maxValue: number;
  roundedMaxValue: number;
  penultimate: number;
};
const getTickValuesElements = (values?: Array<number>): ResultInfoType | undefined => {
  if (!values) return;
  const maxValue = values[0];
  const roundedMaxValue = values[1];
  const penultimate = values[2];
  return {
    maxValue,
    roundedMaxValue,
    penultimate,
  };
};
type VerifyResultInfoType = ResultInfoType & {
  currentMaxValue: number;
};
const verifyTickValuesElements = ({
  maxValue,
  roundedMaxValue,
  penultimate,
  currentMaxValue,
}: VerifyResultInfoType) => {
  expect(currentMaxValue).toEqual(maxValue);
  expect(ALLOWED_STEPS.includes(roundedMaxValue - penultimate)).toBeTruthy();
};

describe('depthAxisHelper', () => {
  describe('getTickValues', () => {
    it('should return correct list length', () => {
      const result = getTickValues(false, 6);
      expect(result?.tickValues.length).toEqual(7);
    });
    it('should return correct list length and correct max roudned value and number of steps', () => {
      const result = getTickValues(false, 1200);
      expect(result?.tickValues.length).toEqual(13);
      const resultInfo = getTickValuesElements(result?.tickValues);
      if (resultInfo) {
        verifyTickValuesElements({ ...resultInfo, currentMaxValue: 1200 });
      }
    });
    it('should return correct list length and correct max roudned value and number of steps', () => {
      const result = getTickValues(false, 1744);
      expect(result?.tickValues.length).toEqual(19);
      const resultInfo = getTickValuesElements(result?.tickValues);
      if (resultInfo) {
        verifyTickValuesElements({ ...resultInfo, currentMaxValue: 1744 });
        expect(resultInfo.roundedMaxValue).toEqual(1700);
      }
    });
    it('should return correct list length and correct max value', () => {
      const expectedLen = 11;
      const result = getTickValues(false, 2500);
      expect(result?.tickValues.length).toEqual(expectedLen);
      expect(result?.tickValues[0]).toEqual(2500);
    });
    it('should return correct tick value list for max 4874', () => {
      const result = getTickValues(false, 4874);
      expect(result?.tickValues).toEqual([
        4874, 4750, 4500, 4250, 4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500,
        1250, 1000, 750, 500, 250, 0,
      ]);
    });
    it('should return correct tick value list for max 5006', () => {
      const result = getTickValues(false, 5006);
      expect(result?.tickValues).toEqual([
        5006, 5000, 4500, 4000, 3500, 3000, 2500, 2000, 1500, 1000, 500, 0,
      ]);
    });
    it('should return correct tickValues list for min 4651.869780869174 and max 4654.73460174735', () => {
      const result = getTickValues(false, 4654.73460174735, 4651.869780869174);
      expect(result?.tickValues).toEqual([4654.73460174735, 4654, 4653, 4652, 4651.869780869174]);
    });
    it('should return correct list length and correct max roudned value and number of steps', () => {
      const expectedLen = 20; // 26
      const max = 19000; // 25000
      const result = getTickValues(false, max);
      expect(result?.tickValues.length).toEqual(expectedLen);
      expect(result?.tickValues[0]).toEqual(max);
    });
    it('should return undefined if max is undefined', () => {
      const result = getTickValues(false, undefined as unknown as number);
      expect(result?.tickValues).toBeUndefined();
    });
    it('should return undefined if max is 0', () => {
      const result = getTickValues(false, 0);
      expect(result?.tickValues).toBeUndefined();
    });
    it('should return correct list length and correct max roudned value and number of steps when small version is true', () => {
      const result = getTickValues(true, 599);
      expect(result?.tickValues.length).toEqual(7);
      const resultInfo = getTickValuesElements(result?.tickValues);
      if (resultInfo) {
        verifyTickValuesElements({ ...resultInfo, currentMaxValue: 599 });
        expect(resultInfo.roundedMaxValue).toEqual(500);
      }
    });
    it('should return correct list length and correct min rounded value and number of steps is zooming', () => {
      const result = getTickValues(true, 600, 500);
      expect(result?.tickValues.length).toEqual(3);
    });
    it('should return correct list length and correct min rounded value and number of steps is zooming', () => {
      const result = getTickValues(true, 1600, 1500);
      expect(result?.tickValues.length).toEqual(3);
    });
  });

  describe('getSteps', () => {
    describe('large widget', () => {
      it('should return 1 if input is 1', () => {
        const result = getSteps(false, 1);
        expect(result).toEqual(0.1);
      });
      it('should return 1 if input is 19', () => {
        const result = getSteps(false, 19);
        expect(result).toEqual(1);
      });
      it('should return 5 if input is 20', () => {
        const result = getSteps(false, 20);
        expect(result).toEqual(5);
      });
      it('should return 5 if input is 99', () => {
        const result = getSteps(false, 99);
        expect(result).toEqual(5);
      });
      it('should return 10 if input is 100', () => {
        const result = getSteps(false, 100);
        expect(result).toEqual(10);
      });
      it('should return 10 if input is 199', () => {
        const result = getSteps(false, 199);
        expect(result).toEqual(10);
      });
      it('should return 50 if input is 200', () => {
        const result = getSteps(false, 200);
        expect(result).toEqual(50);
      });
      it('should return 50 if input is 999', () => {
        const result = getSteps(false, 999);
        expect(result).toEqual(50);
      });
      it('should return 100 if input is 1000', () => {
        const result = getSteps(false, 1000);
        expect(result).toEqual(100);
      });
      it('should return 100 if input is 1999', () => {
        const result = getSteps(false, 1999);
        expect(result).toEqual(100);
      });
      it('should return 250 if input is 2000', () => {
        const result = getSteps(false, 2000);
        expect(result).toEqual(250);
      });
      it('should return 250 if input is 4999', () => {
        const result = getSteps(false, 4999);
        expect(result).toEqual(250);
      });
      it('should return 500 if input is 5000', () => {
        const result = getSteps(false, 5000);
        expect(result).toEqual(500);
      });
      it('should return 500 if input is 9999', () => {
        const result = getSteps(false, 9999);
        expect(result).toEqual(500);
      });
      it('should return 1000 if input is 10000', () => {
        const result = getSteps(false, 10000);
        expect(result).toEqual(1000);
      });
      it('should return 1000 if input is infinity', () => {
        const result = getSteps(false, Infinity);
        expect(result).toEqual(ONE_TRILLION);
      });
    });
    describe('small widget', () => {
      it('should return 1 if input is 1', () => {
        const result = getSteps(true, 1);
        expect(result).toEqual(1);
      });
      it('should return 1 if input is 9', () => {
        const result = getSteps(true, 9);
        expect(result).toEqual(1);
      });
      it('should return 5 if input is 10', () => {
        const result = getSteps(true, 10);
        expect(result).toEqual(5);
      });
      it('should return 5 if input is 49', () => {
        const result = getSteps(true, 49);
        expect(result).toEqual(5);
      });
      it('should return 10 if input is 50', () => {
        const result = getSteps(true, 50);
        expect(result).toEqual(10);
      });
      it('should return 10 if input is 99', () => {
        const result = getSteps(true, 99);
        expect(result).toEqual(10);
      });
      it('should return 50 if input is 100', () => {
        const result = getSteps(true, 100);
        expect(result).toEqual(50);
      });
      it('should return 50 if input is 499', () => {
        const result = getSteps(true, 499);
        expect(result).toEqual(50);
      });
      it('should return 100 if input is 500', () => {
        const result = getSteps(true, 500);
        expect(result).toEqual(100);
      });
      it('should return 100 if input is 999', () => {
        const result = getSteps(true, 999);
        expect(result).toEqual(100);
      });
      it('should return 250 if input is 1000', () => {
        const result = getSteps(true, 1000);
        expect(result).toEqual(250);
      });
      it('should return 250 if input is 2499', () => {
        const result = getSteps(true, 2499);
        expect(result).toEqual(250);
      });
      it('should return 500 if input is 2500', () => {
        const result = getSteps(true, 2500);
        expect(result).toEqual(500);
      });
      it('should return 500 if input is 4999', () => {
        const result = getSteps(true, 4999);
        expect(result).toEqual(500);
      });
      it('should return 1000 if input is 5000', () => {
        const result = getSteps(true, 5000);
        expect(result).toEqual(1000);
      });
      it('should return 1000 if input is Infinity', () => {
        const result = getSteps(true, Infinity);
        expect(result).toEqual(ONE_TRILLION);
      });
    });
  });

  describe('findNextMultiple', () => {
    it('should return the next multiple when the input number is not a multiple of the base', () => {
      expect(findNextMultiple(125, 250)).toBe(250);
      expect(findNextMultiple(449, 250)).toBe(500);
    });

    it('should return the next multiple when the input number is a multiple of the base', () => {
      expect(findNextMultiple(500, 500)).toBe(1000);
      expect(findNextMultiple(1000, 500)).toBe(1500);
    });

    it('should return the next multiple when the input number is a floating-point number', () => {
      expect(findNextMultiple(4651.869780869174, 1)).toBe(4652);
    });

    it('should return the next multiple when the base is 1', () => {
      expect(findNextMultiple(4651, 1)).toBe(4652);
      expect(findNextMultiple(1, 1)).toBe(2);
    });
  });

  describe('tickToShow', () => {
    it('should return the tick value when steps is undefined', () => {
      expect(tickToShow(5)).toBe(5);
      expect(tickToShow(10)).toBe(10);
    });

    it('should return the tick value when tick is a multiple of steps', () => {
      expect(tickToShow(10, 5)).toBe(10);
      expect(tickToShow(500, 250)).toBe(500);
    });

    it('should return an empty string when tick is not a multiple of steps', () => {
      expect(tickToShow(11, 5)).toBe('');
      expect(tickToShow(499, 250)).toBe('');
    });
  });
});
