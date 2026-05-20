/* eslint-disable max-lines-per-function, complexity */
import { useSettingsStore } from '@dt-advisory/store/Settings/Settings';
import { getTickValues } from '@dt-advisory/widgets/components/CartesianXAxis/helper/tickValues.helper';
import { getMdToUseWithPerc } from '@dt-advisory/widgets/helpers/mdHelper';
import {
  convertDataForWidget,
  DEPTH_BUFFER,
  filterValuesAbovemaxMD,
  getAllMaxX,
  getAllMinX,
  getCurrentStateData,
  isValidMinMax,
} from '@dt-advisory/widgets/helpers/roadmapHelpers';
import { DotsType } from '@dt-advisory/widgets/helpers/types';
import { getDotsFromModel } from '../helpers/roadmapDragHelper';
import { defaultRoadmapDragValues } from '../RoadmapDragConstants';
import {
  ConvertedRoadmapDragWidgetType,
  RoadmapDragDataType,
  RoadmapDragType,
  RoadmapDragWidgetType,
} from '../RoadmapDragTypes';

const MD_PERC_VALUE = 0.05;

type UseRoadmapDragChartPropsType = {
  roadmapDragData: RoadmapDragType | null;
  widgetId: string;
  numOfTicks: number;
};
export const useRoadmapDragChart = ({
  roadmapDragData,
  widgetId,
  numOfTicks,
}: UseRoadmapDragChartPropsType): ConvertedRoadmapDragWidgetType => {
  const currentState = useSettingsStore((x) => x.settings.roadmap[widgetId]?.state);
  const currentModel = useSettingsStore((x) => x.settings.roadmap[widgetId]?.model);
  const data = roadmapDragData?.data;
  const md = data?.md ?? defaultRoadmapDragValues.data.md;
  const td = data?.td ?? defaultRoadmapDragValues.data.td;
  const bitDepth = data?.bitDepth ?? defaultRoadmapDragValues.data.bitDepth;
  const casingShoeDepth = data?.casingShoeDepth ?? defaultRoadmapDragValues.data.casingShoeDepth;
  const holeDepth = md;

  // define state
  let currentData: RoadmapDragDataType & DotsType = {
    line0: [],
    line12Left: [],
    line22Left: [],
    line32Left: [],
    line42Left: [],
    line12Right: [],
    line22Right: [],
    line32Right: [],
    line42Right: [],
    leftMeasured: [],
    centerMeasured: [],
    rightMeasured: [],
    kinLeftMeasured: [],
    kinCenterMeasured: [],
    kinRightMeasured: [],
    statLeftMeasured: [],
    statCenterMeasured: [],
    statRightMeasured: [],
    dotsLeft: [],
    dotsCenter: [],
    dotsRight: [],
  };
  currentData = getCurrentStateData(currentState, currentData, data);

  // use settings store to get current selected model
  const defaultMinDomain = { x: 0, y: 0 };
  const defaultMaxDomain = { x: 800, y: 10 };
  const selectedData: RoadmapDragWidgetType = {
    isDrilling: Boolean(data?.isDrilling),
    lastUpdated: roadmapDragData?.lastUpdated ?? '',
    currentTime: roadmapDragData?.currentTime ?? '',
    bitDepth,
    holeDepth,
    casingShoeDepth,
    minDomain: defaultMinDomain,
    maxDomain: defaultMaxDomain,
    currentData: {
      line0: currentData.line0,
      line12Left: currentData.line12Left,
      line22Left: currentData.line22Left,
      line32Left: currentData.line32Left,
      line42Left: currentData.line42Left,
      line12Right: currentData.line12Right,
      line22Right: currentData.line22Right,
      line32Right: currentData.line32Right,
      line42Right: currentData.line42Right,
      dotsLeft: [],
      dotsCenter: [],
      dotsRight: [],
    },
  };
  const dots = getDotsFromModel(currentModel, currentData);
  selectedData.currentData.dotsLeft = dots.dotsLeft;
  selectedData.currentData.dotsCenter = dots.dotsCenter;
  selectedData.currentData.dotsRight = dots.dotsRight;

  // define max Y axis
  const maxMD = getMdToUseWithPerc({ MD: md, TD: td, options: { increase: MD_PERC_VALUE } });

  // filter maxMD
  filterValuesAbovemaxMD(selectedData.currentData, maxMD);

  // calc min and max fox x and y axis
  const minY = 0;
  const minX = getAllMinX([
    selectedData.currentData?.line0,
    selectedData.currentData?.line12Left,
    selectedData.currentData?.line22Left,
    selectedData.currentData?.line32Left,
    selectedData.currentData?.line42Left,
    selectedData.currentData?.line12Right,
    selectedData.currentData?.line22Right,
    selectedData.currentData?.line32Right,
    selectedData.currentData?.line42Right,
    selectedData.currentData.dotsLeft,
    selectedData.currentData.dotsCenter,
    selectedData.currentData.dotsRight,
  ]);
  const maxX = getAllMaxX([
    selectedData.currentData?.line0,
    selectedData.currentData?.line12Left,
    selectedData.currentData?.line22Left,
    selectedData.currentData?.line32Left,
    selectedData.currentData?.line42Left,
    selectedData.currentData?.line12Right,
    selectedData.currentData?.line22Right,
    selectedData.currentData?.line32Right,
    selectedData.currentData?.line42Right,
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

  const minDomain = { x: minY, y: newMinXDomain };
  const validMaxMD = isValidMinMax(maxMD, 800) * DEPTH_BUFFER;
  const maxDomain = { x: validMaxMD, y: isValidMinMax(newMaxXDomain, 10) };
  selectedData.minDomain = minDomain;
  selectedData.maxDomain = maxDomain;

  // convert md/val to x/y
  const convertedSelectedData = convertDataForWidget<
    RoadmapDragWidgetType,
    ConvertedRoadmapDragWidgetType
  >(selectedData);

  return { ...convertedSelectedData, tickValues };
};
