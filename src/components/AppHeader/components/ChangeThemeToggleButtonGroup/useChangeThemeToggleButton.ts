/* eslint-disable max-lines-per-function */
import { useTheme } from '@mui/styles';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { AppearanceEnum } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

export type ChangeThemeToggleButtonGroupType<T extends AppearanceEnum> = {
  value: T;
};

export const useChangeThemeToggleButton = () => {
  const theme = useTheme();
  const getAppearanceMode = useUserConfigurationStore((x) => x.getAppearanceMode);
  const options: ChangeThemeToggleButtonGroupType<AppearanceEnum>[] = [
    {
      value: AppearanceEnum.LIGHT,
    },
    {
      value: AppearanceEnum.DARK,
    },
  ];

  const handleOnChange = () => {
    theme.setMode(theme.mode === AppearanceEnum.LIGHT ? AppearanceEnum.DARK : AppearanceEnum.LIGHT);
  };

  return {
    options,
    handleOnChange,
    currentValue: (theme.mode as AppearanceEnum) || getAppearanceMode() || AppearanceEnum.LIGHT,
  };
};

export default useChangeThemeToggleButton;
