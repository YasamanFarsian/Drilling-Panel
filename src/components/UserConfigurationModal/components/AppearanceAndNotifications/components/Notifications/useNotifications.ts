/* eslint-disable max-lines-per-function */
import { useIntl } from 'react-intl';
import { ToggleButtonGroupOption } from '@dt-advisory/components/ToggleButtonGroup';
import { useSettingsStore, WarningsActivation } from '@dt-advisory/store/Settings';

export const useWarningsActivation = () => {
  const { formatMessage } = useIntl();
  const warningsAnimation = useSettingsStore((x) => x.settings.warningsAnimation);
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const title = formatMessage({
    id: 'settings.general.warnings_active.subtitle',
    defaultMessage: 'Warnings Animation',
  });
  const options: ToggleButtonGroupOption<WarningsActivation>[] = [
    {
      value: WarningsActivation.ON,
      label: formatMessage({
        id: 'settings.general.warnings_active.enable',
        defaultMessage: WarningsActivation.ON,
      }),
    },
    {
      value: WarningsActivation.OFF,
      label: formatMessage({
        id: 'settings.general.warnings_active.disable',
        defaultMessage: WarningsActivation.OFF,
      }),
    },
  ];
  const handleOnChange = (_: React.MouseEvent<HTMLElement>, value: WarningsActivation) => {
    if (value) {
      updateSettings('warningsAnimation', value);
    }
  };

  return {
    title,
    options,
    handleOnChange,
    currentValue: warningsAnimation,
  };
};

export const useTunOffWarningsAfter = () => {
  const { formatMessage } = useIntl();
  const warningTimeout = useSettingsStore((x) => x.settings.warningTimeout);
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const title = formatMessage({
    id: 'settings.general.warnings.subtitle',
    defaultMessage: 'Turn warnings off after',
  });
  const unitLabel = formatMessage({
    id: 'settings.general.warnings.unit',
    defaultMessage: 'seconds',
  });
  const onChange = (value: number) => {
    updateSettings('warningTimeout', value);
  };
  return { value: warningTimeout, onChange, title, unitLabel };
};

export const useMuteWarningsAfter = () => {
  const { formatMessage } = useIntl();
  const muteWarningTimeout = useSettingsStore((x) => x.settings.muteWarningTimeout);
  const updateSettings = useSettingsStore((x) => x.updateSettings);
  const title = formatMessage({
    id: 'settings.general.mute_warnings.subtitle',
    defaultMessage: 'Mute warnings off after',
  });
  const unitLabel = formatMessage({
    id: 'settings.general.mute_warnings.unit',
    defaultMessage: 'seconds',
  });

  const onChange = (value: number) => {
    updateSettings('muteWarningTimeout', value);
  };
  return { value: muteWarningTimeout, onChange, title, unitLabel };
};
