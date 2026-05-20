/* eslint-disable max-lines-per-function */
import { Box } from '@mui/material';
import React from 'react';
import InputText from '@dt-advisory/components/InputText';
import ToggleButtonGroup from '@dt-advisory/components/ToggleButtonGroup';
import Title from '../Title';
import {
  inputContainerStyle,
  unitValueStyle,
  warningAnimationContainerStyle,
} from './Notifications.style';
import {
  useMuteWarningsAfter,
  useTunOffWarningsAfter,
  useWarningsActivation,
} from './useNotifications';

const Notifications = (): JSX.Element => {
  const {
    title: warningsActivationTitle,
    options: WarningsActivationOptions,
    handleOnChange: handleWarningsActivationChange,
    currentValue: currentWarningsActivation,
  } = useWarningsActivation();
  const {
    value: turnOffWarningsAfterValue,
    onChange: onChangeturnOffWarningsAfter,
    title: turnOffWarningsAfterTitle,
    unitLabel: turnOffWarningsAfterUnitLabel,
  } = useTunOffWarningsAfter();
  const {
    value: muteWarningsAfterValue,
    onChange: onChangemuteWarningsAfter,
    title: muteWarningsAfterTitle,
    unitLabel: muteWarningsAfterUnitLabel,
  } = useMuteWarningsAfter();

  return (
    <Box data-testid="notifications_1676545381536">
      <Box className="at_main_settings_warningsAnimation" css={warningAnimationContainerStyle}>
        <Title value={warningsActivationTitle} />
        <ToggleButtonGroup
          viewportUnit
          onChange={handleWarningsActivationChange}
          value={currentWarningsActivation}
          options={WarningsActivationOptions}
        />
      </Box>
      <Box className="at_main_settings_turnWarningsOffAfter">
        <Title value={turnOffWarningsAfterTitle} />
        <Box css={inputContainerStyle}>
          <InputText
            type="number"
            name="turnWarningsOffAfter"
            maxWidth={'6vw'}
            viewportUnit
            value={turnOffWarningsAfterValue}
            onChange={onChangeturnOffWarningsAfter}
          />
          <Box css={unitValueStyle}>{turnOffWarningsAfterUnitLabel}</Box>
        </Box>
      </Box>
      <Box className="at_main_settings_muteWarningsOffAfter">
        <Title value={muteWarningsAfterTitle} />
        <Box css={inputContainerStyle}>
          <InputText
            type="number"
            name="muteWarningsOffAfter"
            maxWidth={'6vw'}
            viewportUnit
            value={muteWarningsAfterValue}
            onChange={onChangemuteWarningsAfter}
          />
          <Box css={unitValueStyle}>{muteWarningsAfterUnitLabel}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;
