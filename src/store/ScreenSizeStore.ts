import create from 'zustand';

type ChartToggle = {
  height: number;
  width: number;
  setScreenSize: (width: number, height: number) => void;
};

export const useScreenSizeStore = create<ChartToggle>((set) => ({
  height: 0,
  width: 0,
  setScreenSize: (height: number, width: number) =>
    set((state) => ({
      ...state,
      height,
      width,
    })),
}));
