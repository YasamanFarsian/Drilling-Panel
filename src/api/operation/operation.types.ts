export type GetOperationType = {
  controller?: AbortController;
};

export type OperationType = {
  id: string;
  name: string;
  active: boolean;
};

export type OperationListType = {
  operations: OperationType[];
  autoNavigateToActiveOpEnabled: boolean;
};
