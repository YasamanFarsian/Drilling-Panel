import { DefaultOptions } from 'react-query';

export const defaultReactQueryOptions: DefaultOptions = {
  queries: {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  },
};
