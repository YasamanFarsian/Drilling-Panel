import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';

export const useTemplateSelection = (templateId: string) => {
  const currentSelectedTemplateId = useUserConfigurationStore(
    (state) => state.currentSelectedTemplateId,
  );
  const setCurrentSelectedTemplateId = useUserConfigurationStore(
    (state) => state.setCurrentSelectedTemplateId,
  );
  const isSelected = currentSelectedTemplateId === templateId;

  return { setCurrentSelectedTemplateId, isSelected };
};
