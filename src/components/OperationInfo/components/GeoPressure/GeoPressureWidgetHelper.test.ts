import { GeoPressureToggleValue } from './components/GeoPressureToggler';
import {
  geoPressureWidgetHelper,
  GeoPressureWidgetHelperPropsType,
} from './GeoPressureWidgetHelper';

describe('GeoPressureWidgetHelper', () => {
  describe('geoPressureWidgetHelper', () => {
    const mockData: GeoPressureWidgetHelperPropsType['data'] = {
      fitData: [],
      mudWeightData: [{ md: 12, tvd: 34, fractionPressureEmw: 56, porePressureEmw: 78 }],
    };

    describe('mudWeightData', () => {
      it('should return x from incoming data.mudWeightData.md if mode is MD', () => {
        const result = geoPressureWidgetHelper({ mode: GeoPressureToggleValue.MD, data: mockData });
        expect(result.mudWeightData[0].x).toEqual(12);
      });

      it('should return x from incoming data.mudWeightData.tvd if mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: mockData,
        });
        expect(result.mudWeightData[0].x).toEqual(34);
      });

      it('should return x as 0 if incoming data.mudWeightData.md is undefined when mode is MD', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.MD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], md: undefined }] },
        });

        expect(result.mudWeightData[0].x).toEqual(0);
      });

      it('should return x as 0 if incoming data.mudWeightData.tvd is undefined when mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], tvd: undefined }] },
        });

        expect(result.mudWeightData[0].x).toEqual(0);
      });
    });

    describe('fracturationPressureInEMW', () => {
      it('should return x from incoming data.mudWeightData.md if mode is MD', () => {
        const result = geoPressureWidgetHelper({ mode: GeoPressureToggleValue.MD, data: mockData });
        expect(result?.fracturationPressureInEMW?.[0].x).toEqual(12);
      });

      it('should return x from incoming data.mudWeightData.tvd if mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: mockData,
        });
        expect(result?.fracturationPressureInEMW?.[0].x).toEqual(34);
      });

      it('should return x as 0 if incoming data.mudWeightData.md is undefined when mode is MD', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.MD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], md: undefined }] },
        });

        expect(result.fracturationPressureInEMW?.[0].x).toEqual(0);
      });

      it('should return x as 0 if incoming data.mudWeightData.tvd is undefined when mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], tvd: undefined }] },
        });

        expect(result.fracturationPressureInEMW?.[0].x).toEqual(0);
      });
    });

    describe('porePressureGradientInEMW', () => {
      it('should return x from incoming data.mudWeightData.md if mode is MD', () => {
        const result = geoPressureWidgetHelper({ mode: GeoPressureToggleValue.MD, data: mockData });
        expect(result?.porePressureGradientInEMW?.[0].x).toEqual(12);
      });

      it('should return x from incoming data.mudWeightData.tvd if mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: mockData,
        });
        expect(result?.porePressureGradientInEMW?.[0].x).toEqual(34);
      });

      it('should return x as 0 if incoming data.mudWeightData.md is undefined when mode is MD', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.MD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], md: undefined }] },
        });

        expect(result.porePressureGradientInEMW?.[0].x).toEqual(0);
      });

      it('should return x as 0 if incoming data.mudWeightData.tvd is undefined when mode is tvd', () => {
        const result = geoPressureWidgetHelper({
          mode: GeoPressureToggleValue.TVD,
          data: { ...mockData, mudWeightData: [{ ...mockData.mudWeightData[0], tvd: undefined }] },
        });

        expect(result.porePressureGradientInEMW?.[0].x).toEqual(0);
      });
    });
  });
});
