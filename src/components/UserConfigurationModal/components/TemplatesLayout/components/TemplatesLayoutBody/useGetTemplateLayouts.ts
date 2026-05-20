import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { getLayoutFromAGridConfig } from '@dt-advisory/store/UserConfiguration/userConfigurationHelper';
import { useLayoutEffect, useMemo } from 'react';

export const useGetTemplateLayouts = () => {
  const setTemplates = useUserConfigurationStore((s) => s.setTemplates);
  const templatesToSave = useUserConfigurationStore((s) => s.templatesToSave);
  const setCurrentSelectedLayout = useUserConfigurationStore((s) => s.setCurrentSelectedLayout);
  const currentSelectedLayout = useUserConfigurationStore((s) => s.currentSelectedLayout);
  const currentSelectedTemplateId = useUserConfigurationStore((s) => s.currentSelectedTemplateId);

  useLayoutEffect(() => {
    setTemplates(undefined, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const gridConfig = templatesToSave.find((t) => t.id === currentSelectedTemplateId)?.gridConfig;
    if (!gridConfig) return;
    const layout = getLayoutFromAGridConfig(gridConfig);
    if (layout) setCurrentSelectedLayout(layout);
  }, [currentSelectedTemplateId, setCurrentSelectedLayout, templatesToSave]);

  const filteredLayouts = useMemo(
    () =>
      templatesToSave.filter(
        (t) => getLayoutFromAGridConfig(t.gridConfig) === currentSelectedLayout,
      ),
    [currentSelectedLayout, templatesToSave],
  );

  return {
    isLoadingApiLayouts: false,
    currentSelectedLayout,
    layoutData: filteredLayouts,
  };
};
