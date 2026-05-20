import {
  DEFAULT_ROOT_FONT_SIZE,
  MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM,
  SINGLE_WIDGET_CUSTOM_PADDING,
  SINGLE_WIDGET_Y_AXIS_PADDING,
  WIDGET_CUSTOM_PADDING,
  Y_AXIS_PADDING,
} from '@dt-advisory/styles/constants';
import {
  getBedHeightLeftTickLabelOffset,
  getCurrentWidgetPadding,
  getOffsetBetweenIndicatorAndValueInSafeguards,
  getOffsetForProportionAxis,
  getRootFontSize,
  getSafeguideBarValueHorizontalOffset,
  getSafeguidesWidgetPadding,
  getWidgetFontSize,
  getWidgetPadding,
  getWidgetPaddingFrom,
  getWidgetYAxisPadding,
  invertScaleValueFrom,
  scaleValueFrom,
  scaleWidgetBottomOffsetValueFromHeight,
  SCREENS,
} from './responsiveMainLayoutHelper';

describe('getCurrentWidgetPadding', () => {
  const AT_LEAST_2K = SCREENS.laptop2K.width + 1;
  it.each([
    SCREENS.mobileS.width,
    SCREENS.mobile4.width,
    SCREENS.iPadPro12inch.width,
    SCREENS.laptopSmall.width,
    AT_LEAST_2K,
  ])('should return correct padding for width %s', (width) => {
    const { widgetPadding, yAxisPadding, xAxisSpaceTickLabel, xAxisOffset } =
      getCurrentWidgetPadding(width - 1); // we decrease by 1 to enter condition
    switch (width) {
      case SCREENS.mobileS.width:
        expect(widgetPadding).toMatchObject({
          ...SINGLE_WIDGET_CUSTOM_PADDING,
          left: 205,
          right: 12,
        });
        expect(yAxisPadding).toEqual(154);
        expect(xAxisSpaceTickLabel).toEqual(30);
        break;
      case SCREENS.mobile4.width:
        expect(widgetPadding).toMatchObject({
          ...SINGLE_WIDGET_CUSTOM_PADDING,
          left: 185,
          right: 12,
        });
        expect(yAxisPadding).toEqual(134);
        expect(xAxisSpaceTickLabel).toEqual(20);
        break;
      case SCREENS.iPadPro12inch.width:
        expect(widgetPadding).toMatchObject({
          ...SINGLE_WIDGET_CUSTOM_PADDING,
          right: 12,
        });
        expect(yAxisPadding).toEqual(SINGLE_WIDGET_Y_AXIS_PADDING);
        break;
      case SCREENS.laptopSmall.width:
        expect(widgetPadding).toMatchObject({
          ...WIDGET_CUSTOM_PADDING,
        });
        expect(yAxisPadding).toEqual(Y_AXIS_PADDING);
        break;
      case AT_LEAST_2K:
        expect(xAxisOffset).toEqual(16);
        break;
    }
  });
});

