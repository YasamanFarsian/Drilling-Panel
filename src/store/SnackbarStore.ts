import create from 'zustand';

type SnackbarActions = {
  closeSnackbar: () => void;
  openSnackbar: (message: string) => void;
};

export type SnackbarStore = { message: string; open: boolean; actions: SnackbarActions };

export const useSnackbarStore = create<SnackbarStore>((set) => ({
  open: false,
  message: '',
  actions: {
    closeSnackbar: () => {
      set({ open: false, message: '' });
    },
    openSnackbar: (message) => {
      set({ open: true, message });
    },
  },
}));
