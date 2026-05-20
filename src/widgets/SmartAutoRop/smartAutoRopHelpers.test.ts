import {
  getActiveDataKeys,
  getSmartAutoRopIndicatorData,
  getSmartRopInfoData,
  validateActiveStatus,
} from './smartAutoRopHelpers'; // Replace with your actual file name
import { ActiveSmartAutoRopType, SmartAutoRopType } from './SmartAutoRopTypes';

const mockApiData: ActiveSmartAutoRopType = {
  operationId: '101',
  lastUpdated: '2023-05-11T07:54:38.2849017Z',
  ropActual: 15,
  ropTarget: 30,
  minRop: 0,
  maxRop: 60,
  rpmActual: 100,
  rpmTarget: 80,
  minRpm: 0,
  maxRpm: 160,
  wobActual: 5.034,
  wobTarget: 10,
  minWob: 0,
  maxWob: 20,
  flowRateActual: 5525.9123,
  flowRateTarget: 4550,
  minFlowRate: 0,
  maxFlowRate: 9100,
  currentTime: '2023-05-11T07:54:38.2849288Z',
  active: true,
  isLive: false,
};

describe('smartAutoRopHelpers', () => {
  describe('validateActiveStatus', () => {
    const validData: SmartAutoRopType = {
      ...mockApiData,
    };

    it('should return true for valid active data', () => {
      expect(validateActiveStatus(validData)).toBe(true);
    });

    it('should return false for inactive data', () => {
      expect(validateActiveStatus({ ...validData, active: false })).toBe(false);
    });

    it('should return false for data with null fields', () => {
      expect(validateActiveStatus({ ...validData, ropActual: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, ropTarget: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, maxRop: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, rpmActual: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, rpmTarget: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, maxRpm: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, wobActual: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, wobTarget: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, maxWob: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, flowRateActual: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, flowRateTarget: null })).toBe(false);
      expect(validateActiveStatus({ ...validData, maxFlowRate: null })).toBe(false);
    });

    it('should return false for null data', () => {
      expect(validateActiveStatus(null)).toBe(false);
    });
  });

  describe('getSmartAutoRopIndicatorData', () => {
    const validData: ActiveSmartAutoRopType = { ...mockApiData, active: true };

    it('should return correct indicator data for valid active data', () => {
      const expectedData = [
        { x: 0, y: validData.ropActual / validData.maxRop, dataKey: 'ROP' },
        { x: validData.rpmActual / validData.maxRpm, y: 0, dataKey: 'RPM' },
        { x: 0, y: -validData.wobActual / validData.maxWob, dataKey: 'WOB' },
        { x: -validData.flowRateActual / validData.maxFlowRate, y: 0, dataKey: 'FlowRate' },
      ];
      expect(getSmartAutoRopIndicatorData(validData)).toEqual(expectedData);
    });

    it('should handle the scenario correctly when the actual value exceeds the max value', () => {
      const expectedIndicatorData = [
        { x: 0, y: 1, dataKey: 'ROP' },
        { x: 1, y: 0, dataKey: 'RPM' },
        { x: 0, y: -1, dataKey: 'WOB' },
        { x: -1, y: 0, dataKey: 'FlowRate' },
      ];

      const result = getSmartAutoRopIndicatorData({
        ...mockApiData,
        active: true,
        ropActual: 50,
        maxRop: 20,
        rpmActual: 60,
        maxRpm: 40,
        wobActual: 70,
        maxWob: 60,
        flowRateActual: 90,
        maxFlowRate: 80,
      });

      expect(result).toEqual(expectedIndicatorData);
    });

    it('should return empty array for inactive data', () => {
      expect(getSmartAutoRopIndicatorData({ ...validData, active: false })).toEqual([]);
    });

    it('should return empty array for null data', () => {
      expect(getSmartAutoRopIndicatorData(null)).toEqual([]);
    });
  });

  describe('getActiveDataKeys', () => {
    it('should returns an empty array if apiData is null', () => {
      const result = getActiveDataKeys(null, 5);
      expect(result).toEqual([]);
    });

    it('should returns an empty array if apiData is considered as inactive', () => {
      const apiData: SmartAutoRopType = {
        ...mockApiData,
        active: false,
      };
      const result = getActiveDataKeys(apiData, 5);
      expect(result).toEqual([]);
    });

    describe('thresholdLimit = 5%', () => {
      it('should returns correct keys when actual values is in the threshold of target values', () => {
        const apiData: SmartAutoRopType = {
          ...mockApiData,
          ropActual: 100,
          ropTarget: 100,
          flowRateActual: 95,
          flowRateTarget: 100,
          wobActual: 105,
          wobTarget: 100,
        };
        const result = getActiveDataKeys(apiData, 5);
        expect(result).toEqual(['ROP', 'FlowRate', 'WOB']);
      });

      it('should not include keys where actual values is not in the threshold of target values', () => {
        const apiData: SmartAutoRopType = {
          ...mockApiData,
          ropActual: 94,
          ropTarget: 100,
          flowRateActual: 106,
          flowRateTarget: 100,
        };
        const result = getActiveDataKeys(apiData, 5);
        expect(result).toEqual([]);
      });
    });

    describe('thresholdLimit = NaN', () => {
      it('should treat thresholdLimit as 0 and return correctKeys when actual values is in the threshold of target values', () => {
        const apiData: SmartAutoRopType = {
          ...mockApiData,
          ropActual: 100,
          ropTarget: 100,
          flowRateActual: 99.999,
          flowRateTarget: 100,
          wobActual: 100.001,
          wobTarget: 100,
        };
        const result = getActiveDataKeys(apiData, NaN);
        expect(result).toEqual(['ROP']);
      });
    });
  });

  describe('getSmartRopInfoData', () => {
    it('should return rounding value to integer for the expected field', () => {
      const expectedResult = {
        ropActual: 10,
        ropTarget: 11,
        flowRateActual: 10,
        flowRateTarget: 11,
        rpmActual: 10,
        rpmTarget: 11,
      };
      const result = getSmartRopInfoData({
        ...mockApiData,
        ropActual: 10.12345,
        ropTarget: 10.62345,
        flowRateActual: 10.12345,
        flowRateTarget: 10.62345,
        rpmActual: 10.12345,
        rpmTarget: 10.62345,
      });
      expect(result?.ropActual).toEqual(expectedResult.ropActual);
      expect(result?.ropTarget).toEqual(expectedResult.ropTarget);
      expect(result?.flowRateActual).toEqual(expectedResult.flowRateActual);
      expect(result?.flowRateTarget).toEqual(expectedResult.flowRateTarget);
      expect(result?.rpmActual).toEqual(expectedResult.rpmActual);
      expect(result?.rpmTarget).toEqual(expectedResult.rpmTarget);
    });

    it('should return wobActual with source data rouding to 1 decimals', () => {
      const result = getSmartRopInfoData({ ...mockApiData, wobActual: 10.67345 });
      expect(result?.wobActual).toEqual(10.7);
    });
    it('should return wobActual with source data rouding to integer if the decimal is 0', () => {
      const result = getSmartRopInfoData({ ...mockApiData, wobActual: 10.04345 });
      expect(result?.wobActual).toEqual(10);
    });

    it('should return undefined if data is not active', () => {
      expect(getSmartRopInfoData({ ...mockApiData, active: false })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, ropActual: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, maxRop: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, rpmActual: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, maxRpm: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, wobActual: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, maxWob: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, flowRateActual: null })).toBeUndefined();
      expect(getSmartRopInfoData({ ...mockApiData, maxFlowRate: null })).toBeUndefined();
    });
  });
});
