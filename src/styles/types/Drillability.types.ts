export type DrillabilityStyleType = {
  header: {
    borderBottomColor: string;
    backgroundColor: string;
  };

  charts: {
    labelColor: string;
    valueColor: string;
    dataBackgroundColor: string;
    containerBorderColor: string;
    doc: {
      pieThemeData: string | string[];
    };
    downholeEmse: {
      semiPieThemeData: string;
    };
    thermometer: {
      barChartData: string;
    };
  };
};
