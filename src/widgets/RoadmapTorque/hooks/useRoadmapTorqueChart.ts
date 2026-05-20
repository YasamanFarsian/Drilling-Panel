/* eslint-disable max-lines-per-function, complexity */
import { useSettingsStore } from '@dt-advisory/store/Settings/Settings';
import { getTickValues } from '@dt-advisory/widgets/components/CartesianXAxis/helper/tickValues.helper';
import {
  convertDataForWidget,
  filterValuesAbovemaxMD,
  getAllMaxX,
  getAllMinX,
  getCurrentStateData,
  getMaxMd,
  getMinAndMaxDomain,
} from '@dt-advisory/widgets/helpers/roadmapHelpers';
import { DotsType } from '@dt-advisory/widgets/helpers/types';
import { getDotsFromModel } from '../helpers/roadmapTorqueHelper';
import { defaultRoadmapTorqueValues } from '../RoadmapTorqueConstants';
import {
  ConvertedRoadmapTorqueWidgetType,
  RoadmapTorqueDataType,
  RoadmapTorqueType,
  RoadmapTorqueWidgetType,
} from '../RoadmapTorqueTypes';

type UseRoadmapTorqueChartPropsType = {
  roadmapTorqueData: RoadmapTorqueType | null;
  widgetId: string;
  numOfTicks: number;
};
export const useRoadmapTorqueChart = ({
  roadmapTorqueData,
  widgetId,
  numOfTicks,
}: UseRoadmapTorqueChartPropsType): ConvertedRoadmapTorqueWidgetType => {
  const currentState = useSettingsStore((x) => x.settings.roadmap[widgetId]?.state);
  const currentModel = useSettingsStore((x) => x.settings.roadmap[widgetId]?.model);
  const data = roadmapTorqueData?.data;
  const md = data?.md ?? defaultRoadmapTorqueValues.data.md;
  const td = data?.td ?? defaultRoadmapTorqueValues.data.td;
  const bitDepth = data?.bitDepth ?? defaultRoadmapTorqueValues.data.bitDepth;
  const casingShoeDepth = data?.casingShoeDepth ?? defaultRoadmapTorqueValues.data.casingShoeDepth;
  const holeDepth = md;

  // get current state
  let currentData: RoadmapTorqueDataType & DotsType = {
    line0: [],
    line12: [],
    line22: [],
    line32: [],
    line42: [],
    ref: [],
    min: [],
    refZone: [],
    measured: [],
    measuredDown: [],
    measuredUp: [],
    kinMeasured: [],
    kinMeasuredDown: [],
    kinMeasuredUp: [],
    statMeasured: [],
    statMeasuredDown: [],
    statMeasuredUp: [],
    dotsLeft: [],
    dotsCenter: [],
    dotsRight: [],
  };

  currentData = getCurrentStateData(currentState, currentData, data);

  // get current selected model
  const defaultMinDomain = { x: 0, y: 0 };
  const defaultMaxDomain = { x: 800, y: 10 };
  const selectedData: RoadmapTorqueWidgetType = {
    isDrilling: Boolean(data?.isDrilling),
    lastUpdated: roadmapTorqueData?.lastUpdated ?? '',
    currentTime: roadmapTorqueData?.currentTime ?? '',
    bitDepth,
    holeDepth,
    casingShoeDepth,
    minDomain: defaultMinDomain,
    maxDomain: defaultMaxDomain,
    currentData: {
      line0: currentData.line0,
      line12: currentData.line12,
      line22: currentData.line22,
      line32: currentData.line32,
      line42: currentData.line42,
      dotsLeft: [],
      dotsCenter: [],
      dotsRight: [],
    },
  };
  const dots = getDotsFromModel(currentModel, currentData);
  selectedData.currentData.dotsLeft = dots.dotsLeft;
  selectedData.currentData.dotsCenter = dots.dotsCenter;
  selectedData.currentData.dotsRight = dots.dotsRight;

  // max y axis
  const maxMD = getMaxMd({ md, td });

  // filter maxMD
  filterValuesAbovemaxMD(selectedData.currentData, maxMD);

  // min and max fox x axis
  const minY = 0;
  const minX = getAllMinX([
    selectedData.currentData?.line0,
    selectedData.currentData?.line12,
    selectedData.currentData?.line22,
    selectedData.currentData?.line32,
    selectedData.currentData?.line42,
    selectedData.currentData.dotsLeft,
    selectedData.currentData.dotsCenter,
    selectedData.currentData.dotsRight,
  ]);
  const maxX = getAllMaxX([
    selectedData.currentData?.line0,
    selectedData.currentData?.line12,
    selectedData.currentData?.line22,
    selectedData.currentData?.line32,
    selectedData.currentData?.line42,
    selectedData.currentData.dotsLeft,
    selectedData.currentData.dotsCenter,
    selectedData.currentData.dotsRight,
  ]);

  const {
    minDomain: newMinXDomain,
    maxDomain: newMaxXDomain,
    tickValues,
  } = getTickValues({
    min: minX,
    max: maxX,
    numOfTicks,
  });

  // define domain (chart is inverted)
  const { minDomain, maxDomain } = getMinAndMaxDomain({
    maxMD,
    minY,
    minX: newMinXDomain,
    maxX: newMaxXDomain,
    defaultMaxX: 10,
    defaultMaxMD: 800,
  });
  selectedData.minDomain = minDomain;
  selectedData.maxDomain = maxDomain;

  // md/val to x/y
  const convertedSelectedData = convertDataForWidget<
    RoadmapTorqueWidgetType,
    ConvertedRoadmapTorqueWidgetType
  >(selectedData);

  return { ...convertedSelectedData, tickValues };
};
