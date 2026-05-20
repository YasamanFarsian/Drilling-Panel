import create from 'zustand';
import { WidgetsEnum } from './UserConfiguration/UserConfiguration';

/**
 * The purpose of this store is to have a global state when a websocket is not connected
 * Each widget will add their no connection state to this store
 * For example  `ECD` will set its connection state with `{ ecd: boolean }`
 * For example  `Cutting` will set its connection state with `{ cuttingchart: boolean }`
 * For example  `Safeguards` will set its connection state with `{ safeguard: boolean }`
 * */
export type WsConnectionState = Partial<Record<WidgetsEnum, boolean>>;
export type WsConnection = {
  shouldReconnect: boolean;
  setShouldReconnect: (value: boolean) => void;
  wsConnectionStates: WsConnectionState;
  setWsConnectionStates: (data: WsConnectionState) => void;
};

export const useWSConnectionStore = create<WsConnection>((set) => ({
  shouldReconnect: false,
  wsConnectionStates: {},
  setWsConnectionStates: (data) =>
    set((state) => ({
      ...state,
      wsConnectionStates: { ...state.wsConnectionStates, ...data },
    })),
  setShouldReconnect: (value) =>
    set((state) => ({
      ...state,
      shouldReconnect: value,
    })),
}));
