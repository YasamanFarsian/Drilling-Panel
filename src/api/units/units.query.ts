import axiosInstance from '../axiosInstance';
import { UnitsConfiguration } from './units.types';

export const getUnitsSettings = async (operationId: string): Promise<UnitsConfiguration> => {
  return axiosInstance
    .get<UnitsConfiguration>('/api/Units', {
      params: { operationId },
    })
    .then((res) => res.data);
};