describe('scaleWidgetBottomOffsetValueFromHeight', () => {
  it('should return correct default value', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(undefined as unknown as number);
    expect(result).toEqual(MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM);
  });
  it('should return correct value if rootFontSize is greater than default font size', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(72.5);
    expect(result).toEqual(102);
  });
  it('should return correct value if rootFontSize is same as default', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(DEFAULT_ROOT_FONT_SIZE);
    expect(result).toEqual(MAIN_CARTESIAN_GRAPH_OFFSET_BOTTOM);
  });
  it('should return correct value if rootFontSize is less or equal than 24', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(24);
    expect(result).toEqual(-54.4);
  });
  it('should return correct value if rootFontSize is less or equal than 26.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(26.5);
    expect(result).toEqual(-48.57142857142858);
  });
  it('should return correct value if rootFontSize is less or equal than 28.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(28.5);
    expect(result).toEqual(-42.5);
  });
  it('should return correct value if rootFontSize is less or equal than 30.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(30.5);
    expect(result).toEqual(-34);
  });
  it('should return correct value if rootFontSize is less or equal than 32.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(32.5);
    expect(result).toEqual(-30.22222222222222);
  });
  it('should return correct value if rootFontSize is less or equal than 35.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(35.5);
    expect(result).toEqual(-19.428571428571427);
  });
  it('should return correct value if rootFontSize is less or equal than 38', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(38);
    expect(result).toEqual(-13.6);
  });
  it('should return correct value if rootFontSize is less or equal than 40.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(40.5);
    expect(result).toEqual(-4.533333333333333);
  });
  it('should return correct value if rootFontSize is less or equal than 41.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(41.5);
    expect(result).toEqual(2.72);
  });
  it('should return correct value if rootFontSize is less or equal than 43.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(43.5);
    expect(result).toEqual(3.4);
  });
  it('should return correct value if rootFontSize is less or equal than 46', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(46);
    expect(result).toEqual(13.6);
  });
  it('should return correct value if rootFontSize is less or equal than 48.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(48.5);
    expect(result).toEqual(20.923076923076923);
  });
  it('should return correct value if rootFontSize is less or equal than 50.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(50.5);
    expect(result).toEqual(27.2);
  });
  it('should return correct value if rootFontSize is less or equal than 60.5', () => {
    const result = scaleWidgetBottomOffsetValueFromHeight(60.5);
    expect(result).toEqual(61.81818181818181);
  });
});

describe('getSafeguidesWidgetPadding', () => {
  it('should return correct value', () => {
    const result = getSafeguidesWidgetPadding(60.5);
    expect(result).toMatchObject({
      left: -7.52,
      right: -7.52,
      top: 0,
      bottom: 0,
    });
  });
});

describe('getWidgetFontSize', () => {
  it('should return correct value', () => {
    const result = getWidgetFontSize(60.5);
    expect(result).toEqual(11.76);
  });
});

describe('getWidgetPadding', () => {
  it('should return correct value', () => {
    const result = getWidgetPadding(60.5);
    expect(result).toMatchObject({
      left: 73.5,
      top: 10,
      right: 2,
      bottom: 55.44,
    });
  });
});

describe('getWidgetYAxisPadding', () => {
  it('should return correct value', () => {
    const result = getWidgetYAxisPadding(60.5);
    expect(result).toEqual(52.92);
  });
});

describe('getWidgetPaddingFrom', () => {
  it('should return correct value', () => {
    const result = getWidgetPaddingFrom(60.5, 10);
    expect(result).toEqual(9.8);
  });
});

describe('scaleValueFrom', () => {
  it('should return correct value', () => {
    const result = scaleValueFrom(60.5, 10);
    expect(result).toEqual(9.8);
  });
});

describe('invertScaleValueFrom', () => {
  it('should return correct value', () => {
    const result = invertScaleValueFrom(60.5, 10);
    expect(result).toEqual(10.2);
  });
});

