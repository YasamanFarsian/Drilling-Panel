import axiosInstance from '../axiosInstance';
import { GetOperationType, OperationListType } from './operation.types';

export const getOperation = ({ controller }: GetOperationType) =>
  axiosInstance
    .get<OperationListType>('/api/operations', {
      signal: controller?.signal,
    })
    .then(({ data }) => data);
