/* eslint-disable complexity, max-lines-per-function, max-lines */
import { DimensionType } from '@dt-advisory/hooks/useResponsiveDimension';
import {
  DEFAULT_LABEL_STYLE,
  DEFAULT_ROOT_FONT_SIZE,
  MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM,
  SAFEGUIDES_CUSTOM_PADDING,
  SINGLE_WIDGET_CUSTOM_PADDING,
  SINGLE_WIDGET_Y_AXIS_PADDING,
  SPACE_BETWEEN_TICK_AND_TICK_LABEL,
  WIDGET_CUSTOM_PADDING,
  X_AXIS_OFFSET,
  Y_AXIS_PADDING,
} from '@dt-advisory/styles/constants';

export const SCREENS = {
  laptop4K: { width: 3840, height: 2160, fontSize: 138 },
  laptop2K: { width: 2560, height: 1440, fontSize: 88.5 },
  laptopDefault: { width: 1920, height: 1080, fontSize: DEFAULT_ROOT_FONT_SIZE },
  laptopMedium3: { width: 1536, height: 1080, fontSize: 60.5 },
  laptopMedium2: { width: 1440, height: 900, fontSize: 50.5 },
  laptopMedium1: { width: 1366, height: 800, fontSize: 48.5 },
  laptopSmall: { width: 1280, height: 800, fontSize: 46 },
  iPadPro12inch: { width: 1024, height: 1366, fontSize: 43.5 },
  iPadPro10inch: { width: 834, height: 1112, fontSize: 41.5 },
  iPadAir: { width: 820, height: 1180, fontSize: 40.5 },
  iPadMini: { width: 768, height: 1024, fontSize: 40.5 },
  tabletSmall: { width: 670, height: 1024, fontSize: 38 },
  tabletSmall1: { width: 650, height: 1024, fontSize: 36.5 },
  Nexus7: { width: 600, height: 960, fontSize: 35.5 },
  mobile1: { width: 590, height: 736, fontSize: 32.5 },
  mobile2: { width: 530, height: 736, fontSize: 30.5 },
  mobile3: { width: 500, height: 736, fontSize: 28.5 },
  mobile4: { width: 480, height: 736, fontSize: 26.5 },
  iPhone: { width: 414, height: 736, fontSize: 24 },
  mobileL: { width: 425, height: 667, fontSize: 20 },
  mobileM: { width: 375, height: 667, fontSize: 18 },
  mobileS: { width: 320, height: 667, fontSize: 18 },
};

export const getCurrentWidgetPadding = (currentWidth: number) => {
  const currentPadding = {
    widgetPadding: WIDGET_CUSTOM_PADDING,
    yAxisPadding: Y_AXIS_PADDING,
    xAxisSpaceTickLabel: SPACE_BETWEEN_TICK_AND_TICK_LABEL,
    xAxisOffset: X_AXIS_OFFSET,
  };
  switch (true) {
    case currentWidth <= SCREENS.mobileS.width:
      currentPadding.widgetPadding = {
        ...SINGLE_WIDGET_CUSTOM_PADDING,
        left: SINGLE_WIDGET_CUSTOM_PADDING.left + 80,
        right: SINGLE_WIDGET_CUSTOM_PADDING.right + 10,
      };
      currentPadding.yAxisPadding = SINGLE_WIDGET_Y_AXIS_PADDING + 60;
      currentPadding.xAxisSpaceTickLabel = SPACE_BETWEEN_TICK_AND_TICK_LABEL + 15;
      break;
    case currentWidth < SCREENS.mobile4.width:
      currentPadding.widgetPadding = {
        ...SINGLE_WIDGET_CUSTOM_PADDING,
        left: SINGLE_WIDGET_CUSTOM_PADDING.left + 60,
        right: SINGLE_WIDGET_CUSTOM_PADDING.right + 10,
      };
      currentPadding.yAxisPadding = SINGLE_WIDGET_Y_AXIS_PADDING + 40;
      currentPadding.xAxisSpaceTickLabel = SPACE_BETWEEN_TICK_AND_TICK_LABEL + 5;
      break;
    case currentWidth < SCREENS.iPadPro12inch.width:
      currentPadding.widgetPadding = {
        ...SINGLE_WIDGET_CUSTOM_PADDING,
        right: SINGLE_WIDGET_CUSTOM_PADDING.right + 10,
      };
      currentPadding.yAxisPadding = SINGLE_WIDGET_Y_AXIS_PADDING;
      currentPadding.xAxisSpaceTickLabel = SPACE_BETWEEN_TICK_AND_TICK_LABEL + 10;
      break;
    case currentWidth >= SCREENS.laptop2K.width:
      currentPadding.xAxisOffset = X_AXIS_OFFSET + 10;
      break;
  }
  return currentPadding;
};

