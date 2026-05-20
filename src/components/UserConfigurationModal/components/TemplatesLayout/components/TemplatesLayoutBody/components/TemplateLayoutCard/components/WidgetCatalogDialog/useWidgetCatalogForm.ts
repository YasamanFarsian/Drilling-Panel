import { useState } from 'react';
import { WidgetsLoaderEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export const useWidgetCatalogForm = (defaultSelectingWidget: WidgetsLoaderEnum) => {
  const [isDirty, setIsDirty] = useState(false);
  const [selectingWidget, setSelectingWidget] = useState(defaultSelectingWidget);
  const handleChangeSelectingWidget = (widgetKey: WidgetsLoaderEnum) => {
    setIsDirty(true);
    setSelectingWidget(widgetKey);
  };

  return {
    isDirty,
    selectingWidget,
    handleChangeSelectingWidget,
  };
};
