import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { geoPressureToggleBtnStyle, geoPressureTogglerStyle } from './GeoPressureToggler.style';

export enum GeoPressureToggleValue {
  MD = 'MD',
  TVD = 'TVD',
}

export type GeoPressureTogglerPropsType = {
  value: GeoPressureToggleValue;
  onToggle: () => void;
};

const GeoPressureToggler = ({ value, onToggle }: GeoPressureTogglerPropsType): JSX.Element => {
  return (
    <Box data-testid="geo_pressure_toggler" pb={2}>
      <ToggleButtonGroup css={geoPressureTogglerStyle} value={value} onChange={onToggle} exclusive>
        <ToggleButton css={geoPressureToggleBtnStyle} value={GeoPressureToggleValue.MD}>
          <FormattedMessage id="operationInfo.geoPressure.toggleBtn.measuredDepth" />
        </ToggleButton>
        <ToggleButton css={geoPressureToggleBtnStyle} value={GeoPressureToggleValue.TVD}>
          <FormattedMessage id="operationInfo.geoPressure.toggleBtn.trueVerticalDepth" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default GeoPressureToggler;
