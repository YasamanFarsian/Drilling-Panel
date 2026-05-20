import create from 'zustand';

type AxisLabelToggle = {
  hideAxisLabel: {
    cutting: boolean;
    ecd: boolean;
    wellbore: boolean;
    transientMechanicalDrag: boolean;
    transientMechanicalTorque: boolean;
    smartAutoRop: boolean;
    [widgetId: string]: boolean;
  };
  toggle: (type: string) => void;
};

export const useAxisLabelToggleStore = create<AxisLabelToggle>((set) => ({
  hideAxisLabel: {
    cutting: false,
    ecd: false,
    wellbore: false,
    transientMechanicalDrag: false,
    transientMechanicalTorque: false,
    smartAutoRop: false,
  },
  toggle: (type: string) => {
    set((state) => ({
      ...state,
      hideAxisLabel: {
        ...state.hideAxisLabel,
        [type]: !state.hideAxisLabel[type],
      },
    }));
  },
}));
