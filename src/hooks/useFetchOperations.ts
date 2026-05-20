const MOCK_OPERATIONS = {
  autoNavigateToActiveOpEnabled: false,
  operations: [
    { id: 'op-1', name: 'Well-01 / Section 12¼"', active: true },
    { id: 'op-2', name: 'Well-02 / Section 8½"', active: false },
  ],
};

export const useFetchOperations = (_?: { enabled?: boolean }) => ({
  data: MOCK_OPERATIONS,
  isLoading: false,
  fetchOperations: async () => MOCK_OPERATIONS,
});
