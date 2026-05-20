/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines-per-function */
/* eslint-disable complexity */
import { useEffect, useLayoutEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { userConfigurationSettingsKeys } from '@dt-advisory/api/queryKeysFactories/userConfigurationSettingsKeys';
import { getLayouts } from '@dt-advisory/api/settings/settings.query';
import { SECOND } from '@dt-advisory/helpers/constants';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { getLayoutFromAGridConfig } from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';

export const useGetTemplateLayouts = () => {
  const setTemplates = useUserConfigurationStore((state) => state.setTemplates);
  const templatesToSave = useUserConfigurationStore((state) => state.templatesToSave);
  const setCurrentSelectedLayout = useUserConfigurationStore((x) => x.setCurrentSelectedLayout);
  const currentSelectedLayout = useUserConfigurationStore((state) => state.currentSelectedLayout);
  const currentSelectedTemplateId = useUserConfigurationStore(
    (state) => state.currentSelectedTemplateId,
  );

  const {
    data: apiLayouts,
    isSuccess,
    isLoading,
  } = useQuery(userConfigurationSettingsKeys.layoutList(), getLayouts, {
    retry: false,
    cacheTime: 60 * SECOND,
    refetchOnMount: false,
  });

  useLayoutEffect(() => {
    const currentSelectedTemplateGridConfig = templatesToSave.find(
      (tem) => tem.id === currentSelectedTemplateId,
    )?.gridConfig;

    if (!currentSelectedTemplateGridConfig) return;

    const selectedLayoutWithCurrentSelectedTemplate = getLayoutFromAGridConfig(
      currentSelectedTemplateGridConfig,
    );

    if (selectedLayoutWithCurrentSelectedTemplate) {
      setCurrentSelectedLayout(selectedLayoutWithCurrentSelectedTemplate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedTemplateId, setCurrentSelectedLayout]);

  useEffect(() => {
    const isLoaded = isSuccess && !isLoading;

    setTemplates(apiLayouts, isLoaded);
  }, [apiLayouts, isLoading, isSuccess, setTemplates]);

  const filteredLayouts = useMemo(
    () =>
      templatesToSave.filter((template) => {
        const layoutName = getLayoutFromAGridConfig(template.gridConfig);
        return layoutName === currentSelectedLayout;
      }),
    [currentSelectedLayout, templatesToSave],
  );

  return {
    isLoadingApiLayouts: isLoading,
    currentSelectedLayout,
    layoutData: filteredLayouts,
  };
};
