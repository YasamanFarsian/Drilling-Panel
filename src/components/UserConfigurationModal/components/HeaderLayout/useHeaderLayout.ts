/* eslint-disable max-lines-per-function */
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Option } from '@dt-advisory/components/DropDown';
import { useUserConfigurationStore } from '@dt-advisory/store/UserConfiguration/UserConfiguration';
import { HeaderProperties } from '@dt-advisory/store/UserConfiguration/UserConfiguration.types';

const useHeaderLayout = () => {
  const [options, setOptions] = useState<Option<HeaderProperties>[]>([]);
  const { formatMessage } = useIntl();
  const placeHolder = formatMessage({
    id: 'userConfiguration.settings.headerLayout.dropDown.placeHolder',
    defaultMessage: 'Select Header',
  });
  const currentUserConfig = useUserConfigurationStore((x) => x.currentUserConfig);
  const updateHeaderConfig = useUserConfigurationStore((x) => x.updateHeaderConfig);
  const availableHeaderProperties = currentUserConfig?.availableHeaderProperties ?? [];
  const headerConfig = currentUserConfig?.headerConfig ?? [];

  useEffect(() => {
    const initOptions = availableHeaderProperties.map((x) => ({
      label: formatMessage({
        id: `userConfiguration.settings.headerLayout.dropDown.${x}`,
        defaultMessage: x,
      }),
      value: x,
      disabled: false,
      isSelected: headerConfig.includes(x),
    }));
    setOptions(initOptions);
    // eslint-disable-next-line
  }, []);

  const onChange = (value: HeaderProperties, index: number) => {
    const updatedHeaderProperties: HeaderProperties[] = [...headerConfig];
    const foundIndexToDelete = headerConfig.findIndex((x) => x === value);
    if (foundIndexToDelete > -1) {
      updatedHeaderProperties[foundIndexToDelete] = '' as HeaderProperties;
    }
    updatedHeaderProperties[index] = value;

    // save to global store
    updateHeaderConfig(updatedHeaderProperties);

    // for dropdown list style purposes (adds background to selected values)
    const updatedOptions = options.map((x) => {
      x.isSelected = updatedHeaderProperties.includes(x.value);
      return x;
    });
    setOptions(updatedOptions);
  };

  return {
    availableHeaderProperties,
    headerConfig,
    options,
    placeHolder,
    onChange,
  };
};

export default useHeaderLayout;
