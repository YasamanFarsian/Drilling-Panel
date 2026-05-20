import { DefaultUserConfigurationType } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';
import axiosInstance from '../axiosInstance';
import {
  LayoutType,
  NewLayoutType,
  UpdateLayoutParamsType,
  WidgetConfigListType,
} from './settings.types';

const DEFAULT_TIMEOUT = 1000;

export const getSettings = (): Promise<DefaultUserConfigurationType> =>
  axiosInstance
    .get<DefaultUserConfigurationType>('/api/settings', {
      timeout: DEFAULT_TIMEOUT,
    })
    .then(({ data }) => data);

export const saveSettings = (payload: DefaultUserConfigurationType) =>
  axiosInstance.post('/api/settings', payload).then(({ data }) => data);

export const getLayouts = (): Promise<LayoutType[]> =>
  axiosInstance.get<LayoutType[]>('/api/settings/layouts').then(({ data }) => data);

export const createLayout = (payload: NewLayoutType): Promise<string> =>
  axiosInstance.post('/api/settings/layouts', payload).then(({ data }) => data);

export const updateLayout = ({ id, payload }: UpdateLayoutParamsType) =>
  axiosInstance.put(`/api/settings/layouts/${id}`, payload).then(({ data }) => data);

export const deleteLayout = (id: string) =>
  axiosInstance.delete(`/api/settings/layouts/${id}`).then(({ data }) => data);

export const getWidgetsList = (): Promise<WidgetConfigListType> =>
  axiosInstance.get<WidgetConfigListType>('/api/widgets').then(({ data }) => data);
