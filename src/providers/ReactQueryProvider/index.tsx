import React, { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { defaultReactQueryOptions } from '@dt-advisory/config/reactQuery';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: defaultReactQueryOptions,
    });
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
