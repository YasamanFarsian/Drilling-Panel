import create from 'zustand';

export type HostSettingsType = {
  isEmbedded: boolean;
  accessToken: string | null;
  updateHostAccessToken(value: string | null): void;
  updateHostIsEmbedded(value: boolean): void;
};

export const useHostSettingsStore = create<HostSettingsType>((set) => ({
  isEmbedded: false,
  accessToken: null,
  updateHostAccessToken: (value) =>
    set((state) => ({
      ...state,
      accessToken: value,
    })),
  updateHostIsEmbedded: (value) => set((state) => ({ ...state, isEmbedded: value })),
}));
