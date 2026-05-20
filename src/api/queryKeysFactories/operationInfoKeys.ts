export const operationInfoKeys = {
  all: ['operationInfo'] as const,
  getOperationInfo: (opid: string) => [...operationInfoKeys.all, opid, 'getOperationInfo'] as const,
};
