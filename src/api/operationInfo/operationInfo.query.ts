import axiosInstance from '../axiosInstance';
import { GetOperationInfoType, OperationInfoType } from './operationInfo.types';

export const getOperationInfo = ({ operationId, controller }: GetOperationInfoType) =>
  axiosInstance
    .get<OperationInfoType>('/api/operations/info', {
      signal: controller?.signal,
      params: {
        opid: operationId,
      },
      withCredentials: true,
    })
    .then(({ data }) => data);