describe('getRootFontSize', () => {
  it('should return correct value when screen is Nexus7', () => {
    const result = getRootFontSize({ width: SCREENS.Nexus7.width, height: SCREENS.Nexus7.height });
    expect(result).toEqual(35.5);
  });
  it('should return correct value 5% when screen is iPadMini', () => {
    const result = getRootFontSize({
      width: SCREENS.iPadMini.width,
      height: SCREENS.iPadMini.height,
    });
    expect(result).toEqual(40.5);
  });
  it('should return correct value 5% when screen is iPadAir', () => {
    const result = getRootFontSize({
      width: SCREENS.iPadAir.width,
      height: SCREENS.iPadAir.height,
    });
    expect(result).toEqual(40.5);
  });
  it('should return correct value 5% when screen is iPadPro10inch', () => {
    const result = getRootFontSize({
      width: SCREENS.iPadPro10inch.width,
      height: SCREENS.iPadPro10inch.height,
    });
    expect(result).toEqual(41.5);
  });
  it('should return correct value 5% when screen is iPadPro12inch', () => {
    const result = getRootFontSize({
      width: SCREENS.iPadPro12inch.width,
      height: SCREENS.iPadPro12inch.height,
    });
    expect(result).toEqual(43.5);
  });
  it('should return correct value when screen is laptopSmall', () => {
    const result = getRootFontSize({
      width: SCREENS.laptopSmall.width,
      height: SCREENS.laptopSmall.height,
    });
    expect(result).toEqual(46);
  });
  it('should return correct value when screen is laptopMedium1', () => {
    const result = getRootFontSize({
      width: SCREENS.laptopMedium1.width,
      height: SCREENS.laptopMedium1.height,
    });
    expect(result).toEqual(48.5);
  });
  it('should return correct value when screen is laptopMedium2', () => {
    const result = getRootFontSize({
      width: SCREENS.laptopMedium2.width,
      height: SCREENS.laptopMedium2.height,
    });
    expect(result).toEqual(50.5);
  });
  it('should return correct value when screen is laptopMedium3', () => {
    const result = getRootFontSize({
      width: SCREENS.laptopMedium3.width,
      height: SCREENS.laptopMedium3.height,
    });
    expect(result).toEqual(60.5);
  });
  it('should return correct value when screen is laptopDefault', () => {
    const result = getRootFontSize({
      width: SCREENS.laptopDefault.width,
      height: SCREENS.laptopDefault.height,
    });
    expect(result).toEqual(DEFAULT_ROOT_FONT_SIZE);
  });
  it('should return correct value when screen is laptop2K', () => {
    const result = getRootFontSize({
      width: SCREENS.laptop2K.width,
      height: SCREENS.laptop2K.height,
    });
    expect(result).toEqual(88.5);
  });
  it('should return correct value when screen is laptop4K', () => {
    const result = getRootFontSize({
      width: 3000,
      height: 3000,
    });
    expect(result).toEqual(138);
  });
  it('should return correct value when screen is bigger laptop4K', () => {
    const result = getRootFontSize({
      width: 4000,
      height: 3000,
    });
    expect(result).toEqual(138);
  });
  it('should return correct value when screen widht and height are unknown', () => {
    const result = getRootFontSize({
      width: 'foo' as unknown as number,
      height: 'foo' as unknown as number,
    });
    expect(result).toEqual(DEFAULT_ROOT_FONT_SIZE);
  });
  it('should return correct value when screen is tabletSmall', () => {
    const result = getRootFontSize({
      width: SCREENS.tabletSmall.width,
      height: SCREENS.tabletSmall.height,
    });
    expect(result).toEqual(38);
  });
  it('should return correct value when screen is tabletSmall1', () => {
    const result = getRootFontSize({
      width: SCREENS.tabletSmall1.width,
      height: SCREENS.tabletSmall1.height,
    });
    expect(result).toEqual(36.5);
  });
  it('should return correct value when screen is mobile1', () => {
    const result = getRootFontSize({
      width: SCREENS.mobile1.width,
      height: SCREENS.mobile1.height,
    });
    expect(result).toEqual(32.5);
  });
  it('should return correct value when screen is mobile2', () => {
    const result = getRootFontSize({
      width: SCREENS.mobile2.width,
      height: SCREENS.mobile2.height,
    });
    expect(result).toEqual(30.5);
  });
  it('should return correct value when screen is mobile3', () => {
    const result = getRootFontSize({
      width: SCREENS.mobile3.width,
      height: SCREENS.mobile3.height,
    });
    expect(result).toEqual(28.5);
  });
  it('should return correct value when screen is mobile4', () => {
    const result = getRootFontSize({
      width: SCREENS.mobile4.width,
      height: SCREENS.mobile4.height,
    });
    expect(result).toEqual(26.5);
  });
  it('should return correct value when screen is iPhone', () => {
    const result = getRootFontSize({
      width: SCREENS.iPhone.width,
      height: SCREENS.iPhone.height,
    });
    expect(result).toEqual(24);
  });
});