// the number return corresponds to the % of font-size set to the root element `html`
export const getRootFontSize = ({ width }: Required<DimensionType>): number => {
  // we start from the smallest
  switch (true) {
    case width <= SCREENS.iPhone.width:
      return SCREENS.iPhone.fontSize;
    case width <= SCREENS.mobile4.width:
      return SCREENS.mobile4.fontSize;
    case width <= SCREENS.mobile3.width:
      return SCREENS.mobile3.fontSize;
    case width <= SCREENS.mobile2.width:
      return SCREENS.mobile2.fontSize;
    case width <= SCREENS.mobile1.width:
      return SCREENS.mobile1.fontSize;
    case width <= SCREENS.Nexus7.width:
      return SCREENS.Nexus7.fontSize;
    case width <= SCREENS.tabletSmall1.width:
      return SCREENS.tabletSmall1.fontSize;
    case width <= SCREENS.tabletSmall.width:
      return SCREENS.tabletSmall.fontSize;
    case width <= SCREENS.iPadMini.width:
      return SCREENS.iPadMini.fontSize;
    case width <= SCREENS.iPadAir.width:
      return SCREENS.iPadAir.fontSize;
    case width <= SCREENS.iPadPro10inch.width:
      return SCREENS.iPadPro10inch.fontSize;
    case width <= SCREENS.iPadPro12inch.width:
      return SCREENS.iPadPro12inch.fontSize;
    case width <= SCREENS.laptopSmall.width:
      return SCREENS.laptopSmall.fontSize;
    case width <= SCREENS.laptopMedium1.width:
      return SCREENS.laptopMedium1.fontSize;
    case width <= SCREENS.laptopMedium2.width:
      return SCREENS.laptopMedium2.fontSize;
    case width <= SCREENS.laptopMedium3.width:
      return SCREENS.laptopMedium3.fontSize;
    case width <= SCREENS.laptopDefault.width:
      return SCREENS.laptopDefault.fontSize;
    case width <= SCREENS.laptop2K.width:
      return SCREENS.laptop2K.fontSize;
    case width <= SCREENS.laptop4K.width:
      return SCREENS.laptop4K.fontSize;
    case width > SCREENS.laptop4K.width:
      return SCREENS.laptop4K.fontSize;
    default:
      return DEFAULT_ROOT_FONT_SIZE;
  }
};

export const getWidgetFontSize = (rootFontSize: number): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;
  return DEFAULT_LABEL_STYLE.fontSize - DEFAULT_LABEL_STYLE.fontSize * ratio;
};

export const getWidgetYAxisPadding = (rootFontSize: number): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;
  return Y_AXIS_PADDING - Y_AXIS_PADDING * ratio;
};

export const getWidgetPadding = (rootFontSize: number): typeof WIDGET_CUSTOM_PADDING => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;

  const leftPaddingAdjustmentValue = WIDGET_CUSTOM_PADDING.left * -1 * ratio;
  const bottomPaddingAdjustmentValue = WIDGET_CUSTOM_PADDING.bottom * -1 * (ratio / 2);
  return {
    ...WIDGET_CUSTOM_PADDING,
    left: WIDGET_CUSTOM_PADDING.left + leftPaddingAdjustmentValue,
    bottom: WIDGET_CUSTOM_PADDING.bottom + bottomPaddingAdjustmentValue,
  };
};
export const getSafeguidesWidgetPadding = (
  rootFontSize: number,
): typeof SAFEGUIDES_CUSTOM_PADDING => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = (diff / 100) * 3;

  return {
    left: SAFEGUIDES_CUSTOM_PADDING.left - SAFEGUIDES_CUSTOM_PADDING.left * ratio,
    top: SAFEGUIDES_CUSTOM_PADDING.top - SAFEGUIDES_CUSTOM_PADDING.top * ratio,
    right: SAFEGUIDES_CUSTOM_PADDING.right - SAFEGUIDES_CUSTOM_PADDING.right * ratio,
    bottom: SAFEGUIDES_CUSTOM_PADDING.bottom - SAFEGUIDES_CUSTOM_PADDING.bottom * ratio,
  };
};

