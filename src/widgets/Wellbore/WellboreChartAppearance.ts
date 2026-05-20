export type WellboreAppearance = {
  axisLabelY: string;
  holeColor: string;
  cuttingBedColor: string;
  cuttingProportionColor: string;
  neutralPointColor: string;
};

export const wellboreAppearance = {
  light: {
    // axisLabelY={formatMessage({ id: 'widget.wellbore.axis.y.label' })}
    axisLabelY: 'True Vertical Depth (m)',
    holeColor: '#E1E1E1',
    cuttingBedColor: '#E3F0D9',
    cuttingProportionColor: '#DBE3F2',
    neutralPointColor: '#B5C6E7',
  },
  dark: {
    // axisLabelY={formatMessage({ id: 'widget.wellbore.axis.y.label' })}
    axisLabelY: 'True Vertical Depth (m)',
    holeColor: '#5B5B5B',
    cuttingBedColor: '#7b8278',
    cuttingProportionColor: '#DBE3F2',
    neutralPointColor: '#B5C6E7',
  },
};
