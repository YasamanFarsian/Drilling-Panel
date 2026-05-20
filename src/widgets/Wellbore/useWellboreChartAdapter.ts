/* eslint-disable max-lines-per-function, complexity, @typescript-eslint/no-explicit-any */
import { useZoomerToggleStore } from '@dt-advisory/store/ZoomerToggle';
import { wellboreParams } from './data/testWellboreParams';
import { WellboreParams } from './WellboreChartSVG';
import { WellboreStreamMessage } from './WellboreTypes';

const useWellboreChartAdapter = (
  isConnected: boolean,
  data: WellboreStreamMessage | null,
): WellboreParams => {
  const zoom = useZoomerToggleStore((state) => state.zoomerValue['wellbore']);
  const params: WellboreParams = wellboreParams;
  if (isConnected && data) {
    const val = data.val;
    const cuttingBed = val.cuttingsBedHeightMD.map((md, i) => [md, val.cuttingsBedHeightVal[i]]);
    const cuttingProportion = val.cuttingsMassFractionsMD.map((md, i) => [
      md,
      val.cuttingsMassFractionsVal[i],
    ]);
    params.inclination = val.inclinationMD.map((md, i) => [md, val.inclinationVal[i]]);
    params.cuttingBed = cuttingBed;
    params.cuttingProportion = cuttingProportion;
    params.bitDepth = data.config.bitDepth;
    params.casingDepth = data.config.casingDepth;
    params.holeDepth = data.config.holeDepth;
    params.neutralPoint = data.config.neutralPoint;
    params.targetDepth = data.config.targetDepth;
    params.bitRotation = data.config.bitRotation;
    params.mudCirculation = data.config.mudCirculation;

    // cut of negative values for cuttingBed and cuttingProportion
    for (const x of cuttingBed) {
      if (x[1] < 0) x[1] = 0;
    }
    for (const x of cuttingProportion) {
      if (x[1] < 0) x[1] = 0;
    }

    // cut trajectory to target depth
    params.inclination = params.inclination.filter((o) => o[0] <= params.targetDepth);

    // apply zoom
    const currentZoomValue = 'number' === typeof zoom ? zoom : 2;
    cuttingBed.forEach((o) => (o[1] *= currentZoomValue));
    cuttingProportion.forEach((o) => (o[1] *= currentZoomValue));
  }
  return params;
};

export default useWellboreChartAdapter;
