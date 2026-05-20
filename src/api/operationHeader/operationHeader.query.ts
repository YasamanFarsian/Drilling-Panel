import axiosInstance from '../axiosInstance';
import { GetOperationHeaderType, OperationHeaderType } from './operationHeader.types';

export const getOperationHeader = ({ operationId }: GetOperationHeaderType) =>
  axiosInstance
    .get<OperationHeaderType>('/api/operations/headers', {
      params: { opid: operationId },
      withCredentials: true,
    })
    .then(({ data }) => data);
