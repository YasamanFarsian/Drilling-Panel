import { Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { containerStyle, mdpStyle } from './MpdLabel.style';

export type MpdLabelPropsType = {
  active: boolean;
};

const MpdLabel = ({ active }: MpdLabelPropsType): JSX.Element => {
  return (
    <div data-testid="mpd_label" css={containerStyle}>
      {active && (
        <Typography variant="h6" css={mdpStyle} gutterBottom>
          <FormattedMessage id="settings.general.mpd.subtitle" />
        </Typography>
      )}
    </div>
  );
};

export default MpdLabel;
