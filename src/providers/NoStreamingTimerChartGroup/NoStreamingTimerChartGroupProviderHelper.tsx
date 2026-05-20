/* eslint-disable no-param-reassign */
import type { OperationListType } from '@dt-advisory/api/operation/operation.types';

export const getNextActiveOperationId = (data?: OperationListType): string | null => {
  if (!data) return null;
  if (!data.autoNavigateToActiveOpEnabled) return null;
  const totalActive = data.operations.reduce((a, b) => (b.active ? a + 1 : a), 0);
  if (totalActive === 1) {
    const found = data?.operations.find((x) => x.active);
    return found ? found.id : null;
  }
  return null;
};
