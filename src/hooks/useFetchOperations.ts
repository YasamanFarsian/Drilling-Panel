/* eslint-disable max-lines-per-function */
import { getOperation } from '@dt-advisory/api/operation/operation.query';
import { OperationListType } from '@dt-advisory/api/operation/operation.types';
import { useEffect, useState } from 'react';

type useFetchOperationsProps = {
  enabled?: boolean;
};

export const useFetchOperations = ({ enabled = false }: useFetchOperationsProps) => {
  const [loading, setLoading] = useState(true);
  const [operationList, setOperationList] = useState<OperationListType>();
  const fetchOperations = async (controller?: AbortController) => {
    try {
      const data: OperationListType = await getOperation({ controller });
      setOperationList(data);
      setLoading(false);
      return data;
    } catch (e) {
      // Ignore abort errors - they're expected when component unmounts
      if (e && typeof e === 'object' && 'name' in e && e.name !== 'CanceledError') {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (enabled) {
      const ac = new AbortController();
      fetchOperations(ac);
      return () => ac.abort();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return {
    data: operationList,
    isLoading: loading,
    fetchOperations,
  };
};
