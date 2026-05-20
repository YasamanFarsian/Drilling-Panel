import { Typography } from '@mui/material';
import React from 'react';
import { useIntl } from 'react-intl';
import InputText from '@dt-advisory/components/InputText';
import { useSettingsStore } from '@dt-advisory/store/Settings';
import {
  containerStyle,
  fieldContainerStyle,
  inputLabelStyle,
  subHeaderStyle,
} from './SmartAutoRopSetting.style';

const SmartAutoRopSetting = (): JSX.Element => {
  const { formatMessage } = useIntl();
  const { thresholdLimit } = useSettingsStore((state) => state.settings.smartAutoRop);
  const updateSmartAutoRopThresholdLimit = useSettingsStore(
    (state) => state.updateSmartAutoRopThresholdLimit,
  );

  return (
    <div data-testid="smart_auto_rop_setting_1684483842539" css={containerStyle}>
      <div css={subHeaderStyle}>
        <Typography variant="h3" fontWeight={700}>
          {formatMessage({ id: 'widget.smartAutoRop.setting.tolerance' })}
        </Typography>
      </div>
      <div css={fieldContainerStyle}>
        <Typography variant="caption" fontWeight={700} css={inputLabelStyle}>
          {formatMessage({ id: 'widget.smartAutoRop.setting.thresholdLimit' })}
        </Typography>
        <InputText
          type="number"
          name="thresholdLimit"
          onChange={updateSmartAutoRopThresholdLimit}
          value={thresholdLimit}
          endAdornment="%"
          maxWidth="100%"
        />
      </div>
    </div>
  );
};

export default React.memo(SmartAutoRopSetting);
