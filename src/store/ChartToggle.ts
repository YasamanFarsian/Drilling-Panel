import create from 'zustand';

type ChartToggle = {
  showWellbore: boolean;
  hasSwitch: boolean;
  toggle: () => void;
  resetSwitch: () => void;
};

export const useChartToggleStore = create<ChartToggle>((set) => ({
  showWellbore: false,
  hasSwitch: false,
  toggle: () =>
    set((state) => ({
      ...state,
      showWellbore: !state.showWellbore,
      hasSwitch: true,
    })),
  resetSwitch: () =>
    set((state) => ({
      ...state,
      hasSwitch: false,
    })),
}));
