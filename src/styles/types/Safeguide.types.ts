export type SafeGuidesStyleType = {
  header: {
    borderBottomColor: string;
    backgroundColor: string;
  };
  setting: {
    titleToggleButtonFontColor: string;
    containerBorderColor: string;
    labelColor: string;
    iconColor: string;
  };
  charts: {
    labelColor: string;
    tickNumberLabelColor: string;
    tickSignColor: string;
    titleColor: string;
    titleFontSize: number;
    backgroundColor: string;
    tickColorActive: string;
    tickColorInactive: string;
    statusBackgroundColor: string;
    statusTextColor: string;
    statusFontSize: number;
    statusDimension: number;
    statusPaddingX: string;
    statusPaddingY: string;
    containerBorderColor: string;
    warningStroke: string;
    dangerStroke: string;
    strokeWidth: string;
    labelFontSize: number;
    indicatorTextFontSize: number;
    indicatorTextoffsetY: number;
    indicatorTextTranslateY: number;
    indicatorShapeTranslateY: number;
  };
  flowChart: {
    underReamerLine: {
      default: string;
      warning: string;
      flowWarning: string;
      flowDanger: string;
    };
    underReamerStatus: {
      dimension: number;
    };
    underReamerLabel: {
      lineHeight: number;
      fontSize: number;
    };
    underReamerContainer: {
      borderRadius: string;
    };
  };
  appHeader: {
    themeIconProps: {
      height: {
        light: string;
        dark: string;
      };
      width: {
        light: string;
        dark: string;
      };
    };
  };
};
