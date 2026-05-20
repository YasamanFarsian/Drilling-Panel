import { scalePxAsVh, scalePxAsVw } from '@dt-advisory/widgets/helpers/viewportUnitHelpers';
const LABEL_HEIGHT = 16; // must align with real height of label
const LABEL_SPACE_FROM_HOLE_DEPTH = 5;
export const HORIZONTAL_SHIFT = -12;

export const getYLabelPosOfLargeWidget = ({
  maxY,
  placementTop,
  holeDepth,
  scale,
}: {
  maxY: number;
  placementTop?: boolean;
  holeDepth: number;
  scale?: { x: (input: number) => number };
}) => {
  const holeDepthPos = scale?.x(holeDepth) ?? 0;
  const topPos = holeDepthPos + LABEL_SPACE_FROM_HOLE_DEPTH;

  if (placementTop) {
    return topPos;
  }
  const maxYPos = scale?.x(maxY) ?? 0;
  const bottomPosInclLabelHeight = topPos + 2 * LABEL_HEIGHT;

  const isBottomPosOverflow = bottomPosInclLabelHeight > maxYPos;
  const bottomPos = isBottomPosOverflow ? maxYPos - LABEL_HEIGHT : topPos + LABEL_HEIGHT;

  return bottomPos;
};

export const getYLabelPos = ({
  yPosLargeWidget,
  yPosSmallWidget,
  isSmallVersion,
}: {
  yPosLargeWidget: number;
  yPosSmallWidget?: number;
  isSmallVersion: boolean;
}) => {
  return isSmallVersion ? yPosSmallWidget : yPosLargeWidget;
};

export const getLabelDx = ({
  horizontalShift,
  isSmallVersion,
}: {
  horizontalShift: number;
  isSmallVersion: boolean;
}) => {
  const result = isSmallVersion ? horizontalShift : HORIZONTAL_SHIFT;
  return scalePxAsVw(result);
};

export const getLabelDy = ({
  verticalShift,
  isSmallVersion,
}: {
  verticalShift: number;
  isSmallVersion: boolean;
}) => {
  const result = isSmallVersion ? verticalShift : 0;
  return scalePxAsVh(result);
};
