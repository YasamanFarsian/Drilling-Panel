import {
  TemplateBodyType,
  TemplateToSaveType,
  WidgetConfigType,
} from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export type LayoutType = TemplateToSaveType;

export type NewLayoutType = TemplateBodyType;

export type UpdateLayoutParamsType = {
  id: string;
  payload: TemplateBodyType;
};

export type WidgetConfigListType = WidgetConfigType[];
