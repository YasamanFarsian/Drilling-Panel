export const operationHeaderKeys = {
  all: ['operationHeader'] as const,
  getOperationHeader: (opid: string) =>
    [...operationHeaderKeys.all, opid, 'getOperationHeader'] as const,
};