describe('getOffsetBetweenIndicatorAndValueInSafeguards', () => {
  it('should return correct value at default scale', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptopDefault.width,
      height: SCREENS.laptopDefault.height,
    });
    const result = getOffsetBetweenIndicatorAndValueInSafeguards(rootFontSize, 10);
    expect(result).toEqual(10);
  });

  it('should return smaller value when screen size was decreased.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.iPadMini.width,
      height: SCREENS.iPadMini.height,
    });
    const result = getOffsetBetweenIndicatorAndValueInSafeguards(rootFontSize, 10);
    expect(result).toBeLessThan(10);
  });

  it('should return bigger value when screen size was increased.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptop4K.width,
      height: SCREENS.laptop4K.height,
    });
    const result = getOffsetBetweenIndicatorAndValueInSafeguards(rootFontSize, 10);
    expect(result).toBeGreaterThan(10);
  });
});

describe('getOffsetForPropotionAxis', () => {
  it('should return 0 if screen size is less than or equal FullHD', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptopDefault.width,
      height: SCREENS.laptopDefault.height,
    });
    const result = getOffsetForProportionAxis(rootFontSize);
    expect(result).toEqual(0);
  });

  it('should return 15 if screen size is between 2K to 4K.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptop2K.width,
      height: SCREENS.laptop2K.height,
    });
    const result = getOffsetForProportionAxis(rootFontSize);
    expect(result).toEqual(5);
  });

  it('should return 15 if screen size greather than or equal to 4K.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptop4K.width,
      height: SCREENS.laptop4K.height,
    });
    const result = getOffsetForProportionAxis(rootFontSize);
    expect(result).toEqual(15);
  });
});

describe('getSafeguideBarValueHorizontalOffset', () => {
  const givenValue = 16;

  it('should return given value if screen size is FullHD', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptopDefault.width,
      height: SCREENS.laptopDefault.height,
    });
    const result = getSafeguideBarValueHorizontalOffset(rootFontSize, givenValue);
    expect(result).toEqual(givenValue);
  });

  it('should return 10.719 at lower 2K screen condition.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptopSmall.width,
      height: SCREENS.laptopSmall.height,
    });
    const result = getSafeguideBarValueHorizontalOffset(rootFontSize, givenValue);
    expect(result).toEqual(10.719999999999999);
  });

  it('should return 32.106 at screen size 4K.', () => {
    const rootFontSize = getRootFontSize({
      width: SCREENS.laptop4K.width,
      height: SCREENS.laptop4K.height,
    });
    const result = getSafeguideBarValueHorizontalOffset(rootFontSize, givenValue);
    expect(result).toBeLessThan(29);
  });
});

describe('getBedHeightLeftTickLabelOffset', () => {
  it.each([
    SCREENS.mobileS.width,
    SCREENS.mobileM.width,
    SCREENS.mobileL.width,
    SCREENS.iPadMini.width,
    SCREENS.laptopSmall.width,
    SCREENS.laptopDefault.width,
  ])('should return correct padding for width %s', (width) => {
    const result = getBedHeightLeftTickLabelOffset(width);
    switch (width) {
      case SCREENS.mobileS.width:
        expect(result).toEqual(25);
        break;
      case SCREENS.mobileM.width:
        expect(result).toEqual(20);
        break;
      case SCREENS.mobileL.width:
        expect(result).toEqual(18);
        break;
      case SCREENS.iPadMini.width:
        expect(result).toEqual(10);
        break;
      case SCREENS.laptopSmall.width:
        expect(result).toEqual(7);
        break;
      case SCREENS.laptopDefault.width:
        expect(result).toEqual(5);
        break;
    }
  });
});