export const getWidgetPaddingFrom = (rootFontSize: number, currentPadding: number): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;
  return currentPadding - currentPadding * ratio;
};

export const scaleValueFrom = (rootFontSize: number, value: number): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;
  return value - value * ratio;
};

export const invertScaleValueFrom = (rootFontSize: number, value: number): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  const ratio = diff / 100;
  return value + value * ratio;
};

export const getSafeguideBarValueHorizontalOffset = (
  rootFontSize: number,
  value: number,
): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  if (rootFontSize >= SCREENS.laptop4K.fontSize) {
    const ratio = diff / 95;
    return value + value * -ratio;
  } else if (rootFontSize >= SCREENS.laptop2K.fontSize) {
    const ratio = diff / 40;
    return value + value * -ratio;
  } else {
    const ratio = diff / 50;
    return value + value * -ratio;
  }
};

export const getOffsetBetweenIndicatorAndValueInSafeguards = (
  rootFontSize: number,
  value: number,
): number => {
  const diff = DEFAULT_ROOT_FONT_SIZE - rootFontSize;
  let ratio = 0;

  if (rootFontSize >= SCREENS.laptopDefault.fontSize) {
    ratio = diff / 200;
  } else {
    ratio = diff / 100;
  }

  return value + value * -1 * ratio;
};

export const getOffsetForProportionAxis = (rootFontSize: number): number => {
  switch (true) {
    case rootFontSize >= SCREENS.laptop4K.fontSize:
      return 15;
    case rootFontSize >= SCREENS.laptop2K.fontSize:
      return 5;
    default:
      return 0;
  }
};

export const scaleWidgetBottomOffsetValueFromHeight = (rootFontSize: number): number => {
  switch (true) {
    case rootFontSize <= SCREENS.iPhone.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 1.25;
    case rootFontSize <= SCREENS.mobile4.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 1.4;
    case rootFontSize <= SCREENS.mobile3.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 1.6;
    case rootFontSize <= SCREENS.mobile2.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 2;
    case rootFontSize <= SCREENS.mobile1.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 2.25;
    case rootFontSize <= SCREENS.Nexus7.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 3.5;
    case rootFontSize <= SCREENS.tabletSmall.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 5;
    case rootFontSize <= SCREENS.iPadAir.fontSize:
      return -MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 15;
    case rootFontSize <= SCREENS.iPadPro10inch.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 25;
    case rootFontSize <= SCREENS.iPadPro12inch.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 20;
    case rootFontSize <= SCREENS.laptopSmall.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 5;
    case rootFontSize <= SCREENS.laptopMedium1.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 3.25;
    case rootFontSize <= SCREENS.laptopMedium2.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 2.5;
    case rootFontSize <= SCREENS.laptopMedium3.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM / 1.1;
    case rootFontSize === SCREENS.laptopDefault.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM;
    case rootFontSize >= SCREENS.laptopDefault.fontSize:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM * 1.5;
    default:
      return MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM;
  }
};

// Proportion axis - BedHeight axis first tick left offset - Cutting
export const getBedHeightLeftTickLabelOffset = (screenWidth: number) => {
  let labelOffset = 5;
  switch (true) {
    case screenWidth <= SCREENS.mobileS.width:
      labelOffset = 25;
      break;
    case screenWidth <= SCREENS.mobileM.width:
      labelOffset = 20;
      break;
    case screenWidth <= SCREENS.mobileL.width:
      labelOffset = 18;
      break;
    case screenWidth <= SCREENS.iPadMini.width:
      labelOffset = 10;
      break;
    case screenWidth <= SCREENS.laptopSmall.width:
      labelOffset = 7;
      break;
  }
  return labelOffset;
};
