export type SmartAutoRopType = {
  infoItem: {
    borderColor: string;
    barColor: string;
    barActiveColor: string;
    barInactiveColor: string;
    dataField: {
      recommendedLabel: string;
      divider: string;
    };
  };
  chart: {
    activeSlice: string;
    inactiveSlice: string;
    slice: string;
    axis: string;
    indicatorBg: string;
    indicatorIcon: string;
  };
  setting: {
    inputLabel: string;
  };
};
